/*
 * React element that describes what a single reading entry looks like
 */
import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {getReading,
        updateReading,
        deleteReading
} from '../../libs/serverAPI';
import {configureS3} from '../../libs/aws_s3';
import AWS from 'aws-sdk';
import {Grid,
        Row,
        Col,
        Button
} from 'react-bootstrap';
import './reading.css';
import ReadingForm from '../NewReading/ReadingForm';
/*
 * A single row describing a reading field
 * Expects two props:
 *  1. title - title of the field
 *  2. val - value of the field
 */
function ReadingRow(props) {
    return (
        <Row>
            <Col sm={2}>
                <h1 className="row-title">{props.title}:</h1>
            </Col>
            <Col sm={10}>
                <h1 className="row-elm">{props.val}</h1>
            </Col>
        </Row>
    )
}
/*
 * Component describing a reading entry
 * Expects the following props:
 *  1.
 */
class Reading extends Component {
    constructor(props) {
        super(props);

        this.titleOnChangeHandler = this.titleOnChangeHandler.bind(this);
        this.linkOnChangeHandler = this.linkOnChangeHandler.bind(this);
        this.fileAttachmentHandler = this.fileAttachmentHandler.bind(this);
        this.memoOnChangeHandler = this.memoOnChangeHandler.bind(this);

        this.editBtnHandler = this.editBtnHandler.bind(this);
        this.deleteBtnHandler = this.deleteBtnHandler.bind(this);
        this.submitHandler = this.submitHandler.bind(this);
        this.state = {
            reading: null,
            isEditing: false,
            isLoading: false,
        }
    }
    /*
     * get the reading object from the back end
     */
    componentWillMount() {
        // get the reading object from the back end
        const readingId = this.props.match.params.id;
        const userToken = this.props.childProps.userToken;
        let getPromise = getReading(userToken, readingId);
        getPromise.then((readingData) => {
            this.setState({
                reading: readingData,
            });
        })
        .catch((err) => {
            console.log(err);
        })
    }
    /*
     * On edit request, we show the editing form
     */
    editBtnHandler(event) {
        this.setState({
            isEditing: true,
        })
    }
    async submitHandler(event) {
        event.preventDefault();
        this.setState({
            isLoading: true,
        })
        var filePath = null;
        if (this.state.reading.attachment) {
            filePath = await this.uploadFile();
        }
        // update the reading object
        const readingId = this.props.match.params.id;
        const userToken = this.props.childProps.userToken;
        const updatedReading = {
            title: this.state.reading.title,
            link: this.state.reading.link,
            memo: this.state.reading.memo,
            attachment: filePath,
        };
        let dataPromise = updateReading(updatedReading, userToken, readingId);
        dataPromise.then((jsonData) => {
            this.setState({
                isLoading: false,
                isEditing: false,
            })
            const redirectUrl = '/reading/' + readingId;
            this.props.history.push(redirectUrl);
        })
        .catch((err) => {
            alert(err);
        });
    }
    async uploadFile() {
            let s3 = await configureS3(this.props.childProps.userToken);

            return new Promise((resolve, reject) => {
                const file = this.state.reading.attachment;
                const filePath = `${AWS.config.credentials.identityId}-${Date.now()}-${file.name}`;
                const params = {
                    Key: filePath,
                    ACL: 'public-read',
                    Body: file,
                    ContentType: file.type,
                    ContentLength: file.size,
                };
                let s3promise = s3.upload(params).promise();
                s3promise.then((data) => {
                    resolve(data.Location);
                })
                .catch((err) => {
                    reject(err);
                });
            });
    }
    deleteBtnHandler(event) {
        this.setState({
            isLoading: true,
        })
        const userToken = this.props.childProps.userToken;
        const readingId = this.props.match.params.id;
        let dataPromise = deleteReading(userToken, readingId);
        dataPromise.then((jsonData) => {
            this.setState({
                isLoading: false,
            });
            this.props.history.push('/readings');
        })
        .catch((err) => {
            alert(err);
        })
    }
    /*
     * handlers for updating UI input elements
     */
    // update title as user types
    titleOnChangeHandler(event) {
        let updatedReading = this.state.reading;
        updatedReading.title = event.target.value;
        this.setState({
            reading: updatedReading,
        });
    }
    // update link as user types
    linkOnChangeHandler(event){
        let updatedReading = this.state.reading;
        updatedReading.link = event.target.value;
        this.setState({
            reading: updatedReading,
        });
    }
    memoOnChangeHandler(event) {
        let updatedReading = this.state.reading;
        updatedReading.memo = event.target.value;
        this.setState({
            reading: updatedReading,
        });
    }
    // attach a file
    fileAttachmentHandler(event) {
        let updatedReading = this.state.reading;
        updatedReading.attachment = event.target.files[0];
        this.setState({
            reading: updatedReading,
        });
    }
    render() {
        let view = null;
        const reading = this.state.reading? this.state.reading : null;
        // getting reading object is async process: wait rendering until it's done
        if (!reading) {
            return (
                <i id="page-loading-bar" className="fa fa-refresh fa-spin fa-3x fa-fw" aria-hidden="true"></i>
            )
        }
        // show reading object in reading format if not Editing
        if (!this.state.isEditing) {
            const editBtn = (
                <Button bsStyle="primary"
                    block
                    bsSize="large"
                    onClick={this.editBtnHandler}>
                    Edit
                </Button>
            );
            const deleteBtn = (
                <Button bsStyle="danger"
                    block
                    bsSize="large"
                    onClick={this.deleteBtnHandler}>
                    {this.state.isLoading && <i className="fa fa-circle-o-notch fa-spin fa-fw"></i>}
                    Delete
                </Button>
            );
            const readingComponent = (
                <div id="reading-container">
                    <Grid>
                        <ReadingRow title="Title" val={reading.title} />
                        <ReadingRow title="Link" val={<a href={reading.link}>{reading.link}</a>} />
                        <ReadingRow title="Memo" val={reading.memo} />
                        <ReadingRow title="Attachment" val={reading.attachment} />
                        {editBtn}
                        {deleteBtn}
                    </Grid>
                </div>
            )
            view = readingComponent;
        }
        // show edit form if user wants to edit reading entry
        else {
            let isLoading = this.state.isLoading;
            const titleProps = {
                textLabel: "Save as",
                inputType: "text",
                inputValue: this.state.reading.title,
                placeholder: "e.g. title of the page",
                inputHandler: this.titleOnChangeHandler,
            };
            const linkProps = {
                textLabel: "Link",
                inputType: "url",
                inputValue: this.state.reading.link,
                placeholder: "e.g. www.example.com",
                inputHandler: this.linkOnChangeHandler,
            }
            const fileProps = {
                inputHandler: this.fileAttachmentHandler,
            }
            const memoProps = {
                textLabel: null,
                inputType: "textarea",
                inputValue: this.state.reading.memo,
                placeholder: "Say something about it",
                inputHandler: this.memoOnChangeHandler,
            }
            const editComponent = (
                <div id="readingForm-container">
                    <ReadingForm
                        submitHandler={this.submitHandler}
                        titleProps={titleProps}
                        linkProps={linkProps}
                        fileProps={fileProps}
                        memoProps={memoProps}
                        isLoading={isLoading}/>
                </div>
            )
            view = editComponent;
        }
        return (
            <div>
                {view}
            </div>
        )
    }
}

export default withRouter(Reading);

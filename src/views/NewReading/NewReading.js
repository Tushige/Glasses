import React, {Component} from 'react';
import ReadingForm from './ReadingForm';
import {createReading} from '../../libs/serverAPI';
import {configureS3} from '../../libs/aws_s3';
import AWS from 'aws-sdk';

import './NewReading.css';
class NewReading extends Component {
    constructor(props) {
        super(props);

        this.titleOnChangeHandler = this.titleOnChangeHandler.bind(this);
        this.linkOnChangeHandler = this.linkOnChangeHandler.bind(this);
        this.fileAttachmentHandler = this.fileAttachmentHandler.bind(this);
        this.memoOnChangeHandler = this.memoOnChangeHandler.bind(this);
        this.submitHandler = this.submitHandler.bind(this);

        this.state = {
            readingTitle: "",
            readingLink: "",
            memo: "",
            attachment: null,
            isLoading:false,
        }
    }
    /*
     * handlers for updating UI input elements
     */
    // update title as user types
    titleOnChangeHandler(event) {
        this.setState({
            readingTitle: event.target.value,
        });
    }
    // update link as user types
    linkOnChangeHandler(event){
        this.setState({
            readingLink: event.target.value,
        });
    }
    memoOnChangeHandler(event) {
        this.setState({
            memo: event.target.value,
        });
    }
    // attach a file
    fileAttachmentHandler(event) {
        this.setState({
            attachment: event.target.files[0],
        });
        console.log("attached file");
        console.log(this.state.attachment);
    }
    /*
     * Save the new reading in DB
     */
    async submitHandler(event) {
        event.preventDefault();
        this.setState({
            isLoading: true,
        });
        var filePath = null;
        // upload the file to s3 first if there is a file
        if (this.state.attachment) {
            console.log("1. retrieving filepath");
            filePath = await this.uploadFile();
            console.log("3. retrieved filePath: ");
            console.log(filePath);
        }
        console.log("4. constructing Reading object");
        let newReading = {
            title: this.state.readingTitle,
            link: this.state.readingLink,
            memo: this.state.memo,
            attachment: filePath,
        }

        let dataPromise = createReading(newReading, this.props.childProps.userToken);
        // response.json() resolves
        dataPromise.then((jsonData) => {
            console.log(jsonData)
            this.setState({
                isLoading: false,
            })
        })
        // response.json() fails
        .catch((err) => {
            console.log(err);
        });
    }
    async uploadFile() {
            let s3 = await configureS3(this.props.childProps.userToken);

            return new Promise((resolve, reject) => {
                const file = this.state.attachment;
                const filePath = `${AWS.config.credentials.identityId}-${Date.now()}-${file.name}`;
                const params = {
                    Key: filePath,
                    ACL: 'public-read',
                    Body: this.state.attachment,
                    ContentType: file.type,
                    ContentLength: file.size,
                };
                let s3promise = s3.upload(params).promise();
                s3promise.then((data) => {
                    console.log("2. got s3 filepath:");
                    console.log(data);
                    resolve(data.Location);
                })
                .catch((err) => {
                    console.log("DID NOT get s3 filepath:");
                    reject(err);
                });
            });
    }

    render() {
        let isLoading = this.state.isLoading;
        const titleProps = {
            textLabel: "Save as",
            inputType: "text",
            inputValue: this.state.readingTitle,
            placeholder: "e.g. title of the page",
            inputHandler: this.titleOnChangeHandler,
        };
        const linkProps = {
            textLabel: "Link",
            inputType: "url",
            inputValue: this.state.readingLink,
            placeholder: "e.g. www.example.com",
            inputHandler: this.linkOnChangeHandler,
        }
        const fileProps = {
            inputHandler: this.fileAttachmentHandler,
        }
        const memoProps = {
            textLabel: null,
            inputType: "textarea",
            inputValue: this.state.memo,
            placeholder: "Say something about it",
            inputHandler: this.memoOnChangeHandler,
        }
        return (
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
    }
}

export default NewReading;

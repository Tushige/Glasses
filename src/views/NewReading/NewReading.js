import React, {Component} from 'react';
import ReadingForm from './ReadingForm';
import {create} from '../../libs/serverAPI';

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
            attachment: "",
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
            attachment: event.target.value,
        })
    }
    /*
     * Save the new reading in DB
     */
    submitHandler(event) {
        event.preventDefault();
        this.setState({
            isLoading: true,
        });
        let newReading = {
            title: this.state.readingTitle,
            link: this.state.readingLink,
            memo: this.state.memo,
        }
        console.log(this.props.userToken);
        let dataPromise = create(newReading, this.props.childProps.userToken);
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
            textLabel: null,
            inputType: "file",
            inputValue: this.state.attachment,
            placeholder: "",
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

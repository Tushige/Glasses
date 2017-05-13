import React, {Component} from 'react';
import ReadingForm from './ReadingForm';
import './NewReading.css';
class NewReading extends Component {
    constructor(props) {
        super(props);

        this.titleOnChangeHandler = this.titleOnChangeHandler.bind(this);
        this.linkOnChangeHandler = this.linkOnChangeHandler.bind(this);
        this.fileAttachmentHandler = this.fileAttachmentHandler.bind(this);
        this.submitHandler = this.submitHandler.bind(this);
        this.state = {
            readingTitle: "",
            readingLink: "",
            attachment: null,
            isLoading:false,
        }
    }
    /*
     * update title as user types
     */
    titleOnChangeHandler(event) {
        this.setState({
            readingTitle: event.target.value,
        });
    }
    /*
     * update link as user types
     */
    linkOnChangeHandler(event){
        this.setState({
            readingLink: event.target.value,
        });
    }
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
        return (
            <div id="readingForm-container">
                <ReadingForm
                    submitHandler={this.submitHandler}
                    titleProps={titleProps}
                    linkProps={linkProps}
                    fileProps={fileProps}
                    isLoading={isLoading}/>
            </div>
        )
    }
}

export default NewReading;

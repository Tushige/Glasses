import React, {Component} from 'react';
import  {
    Form,
    FormGroup,
    FormControl,
    Button,
    Col,
} from 'react-bootstrap';
import FormField from '../../containers/FormComponents/FormField';
import './NewReading.css';
class ReadingForm extends Component {
    render() {
        let isLoading = this.props.isLoading;

        /*
         * UI elements
         */

        // 1. title form field
        const title = (
            <FormField childProps={this.props.titleProps}/>
        );
        // 2. link form field
        const link = (
            <FormField childProps={this.props.linkProps}/>
        );
        // 3. textarea to say something about the reading
        const textArea = (
            <FormGroup>
                <Col smOffset={2} sm={10}>
                    <FormControl id="memo-text"
                        componentClass="textarea"
                        placeholder="Say something about it"/>
                </Col>
            </FormGroup>
        );

        // 4. file attachment form field
        const fileAttachment = (
            <FormField childProps={this.props.fileProps}/>
        )

        // 5. submit button to save reading
        const submitButton = (
            <FormGroup>
                <Col smOffset={2} sm={2}>
                    <Button id="btn-submit"
                        type="submit"
                        bsStyle="primary"
                        block
                        disabled={isLoading}>
                        {isLoading ? 'Saving...':'Save'}
                    </Button>
                </Col>
            </FormGroup>
        );

        return (
            <Form horizontal onSubmit={this.props.submitHandler}>
                {title}
                {link}
                {textArea}
                {fileAttachment}
                {submitButton}
            </Form>
        );
    }
}
export default ReadingForm;

import React, {Component} from 'react';
import {
    Form,
    FormGroup,
    Button,
    Col,
} from 'react-bootstrap';
import FormField from '../containers/FormComponents/FormField';

class VerificationForm extends Component {
    render() {
        let isLoading = this.props.isLoading;
        return (
            <Form horizontal onSubmit={this.props.submitHandler}>
                <FormField childProps={this.props.childProps}/>
                <FormGroup>
                    <Col smOffset={2} sm={2}>
                        <Button
                            type="submit"
                            bsStyle="primary"
                            block
                            disabled={isLoading}>
                            {isLoading ? 'Verifying...':'Verify'}
                        </Button>
                    </Col>
                </FormGroup>
            </Form>
        );
    }
}

export default VerificationForm;

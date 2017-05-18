import React, {Component} from 'react';
import {
    Form,
    FormGroup,
    Button,
    Col,
} from 'react-bootstrap';
import InputField from '../../containers/FormComponents/InputField';

class VerificationForm extends Component {
    render() {
        let isLoading = this.props.isLoading;
        const field = (
            <InputField
                type="text"
                icon={<i className="fa fa-handshake-o" aria-hidden="true"></i>}
                value={this.props.childProps.inputValue}
                placeholder="Verification Code"
                onChange={this.props.childProps.inputHandler}>
            </InputField>
        );
        const submitBtn = (
            <FormGroup>
                <Button
                    type="submit"
                    bsStyle="primary"
                    block
                    disabled={isLoading}>
                    {isLoading && <i className="fa fa-cogs fa-spin" aria-hidden="true"></i>}
                    {isLoading ? 'Verifying...':'Verify'}
                </Button>
            </FormGroup>
        );
        return (
            <Form horizontal onSubmit={this.props.submitHandler}>
                {field}
                {submitBtn}
            </Form>
        );
    }
}

export default VerificationForm;

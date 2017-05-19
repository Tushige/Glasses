import React, {Component} from 'react';
import {
    Form,
    FormGroup,
    Button,
} from 'react-bootstrap';
import InputField from '../../containers/FormComponents/InputField';

import './SigninForm.css';
/*
 * expects the following props:
 *  1.  isLoading
 *  2.  inputHandler
 *  3.  inputValue
 *  4.  submitHandler
 */
class SigninForm extends Component {
    render() {
        let isLoading = this.props.isLoading;
        const emailProps = this.props.emailProps;
        const passProps = this.props.passProps;
        /*
         * UI elements
         */
        const EmailField = (
            <InputField
                type="email"
                icon={<i className="fa fa-envelope-o fa-fw"></i>}
                value={emailProps.inputValue}
                placeholder="Email"
                onChange={emailProps.inputHandler}
                validationState={emailProps.validationState}
                showError={false}>
            </InputField>
        );
        const PassField = (
            <InputField
                type="password"
                icon={<i className="fa fa-key fa-fw"></i>}
                value={passProps.inputValue}
                placeholder="password"
                onChange={passProps.inputHandler}
                validationState={passProps.validationState}
                showError={passProps.showError}
                errorMsg={passProps.errorMsg}>
            </InputField>
        );
        const SigninBtn = (
            <FormGroup>
                <Button id="signin-btn"
                    type="submit"
                    bsStyle="primary"
                    block
                    disabled={isLoading}>
                    {isLoading && <i className="fa fa-circle-o-notch fa-spin fa-fw"></i>}
                    <span>{isLoading ?'Signing In...':'Sign In'}</span>
                </Button>
            </FormGroup>
        );

        return (
            <div id="form-container">
                <Form horizontal onSubmit={this.props.submitHandler}>
                    {EmailField}
                    {PassField}
                    {SigninBtn}
                </Form>
            </div>
        );
    }
}
export default SigninForm;

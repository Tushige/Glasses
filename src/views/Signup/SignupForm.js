import React, {Component} from 'react';
import {
    Form,
    FormGroup,
    Button,
} from 'react-bootstrap';
import InputField from '../../containers/FormComponents/InputField';

import './SignupForm.css';

class SignupForm extends Component {
    render() {
        let isLoading = this.props.isLoading;
        const emailProps = this.props.emailProps;
        const passProps = this.props.passProps;
        const vpassProps = this.props.vpassProps;
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
                errorMsg={emailProps.errorMsg}>
            </InputField>
        );
        const PassField = (
            <InputField
                type="password"
                icon={<i className="fa fa-key fa-fw"></i>}
                value={passProps.inputValue}
                placeholder="choose a password"
                onChange={passProps.inputHandler}
                validationState={passProps.validationState}
                errorMsg={passProps.errorMsg}>
            </InputField>
        );
        const VPassField = (
            <InputField
                type="password"
                icon={<i className="fa fa-key fa-fw"></i>}
                value={vpassProps.inputValue}
                placeholder="Please verify your password"
                onChange={vpassProps.inputHandler}
                validationState={vpassProps.validationState}
                errorMsg={vpassProps.errorMsg}>
            </InputField>
        );
        const SignupBtn = (
            <FormGroup>
                <Button
                    id="signup-btn"
                    type="submit"
                    bsStyle="primary"
                    block
                    disabled={isLoading}>
                    {isLoading && <i className="fa fa-circle-o-notch fa-spin fa-fw"></i>}
                    {isLoading ? 'Signing up...':'Sign Up'}
                </Button>
            </FormGroup>
        );
        return (
            <div id="form-signup-container">
                <Form className="signupForm" horizontal onSubmit={this.props.signupHandler}>
                    {EmailField}
                    {PassField}
                    {VPassField}
                    {SignupBtn}
                </Form>
            </div>
        );
    }
}
export default SignupForm;

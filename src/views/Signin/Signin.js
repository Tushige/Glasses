/*******************************************************************************
 * This file contains the component and logic of user signin
 *******************************************************************************/
import React, {Component} from 'react';
import {
    Form,
    FormGroup,
    FormControl,
    ControlLabel,
    Button,
    Checkbox,
    Col,
} from 'react-bootstrap';
import SigninForm from './SigninForm';
/*
 * withRouter gives us history info in our Signin component's props
 */
import {withRouter} from 'react-router-dom';

import {authenticateUser} from '../../libs/user';

class Signin extends Component {
    constructor(props) {
        super(props);

        this.handleUsername = this.handleUsername.bind(this);
        this.handlePassword = this.handlePassword.bind(this);
        this.signinHandler = this.signinHandler.bind(this);
        this.validateUsername = this.validateUsername.bind(this);
        this.validatePassword = this.validatePassword.bind(this);
        this.validateForm = this.validateForm.bind(this);

        this.state = {
            username: '',
            password: '',
            isLoading: false,
            showError: false,
            errorMsg: '',
        };
    }

    /*
     * check if password is valid
     */
    validateUsername() {
        const len = this.state.username.length;
        if (len>8) return "success";
        else if(len>3) return "warning";
        else if(len>0) return "error";
    }

    /*
     * check if password is valid
     */
    validatePassword() {
        const len = this.state.password.length;
        if (len>8) return "success";
        else if(len>3) return "warning";
        else if(len>0) return "error";
    }

    /*
     * Signin only allowed on valid username and password
     */
    validateForm() {
        if (this.validateUsername()==="success" && this.validatePassword()==="success") {
            return 'success';
        }
        return 'error';
    }

    /*
     * updates username as user types
     */
    handleUsername(event) {
        this.setState({username: event.target.value});
    }

    /*
     * updates password as user types
     */
    handlePassword(event) {
        this.setState({password: event.target.value});
    }

    /*
     * attempts to sign in user
     * if successful, stores the user token
     * if not, shows error to the user
     */
    signinHandler(event) {
        event.preventDefault();
        if (this.validateForm() !== 'success') {
            alert("fields are wrong!");
            return;
        }
        this.setState({
            isLoading:true,
        });
        try {
            var signinPromise = authenticateUser(undefined, this.state.username, this.state.password);
            // signin success!
            signinPromise.then((userToken) => {
                this.props.childProps.updateUserToken(userToken);
                // redirect to homepage
                this.props.history.push('/')
            })
            // sign in failure! --> show helpful error message
            .catch((err) => {
                if (err.message === "User does not exist.") {
                    this.setState({
                        isLoading: false,
                        showError: true,
                        errorMsg: "Incorrect password."
                    })
                }
            });
        }
        catch(err) {
            alert(err);
        }
    }

    render() {
        let isLoading = this.state.isLoading;
        const emailProps = {
            inputHandler: this.handleUsername,
            inputValue: this.state.username,
            validationState: this.validateUsername,
        };
        const passProps = {
            inputHandler: this.handlePassword,
            inputValue: this.state.password,
            validationState: this.validatePassword,
            showError: this.state.showError,
            errorMsg: this.state.errorMsg,
        };
        const submitProps = {
            validationState: this.validateForm,
        };
        const form = (
            <SigninForm
                isLoading={isLoading}
                emailProps={emailProps}
                passProps={passProps}
                submitProps={submitProps}
                submitHandler={this.signinHandler}
            />
        );

        return (
            <div>
                {form}
            </div>
        )
    }
}

export default withRouter(Signin);

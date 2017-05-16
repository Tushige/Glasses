/*******************************************************************************
 * This file contains the component and logic of user signup
 *
 * Flow of User signUp:
 *  1.
 *  2.
 *  3.
 *******************************************************************************/
import React, {Component} from 'react';

import {createUserPool,
        createCognitoUserAttribute,
        authenticateUser,
} from '../../libs/user';
import SignupForm from './SignupForm';
import VerificationForm from './VerificationForm';
/*
 * withRouter gives us history info in our Signup component's props
 */
import {withRouter} from 'react-router-dom';

class Signup extends Component {
    constructor(props) {
        super(props);

        this.emailHandler = this.emailHandler.bind(this);
        this.passwordHandler = this.passwordHandler.bind(this);
        this.vpasswordHandler = this.vpasswordHandler.bind(this);
        this.verificationHandler = this.verificationHandler.bind(this);
        this.signupHandler = this.signupHandler.bind(this);
        this.verifySubmitHandler = this.verifySubmitHandler.bind(this);
        this.confirmWithCognito = this.confirmWithCognito.bind(this);

        this.state = {
            email: '',
            password: '',
            vpassword: '',
            verificationCode: '',
            isLoading: false,
            cognitoUser: null,
            isVerified: false,
            isSignedUp: false,
        };
    }

    /*
     * Update functions to reflect user input
     */
    emailHandler(event) {
        this.setState({
            email: event.target.value,
        });
    }
    passwordHandler(event) {
        this.setState({
            password: event.target.value,
        });
    }
    vpasswordHandler(event) {
        this.setState({
            vpassword: event.target.value,
        });
    }
    verificationHandler(event) {
        this.setState({
            verificationCode: event.target.value,
        });
    }

    /*
     * Called when user hits Submit buttons
     * This creates a new CognitoUser object
     */
     signupHandler(event) {
         // we don't want to reload the page while waiting for async request
         event.preventDefault();
         // give user visual feedback while waiting
         this.setState({
             isLoading: true,
         });

         const userPool = createUserPool();
         const attributeEmail = createCognitoUserAttribute('email', this.state.email);
         const username = this.state.email;
         const password = this.state.password;

         let attributeList = [];
         attributeList.push(attributeEmail);

         let signupPromise = this.signupWithCognito(userPool, username, password, attributeList);
         signupPromise.then((res) => {
             this.setState({
                 cognitoUser: res,
                 isLoading: false,
                 isSignedUp: true,
             });
         })
         .catch((err)=>{
             // we need to display informative error message on failure
             alert(err);
         });
     }
     /*
      * signup user with Cognito API
      */
     signupWithCognito(userPool, username, password, attributeList) {
         return new Promise((resolve, reject) => {
             userPool.signUp(username, password, attributeList, null, function(err, res) {
                 if (err) {
                     // we need to display informative error message on failure
                     console.log("signup rejecting with error: " + err);
                     reject(err);
                     return;
                 }
                 resolve(res.user);
             });
         });
     }
     verifySubmitHandler(event) {
         event.preventDefault();
         this.setState({
             isLoading: true,
         });
         let confirmPromise = this.confirmWithCognito();
         // confirmation success! - sign in user
         confirmPromise.then((res) => {
             console.log("confirmation success!");
             return authenticateUser(this.state.cognitoUser, this.state.email, this.state.password);
         })
         // confirmation failed!
         .catch((err) => {
             console.log("confirmation failed with error: " + err);
             return Promise.reject(new Error("confirmation failed"));
         })
         // authentication success!
         .then((userToken) => {
             console.log("authentication success!");
             // save the new user token in app
             this.props.childProps.updateUserToken(userToken);
             // redirect to homepage
             this.props.history.push('/')
             this.setState({
                 isLoading: false,
                 isVerified: true
             })
         })
         // authentication failed!
         .catch((err) => {
            console.log("auth failed with error: " + err);
         });
    }

    /*
     * confirm user through Cognito API
     */
    confirmWithCognito() {
        return new Promise((resolve, reject) => {
            this.state.cognitoUser.confirmRegistration(this.state.verificationCode, true, function(err, result) {
                if (err) {
                    reject(err);
                }
                resolve(result);
            });
        });
    }

    render() {
        /*
         * form that will be displayed, 1 of 2
         *  1. signup Form
         *  2. verification code form
         */
        let userForm;
        let isLoading = this.state.isLoading;
        // show verification form if user is signed up but not verified.
        if (!this.state.isVerified && this.state.isSignedUp) {
            const verificationProps = {
                textLabel: "Verification Code",
                inputType: "text",
                inputValue: this.state.verificationCode,
                placeholder: "Enter your verification code",
                inputHandler: this.verificationHandler,
            };
            userForm = (
                <VerificationForm
                    submitHandler={this.verifySubmitHandler}
                    childProps={verificationProps}
                    isLoading={isLoading}
                />
            );
        } else {
            const emailProps = {
                textLabel: "Email",
                inputType: "email",
                inputValue: this.state.email,
                placeholder: "please enter your email",
                inputHandler: this.emailHandler,
            }
            const passProps = {
                textLabel: "Password",
                inputType: "password",
                inputValue: this.state.password,
                placeholder: "please enter your password",
                inputHandler: this.passwordHandler,
            }
            const vpassProps = {
                textLabel: "Verify Password",
                inputType: "password",
                inputValue: this.state.vpassword,
                placeholder: "verify your password",
                inputHandler: this.vpasswordHandler,
            }
            userForm = (
                <SignupForm signupHandler={this.signupHandler}
                    emailProps={emailProps}
                    passProps={passProps}
                    vpassProps={vpassProps}
                    isLoading={isLoading}
                />
            );
        }
        return (
            <div>
                {userForm}
            </div>
        )
    }
}

export default withRouter(Signup);

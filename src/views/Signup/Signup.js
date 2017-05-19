/*******************************************************************************
 *  @file Signup.js
 *
 *  Contains the component and logic of user signup
 *
 *  Flow of User signUp:
 *      1.  register with AWS Cognito
 *      2.  receive verification code via email
 *      3.  match verification code against AWS Cognito
 *      4.  sign user in
 *******************************************************************************/
import React, {Component} from 'react';

import {createUserPool,
        createCognitoUserAttribute,
        authenticateUser,
} from '../../libs/user';
import SignupForm from './SignupForm';
import VerificationForm from './VerificationForm';
import {withRouter,
} from 'react-router-dom';
import './Signup.css';

/* error messages to show per input type */
const error_messages = {
    email: "user already exists",
    pass: "password must be at least 8 characters long",
    vpass: "passwords do not match",
    verifyCode: "verification code doesn't match"
};

class Signup extends Component {
    constructor(props) {
        super(props);
        /*input handler methods*/
        this.emailHandler = this.emailHandler.bind(this);
        this.passwordHandler = this.passwordHandler.bind(this);
        this.vpasswordHandler = this.vpasswordHandler.bind(this);
        this.verificationHandler = this.verificationHandler.bind(this);
        this.signupHandler = this.signupHandler.bind(this);
        this.verifySubmitHandler = this.verifySubmitHandler.bind(this);
        /*registration methods*/
        this.confirmWithCognito = this.confirmWithCognito.bind(this);

        /*validation methods*/
        this.validateEmail = this.validateEmail.bind(this);
        this.validatePassword =this.validatePassword.bind(this);
        this.validateVPassword = this.validateVPassword.bind(this);
        this.validateForm = this.validateForm.bind(this);

        this.state = {
            email: '',
            password: '',
            vpassword: '',
            verificationCode: '',
            isLoading: false,
            cognitoUser: null,
            isVerified: false,
            isSignedUp: false,

            error_email: '',
            error_pass:  '',
            error_vpass: '',
            error_verify: '',
        };
    }

    /*
     * Update methods to reflect user input
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
     * check if email is valid
     */
    validateEmail() {
        const len = this.state.email.length;
        if (len>8) return "success";
        else if(len>3) return "warning";
        else if(len>0) return "error";
    }

    /*
     * check if password is valid
     */
    validatePassword() {
        const len = this.state.password.length;
        if (len>8) {
            return 'success';
        }
        else if(len>0) {
            return "error";
        }
    }

    /*
     * check if verify password is valid
     */
    validateVPassword() {
        if (this.state.password && this.state.vpassword === this.state.password) {
            return 'success';
        }
        else if(this.state.vpassword) {
            return "error";
        }
    }

    /**
     *  @function - checks if the fiels are valid
     *            - assigns error message for each invalid input
     *  @return {String} 'success' if inputs are valid
     *          {String} 'error' if any one input is invalid
     */
    validateForm() {
        const email = this.validateEmail();
        const pass = this.validatePassword();
        const vpass = this.validateVPassword();
        if (email === 'success' && pass==='success' && vpass==='success') {
            return 'success';
        }
        if (pass !=='success') {
            this.setState({
                error_pass:error_messages.pass,
            });
        }
        if (vpass !== 'success') {
            this.setState({
                error_vpass: error_messages.vpass,
            });
        }
        return 'error';
     }

    /**
     *  Signup submit button handler
     *  This creates a new CognitoUser object
     *  @return none
     */
     signupHandler(event) {
         event.preventDefault();    // prevents page reload while waiting for async request
         this.setState({         // displays visual feedback while waiting
             isLoading: true,
         });
         /* don't interact with AWS if inputs are invalid */
         if (this.validateForm() !=='success') {
             this.setState({
                 isLoading: false,
             });
             return;
         }
         /* if valid inputs, signup with AWS */
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
             // we need to display informative error message on signup failure
             // instead of just alert
             this.setState({
                 isLoading: false,
                 error_email: error_messages.email,
             });
         });
     }
     /**
      * @param userPool {CognitoUserPool}
      * @param username {String} - user email
      * @param password {String} - user password
      * @param attributeList {CognitoUserAttribute}
      * @return {Promise} - resolves with CongitoUser object of new signed up user
      *                   - rejects with error message
      */
     signupWithCognito(userPool, username, password, attributeList) {
         return new Promise((resolve, reject) => {
             userPool.signUp(username, password, attributeList, null, function(err, res) {
                 if (err) {
                     return reject(err);
                 }
                 return resolve(res.user);
             });
         });
     }
     /**
      * Invoked on user verification code submit
      * Verifies user's code with AWS
      * On success, user is signed up, and signed in
      * On failure, we show error message
      *             we should do more error handling, such as resending code
      */
     verifySubmitHandler(event) {
         event.preventDefault();
         this.setState({
             isLoading: true,
         });
         let confirmPromise = this.confirmWithCognito();
         confirmPromise.then((res) => { // confirmation success! - sign in user
             return authenticateUser(this.state.cognitoUser, this.state.email, this.state.password);
         })
         .catch((err) => {  // confirmation failed!
             return Promise.reject(err);
         })
         .then((userToken) => { // authentication success!
             this.props.childProps.updateUserToken(userToken);  // save the new user token in app
             this.props.history.push('/');   // redirect to homepage
             this.setState({
                 isLoading: false,
                 isVerified: true
             });
         })
         // authentication failed!
         .catch((err) => {
            this.setState({
                error_verify:error_messages.verifyCode,
            });
         });
    }

    /**
     *  confirm user through Cognito API - used in email verification step
     *  @return {Promise} - resolves with confirmation result (not used)
     *                    - rejects with error
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
                    errorMsg={this.state.error_verify}
                />
            );
        } else {    // show signup form
            const emailProps = {
                inputValue: this.state.email,
                inputHandler: this.emailHandler,
                validationState: this.validateEmail,
                errorMsg: this.state.error_email,
            };
            const passProps = {
                inputValue: this.state.password,
                inputHandler: this.passwordHandler,
                validationState: this.validatePassword,
                errorMsg: this.state.error_pass,
            };
            const vpassProps = {
                inputValue: this.state.vpassword,
                inputHandler: this.vpasswordHandler,
                validationState: this.validateVPassword,
                errorMsg: this.state.error_vpass,
            };
            userForm = (
                <SignupForm signupHandler={this.signupHandler}
                    showError={this.state.showError}
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

/*******************************************************************************
 * This file contains the component and logic of user signup
 *
 * Flow of User signUp:
 *  1.
 *  2.
 *  3.
 *******************************************************************************/
import React, {Component} from 'react';
import { NavItem } from 'react-bootstrap';
import {
    Form,
    FormGroup,
    FormControl,
    ControlLabel,
    Button,
    Checkbox,
    Col,
} from 'react-bootstrap';
import FormField from './FormField';
import {createUserPool,
        createUserAuthDetails,
        createCognitoUserAttribute,
} from '../../libs/user';
import SignupForm from './SignupForm';
class Signup extends Component {
    constructor(props) {
        super(props);

        this.emailHandler = this.emailHandler.bind(this);
        this.passwordHandler = this.passwordHandler.bind(this);
        this.vpasswordHandler = this.vpasswordHandler.bind(this);
        this.signupHandler = this.signupHandler.bind(this);

        this.state = {
            email: '',
            password: '',
            vpassword: '',
            isLoading: false,
            cognitoUser: null,
            isVerified: false,
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

    /*
     * Called when user hits Submit buttons
     */
     signupHandler(event) {
         event.preventDefault();
         this.setState({
             isLoading: true,
         });
         const userPool = createUserPool();
         const attributeEmail = createCognitoUserAttribute('email', this.state.email);
         const username = this.state.email;
         const password = this.state.password;
         let attributeList = [];
         attributeList.push(attributeEmail);
         let signupPromise = new Promise((resolve, reject) => {
             userPool.signUp(username, password, attributeList, null, function(err, res) {
                 if (err) {
                     // we need to display informative error message on failure
                     reject(err);
                 }
                 console.log(res);
                 resolve(res.user);
             });
         });
         signupPromise.then((res) => {
             console.log("resolved")
             this.setState({
                 cognitoUser: res.getUsername(),
                 isLoading: false,
             });
         })
         .catch((err)=>{
             // we need to display informative error message on failure
             alert(err);
         });
     }
    render() {
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
        let isLoading = this.state.isLoading;
        return (
            <SignupForm signupHandler={this.signupHandler}
                emailProps={emailProps}
                passProps={passProps}
                vpassProps={vpassProps}
                isLoading={isLoading}
            />
        )
    }
}

export default Signup;

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

/*
 * withRouter gives us history info in our Signin component's props
 */
import {withRouter} from 'react-router-dom';

import {createCognitoUser, createUserAuthDetails} from '../../libs/user';

class Signin extends Component {
    constructor(props) {
        super(props);
        this.handleUsername = this.handleUsername.bind(this);
        this.handlePassword = this.handlePassword.bind(this);
        this.signinHandler = this.signinHandler.bind(this);
        this.signin = this.signin.bind(this);
        this.state = {
            username: '',
            password: '',
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
            return true;
        }
        return false;
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
        try {
            var signinPromise = this.signin(this.state.username, this.state.password);
            // signin success!
            signinPromise.then((userToken) => {
                this.props.childProps.updateUserToken(userToken);
                // redirect to homepage
                this.props.history.push('/')
            })
            // sign in failure!
            .catch((err) => {
                alert(err);
            });
        }
        catch(err) {
            alert(err);
        }
    }

    /*
     * Signin the user
     */
    signin(username, password) {
        const user = createCognitoUser(username);
        const authDetails = createUserAuthDetails(username, password);

        return new Promise(function(resolve, reject) {
            user.authenticateUser(authDetails, {
                onSuccess: function(result) {
                    resolve(result.getIdToken().getJwtToken());
                },
                onFailure: function(err) {
                    reject(err);
                }
            });
        });
    }
    render() {
        return (
            <div>
                <Form horizontal onSubmit={this.signinHandler}>

                    <FormGroup
                        controlId="formHorizontalEmail"
                        validationState={this.validateUsername()}>
                        <Col componentClass={ControlLabel} sm={2}>
                            Email
                        </Col>
                        <Col sm={10}>
                            <FormControl
                                type="email"
                                value={this.state.username}
                                placeholder="please enter your email"
                                onChange={this.handleUsername}>
                            </FormControl>
                        </Col>
                    </FormGroup>

                    <FormGroup
                        controlId="formHorizontalPassword"
                        validationState={this.validatePassword()}>
                        <Col componentClass={ControlLabel} sm={2}>
                            Password
                        </Col>
                        <Col sm={10}>
                            <FormControl
                                type="password"
                                value={this.state.password}
                                placeholder="please enter your password"
                                onChange={this.handlePassword}>
                            </FormControl>
                        </Col>
                    </FormGroup>

                    <FormGroup>
                        <Col smOffset={2} sm={2}>
                            <Checkbox>Remember me</Checkbox>
                        </Col>
                    </FormGroup>

                    <FormGroup>
                        <Col smOffset={2} sm={1}>
                            <Button
                                type="submit"
                                block
                                disabled={! this.validateForm()}>
                                Sign In
                            </Button>
                        </Col>
                    </FormGroup>
                </Form>
            </div>
        )
    }
}

export default withRouter(Signin);

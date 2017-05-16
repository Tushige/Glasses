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

import {authenticateUser} from '../../libs/user';

class Signin extends Component {
    constructor(props) {
        super(props);
        this.handleUsername = this.handleUsername.bind(this);
        this.handlePassword = this.handlePassword.bind(this);
        this.signinHandler = this.signinHandler.bind(this);
        this.state = {
            username: '',
            password: '',
            isLoading: false,
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
            // sign in failure!
            .catch((err) => {
                console.log("signin failure with error: " + err);
                alert(err);
            });
        }
        catch(err) {
            alert(err);
        }
    }

    render() {
        let isLoading = this.state.isLoading;
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
                        <Col smOffset={2} sm={2}>
                            <Button
                                type="submit"
                                bsStyle="primary"
                                block
                                disabled={!this.validateForm() || isLoading}>
                                {isLoading && <i className="fa fa-circle-o-notch fa-spin fa-fw"></i>}
                                {isLoading?'Signing In':'Sign In'}
                            </Button>
                        </Col>
                    </FormGroup>
                </Form>
            </div>
        )
    }
}

export default withRouter(Signin);

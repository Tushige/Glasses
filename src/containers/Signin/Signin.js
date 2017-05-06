import React, {Component} from 'react';
import config from '../../config.js';
import {
    Form,
    FormGroup,
    FormControl,
    ControlLabel,
    Button,
    Checkbox,
    Col,
} from 'react-bootstrap';
import {
    CognitoUserPool,
    AuthenticationDetails,
    CognitoUser
} from 'amazon-cognito-identity-js';

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
    signinHandler(event) {
        event.preventDefault();
        try {
            var signinPromise = this.signin(this.state.username, this.state.password);
            let userToken;
            signinPromise.then((userToken) => {
                console.log(this.props.route);
                this.props.childProps.updateUserToken(userToken);
                alert(userToken);
            })
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
        const userPool = new CognitoUserPool({
            UserPoolId: config.cognito.USER_POOL_ID,
            ClientId: config.cognito.APP_CLIENT_ID
        });
        const userCredentials = {
            Username: username,
            Password: password
        };
        const user = new CognitoUser({
            Username: username,
            Pool:userPool
        });
        const authDetails = new AuthenticationDetails(userCredentials);
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

export default Signin;

import React, {Component} from 'react';
import {
    Form,
    FormGroup,
    Button,
    Col,
} from 'react-bootstrap';
import FormField from './FormField';

class SignupForm extends Component {
    render() {
        let isLoading = this.props.isLoading;
        return (
            <Form horizontal onSubmit={this.props.signupHandler}>
                <FormField childProps={this.props.emailProps}/>
                <FormField childProps={this.props.passProps}/>
                <FormField childProps={this.props.vpassProps}/>
                <FormGroup>
                    <Col smOffset={2} sm={2}>
                        <Button
                            type="submit"
                            bsStyle="primary"
                            block
                            disabled={isLoading}>
                            {isLoading ? 'Signing up...':'Sign Up'}
                        </Button>
                    </Col>
                </FormGroup>
            </Form>
        )
    }
}
export default SignupForm;

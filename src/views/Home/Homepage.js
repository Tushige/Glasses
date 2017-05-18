/*******************************************************************************
 * This file contains the component that describes the app homepage
 *******************************************************************************/
import React, { Component } from 'react';
import './Homepage.css';
import {Link} from 'react-router-dom';
import {
    Form,
    FormControl,
    FormGroup,
    Button,
    Col,
} from 'react-bootstrap';

function SignupBtn(props) {
    return (
        <Button id="signup-btn"
            type="submit"
            bsStyle="success"
            block>
            <Link to='/signup'>Sign Up for Free</Link>
        </Button>
    )
}
class Homepage extends Component {
    render() {
        return (
            <div id="homepage-body">
                <div id="intro">
                    <h1> Keep your reading list in one place.</h1>
                    <p>Inspiration strikes anywhere. Glasses lets you capture</p>
                    <p>nurture, and share your ideas across any device.</p>
                    <div id="signup-btn-container">
                        <SignupBtn/>
                    </div>
                </div>
            </div>
        )
    }
}

export default Homepage;

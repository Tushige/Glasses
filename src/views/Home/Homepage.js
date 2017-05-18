/*******************************************************************************\
 * @file Homepage.js
 *
 * Contains the component that describes the app homepage for anonymous users
 *******************************************************************************/
import React, { Component } from 'react';
import './Homepage.css';
import {Link} from 'react-router-dom';
import {Button,
} from 'react-bootstrap';

function SignupBtn(props) {
    return (
        <Button id="homepage-signup-btn"
            type="submit"
            bsStyle="success">
            <Link to='/signup'>SIGN UP FOR FREE</Link>
        </Button>
    )
}
class Homepage extends Component {
    render() {
        return (
            <div id="homepage-content">
                <div id="intro">
                    <h1 id=""> Keep your reading list in one place.</h1>
                    <p>Inspiration strikes anywhere. Glasses lets you capture
                    nurture, and share your ideas across any device.</p>
                    <SignupBtn/>
                </div>
            </div>
        )
    }
}

export default Homepage;

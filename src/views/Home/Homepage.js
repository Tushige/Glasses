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
        /**
         * @var auth_user - content shown to signed in user
         */
        const auth_user = null;
        /**
         * @var anon_user - content shown to anonymous user
         */
        const anon_user = (
            <div id="intro">
            <h1 id=""> Keep your reading list in one place.</h1>
            <p>Tired of forgetting where you bookmarked a good read?
            Glasses lets you save all of your readings in one place,
            and access them on any device.</p>
            <SignupBtn/>
            </div>
        );
        const content = this.props.childProps.userToken ? auth_user : anon_user;
        return (
            <div id="homepage-container">
                <div id="homepage-content">
                    {content}
                </div>
                <footer>
                    <span>Made with<i className="fa fa-heart" aria-hidden="true"> </i>
                    by Tushig Ochirkhuyag
                    </span>
                </footer>
            </div>
        )
    }
}

export default Homepage;

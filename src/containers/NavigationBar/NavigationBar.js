/*******************************************************************************
 * This file contains the component that describes the 'navigation bar' that
 * is shared amongst all views
 *******************************************************************************/
import React, { Component } from 'react';
import { Nav, Navbar, NavItem } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Routes from './../../Routes';
import {getSignedInUser} from '../../libs/user';

class NavigationBar extends Component {
    /*
     * It turns out we have to call signOut on the cognitoUser object as specified
     * by amazon-cognito-identity sdk.
     * we also clear the token from the app state.
     */
    signOutHandler() {
        const cognitoUser = getSignedInUser();
        if (cognitoUser) {
            cognitoUser.signOut();
        }
        this.props.updateUserToken(null);
    }

    render() {
        let nav;
        // show SignOut button if user is already logged in
        if (this.props.isSignedin===true) {
            nav = (
                <Nav pullRight>
                    <NavItem href='/' onClick={this.signOutHandler}> Sign Out</NavItem>
                </Nav>
            )
        }
        // if no logged in user, show SignUp and Signin buttons
        else {
            nav = (
                <Nav pullRight>
                    <NavItem>
                        <Link to='/signup'>
                            Sign Up
                        </Link>
                    </NavItem>
                    <NavItem>
                        <Link to='/signin'>
                            Sign In
                        </Link>
                    </NavItem>
                </Nav>
            )
        }
        return (
            <div>
                <Navbar fluid collapseOnSelect>
                    <Navbar.Header>
                        <Navbar.Brand>
                            <Link to="/">Glasses</Link>
                        </Navbar.Brand>
                        <Navbar.Toggle />
                    </Navbar.Header>

                    <Navbar.Collapse>
                        {nav}
                    </Navbar.Collapse>
                </Navbar>
            </div>
        );
    }
}
export default NavigationBar;

/*******************************************************************************
 * This file contains the component that describes the 'navigation bar' that
 * is shared amongst all views
 *******************************************************************************/
import React, { Component } from 'react';
import { Nav, Navbar, NavItem } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Routes from './../../Routes';
import {SignOutBtn, SignInBtn, SignUpBtn} from './NavButtons';

class NavigationBar extends Component {
    render() {
        let nav;
        // show SignOut button if user is already logged in
        if (this.props.isSignedin===true) {
            nav = (
                <Nav pullRight>
                    <SignOutBtn updateUserToken={this.props.updateUserToken}></SignOutBtn>
                </Nav>
            )
        }
        // if no logged in user, show SignUp and Signin buttons
        else {
            nav = (
                <Nav pullRight>
                    <SignUpBtn></SignUpBtn>
                    <SignInBtn></SignInBtn>
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

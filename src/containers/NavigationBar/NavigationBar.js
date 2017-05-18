/*******************************************************************************
 *  @file NavigationBar.js
 *  Contains the component that describes the 'navigation bar' at the top of the
 *  page
 *******************************************************************************/
import React, { Component } from 'react';
import {Nav,
        Navbar,
        NavItem,
} from 'react-bootstrap';
import {Link } from 'react-router-dom';
import {LinkContainer} from 'react-router-bootstrap';
import './NavigationBar.css';

class NavigationBar extends Component {
    render() {
        const signupBtn = (
            <LinkContainer to="/signup" className="navitem">
                <NavItem>
                    Sign Up
                </NavItem>
            </LinkContainer>
        );
        const signinBtn = (
            <LinkContainer to="/signin" className="navitem">
                <NavItem>
                    Sign In
                </NavItem>
            </LinkContainer>
        );
        const nav = (
            <Nav pullRight>
                {signupBtn}
                {signinBtn}
            </Nav>
        );
        const brand = (
            <Link id="brand-title" to="/">
                GLASSES
            </Link>
        );
        return (
            <Navbar fluid collapseOnSelect>
            <Navbar.Header>
                <Navbar.Brand>
                    {brand}
                </Navbar.Brand>
                <Navbar.Toggle />
            </Navbar.Header>

                <Navbar.Collapse>
                    {nav}
                </Navbar.Collapse>
            </Navbar>
        );
    }
}
export default NavigationBar;

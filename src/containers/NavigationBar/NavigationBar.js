/*******************************************************************************
 * This file contains the component that describes the 'navigation bar' that
 * is shared amongst all views
 *******************************************************************************/
import React, { Component } from 'react';
import { Nav, Navbar, NavItem } from 'react-bootstrap';
import { Link } from 'react-router-dom';

class NavigationBar extends Component {
    render() {
        let nav = (
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
        );
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

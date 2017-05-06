import React, { Component } from 'react';
import { Nav, Navbar, NavItem } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Routes from './../../Routes';

function SignUpBtn() {
    return (
        <NavItem href="/signup"> Sign Up</NavItem>
    )
}
function SignInBtn() {
    return (
        <NavItem href="/signin"> Sign In</NavItem>
    )
}
class NavigationBar extends Component {
    render() {
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
                        <Nav pullRight>
                            <SignUpBtn></SignUpBtn>
                            <SignInBtn></SignInBtn>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </div>
        );
    }
}
export default NavigationBar;

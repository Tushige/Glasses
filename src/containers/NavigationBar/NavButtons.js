/*******************************************************************************
 * This file contains components that describe buttons that are displayed
 * on the navigation bar
 *******************************************************************************/
import React, { Component } from 'react';
import { Nav, Navbar, NavItem } from 'react-bootstrap';

export function SignUpBtn() {
    return (
        <NavItem href="/signup"> Sign Up</NavItem>
    )
}

export function SignInBtn() {
    return (
        <NavItem href="/signin"> Sign In</NavItem>
    )
}

export function SignOutBtn() {
    return (
        <NavItem href='/'> Sign Out</NavItem>
    )
}
/*
 * This function is called when user presses on the 'Sign Out' button
 * It does the following:
 *  1. clears user session
 *  2. redirects to the homepage
 */
function SignOutHandler(props) {
    props.updateUserToken(null);
}

/*******************************************************************************
 * This file contains the component that describes the sidebar that users see
 * when they sign in
 *******************************************************************************/
import React, { Component } from 'react';
import './sidebar.css';
import { Link } from 'react-router-dom';
import {Nav,
        Navbar,
        Button,
        NavItem } from 'react-bootstrap';
import {getSignedInUser} from '../../libs/user';

const defaultStyles = {
    sidebar_closed: {
        sidebar: {
            height:'100%',
            width:'0px',
            position:'fixed',
            zIndex:1,
            top:0,
            left:0,
            background:'#111',
            overflowX:'hidden',
            transition:'0.5s'
        },
        sidebarToggler: {
            left:0,
        },
    },
    sidebar_open: {
        sidebar: {
            height:'100%',
            width:'250px',
            position:'fixed',
            zIndex:1,
            top:0,
            left:0,
            background:'#111',
            overflowX:'hidden',
            transition:'0.5s'
        },
        sidebarToggler: {
            left: 250,
        },
    },
};

class Sidebar extends Component {
    constructor(props) {
        super(props);
        this.sidebarToggleHandler = this.sidebarToggleHandler.bind(this);
        this.signOutHandler = this.signOutHandler.bind(this);
        this.state = {
            isOpen: false,
            sidebar_style: defaultStyles.sidebar_closed.sidebar,
            sidebarToggler_style: defaultStyles.sidebar_closed.sidebarToggler,
        }
    }
    /*
     * It turns out we have to call signOut on the cognitoUser object as specified
     * by amazon-cognito-identity sdk.
     * we also clear the token from the app state.
     */
    signOutHandler(event) {
        event.preventDefault();
        const cognitoUser = getSignedInUser();
        if (cognitoUser) {
            cognitoUser.signOut();
        }
        // clear the token that we get on sign in
        this.props.updateUserToken(null);
    }
    /*
     * shows/hides the sidebar
     */
    sidebarToggleHandler() {
        let sidenav = this.refs.sidenav;
        // if open -> close
        if (this.state.isOpen) {
            this.state.sidebar_style = defaultStyles.sidebar_closed.sidebar;
            this.state.sidebarToggler_style = defaultStyles.sidebar_closed.sidebarToggler;
        }
        // if closed -> open
        else {
            this.state.sidebar_style = defaultStyles.sidebar_open.sidebar;
            this.state.sidebarToggler_style = defaultStyles.sidebar_open.sidebarToggler;
        }
        // update the change in the state
        this.setState({
            isOpen: ~this.state.isOpen,
        });
    }
    render() {
        return (
            <div className="userHomepage">
                <div ref="sidenav" style={this.state.sidebar_style}>
                    <h2 id="sidebar-title">Glasses</h2>
                    <Link to='/' className="linkItems">Home</Link>
                    <Link to='/' className="linkItems">Reading</Link>
                    <Link to='/' className="linkItems" onClick={this.signOutHandler}>Sign Out</Link>
                </div>
                <Button id="sidebar-toggle-btn"
                    style={this.state.sidebarToggler_style}
                    onClick={this.sidebarToggleHandler}
                >
                {this.state.isOpen?'X':'☰'}
                </Button>
            </div>
        )
    }
}

export default Sidebar;

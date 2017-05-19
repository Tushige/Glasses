/*******************************************************************************
 *  @file Sidebar.js
 *
 * Contains the component that describes the sidebar that signed in users see
 *******************************************************************************/
import React, { Component } from 'react';
import './sidebar.css';
import {Link,
        withRouter,
} from 'react-router-dom';
import {getSignedInUser} from '../../libs/user';
import AWS from 'aws-sdk';

/**
 *  @var sidebarStyles
 *      style that for sidebar that allows it so open/close
 *  @prop sidebar_closed: style for closed sidebar
 *  @prop sidebar_open: style for open sidebar
 */
const sidebarStyles = {
    sidebar_closed: {
        sidebar: {
            width:'0px',
        },
        sidebarToggler: {
            left:0,
        },
    },
    sidebar_open: {
        sidebar: {
            width:'250px',
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

        /**
         *  @prop isOpen {Boolean} - indicates if sidebar is open or not
         *  @prop sidebar_style {Object} - sidebar style depends on the isOpen state
         *  @prop sidebarToggler_style {Object} - style for the button to open/close
         */
        this.state = {
            isOpen: false,
            sidebar_style: sidebarStyles.sidebar_closed.sidebar,
            sidebarToggler_style: sidebarStyles.sidebar_closed.sidebarToggler,
        }
    }
    /**
     * @function - signs the user out by doing 3 things
     *  1.  call signOut on the current CongitoUser object
     *  2.  clear global credentials cache
     *  3.  clear userToken from the app
     */
    signOutHandler(event) {
        event.preventDefault();
        // 1
        const cognitoUser = getSignedInUser();
        if (cognitoUser) {
            cognitoUser.signOut();
        }
        // 2
        if (AWS.config.credentials) {
            AWS.config.credentials.clearCacheId();
        }
        // 3
        this.props.updateUserToken(null);
        // redirect to homepage
        this.props.history.push('/');
    }

    /**
     * @function - opens / closes the sidebar on clicks
     */
    sidebarToggleHandler() {
        if (this.state.isOpen) {    // if open -> close
            this.setState({
                sidebar_style: sidebarStyles.sidebar_closed.sidebar,
                sidebarToggler_style:sidebarStyles.sidebar_closed.sidebarToggler,
            });
        }
        else {  // if closed -> open
            this.setState({
                sidebar_style:sidebarStyles.sidebar_open.sidebar,
                sidebarToggler_style: sidebarStyles.sidebar_open.sidebarToggler,
            });
        }
        this.setState({ // update the change in the state
            isOpen: ~this.state.isOpen,
        });
    }

    render() {
        let navBtn;
        const btnOpen = (
            <i className="fa fa-bars fa-3x"
               aria-hidden="true"
               id="btnOpen"
               style={this.state.sidebarToggler_style}
               onClick={this.sidebarToggleHandler}>
            </i>
        )
        const btnClose = (
            <i className="fa fa-bars fa-rotate-90 fa-3x"
               aria-hidden="true"
               id="btnClose"
               style={this.state.sidebarToggler_style}
               onClick={this.sidebarToggleHandler}>
            </i>
        )
        navBtn = this.state.isOpen ? btnClose : btnOpen;
        const brand = (
            <div>
                <h2 id="sidebar-title">
                    Glasses
                </h2>
                <hr/>
            </div>
        );
        const home = (
            <Link to='/' className="linkItems">
                <i className="fa fa-home" aria-hidden="true"></i>
                <span>
                    Home
                </span>
            </Link>
        );
        const addReading = (
            <Link to='/newreading' className="linkItems">
                <i className="fa fa-plus-square" aria-hidden="true"></i>
                <span>
                    Add a reading
                </span>
            </Link>
        );
        const readings = (
            <Link to='/readings' className="linkItems">
                <i className="fa fa-book" aria-hidden="true"></i>
                <span>
                    Readings
                </span>
            </Link>
        );
        const signOut = (
            <Link to='/' className="linkItems" onClick={this.signOutHandler}>
                <i className="fa fa-power-off" aria-hidden="true"></i>
                <span>
                    Sign Out
                </span>
            </Link>
        );

        return (
            <div className="userHomepage">
                <div id="sidebar" style={this.state.sidebar_style}>
                    {brand}
                    {home}
                    {addReading}
                    {readings}
                    {signOut}
                </div>
                {navBtn}
            </div>
        )
    }
}

export default withRouter(Sidebar);

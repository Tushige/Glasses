/*******************************************************************************
 * This file contains the component that describes the app homepage
 *******************************************************************************/
import React, { Component } from 'react';
import './Homepage.css';
import { Link } from 'react-router-dom';
import {Nav,
        Navbar,
        Button,
        NavItem } from 'react-bootstrap';
const defaultStyles = {
    sidebar_closed: {
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
    sidebar_open: {
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
};
class Homepage extends Component {
    constructor(props) {
        super(props);
        this.sidebarToggleHandler = this.sidebarToggleHandler.bind(this);
        this.state = {
            isOpen: false,
            style: defaultStyles.sidebar_closed,
        }
    }
    /*
     * shows/hides the sidebar
     */
    sidebarToggleHandler() {
        let sidenav = this.refs.sidenav;
        // if open -> close
        if (this.state.isOpen) {
            this.state.style = defaultStyles.sidebar_closed;
        }
        // if closed -> open
        else {
            this.state.style = defaultStyles.sidebar_open;
        }
        // update the change in the state
        this.setState({
            isOpen: ~this.state.isOpen,
        });
    }
    render() {
        let isSignedin = this.props.childProps.isSignedin;
        // default view: user not signed in
        let page = (
            <div>
                <h1>Glasses</h1>
                <p> Store your reading list in one place</p>
            </div>
        );
        // if user signed in -> show custom page
        if (isSignedin === true) {
            page = (
                <div className="userHomepage">
                    <div ref="sidenav" style={this.state.style}>
                        <h2 id="sidebar-title">Glasses</h2>
                        <Link to='/' className="linkItems">Home</Link>
                        <Link to='/' className="linkItems">Reading</Link>
                        <Link to='/' className="linkItems">Sign Out</Link>
                    </div>
                    <Button
                        onClick={this.sidebarToggleHandler}
                    >
                    {this.state.isOpen?'Close':'Open'}
                    </Button>
                </div>
            )
        }
        return (
            <div className="Homepage">
                {page}
            </div>
        )
    }
}

export default Homepage;

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
        
class Homepage extends Component {
    render() {
        return (
            <div>
                <h1>Glasses</h1>
                <p> Store your reading list in one place</p>
            </div>
        )
    }
}

export default Homepage;

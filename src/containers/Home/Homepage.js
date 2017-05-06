/*******************************************************************************
 * This file contains the component that describes the app homepage
 *******************************************************************************/
import React, { Component } from 'react';
import './Homepage.css';

class Homepage extends Component {
    render() {
        return (
            <div className="Homepage">
                <h1>Glasses</h1>
                <p>Store your reading list in one place</p>
            </div>
        )
    }
}

export default Homepage;

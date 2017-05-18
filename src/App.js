/*******************************************************************************
 *  @file App.js
 *
 *  This file contains the root component of the application
 *******************************************************************************/
import React, { Component } from 'react';
import NavigationBar from './containers/NavigationBar/NavigationBar';
import './App.css';
import Routes from './Routes';
import {getUserToken} from './libs/user';
import Sidebar from './containers/sidebar/Sidebar';

class App extends Component {
    constructor(props) {
        super(props);

        this.updateUserToken = this.updateUserToken.bind(this);

        /**
         * @prop isLoadingUserToken {Bool}
         *      true: page is retrieving user token, don't render content
         *      false: page is ready, render content
         * @prop userToken {String}
         *      token Id for the currently signed in user
         */
        this.state = {
            isLoadingUserToken: true,
            userToken: null,
        };
    }

    /**
     * updates the token associated with the signed in user
     * this method is passed to children to let them modify userToken
     */
    updateUserToken(token) {
        this.setState({
            userToken: token
        });
    }

    /**
     * On page load, check if there is a signed in user
     * If there is: save user token in state
     */
    componentWillMount() {
        const getUserTokenPromise = getUserToken();
        getUserTokenPromise.then((userToken) => {
            if (userToken) { // user present
                this.setState({
                    isLoadingUserToken:false,
                    userToken:userToken,
                });
            }
            else { // no user
                this.setState({
                    isLoadingUserToken:false,
                    userToken:null,
                });
            }
        })
        .catch((err) => {
            alert(err);
        });
    }

    render() {
        /* display loading bar while page checks for signed in user*/
        if (this.state.isLoadingUserToken) {
            return (
                <i id="page-loading-bar" className="fa fa-refresh fa-spin fa-3x fa-fw" aria-hidden="true"></i>
            )
        }
        let isSignedin = this.state.userToken ? true : false;
        let navigation = null;

        const topBar = (
            <NavigationBar
                isSignedin={isSignedin}
                updateToken={this.updateUserToken}>
            </NavigationBar>
        );
        const sideBar = (
            <Sidebar
                updateUserToken={this.updateUserToken}>
            </Sidebar>
        );
        // display sideBar if user present, else display top navigation bar
        navigation = isSignedin ? sideBar : topBar;

        const childProps = {
            isSignedin: isSignedin,
            userToken: this.state.userToken,
            updateUserToken: this.updateUserToken,
        };
        /**
         * @var appContainer - Main content
         */
        const appContainer = (
            <div>
                {navigation}
                <Routes childProps={childProps}/>
            </div>
        );
        return (
            <div className="App">
                {appContainer}
            </div>
    );
  }
}

export default App;

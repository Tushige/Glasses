/*******************************************************************************
 * This file contains the root component of our application
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
        // needs to bind 'this' to App in order to access App's state from elsewhere
        this.updateUserToken = this.updateUserToken.bind(this);
        this.state = {
            isLoadingUserToken: true,
            userToken: null,
        };
    }

    /*
     * updates the token associated with the signed in user
     * set to null on sign out
     */
    updateUserToken(token) {
        this.setState({
            userToken: token
        });
    }

    /*
     * On page load, check if there is a signed in user
     * If there is: save user token in state
     */
    componentWillMount() {
        const getUserTokenPromise = getUserToken();
        getUserTokenPromise.then((userToken) => {
            // signed in user present
            if (userToken) {
                // there is an existing signed in user
                this.setState({
                    isLoadingUserToken:false,
                    userToken:userToken,
                });
            }
            // no signed in user present
            else {
                this.setState({
                    isLoadingUserToken:false,
                    userToken:null,
                });
            }
        })
        .catch((err) => {
            // get session failed
            console.log(err);
        });
    }

    render() {
        let appContainer = null;
        if (!this.state.isLoadingUserToken) {
            let isSignedin = true;
            if (this.state.userToken === null || this.state.userToken === undefined) {
                isSignedin = false;
            }
            const childProps = {
                isSignedin: isSignedin,
                userToken: this.state.userToken,
                updateUserToken: this.updateUserToken,
            };
            let navigation = (
                <NavigationBar
                    isSignedin={isSignedin}
                    updateToken={this.updateUserToken}>
                </NavigationBar>
            );
            if (isSignedin) {
                navigation = (
                    <Sidebar
                        updateUserToken={this.updateUserToken}>
                    </Sidebar>
                )
            }
            // render page only when we have determined whether
            // there is a signed in user or not
            appContainer = (
                <div className="App container">
                    {navigation}
                    <Routes childProps={childProps}/>
                </div>
            )
        }
        return (
            <div>
                {appContainer}
            </div>
    );
  }
}

export default App;

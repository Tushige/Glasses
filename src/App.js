import React, { Component } from 'react';
import NavigationBar from './containers/NavigationBar/NavigationBar';
import './App.css';
import Routes from './Routes';
class App extends Component {
    constructor(props) {
        super(props);
        // needs to bind 'this' to App in order to access App's state from elsewhere
        this.updateUserToken = this.updateUserToken.bind(this);
        this.state = {
            userToken: null,
        };
    }
    updateUserToken(token) {
        this.setState({userToken: token});
    }
    render() {
        const childProps = {
            userToken: this.state.userToken,
            updateUserToken: this.updateUserToken,
        };
        return (
            <div className="App container">
                <NavigationBar>
                </NavigationBar>
                <Routes childProps={childProps}/>
            </div>
    );
  }
}

export default App;

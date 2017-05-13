/*******************************************************************************
 * This file contains the component that is responsible for routing urls to views
 *******************************************************************************/
import React, { Component } from 'react';
import {Route, Switch} from 'react-router-dom';

import Homepage from './containers/Home/Homepage';
import Signup from './containers/Signup/Signup';
import Signin from './containers/Signin/Signin';
import NewReading from './containers/NewReading/NewReading';
import Error404 from './containers/errors/Error404';

export default class Routes extends Component {
    render() {
        return (
            <Switch>
                <Route path='/' exact render={() => <Homepage childProps={this.props.childProps}/>}/>
                <Route path='/signup' exact render={() => <Signup childProps={this.props.childProps}/>}/>
                <Route path='/signin' exact render={() => <Signin childProps={this.props.childProps}/>}/>
                <Route path='/newreading' exact render={() => <NewReading childProps={this.props.childProps}/>}/>
                <Route component={Error404} />
            </Switch>
        )
    }
}

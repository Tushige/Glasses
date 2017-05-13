/*******************************************************************************
 * This file contains the component that is responsible for routing urls to views
 *******************************************************************************/
import React, { Component } from 'react';
import {Route, Switch} from 'react-router-dom';

import Homepage from './views/Home/Homepage';
import Signup from './views/Signup/Signup';
import Signin from './views/Signin/Signin';
import NewReading from './views/NewReading/NewReading';
import Error404 from './views/errors/Error404';

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

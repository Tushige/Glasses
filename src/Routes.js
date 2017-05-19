/*******************************************************************************\
 *  @file Route.js
 *
 *  Contains the component that is responsible for routing urls to views
 *******************************************************************************/
import React, { Component } from 'react';
import {Route,
        Switch,
        withRouter,
        Redirect,
} from 'react-router-dom';

import Homepage from './views/Home/Homepage';
import Signup from './views/Signup/Signup';
import Signin from './views/Signin/Signin';
import NewReading from './views/NewReading/NewReading';
import Error404 from './views/errors/Error404';
import Readings from './views/Readings/Readings';
import Reading from './views/Readings/Reading';

function Routes(props) {
    /* urls that only signed in users can access */
    const urlsForAuth = (
        <Switch>
            <Route path='/' exact render={() => <Homepage childProps={props.childProps}/>}/>
            <Route path='/newreading' exact render={() => <NewReading childProps={props.childProps}/>}/>
            <Route path='/readings' exact render={() => <Readings childProps={props.childProps}/>}/>
            <Route path='/reading/:id' exact render={() => <Reading childProps={props.childProps}/>}/>
            <Route component={Error404} />
        </Switch>
    );
    /* urls that only anonymous users can access */
    const urlsForAnon = (
        <Switch>
            <Route path='/' exact render={() => <Homepage childProps={props.childProps}/>}/>
            <Route path='/signup' exact render={() => <Signup childProps={props.childProps}/>}/>
            <Route path='/signin' exact render={() => <Signin childProps={props.childProps}/>}/>
            <Route component={Error404} />
        </Switch>
    );
    return (
        <div>
            {props.childProps.userToken? urlsForAuth:urlsForAnon}
        </div>
    )
}

export default withRouter(Routes);

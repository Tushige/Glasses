import React, { Component } from 'react';
import {Route, Switch} from 'react-router-dom';

import Homepage from './containers/Home/Homepage';
import Signup from './containers/Signup/Signup';
import Signin from './containers/Signin/Signin';
import Error404 from './containers/errors/Error404';

export default class Routes extends Component {
    render() {
        return (
            <Switch>
                <Route path='/' exact component={Homepage} />
                <Route path='/signup' exact component={Signup}/>
                <Route path='/signin' exact component={Signin}/>
                <Route component={Error404} />
            </Switch>
        )
    }
}

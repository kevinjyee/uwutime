import React from 'react'
import {
    BrowserRouter as Router,
    Route,
    Switch
} from 'react-router-dom'

import { App, SchedulerContainer, AdministrationContainer } from './app';

import { Provider } from 'react-redux';
import store from './store'

const AppRoute = (props) => (
    <Provider store={store}>
    <Router>
        <div>
            <Switch>
                <Route path='/scheduler' component={SchedulerContainer}/>
                <Route path='/administration' component={AdministrationContainer }/>
            </Switch>
        </div>
    </Router>
    </Provider>
)
export default AppRoute;
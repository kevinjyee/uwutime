import React from 'react'
import {
    BrowserRouter as Router,
    Route,
    Switch
} from 'react-router-dom'

import ScheduleRequests from './schedule_requests';
import App from './app';

import Products from './products'

import Scheduler from './scheduler'

import { Provider } from 'react-redux';
import store from './store'

const AppRoute = (props) => (
    <Provider store={store}>
    <Router>
        <div>
            <Switch>
                <Route path='/scheduler' component={Scheduler}/>
                <Route path='/' component={App}/>
            </Switch>
        </div>
    </Router>
    </Provider>
)
export default AppRoute;
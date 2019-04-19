import React from 'react'
import {
    BrowserRouter as Router,
    Route
} from 'react-router-dom'

import ScheduleRequests from './schedule_requests';
import App from './app';

import Products from './products'

import { Provider } from 'react-redux';
import store from './store'

const AppRoute = (props) => (
    <Provider store={store}>
    <Router>
        <div>
            <Route path='/' component={App}/>
            <Route path='/products' component={Products}/>
        </div>
    </Router>
    </Provider>
)
export default AppRoute;
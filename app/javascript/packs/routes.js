import React from 'react'
import {
    BrowserRouter as Router,
    Route
} from 'react-router-dom'

import { IndexRoute, browserHistory } from 'react-router'

import ScheduleRequests from './schedule_requests';
import Products from './products'

const App = (props) => (
    <Router history = {browserHistory}>
        <div>
            <Route path='/' component={ScheduleRequests}/>
            <Route path='/products' component={Products}/>
        </div>
    </Router>
)
export default App;
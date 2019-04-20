import React from 'react'
import {
    BrowserRouter as Router,
    Route,
    Switch
} from 'react-router-dom'

import App from './app';
import Scheduler from './components/scheduler'

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
import React from 'react'
import {
    BrowserRouter as Router,
    Route,
    Switch
} from 'react-router-dom'

import { App, SchedulerContainer,
    AdministrationContainer,
    AdministrationProfilesContainer,
    ScheduleProfileContainer,
    RecipesContainer

} from './app';

import { Provider } from 'react-redux';
import store from './store'

const AppRoute = (props) => (
    <Provider store={store}>
    <Router>
        <div>
            <Switch>
                <Route path='/administration/profile/:id' component={ScheduleProfileContainer}/>
                <Route path='/administration/profiles' component={AdministrationProfilesContainer}/>
                <Route path='/administration/vessels' component={AdministrationContainer}/>
                <Route path='/administration' component={AdministrationContainer }/>
                <Route path='/recipe_list' component={RecipesContainer}/>
                <Route path='/scheduler' component={SchedulerContainer}/>
                <Route path='/' component={SchedulerContainer}/>
            </Switch>
        </div>
    </Router>
    </Provider>
)
export default AppRoute;
import{ combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import schedule_requests from './schedule_requests';
import vessels from './vessels';
import schedule_profiles from './schedule_profiles'
import schedule_profile from './schedule_profile'

const rootReducer = combineReducers({ schedule_requests,
    vessels, schedule_profiles, schedule_profile, routing: routerReducer});

export default rootReducer;

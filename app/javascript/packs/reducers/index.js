import{ combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import schedule_requests from './schedule_requests';
import vessels from './vessels';
import schedule_profiles from './schedule_profiles'

const rootReducer = combineReducers({ schedule_requests, vessels, schedule_profiles, routing: routerReducer});

export default rootReducer;

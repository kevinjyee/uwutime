import{ combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import schedule_requests from './schedule_requests';
import vessels from './vessels';

const rootReducer = combineReducers({ schedule_requests, vessels, routing: routerReducer});

export default rootReducer;

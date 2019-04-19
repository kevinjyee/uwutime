import{ combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import schedule_requests from './schedule_requests';

const rootReducer = combineReducers({ schedule_requests, routing: routerReducer});

export default rootReducer;

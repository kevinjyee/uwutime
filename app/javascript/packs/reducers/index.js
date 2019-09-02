import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import schedule_requests from './schedule_requests';
import vessels from './vessels';
import schedule_profiles from './schedule_profiles';
import schedule_profile from './schedule_profile';
import recipes from './recipes';
import recipe from './recipe';
import recipe_fermentables from './recipe_fermentables';
import recipe_events from './recipe_events';


const rootReducer = combineReducers({
 schedule_requests,
    vessels,
schedule_profiles,
schedule_profile,
recipes,
recipe,
    recipe_events,
recipe_fermentables,
routing: routerReducer,
});

export default rootReducer;

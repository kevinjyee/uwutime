import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from './actions/actionCreators';

import ScheduleRequests from './components/schedule_requests';
import Scheduler from './components/scheduler';
import Administration from './components/administration';
import AdministrationProfile from './components/administration_profiles';
import ScheduleProfile from './components/schedule_profile';
import Recipes from './components/recipes';

function mapStateToProps(state) {
    return {
        schedule_requests: state.schedule_requests,
        vessels: state.vessels,
        schedule_profiles: state.schedule_profiles,
        schedule_profile: state.schedule_profile,
        recipes: state.recipes,
        recipe: state.recipe,
        recipe_events: state.recipe_events,
        recipe_fermentables: state.recipe_fermentables,

    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(actionCreators, dispatch);
}

export const App = connect(mapStateToProps, mapDispatchToProps)(ScheduleRequests);
export const SchedulerContainer = connect(mapStateToProps, mapDispatchToProps)(Scheduler);
export const AdministrationContainer = connect(mapStateToProps, mapDispatchToProps)(Administration);
export const AdministrationProfilesContainer = connect(mapStateToProps, mapDispatchToProps)(AdministrationProfile);
export const ScheduleProfileContainer = connect(mapStateToProps, mapDispatchToProps)(ScheduleProfile);
export const RecipesContainer = connect(mapStateToProps, mapDispatchToProps)(Recipes);
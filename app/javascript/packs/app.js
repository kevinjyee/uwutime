import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from './actions/actionCreators';

import ScheduleRequests from './components/schedule_requests';
import Scheduler from './components/scheduler'


function mapStateToProps(state) {
    return {
        schedule_requests: state.schedule_requests,
        vessels: state.vessels
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(actionCreators, dispatch);
}

export const App = connect(mapStateToProps, mapDispatchToProps)(ScheduleRequests);
export const SchedulerContainer = connect(mapStateToProps, mapDispatchToProps)(Scheduler);
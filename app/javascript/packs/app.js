import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from './actions/actionCreators';

import ScheduleRequests from './components/schedule_requests';



function mapStateToProps(state) {
    return {
        schedule_requests: state.schedule_requests
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(actionCreators, dispatch);
}

const App = connect(mapStateToProps, mapDispatchToProps)(ScheduleRequests);

export default App;
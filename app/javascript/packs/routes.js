import React from 'react'
import {
    BrowserRouter as Router,
    Route,
} from 'react-router-dom'
import ScheduleRequests from './schedule_requests';

const App = (props) => (
    <Router>
        <div>
            <Route exact path='/' component={ScheduleRequests} />
        </div>
    </Router>
)
export default App;
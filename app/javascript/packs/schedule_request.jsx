import React from 'react';
import moment from 'moment'
export default class ScheduleRequest extends React.Component{
    render() {
        return (
            <div>
                <h3>{this.props.schedule_request.product_name}</h3>
                <p>{moment(this.props.schedule_request.requested_preferred_date).format('MMMM DD YYYY')}</p>
            </div>
        )
    }
};
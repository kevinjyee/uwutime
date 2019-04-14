import React from 'react';
import ScheduleRequest from './schedule_request'
import moment from "moment/moment";


const columns = [{
    title: 'Identifier',
    dataIndex: 'identifier',
    key: 'identifier',
    render: text => <a href="javascript:;">{text}</a>,
},{
    title: 'Product Name',
    dataIndex: 'product_name',
    key: 'product_name',
}, {
    title: 'Run Quantity',
    dataIndex: 'run_quantity',
    key: 'run_quantity',
}, {
    title: 'Preferred Run Date',
    dataIndex: 'requested_preferred_date',
    key: 'requested_preferred_date',
},{
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
}];

export default class ScheduleRequestsList extends React.Component{


    constructor(props) {
        super(props);
        this.state = {
            schedule_requests: this.props.schedule_requests,
            status: this.props.scheduled
           };
        this.filterForStatus  = this.filterForStatus.bind(this)
    }

    filterForStatus(status) {

        var schedule_to_list = []

        this.state.schedule_requests.forEach((r) => {
            if (r.scheduled == status) {
                r['identifier'] =  `${r['product_name']}-${r['id']}`
                schedule_to_list.push(r)
            }
        });
        return schedule_to_list
    }

    componentDidMount() {
        console.log("fired");
    }

    render() {

        schedule_to_list = this.filterForStatus(this.state.status)

        return (
            <div>
                {this.props.schedule_requests.map(function(schedule_request) {
                    return (
                        <ScheduleRequest schedule_request={schedule_request}
                                         key={schedule_request.id}/>
                    )
                })}
            </div>
        )
    }
}
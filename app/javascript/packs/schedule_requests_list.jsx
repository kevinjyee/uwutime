import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import { Table, Divider, Tag } from 'antd';
import '../../assets/stylesheets/schedule_request_list.scss'

const columns = [{
    title: 'Identifier',
    dataIndex: 'identifier',
    key: 'identifier',
    render: text => <a href="javascript:;">{text}</a>,
    width: 300,
},{
    title: 'Product Name',
    dataIndex: 'product_name',
    key: 'product_name',
    width: 300,
}, {
    title: 'Run Quantity',
    dataIndex: 'run_quantity',
    key: 'run_quantity',
    width: 300,
}, {
    title: 'Preferred Run Date',
    dataIndex: 'requested_preferred_date',
    key: 'requested_preferred_date',
    width: 300,
},{
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    width: 300,
}];

export default class ScheduleRequestsList extends React.Component{


    constructor(props) {
        super(props);
        this.state = {
            schedule_requests: this.props.schedule_requests,
            status: this.props.status
           };
        this.filterForStatus  = this.filterForStatus.bind(this);
        this.computedTitle = this.computedTitle.bind(this);
    }

    componentDidUpdate() {
        // Typical usage (don't forget to compare props):
        if (this.state.schedule_requests !== this.props.schedule_requests) {
            this.setState({schedule_requests: this.props.schedule_requests});
        }
    }

    filterForStatus(status) {

        var schedule_to_list = []

        this.props.schedule_requests.forEach((r) => {
            if (r.scheduled == status) {
                r['identifier'] =  `${r['product_name']}-${r['id']}`
                schedule_to_list.push(r)
            }
        });
        return schedule_to_list
    }

    computedTitle(status) {
        if (status == true) {
            return 'Scheduled'
        }
        else
        {
            return 'Not Scheduled'
        }
    }

    componentDidMount() {
        console.log("fired");
    }

    render() {

        var data = this.filterForStatus(this.state.status);
        var computedTitle = this.computedTitle(this.state.status);

        return (
            <div className="schedule_request_list">
                <div className="title"><h4>{computedTitle}</h4></div>
                <Table pagination={{ pageSize: 8 }} columns={columns} dataSource={data} scroll={{ y: 400 }} />
            </div>
        )
    }
}
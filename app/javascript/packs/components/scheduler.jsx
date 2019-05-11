import React from 'react';
import moment from 'moment';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css'
import '../../../assets/stylesheets/schedule_requests.scss'

import '../../../assets/stylesheets/index.scss'
import 'antd/dist/antd.css';
import DragAndDrop from './DragAndDrop'
import {
    Layout, Icon, message, Spin
} from 'antd';


import NavBar from './navbar'

var $ = require('jquery')


const success = () => {
    message.success('Request successfully submitted');
};

export default class Scheduler extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            input_product_name: 'test',
            input_preferred_date: moment().toDate(),
            open: true,
            show_form: false,
            isLoading: true,
        };
    }

    componentDidMount() {
        this.props.fetchScheduleRequests();
        this.props.fetchVessels();
    }

    render() {

        if (this.props.vessels.isLoading == false && this.props.schedule_requests.isLoading == false) return (
            <div>
                <NavBar currentPage="1"/>
                <div className='layout' style={{marginTop: '40px'}}>

                    <DragAndDrop
                        schedule_requests={this.props.schedule_requests.payload}
                        resources={this.props.vessels.payload}
                        addScheduleRequests={this.props.addScheduleRequests}
                        publishSchedule={this.props.publishSchedule}
                        removeSchedule={this.props.removeSchedule}
                        deleteTask={this.props.deleteTask}
                    />

                </div>
            </div>
        )
        return (
            <div className="spinner">
                <NavBar currentPage="1"/>
                <Spin/>
            </div>
        )
    }
}
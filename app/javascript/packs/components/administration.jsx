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

import AdminSubMenu from './adminsubmenu'

import NavBar from './navbar'

var $ = require('jquery')


const success = () => {
    message.success('Request successfully submitted');
};

export default class Scheduler extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            vessels: []
        };
    }

    componentDidMount() {
        this.props.fetchScheduleRequests();
        this.props.fetchVessels();
    }

    render() {

        return (
            <div>
                <NavBar currentState ="4"/>
                <AdminSubMenu currentState= "1"/>
            </div>

        )
    }
}
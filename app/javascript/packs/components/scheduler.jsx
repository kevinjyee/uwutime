import React from 'react';
import moment from 'moment';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css'
import '../../../assets/stylesheets/schedule_requests.scss'

import '../../../assets/stylesheets/index.scss'
import 'antd/dist/antd.css';
import logo from '../../../assets/images/uwu.jpg'
import antlogo from '../../../assets/images/antlogo.svg'
import antdesign from '../../../assets/images/antdesign.svg'
import Basic from './Basic'
import DragAndDrop from './DragAndDrop'
import {
    Layout, Menu, Button, Modal,
    Select, InputNumber, Form, PageHeader,
    Input, DatePicker, Icon, message, Spin
} from 'antd';

import { Link } from 'react-router-dom';

const {Header, Content, Footer} = Layout;

var $ = require('jquery')

const PandaSvg = () => (
    <svg viewBox="0 0 1024 1024" width="1em" height="1em" fill="currentColor">
        <path
            d="M99.096 315.634s-82.58-64.032-82.58-132.13c0-66.064 33.032-165.162 148.646-148.646 83.37 11.91 99.096 165.162 99.096 165.162l-165.162 115.614zM924.906 315.634s82.58-64.032 82.58-132.13c0-66.064-33.032-165.162-148.646-148.646-83.37 11.91-99.096 165.162-99.096 165.162l165.162 115.614z"
            fill="#6B676E" p-id="1143"/>
        <path
            d="M1024 561.548c0 264.526-229.23 429.42-512.002 429.42S0 826.076 0 561.548 283.96 66.064 512.002 66.064 1024 297.022 1024 561.548z"
            fill="#FFEBD2" p-id="1144"/>
        <path
            d="M330.324 842.126c0 82.096 81.34 148.646 181.678 148.646s181.678-66.55 181.678-148.646H330.324z"
            fill="#E9D7C3" p-id="1145"/>
        <path
            d="M644.13 611.098C594.582 528.516 561.55 512 512.002 512c-49.548 0-82.58 16.516-132.13 99.096-42.488 70.814-78.73 211.264-49.548 247.742 66.064 82.58 165.162 33.032 181.678 33.032 16.516 0 115.614 49.548 181.678-33.032 29.18-36.476-7.064-176.93-49.55-247.74z"
            fill="#FFFFFF" p-id="1146"/>
        <path
            d="M611.098 495.484c0-45.608 36.974-82.58 82.58-82.58 49.548 0 198.194 99.098 198.194 165.162s-79.934 144.904-148.646 99.096c-49.548-33.032-132.128-148.646-132.128-181.678zM412.904 495.484c0-45.608-36.974-82.58-82.58-82.58-49.548 0-198.194 99.098-198.194 165.162s79.934 144.904 148.646 99.096c49.548-33.032 132.128-148.646 132.128-181.678z"
            fill="#6B676E" p-id="1147"/>
        <path
            d="M512.002 726.622c-30.06 0-115.614 5.668-115.614 33.032 0 49.638 105.484 85.24 115.614 82.58 10.128 2.66 115.614-32.944 115.614-82.58-0.002-27.366-85.556-33.032-115.614-33.032z"
            fill="#464655" p-id="1148"/>
        <path
            d="M330.324 495.484m-33.032 0a33.032 33.032 0 1 0 66.064 0 33.032 33.032 0 1 0-66.064 0Z"
            fill="#464655" p-id="1149"/>
        <path
            d="M693.678 495.484m-33.032 0a33.032 33.032 0 1 0 66.064 0 33.032 33.032 0 1 0-66.064 0Z"
            fill="#464655" p-id="1150"/>
    </svg>
);

const PandaIcon = props => (
    <Icon component={PandaSvg} {...props} />
);

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
                <Layout className="layout">
                    <div id='header'>
                        <div className="ant-col ant-col-xs-24 ant-col-sm-24 ant-col-md-5 ant-col-lg-5 ant-col-xl-5 ant-col-xxl-3">
                            <a id="logo">
                                <img className="brandLogo" src={antlogo}/>
                                <img className="brandName" src={antdesign}/>
                            </a>

                        </div>
                        <Menu
                            mode="horizontal"
                            defaultSelectedKeys={['1']}
                            style={{lineHeight: '64px'}}
                        >
                            <Menu.Item key="1">
                                <Link to='/scheduler'>
                                        <Icon type="calendar" />Scheduler
                                </Link>
                            </Menu.Item>
                        </Menu>
                    </div>
                    <Content style={{
                        height: '100vh',
                        width: '100%',
                        margin: 'auto',
                        background: '#fff',
                        padding: '40px 0 0'
                    }}>
                    <DragAndDrop schedule_requests={this.props.schedule_requests.payload}
                                 resources={this.props.vessels.payload}
                                 addScheduleRequests={this.props.addScheduleRequests}
                    />

                    </Content>
                    <Footer style={{textAlign: 'center'}}>
                        <PandaIcon style={{fontSize: '32px'}}/> uluwu ©2019
                    </Footer>
                </Layout>
            </div>
        )
        return (
            <div className="spinner">
                <Spin/>
            </div>
        )
    }
}
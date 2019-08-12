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

export default class NavBar extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            current: this.props.currentPage,
        }
    }

    componentDidUpdate(prevProps, prevState) {
        // Typical usage (don't forget to compare props):
        if (prevProps.currentPage !== this.props.currentPage) {
            this.setState({current: this.props.currentPage});
        }
    }

    handleClick = (e) => {
        console.log('click ', e);
        this.setState({
            current: e.key,
        });
    }

    render() {
        if (this.state.current) {
            return (
                <div>
                    <div id='header'>
                        <div
                            className="ant-col ant-col-xs-24 ant-col-sm-24 ant-col-md-5 ant-col-lg-5 ant-col-xl-5 ant-col-xxl-3">
                            <a id="logo">
                                <img className="brandLogo" src={antlogo}/>
                                <img className="brandName" src={antdesign}/>
                            </a>
                        </div>
                        <Menu
                            mode="horizontal"
                            onClick={this.handleClick}
                            selectedKeys={[this.state.current]}
                            style={{lineHeight: '64px'}}
                        >
                            <Menu.Item key="1">
                                <Link to='/scheduler'>
                                    <Icon type="calendar"/>Scheduler
                                </Link>
                            </Menu.Item>
                            <Menu.Item key="2">
                                <Link to='/recipe_list'>
                                    <Icon type="ordered-list"/>Recipes
                                </Link>
                            </Menu.Item>
                            <Menu.Item key="3">
                                <Link to='/administration'>
                                    <Icon type="menu" />Administration
                                </Link>
                            </Menu.Item>

                        </Menu>
                    </div>
                </div>
            )
        }
        else {
            return (
                <Spin/>
            )
        }
    }
}
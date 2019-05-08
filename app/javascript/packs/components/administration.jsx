import React from 'react';
import moment from 'moment';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css'
import '../../../assets/stylesheets/administration.scss'

import '../../../assets/stylesheets/index.scss'
import 'antd/dist/antd.css';
import {message} from 'antd';

import Admin_sub_menu from './admin_sub_menu'

import NavBar from './navbar'

import {Table, Spin, Button, Icon} from 'antd';
import '../../../assets/stylesheets/schedule_request_list.scss'

const columns = [{
    title: 'Identifier',
    dataIndex: 'identifier',
    key: 'identifier',
    render: text => <a href="javascript:;">{text}</a>,
    width: 300,
}, {
    title: 'Volume',
    dataIndex: 'volume',
    key: 'volume',
    width: 300,
}, {
    title: 'Volume Unit',
    dataIndex: 'volume_unit',
    key: 'volume_unit',
    width: 300,
}, {
    title: 'Vessel Type',
    dataIndex: 'vessel_type',
    key: 'vessel_type',
    width: 300,
}];

const success = () => {
    message.success('Request successfully submitted');
};

export default class Scheduler extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.fetchVessels();
    }

    render() {
        let data = this.props.vessels.payload;
        if (data && data.length > 0) {
            return (
                <div>
                    <NavBar currentState="4"/>
                    <div className='menu-table-container'>
                        <Admin_sub_menu currentState="1"/>


                        <div className='admin-table-container'>

                            <Button className='add-request-btn'
                                    type="primary"
                            >
                                <Icon type="plus"/> Add Vessel
                            </Button>

                            <Table pagination={{pageSize: 25}}
                                   columns={columns} dataSource={data}/>
                        </div>
                    </div>
                </div>

            )
        }
        else {
            return (
                <div>
                    <NavBar currentState="4"/>
                    <Admin_sub_menu currentState="1"/>
                    <Spin/>
                </div>
            )
        }

    }
}
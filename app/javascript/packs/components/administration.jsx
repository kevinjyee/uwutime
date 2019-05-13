import React from 'react';
import moment from 'moment';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css'
import '../../../assets/stylesheets/administration.scss'

import '../../../assets/stylesheets/index.scss'
import 'antd/dist/antd.css';
import {message} from 'antd';
import { Link } from 'react-router-dom';

import AdminSubMenu from './admin_sub_menu'
import AddVesselModal from './add_vessel_modal'

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

export default class Administration extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            show_form: false,
            vessels: this.props.vessels.payload || []
        }
        this.showModal = this.showModal.bind(this);
    }

    componentDidMount() {
        this.props.fetchVessels();
    }

    componentDidUpdate(prevProps, prevState) {
        // Typical usage (don't forget to compare props):
        if (prevProps.vessels.payload !== this.props.vessels.payload) {
            this.setState({vessels: this.props.vessels.payload});
        }
    }

    showModal() {
        this.setState({show_form: true});
    }


    saveFormRef = (formRef) => {
        this.formRef = formRef;
    }


    handleCancel = () => {
        this.setState({show_form: false});
    }


    handleCreate = () => {
        const form = this.formRef.props.form;
        form.validateFields((err, values) => {
            if (err) {
                return;
            }

            console.log('Received values of form: ', values);

            var vessel_params = {
                identifier: values['identifier'],
                volume: values['volume'],
                volume_unit: values['volume_unit'],
                vessel_type: values['vessel_type']
            }

            this.props.addVessel(vessel_params);

            form.resetFields();
            this.setState({show_form: false});
        });
    }

    render() {
        let data = this.state.vessels;
        if (data && data.length > 0) {
            return (
                <div>
                    <NavBar currentPage="3"/>
                    <div className='menu-table-container'>
                        <AdminSubMenu currentPage="1"/>


                        <div className='admin-table-container'>
                            <div className='admin-button-container'>
                            <Button className='add-request-btn'
                                    type="primary"
                                    disabled={false}
                                    onClick={this.showModal}
                            >

                                <Icon type="plus"/> Add Vessel
                            </Button>
                            </div>

                            <Table pagination={{pageSize: 25}}
                                   columns={columns} dataSource={data}/>

                            <AddVesselModal
                                {...this.props}
                                wrappedComponentRef={this.saveFormRef}
                                visible={this.state.show_form}
                                onCancel={this.handleCancel}
                                onCreate={this.handleCreate}
                                />

                        </div>
                    </div>
                </div>

            )
        }
        else {
            return (
                <div>
                    <NavBar currentPage="3"/>
                    <AdminSubMenu currentPage="1"/>
                </div>
            )
        }

    }
}
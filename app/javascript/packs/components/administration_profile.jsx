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
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: text => <a href="javascript:;">{text}</a>,
    width: 300,
}, {
    title: 'Brew Hours',
    dataIndex: 'brew_hours',
    key: 'brew_hours',
    width: 300,
}, {
    title: 'Ferment Days',
    dataIndex: 'ferment_days',
    key: 'ferment_days',
    width: 300,
}, {
    title: 'Packaging Days',
    dataIndex: 'packaging_days',
    key: 'packaging_days',
    width: 300,
}];

const success = () => {
    message.success('Request successfully submitted');
};

export default class AdministrationProfile extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            show_form: false,
            schedule_profiles: this.props.schedule_profiles.payload || []
        }
        this.showModal = this.showModal.bind(this);
    }

    componentDidMount() {
        this.props.fetchScheduleProfiles();
    }

    componentDidUpdate(prevProps, prevState) {
        // Typical usage (don't forget to compare props):
        if (prevProps.schedule_profiles.payload !== this.props.schedule_profiles.payload) {
            this.setState({schedule_profiles: this.props.schedule_profiles.payload});
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
        let data = this.state.schedule_profiles;
        if (data && data.length > 0) {
            return (
                <div>
                    <NavBar currentState="2"/>
                    <div className='menu-table-container'>
                        <AdminSubMenu currentState="1"/>


                        <div className='admin-table-container'>
                            <div className='admin-button-container'>
                            <Button className='add-request-btn'
                                    type="primary"
                                    disabled={true}
                                    onClick={this.showModal}
                            >

                                <Icon type="plus"/> Add Profile
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
                    <NavBar currentState="2"/>
                    <AdminSubMenu currentState="1"/>
                </div>
            )
        }

    }
}
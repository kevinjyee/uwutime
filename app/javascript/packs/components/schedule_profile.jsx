import React from 'react';
import moment from 'moment';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css'
import '../../../assets/stylesheets/administration.scss'

import '../../../assets/stylesheets/index.scss'
import 'antd/dist/antd.css';
import {message} from 'antd';
import {Link} from 'react-router-dom';

import AdminSubMenu from './admin_sub_menu'
import AddVesselModal from './add_vessel_modal'

import NavBar from './navbar'

import {Menu, Table, Spin, Button, Icon} from 'antd';

const SubMenu = Menu.SubMenu;

import '../../../assets/stylesheets/schedule_request_list.scss'

const columns = [{
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: text => <a href='/administration/profile/1'>{text}</a>,
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

export default class ScheduleProfile extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            show_form: false,
            schedule_profile: this.props.schedule_profile.payload || [],
            current: 'sub1',
        }
        this.showModal = this.showModal.bind(this);
    }

    componentDidMount() {
        let id = this.props.match.params.id;
        this.props.fetchScheduleProfile({id: id});
    }

    componentDidUpdate(prevProps, prevState) {
        // Typical usage (don't forget to compare props):
        if (prevProps.schedule_profile.payload !== this.props.schedule_profile.payload) {
            this.setState({schedule_profile: this.props.schedule_profile.payload});
        }
    }

    showModal() {
        this.setState({show_form: true});
    }

    handleClick = (e) => {
        console.log('click ', e);
        this.setState({
            current: e.key,
        });
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
        let data = this.state.schedule_profile;
        let mashNavBody = <div/>;
        let fermentNavBody = <div/>;
        let packagingNavBody = <div/>;

        if (data) {

            let mashTasks = data.mash_tasks;
            let fermentTasks = data.ferment_tasks;
            let packagingTasks = data.packaging_tasks;

            if (mashTasks) {
                mashNavBody = mashTasks.map((mash_task) => {
                    let mashSteps = mash_task.mash_steps;
                    let mashNavSteps = <div/>;

                    if (mashSteps) {
                        mashNavSteps = mashSteps.map((mash_step) => {
                            let mash_step_id = `mash-step_${mash_step.id}`;
                            let mash_step_label = `${mash_step.name} (${mash_step.duration_hours} hour(s))`
                            return (
                                <Menu.Item key={mash_step_id}>{mash_step_label}</Menu.Item>
                            );
                        })
                    }
                    let mash_task_id = `mash-task_${mash_task.id}`;
                    let mash_task_label = `${mash_task.name} (Day 1)`
                    return (
                        <SubMenu key={mash_task_id} title={mash_task_label}>
                            {mashNavSteps}
                        </SubMenu>
                    );
                })
            }

            if (fermentTasks) {

                fermentNavBody = fermentTasks .map((ferment_task) => {
                    let fermentSteps = ferment_task.ferment_steps;
                    let fermentNavSteps = <div/>;

                    if (fermentSteps) {
                        fermentNavSteps = fermentSteps.map((ferment_step) => {
                            let ferment_step_id = `ferment-step_${ferment_step.id}`
                            let ferment_step_label = `${ferment_step.name} (Day ${ferment_step.day})`
                            return (
                                <Menu.Item key={ferment_step_id}>{ferment_step_label}</Menu.Item>
                            );
                        })
                    }
                    let ferment_task_id = `ferment-task_${ferment_task.id}`;
                    let ferment_task_label = `${ferment_task.name} (Day ${ferment_task.day_start})`
                    return (
                        <SubMenu key={ferment_task_id} title={ferment_task_label}>
                            {fermentNavSteps}
                        </SubMenu>
                    );
                })
            }

            if (packagingTasks) {
                packagingNavBody = packagingTasks .map((packaging_task) => {
                    let packagingSteps = packaging_task.packaging_steps;
                    let packagingNavSteps = <div/>;

                    if (packagingSteps) {

                        packagingNavSteps = packagingSteps.map((packaging_step) => {
                            let packaging_step_id = `packaging-step_${packaging_step.id}`
                            let packaging_step_label = `${packaging_step.name} (Day ${packaging_step.day})`
                            return (
                                <Menu.Item key={packaging_step_id}>{packaging_step_label }</Menu.Item>
                            );
                        })
                    }
                    let packaging_task_id = `packaging-task_${packaging_task.id}`;
                    let packaging_task_label = `${packaging_task.name} (Day ${packaging_task.day_start})`
                    return (
                        <SubMenu key={packaging_task_id} title={packaging_task_label}>
                            {packagingNavSteps}
                        </SubMenu>
                    );
                })
            }

            return (
                <div>
                    <NavBar currentPage="3"/>
                    <div className='menu-table-container'>
                        <AdminSubMenu currentPage="2"/>

                        <br/>
                        <br/>
                        <Menu
                            style={{width: 256}}
                            selectedKeys={[this.state.current]}
                            defaultOpenKeys={['sub1']}
                            mode={'inline'}
                            theme={'light'}
                            onClick={this.handleClick}
                        >
                            <SubMenu key="sub1" title={<span><Icon
                                type="appstore"/><span>Brew</span></span>}>
                                {mashNavBody}
                            </SubMenu>
                            <SubMenu key="sub2" title={<span><Icon
                                type="appstore"/><span>Ferment</span></span>}>
                                {fermentNavBody}
                            </SubMenu>
                            <SubMenu key="sub3" title={<span><Icon
                                type="appstore"/><span>Packaging</span></span>}>
                                {packagingNavBody}
                            </SubMenu>
                        </Menu>
                    </div>
                </div>

            )
        }
        else {
            return (
                <div>
                    <NavBar currentPage="3"/>
                    <AdminSubMenu currentPage="2"/>
                </div>
            )
        }

    }
}
import React from 'react'
import ScheduleRequestsList from './schedule_requests_list'
import update from 'immutability-helper';
import moment from 'moment';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css'
import '../../../assets/stylesheets/schedule_requests.scss'
import 'antd/dist/antd.css';
import '../../../assets/stylesheets/index.scss'
import logo from '../../../assets/images/uwu.jpg'

import {
    Layout, Menu, Button, Modal,
    Select, InputNumber, Form,
    Input, DatePicker, Icon, message, Spin
} from 'antd';

import { Link } from 'react-router-dom';
import NavBar from "./navbar";

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

const CollectionCreateForm = Form.create({name: 'form_in_modal'})(
    // eslint-disable-next-line
    class extends React.Component {
        render() {
            const {
                visible, onCancel, onCreate, form,
            } = this.props;
            const {getFieldDecorator} = form;
            return (
                <Modal
                    visible={visible}
                    title="Create a new collection"
                    okText="Create"
                    onCancel={onCancel}
                    onOk={onCreate}
                >
                    <Form layout="vertical">

                        <Form.Item
                            label="Select"
                            hasFeedback
                        >
                            {getFieldDecorator('product', {
                                rules: [
                                    {
                                        required: true,
                                        message: 'Please select a product!'
                                    },
                                ],
                            })(
                                <Select placeholder="Please select a product">
                                    <Option value="Brown">Brown</Option>
                                    <Option value="IPA">IPA</Option>
                                    <Option value="Pale-ale">Pale Ale</Option>
                                    <Option value="Whiskey-stout">Whiskey
                                        Stout</Option>
                                    <Option value="Rye-beer">Rye Beer</Option>
                                </Select>
                            )}
                        </Form.Item>

                        <Form.Item
                            label="Number of Runs"
                        >
                            {getFieldDecorator('run-quantity', {
                                rules: [
                                    {required: true},
                                ],
                                initialValue: 1
                            })(
                                <InputNumber min={1} max={10}/>
                            )}
                            <span className="ant-form-text"> run(s)</span>
                        </Form.Item>


                        <Form.Item
                            label="Brew Hours"
                        >
                            {getFieldDecorator('brew-hours', {
                                rules: [
                                    {required: true},
                                ],
                                initialValue: 1
                            })(
                                <InputNumber min={1}/>
                            )}
                            <span className="ant-form-text"> hour(s)</span>
                        </Form.Item>


                        <Form.Item
                            label="Fermentation Days"
                        >
                            {getFieldDecorator('ferment-days', {
                                rules: [
                                    {required: true},
                                ],
                                initialValue: 1
                            })(
                                <InputNumber min={1}/>
                            )}
                            <span className="ant-form-text"> day(s)</span>
                        </Form.Item>

                        <Form.Item
                            label="Select"
                            hasFeedback
                        >
                            {getFieldDecorator('end-type', {
                                rules: [
                                    {
                                        required: true,
                                        message: 'Please select an end type!'
                                    },
                                ],
                            })(
                                <Select
                                    placeholder="Please select an end type">
                                    <Option value="Can">Can</Option>
                                    <Option value="Bottle">Bottle</Option>
                                    <Option value="Keg 1/4">Keg 1/4</Option>
                                    <Option value="Keg 1/2">Keg 1/2</Option>
                                </Select>
                            )}
                        </Form.Item>

                        <Form.Item
                            label="Preferred Run Date"
                        >
                            {getFieldDecorator('preferred-run-date',
                                {
                                    rules: [{
                                        type: 'object',
                                        required:
                                            true,
                                        message: 'Please select a preferred date'
                                    }]
                                })(
                                <DatePicker/>
                            )}
                        </Form.Item>

                        <Form.Item label="Notes">
                            {getFieldDecorator('notes')(<Input
                                type="textarea"/>)}
                        </Form.Item>
                    </Form>
                </Modal>
            );
        }
    }
);

export default class ScheduleRequests extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            input_product_name: 'test',
            input_preferred_date: moment().toDate(),
            open: true,
            show_form: false,
            isLoading: true,
        };
        this.handleUserInput = this.handleUserInput.bind(this)
        this.handleFormSubmit = this.handleFormSubmit.bind(this)
        this.addNewRequest = this.addNewRequest.bind(this)
    }

    showModal = () => {
        this.setState({show_form: true});
    }


    componentDidMount() {
        this.props.fetchScheduleRequests();
    }

    handleUserInput(obj) {
        this.setState(obj);
    }

    addNewRequest(schedule_request) {
        var schedule_requests = update(this.props.schedule_requests, {$push: [schedule_request]});
        this.setState({schedule_requests: schedule_requests});
        this.props.addRequest.bind(null, 0)
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

            var schedule_request_params = {
                product_name: values['product'],
                run_quantity: values['run-quantity'],
                status: 'not_scheduled',
                scheduled: false,
                scheduled_tasks: {

                    'brew': {
                        time: values['brew-hours'],
                        time_interval: 'hours'
                    },
                    'ferment': {
                        time: values['ferment-days'],
                        time_interval: 'days'
                    },
                    'package': {
                        time: 24.0,
                        time_interval: 'hours'
                    }
                },
                end_type: values['end-type'],
                requested_preferred_date: moment(values['preferred-run-date']).format('YYYY-MM-DD HH:mm:00'),
                notes: values[
                    'notes'
                    ]
            }

            console.log(schedule_request_params);
            this.handleFormSubmit(schedule_request_params);
            form.resetFields();
            this.setState({show_form: false});
        });
    }

    saveFormRef = (formRef) => {
        this.formRef = formRef;
    }


    handleFormSubmit(params) {
        this.props.addScheduleRequests(params);
    }


    render() {
        if (this.props.schedule_requests.isLoading == false) return (
            <div>
                <div>
                <NavBar currentPage='2'/>


                </div>
            </div>

        )

        return (
            <div className="spinner">
                <Spin/>
            </div>
        )
    }
}
import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import '../../../../assets/stylesheets/index.scss';
import '../../../../assets/stylesheets/recipe_event.scss';
import 'antd/dist/antd.css';

import {
    Modal, Form, List,
    InputNumber, Avatar,
    Input, Button, Icon,
} from 'antd';

import axios from 'axios/index';
import brewantGrainAva from '../../../../assets/images/brewant_grain_ava.svg';


const { Search } = Input;


const AddRecipeEventFermentModal = Form.create({ name: 'form_in_modal' })(
    // eslint-disable-next-line

    class extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                searching: false,
                fermentableDb: [],
                selectedFermentTask: this.props.selectedFermentTask,
                fermentableName: null,
                autoCompleteResult: [],

            };
            this.initializeKeys = this.initializeKeys.bind(this);
            this.id = this.props.id || 0;
            this.add = this.add.bind(this);
            this.remove = this.remove.bind(this);
        }

        remove = k => {
            const { form } = this.props;
            // can use data-binding to get
            const keys = form.getFieldValue('keys');
            // We need at least one passenger
            if (keys.length === 1) {
                return;
            }

            // can use data-binding to set
            form.setFieldsValue({
                keys: keys.filter(key => key !== k),
            });
        };

        add = () => {
            const { form } = this.props;
            // can use data-binding to get
            const keys = form.getFieldValue('keys');
            while (this.id < this.props.id) {
                this.id++;
            }
            const nextKeys = keys.concat(this.id++);
            // can use data-binding to set
            // important! notify form to detect changes
            form.setFieldsValue({
                keys: nextKeys,
            });
        };

        initializeKeys = () => {
            const { form } = this.props;
            let selectedFermentTask = this.props.selectedFermentTask;
            let existingIds = [];
            for(let i =0; i < selectedFermentTask.children.length; i++)
            {
                existingIds.push(this.id);
            }
            form.setFieldsValue({
                keys: existingIds
            })
        }

        handleSubmit = e => {
            e.preventDefault();
            this.props.form.validateFields((err, values) => {
                if (!err) {
                    const { keys, names } = values;
                    console.log('Received values of form: ', values);
                    let fermentRecords = [];
                    if (values.keys && values.keys.length > 0) {
                        let recipe_tasks = { name: values.name}
                        values.keys.forEach((item, index) => {
                            console.log(values.step_name[item]);
                            const recipe_steps = {
                                name: values.step_display_name[item],
                                display_name: values.step_name[item],
                                day: values.step_hours[item],
                                step_order: index
                            }

                            recipe_tasks = { recipe_steps: recipe_steps}
                            fermentRecords.push(recipe_tasks);
                        })
                    }
                    console.log(fermentRecords);
                    const recipe_tasks = { id: 1,  recipe_tasks: fermentRecords }

                }
            });
        };


        render() {
            const { getFieldDecorator, getFieldValue } = this.props.form;
            const {
                visible, onCancel, onCreate, form,
            } = this.props;

            const formItemLayout = {
                labelCol: {
                    xs: { span: 24 },
                    sm: { span: 4 },
                },
                wrapperCol: {
                    xs: { span: 24 },
                    sm: { span: 20 },
                },
            };
            const formItemLayoutWithOutLabel = {
                wrapperCol: {
                    xs: { span: 24, offset: 0 },
                    sm: { span: 20, offset: 4 },
                },
            };
            getFieldDecorator('keys', { initialValue: [] });
            const keys = getFieldValue('keys');
            let formItems;
            if (this.props.selectedFermentTask)
            {
                formItems = keys.map((k, index) => (
                    <div>
                        <Form.Item
                            {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
                            label={`Step ${index + 1}`}
                            required={false}
                            key={k}
                        >
                            {getFieldDecorator(`step_key[${k}]`, {
                                validateTrigger: ['onChange', 'onBlur'],
                                rules: [
                                    {
                                        required: false,
                                        whitespace: true,
                                        message: "Please input a step name",
                                    },

                                ],
                                initialValue: (this.props.selectedFermentTask.children[k] || {}).key
                            })(<Input type="hidden" style={{ width: '60%', marginRight: 8 }} />)}

                            {getFieldDecorator(`step_name[${k}]`, {
                                validateTrigger: ['onChange', 'onBlur'],
                                rules: [
                                    {
                                        required: true,
                                        whitespace: true,
                                        message: "Please input a step name",
                                    },

                                ],
                                initialValue: (this.props.selectedFermentTask.children[k] || {}).name
                            })(<Input placeholder="Step Name" style={{ width: '60%', marginRight: 8 }} />)}

                            <div className="dynamic-form-item">
                                {getFieldDecorator(`step_display_name[${k}]`, {
                                    validateTrigger: ['onChange', 'onBlur'],
                                    rules: [
                                        {
                                            required: true,
                                            whitespace: true,
                                            message: "Please input display name",
                                        },
                                    ],
                                    initialValue: (this.props.selectedFermentTask.children[k] || {}).name
                                })(<Input placeholder="Step Display Name" style={{ width: '60%', marginRight: 8 }} />)}
                            </div>

                            <div className="dynamic-form-item">
                                {getFieldDecorator(`step_hours[${k}]`, {
                                    initialValue: (this.props.selectedFermentTask.children[k] || {}).duration
                                })(
                                    <InputNumber
                                        min={0}
                                        max={24}
                                        placeHolder={1}
                                    /> ,
                                )}

                                <span> day(s) </span>

                                {keys.length > 1 ? (
                                    <Icon
                                        className="dynamic-delete-button"
                                        type="minus-circle-o"
                                        onClick={() => this.remove(k)}

                                    />
                                ) : null}
                            </div>
                        </Form.Item>
                    </div>
                ));
            }
            else
            {
                formItems = keys.map((k, index) => (
                    <div>
                        <Form.Item
                            {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
                            label={`Step ${index + 1}`}
                            required={false}
                            key={k}
                        >
                            {getFieldDecorator(`step_name[${k}]`, {
                                validateTrigger: ['onChange', 'onBlur'],
                                rules: [
                                    {
                                        required: true,
                                        whitespace: true,
                                        message: "Please input a step name",
                                    },
                                ],
                            })(<Input placeholder="Step Name" style={{ width: '60%', marginRight: 8 }} />)}

                            <div className="dynamic-form-item">
                                {getFieldDecorator(`step_display_name[${k}]`, {
                                    validateTrigger: ['onChange', 'onBlur'],
                                    rules: [
                                        {
                                            required: true,
                                            whitespace: true,
                                            message: "Please input display name",
                                        },
                                    ],
                                })(<Input placeholder="Step Display Name" style={{ width: '60%', marginRight: 8 }} />)}
                            </div>


                            <span> Day </span>
                            <div className="dynamic-form-item">
                                {getFieldDecorator(`step_hours[${k}]`, {
                                    validateTrigger: ['onChange', 'onBlur'],
                                    rules: [
                                        {
                                            required: true,
                                            whitespace: true,
                                            message: "Please input a duration",
                                        },
                                    ],
                                })(
                                    <InputNumber
                                        min={0}
                                        max={24}
                                        placeholder='1'
                                    /> ,
                                )}



                                {keys.length > 1 ? (
                                    <Icon
                                        className="dynamic-delete-button"
                                        type="minus-circle-o"
                                        onClick={() => this.remove(k)}
                                    />
                                ) : null}
                            </div>

                        </Form.Item>
                    </div>
                ));
            }

            return (
                <Modal
                    visible={visible}
                    title="Add Recipe Event"
                    okText="Create"
                    onCancel={onCancel}
                    onOk={onCreate}
                >
                <Form>

                    <Form.Item label="Name">
                        {getFieldDecorator('name', {
                            rules: [{
                                required: true,
                                message: 'Please input a task name',
                            }],
                            initialValue: ( this.props.selectedFermentTask || {}).name,

                        })(
                            <Input/>,
                        )}
                    </Form.Item>

                    {formItems}
                    <Form.Item {...formItemLayoutWithOutLabel}>
                        <Button type="dashed" onClick={this.add} style={{ width: '60%' }}>
                            <Icon type="plus" /> Add field
                        </Button>
                    </Form.Item>
                </Form>
                </Modal>
            );
        }
    }
);

export default AddRecipeEventFermentModal;

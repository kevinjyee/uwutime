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
let id = 0;

const AddRecipeEventBrewModal = Form.create({ name: 'form_in_modal' })(
    // eslint-disable-next-line

    class extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                searching: false,
                fermentableDb: [],
                selectedMashTask: this.props.selectedMashTask,
                fermentableName: null,
                autoCompleteResult: [],
            };
        }

        remove = k => {
            const { form } = this.props;
            // can use data-binding to get
            const keys = form.getFieldValue('keys');s
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
            const nextKeys = keys.concat(id++);
            // can use data-binding to set
            // important! notify form to detect changes
            form.setFieldsValue({
                keys: nextKeys,
            });
        };

        handleSubmit = e => {
            e.preventDefault();
            this.props.form.validateFields((err, values) => {
                if (!err) {
                    const { keys, names } = values;
                    console.log('Received values of form: ', values);
                    let brewRecords = [];
                    if (values.keys && values.keys.length > 0) {
                        let recipe_mash_tasks = { name: values.name}
                        values.keys.forEach((item, index) => {
                            console.log(values.step_name[item]);
                            const recipe_mash_steps = {
                                name: values.step_display_name[item],
                                display_name: values.step_name[item],
                                duration_hours: values.step_hours[item],
                                step_order: index
                            }

                            recipe_mash_tasks = { recipe_mash_steps: recipe_mash_steps}
                            brewRecords.push(recipe_mash_tasks);
                        })
                    }
                    console.log(brewRecords);
                    const recipe_mash_tasks = { id: 1,  recipe_mash_tasks: brewRecords }

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
            if (this.props.selectedMashTask)
            {
                formItems = this.props.selectedMashTask.children.map((k, index) => (
                    <div>
                        <Form.Item
                            {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
                            label={`Step ${index + 1}`}
                            required={false}
                            key={k}
                        >
                            {getFieldDecorator(`step_name[${index}]`, {
                                validateTrigger: ['onChange', 'onBlur'],
                                rules: [
                                    {
                                        required: true,
                                        whitespace: true,
                                        message: "Please input a step name",
                                    },
                                ],
                                initialValue: k.name
                            })(<Input placeholder="Step Name" style={{ width: '60%', marginRight: 8 }} />)}

                            <div className="dynamic-form-item">
                                {getFieldDecorator(`step_display_name[${index}]`, {
                                    validateTrigger: ['onChange', 'onBlur'],
                                    rules: [
                                        {
                                            required: true,
                                            whitespace: true,
                                            message: "Please input display name",
                                        },

                                    ],
                                    initialValue: k.name
                                })(<Input placeholder="Step Display Name" style={{ width: '60%', marginRight: 8 }} />)}
                            </div>

                            <div className="dynamic-form-item">
                                {getFieldDecorator(`step_hours[${index}]`, {
                                    validateTrigger: ['onChange', 'onBlur'],
                                    rules: [
                                        {
                                            required: true,
                                            whitespace: true,
                                            message: "Please input a duration",
                                        },
                                    ],
                                    initialValue: k.duration
                                })(
                                    <InputNumber
                                        min={0}
                                        max={24}
                                        placeholder='1'
                                    /> ,
                                )}

                                <span> hr(s) </span>

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

                                <span> hr(s) </span>

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
                            initialValue: ( this.props.selectedMashTask || {}).name,

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

export default AddRecipeEventBrewModal;

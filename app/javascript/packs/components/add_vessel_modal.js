import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css'
import '../../../assets/stylesheets/schedule_requests.scss'
import '../../../assets/stylesheets/index.scss'
import 'antd/dist/antd.css';

var $ = require('jquery')



import {
    Button, Modal, Form,
    Select, InputNumber,
    Input, DatePicker, Icon, TimePicker, message, Spin
} from 'antd';

const AddVesselModal = Form.create({name: 'form_in_modal'})(
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
                    title="Add a Tank"
                    okText="Create"
                    onCancel={onCancel}
                    onOk={onCreate}
                >
                    <Form layout="vertical">
                        <Form.Item label="Identifier">
                            {getFieldDecorator('identifier', {
                                rules: [{required: true, message: 'Vessel Identifier is required'}],
                            })(
                                <Input/>
                            )}
                        </Form.Item>
                        <Form.Item
                            label="Volume"
                        >
                            {getFieldDecorator('volume', {
                                rules: [
                                    {required: true},
                                ],
                                initialValue: 1
                            })(
                                <InputNumber min={1} max={10000}/>
                            )}
                        </Form.Item>
                        <Form.Item
                            label="Unit"
                            hasFeedback
                        >
                            {getFieldDecorator('volume_unit', {
                                rules: [
                                    {
                                        required: true,
                                        message: 'Please select a unit'
                                    },
                                ],
                            })(
                                <Select placeholder="Please select a unit">
                                    <Option value="bbl">bbl</Option>
                                    <Option value="L">liter</Option>
                                </Select>
                            )}
                        </Form.Item>
                        <Form.Item
                            label="Vessel Type"
                            hasFeedback
                        >
                            {getFieldDecorator('vessel_type', {
                                rules: [
                                    {
                                        required: true,
                                        message: 'Please select a vessel type'
                                    },
                                ],
                            })(
                                <Select placeholder="Please select an equipment">
                                    <Option value="kettle">Kettle</Option>
                                    <Option value="fermenter">Fermenter</Option>
                                    <Option value="packaging">Packaging</Option>
                                </Select>
                            )}
                        </Form.Item>
                    </Form>
                </Modal>
            );
        }
    }
);

export default AddVesselModal;
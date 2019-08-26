import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import '../../../../assets/stylesheets/index.scss';
import 'antd/dist/antd.css';

import {
    Modal, Form,
    InputNumber,
    Input,
} from 'antd';

const ShowFermentableModal = Form.create({ name: 'form_in_modal' })(
    // eslint-disable-next-line

    class extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                fermentableName: null,
                isNew: this.props.isNew,
            };
            this.onAmountPrimaryChanged = this.onAmountPrimaryChanged.bind(this);
            this.onAmountSecondaryChanged = this.onAmountSecondaryChanged.bind(this);
            this.onDryYieldChanged = this.onDryYieldChanged.bind(this);
            this.onPotentialChanged = this.onPotentialChanged.bind(this);
        }

        onAmountPrimaryChanged = (value) => {
            const { form } = this.props;
            form.setFieldsValue({
                amount_oz: value * 16,
            });
        }

        onAmountSecondaryChanged = (value) => {
            const { form } = this.props;
            form.setFieldsValue({
                amount: value / 16.0,
            });
        }

        onDryYieldChanged = (value) => {
            const { form } = this.props;
            form.setFieldsValue({
                potential: 1 + (value / 100.00) * 0.04621,
            });
        }

        onPotentialChanged = (value) => {
            const { form } = this.props;
            form.setFieldsValue({
                dry_yield: ((value - 1) / 0.04621) * 100.00,
            });
        }

        render() {
            const {
                visible, onCancel, onCreate, form,
            } = this.props;
            const { getFieldDecorator } = form;
            const {
                fermentableName,
            } = this.state;

            const { selectedFermentable } = this.props;

            const formItemLayout = {
                labelCol: { span: 6 },
                wrapperCol: { span: 14 },
            };

            let amount = 1;
            let amountOz = 16;

            if (selectedFermentable && selectedFermentable.amount) {
                amountOz = selectedFermentable.amount * 16;
                // eslint-disable-next-line prefer-destructuring
                amount = selectedFermentable.amount;
            } else {
                amount = 1;
                amountOz = 16;
            }

            return (
                <Modal
                    visible={visible}
                    title="Add Malts, Grains & Fermentables"
                    okText="Create"
                    onCancel={onCancel}
                    onOk={onCreate}
                >

                    {selectedFermentable ? (
                        <Form {...formItemLayout}>
                            <Form.Item label="Name">
                                {getFieldDecorator('name', {
                                    rules: [{
                                        required: true,
                                        message: 'Please input an ingredient name!',
                                    }],
                                    initialValue: selectedFermentable.name,
                                    disabled: true,
                                })(
                                    <Input disabled />,
                                )}
                            </Form.Item>

                            <Form.Item
                                label="Volume"
                            >
                                {getFieldDecorator('amount', {
                                    rules: [
                                        { required: true },
                                    ],
                                    initialValue: amount,
                                })(
                                    <InputNumber
                                        min={0.1}
                                        max={10000}
                                        onChange={(value) => {
                                            console.log(value);
                                            this.onAmountPrimaryChanged(value);
                                        }}
                                    />,
                                )}
                                <span className="ant-form-text"> lb(s)</span>
                            </Form.Item>

                            <Form.Item
                                label="Volume"
                            >
                                {getFieldDecorator('amount_oz', {
                                    rules: [
                                        { required: true },
                                    ],
                                    initialValue: amountOz,
                                })(
                                    <InputNumber
                                        min={1}
                                        max={10000}
                                        onChange={(value) => {
                                            console.log(value);
                                            this.onAmountSecondaryChanged(value);
                                        }}
                                    />,
                                )}
                                <span className="ant-form-text"> oz(s)</span>
                            </Form.Item>

                            <Form.Item
                                label="Color"
                            >
                                {getFieldDecorator('srm_precise', {
                                    rules: [
                                        { required: false },
                                    ],
                                    initialValue: selectedFermentable.srm_precise,
                                })(
                                    <InputNumber min={1} max={10000} />,
                                )}
                                <span className="ant-form-text"> SRM </span>
                            </Form.Item>

                            <Form.Item
                                label="Potential"
                            >
                                {getFieldDecorator('potential', {
                                    rules: [
                                        { required: false },
                                    ],
                                    initialValue: selectedFermentable.potential,
                                })(
                                    <InputNumber
                                        min={1}
                                        max={1.04621}
                                        onChange={(value) => {
                                            console.log(value);
                                            this.onPotentialChanged(value);
                                        }}
                                    />,
                                )}
                                <span className="ant-form-text"> S.G. </span>
                            </Form.Item>

                            <Form.Item
                                label="Dry Yield"
                            >
                                {getFieldDecorator('dry_yield', {
                                    rules: [
                                        { required: false },
                                    ],
                                    initialValue: selectedFermentable.dry_yield,
                                })(
                                    <InputNumber
                                        min={0}
                                        max={100}
                                        onChange={(value) => {
                                            console.log(value);
                                            this.onDryYieldChanged(value);
                                        }}
                                    />,
                                )}
                                <span className="ant-form-text"> % </span>
                            </Form.Item>
                        </Form>
                    ) : (<div />)}
                </Modal>
            );
        }
    },
);

export default ShowFermentableModal;

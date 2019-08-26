import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import '../../../../assets/stylesheets/index.scss';
import 'antd/dist/antd.css';

import {
    Modal, Form, List,
    InputNumber, Avatar,
    Input,
} from 'antd';

import axios from 'axios/index';
import brewantGrainAva from '../../../../assets/images/brewant_grain_ava.svg';


const { Search } = Input;

const AddFermentableModal = Form.create({ name: 'form_in_modal' })(
    // eslint-disable-next-line

    class extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                searching: false,
                fermentableDb: [],
                selectedFermentable: null,
                fermentableName: null,
                autoCompleteResult: [],
            };
            this.onAmountPrimaryChanged = this.onAmountPrimaryChanged.bind(this);
            this.onAmountSecondaryChanged = this.onAmountSecondaryChanged.bind(this);
            this.onDryYieldChanged = this.onDryYieldChanged.bind(this);
            this.onPotentialChanged = this.onPotentialChanged.bind(this);
        }

        onSearch = (e) => {
            if (e.target.value.length > 0) {
                this.setState({
                    searching: true,
                });
            } else {
                this.setState({
                    searching: false,
                });
            }

            console.log(e.target.value);
            axios.get('/fermentables', {
                params: {
                    q: e.target.value,
                },
            }).then((res) => {
                console.log(res.data);
                this.setState({
                    fermentableDb: res.data,
                });
            }).catch((err) => {
                console.log(err);
            });
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

        clickedItem = (item) => {
            const { metaDataCallBack } = this.props;
            this.setState({
                searching: false,
                selectedFermentable: item,
                fermentableName: item.name,
            });
            metaDataCallBack({ selectedFermentable: item });
        }

        render() {
            const {
                visible, onCancel, onCreate, form,
            } = this.props;
            const { getFieldDecorator } = form;
            const {
                searching, selectedFermentable,
                fermentableName, fermentableDb,
            } = this.state;
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
                    <div className="recipe-search">
                        <Search
                            placeholder="Search by Recipe Name or SRM"
                            onSearch={value => console.log(value)}
                            onChange={this.onSearch}
                        />
                    </div>

                    <br />
                    {searching ? (
                        <div>
                            <List
                                itemLayout="horizontal"
                                dataSource={fermentableDb}
                                renderItem={item => (
                                    <List.Item
                                        className="antd-list-item"
                                        onClick={() => {
                                            this.clickedItem(item);
                                        }}
                                    >
                                        <List.Item.Meta
                                            avatar={(
                                                <Avatar
                                                    className="grain-srm"
                                                    src={brewantGrainAva}
                                                />
                                            )}
                                            title={item.display_name}
                                            description={item.description}
                                        />
                                    </List.Item>
                                )}
                            />
                        </div>
                    ) : (
                        <div />

                    )}

                    {!searching && selectedFermentable ? (
                        <Form {...formItemLayout}>
                            <Form.Item label="Name">
                                {getFieldDecorator('name', {
                                    rules: [{
                                        required: true,
                                        message: 'Please input an ingredient name!',
                                    }],
                                    initialValue: fermentableName,
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

export default AddFermentableModal;

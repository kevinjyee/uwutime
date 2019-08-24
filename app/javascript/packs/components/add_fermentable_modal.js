import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css'
import '../../../assets/stylesheets/schedule_requests.scss'
import '../../../assets/stylesheets/index.scss'
import 'antd/dist/antd.css';
import brewant_grain_ava from '../../../assets/images/brewant_grain_ava.svg'

import {
    Modal, Form, List,
    InputNumber, Avatar,
    Input,
} from 'antd';

import axios from "axios/index";


const {Search} = Input;

const AddFermentableModal = Form.create({name: 'form_in_modal'})(
    // eslint-disable-next-line

    class extends React.Component {

        constructor(props) {
            super(props);
            this.state = {
                searching: false,
                fermentable_db: [],
                selected_fermentable: null,
                fermentable_name: null,
                autoCompleteResult: [],
            }
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
            }
            else {
                this.setState({
                    searching: false
                });
            }

            console.log(e.target.value)
            axios.get(`/fermentables`, {
                params: {
                    q: e.target.value
                }
            }).then(res => {
                console.log(res.data);
                this.setState({
                    fermentable_db: res.data
                });
            }).catch(err => {
            })
        }

        onAmountPrimaryChanged = (value) => {
            this.props.form.setFieldsValue({
                amount_oz: value * 16
            });
        }

        onAmountSecondaryChanged = (value) => {
            this.props.form.setFieldsValue({
                amount: value / 16.0
            })
        }

        onDryYieldChanged = (value) => {
            this.props.form.setFieldsValue({
                potential: 1 + (value / 100.00) * 0.04621
            })
        }

        onPotentialChanged = (value) => {
            this.props.form.setFieldsValue({
                dry_yield: ((value-1)/0.04621)*100.00
            })
        }

        clickedItem = (item) => {
            console.log(item);
            this.setState({
                searching: false,
                selected_fermentable: item,
                fermentable_name: item.name
            });
            this.props.metaDataCallBack({selectedFermentable: item})
        }

        render() {
            const {
                visible, onCancel, onCreate, form,
            } = this.props;
            const {getFieldDecorator} = form;
            let searching = this.state.searching;
            let selected_fermentable = this.state.selected_fermentable;
            const formItemLayout = {
                labelCol: {span: 6},
                wrapperCol: {span: 14},
            };

            let amount = 1;
            let amount_oz = 16;

            if(this.state.selected_fermentable && this.state.selected_fermentable.amount) {
                amount = this.state.selected_fermentable.amount;
                amount_oz = this.state.selected_fermentable.amount * 16;
            } else {
                amount  = 1;
                amount_oz = 16;
            }

            return (
                <Modal
                    visible={visible}
                    title="Add Malts, Grains & Fermentables"
                    okText="Create"
                    onCancel={onCancel}
                    onOk={onCreate}
                >
                    <div className='recipe-search'>
                        <Search
                            placeholder="Search by Recipe Name or SRM"
                            onSearch={value => console.log(value)}
                            onChange={this.onSearch}

                        />
                    </div>

                    <br/>
                    {searching ? (<div>
                        <List
                            itemLayout="horizontal"
                            dataSource={this.state.fermentable_db}
                            renderItem={item => (
                                <List.Item className='antd-list-item'
                                           onClick={() => {
                                               this.clickedItem(item)
                                           }}>
                                    <List.Item.Meta
                                        avatar={<Avatar className='grain-srm'
                                                        src={brewant_grain_ava}/>}
                                        title={item.display_name}
                                        description={item.description}

                                    />
                                </List.Item>
                            )}
                        />
                    </div>) : (
                        <div></div>

                    )}

                    {!searching && selected_fermentable ? (
                        <Form {...formItemLayout}>
                            <Form.Item label="Name">
                                {getFieldDecorator('name', {
                                    rules: [{
                                        required: true,
                                        message: 'Please input an ingredient name!'
                                    }],
                                    initialValue: this.state.fermentable_name,
                                    disabled: true
                                })(
                                    <Input disabled/>
                                )}
                            </Form.Item>

                            <Form.Item
                                label="Volume"
                            >
                                {getFieldDecorator('amount', {
                                    rules: [
                                        {required: true},
                                    ],
                                    initialValue: amount
                                })(
                                    <InputNumber min={0.1} max={10000}
                                                 onChange={(value) => {
                                                     console.log(value)
                                                     this.onAmountPrimaryChanged(value)
                                                 }}/>
                                )}
                                <span className="ant-form-text"> lb(s)</span>
                            </Form.Item>

                            <Form.Item
                                label="Volume"
                            >
                                {getFieldDecorator('amount_oz', {
                                    rules: [
                                        {required: true},
                                    ],
                                    initialValue: amount_oz
                                })(
                                    <InputNumber min={1} max={10000}
                                                 onChange={(value) => {
                                                     console.log(value)
                                                     this.onAmountSecondaryChanged(value)
                                                 }}/>
                                )}
                                <span className="ant-form-text"> oz(s)</span>
                            </Form.Item>

                            <Form.Item
                                label="Color"
                            >
                                {getFieldDecorator('srm_precise', {
                                    rules: [
                                        {required: false},
                                    ],
                                    initialValue: this.state.selected_fermentable.srm_precise
                                })(
                                    <InputNumber min={1} max={10000}/>
                                )}
                                <span className="ant-form-text"> SRM </span>
                            </Form.Item>

                            <Form.Item
                                label="Potential"
                            >
                                {getFieldDecorator('potential', {
                                    rules: [
                                        {required: false},
                                    ],
                                    initialValue: this.state.selected_fermentable.potential
                                })(
                                    <InputNumber min={1} max={1.04621}
                                                 onChange={(value) => {
                                                     console.log(value)
                                                     this.onPotentialChanged(value)
                                                 }}/>
                                )}
                                <span className="ant-form-text"> S.G. </span>
                            </Form.Item>

                            <Form.Item
                                label="Dry Yield"
                            >
                                {getFieldDecorator('dry_yield', {
                                    rules: [
                                        {required: false},
                                    ],
                                    initialValue: this.state.selected_fermentable.dry_yield
                                })(
                                    <InputNumber min={0} max={100}
                                                 onChange={(value) => {
                                                     console.log(value)
                                                     this.onDryYieldChanged(value)
                                                 }}/>
                                )}
                                <span className="ant-form-text"> % </span>
                            </Form.Item>


                        </Form>) : (<div></div>)}
                </Modal>
            );
        }
    }
);

export default AddFermentableModal;
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
    Input, AutoComplete,
} from 'antd';

const AutoCompleteOption = AutoComplete.Option;
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
                                    initialValue: 1
                                })(
                                    <InputNumber min={1} max={10000}/>
                                )}
                                <span className="ant-form-text"> lb(s)</span>
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
                        </Form>) : (<div></div>)}
                </Modal>
            );
        }
    }
);

export default AddFermentableModal;
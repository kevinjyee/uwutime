import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css'
import '../../../assets/stylesheets/schedule_requests.scss'
import '../../../assets/stylesheets/index.scss'
import 'antd/dist/antd.css';
import brewant_grain_ava from '../../../assets/images/brewant_grain_ava.svg'


var $ = require('jquery')

import {
    Button, Modal, Form, List,
    Select, InputNumber, Avatar,
    Input, DatePicker, Icon, TimePicker, message, Spin, AutoComplete,
} from 'antd';

const AutoCompleteOption = AutoComplete.Option;
import axios from "axios/index";
import {receivedRecipe} from "../actions/actionCreators";

const { Search } = Input;

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

        onChange = (e) => {

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
            }).then( res => {
                console.log(res.data);
                this.setState({
                    fermentable_db: res.data
                });
            }).catch(err => {
            })
        }

        handleFermentableChange = (value) => {
            let autoCompleteResult = [];
            if (!value) {
                this.setState({ autoCompleteResult: []});
            } else {
                axios.get(`/fermentables`, {
                    params: {
                        q: value,
                        search_by_prefix: true
                    }
                }).then( res => {
                    console.log(res.data);
                    this.setState({ autoCompleteResult: res.data });
                }).catch(err => {
                })
            }

        };

        clickedItem = (item) => {
            console.log(item);
            this.setState({
                searching: false,
                selected_fermentable: item,
                fermentable_name: item.name
            });
        }

        render() {
            const {
                visible, onCancel, onCreate, form,
            } = this.props;
            const {getFieldDecorator} = form;
            let searching = this.state.searching;
            let selected_fermentable = this.state.selected_fermentable;
            const formItemLayout = {
                labelCol: { span: 6 },
                wrapperCol: { span: 14 },
            };

            const recipeNameOptions = this.state.autoCompleteResult.map(fermentable => (
                <AutoCompleteOption key={fermentable.id}>{fermentable.name}</AutoCompleteOption>
            ));


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
                            onChange={this.onChange}

                        />
                    </div>

                    <br/>
                    {searching ? ( <div>
                        <List
                        itemLayout="horizontal"
                        dataSource={this.state.fermentable_db}
                        renderItem={item => (
                            <List.Item className='antd-list-item' onClick={() => { this.clickedItem(item)}}>
                                <List.Item.Meta
                                    avatar={<Avatar className='grain-srm' src={brewant_grain_ava} />}
                                    title={item.display_name}
                                    description={item.description}

                                />
                            </List.Item>
                        )}
                        />
                    </div>) : (
                        <div></div>

                        )}

                    {!searching && selected_fermentable ? (<Form {...formItemLayout}>
                        <Form.Item label="Name">
                            <span className="ant-form-text">{this.state.fermentable_name}</span>
                        </Form.Item>
                        <Form.Item
                            label="Volume"
                        >
                            {getFieldDecorator('Amount', {
                                rules: [
                                    {required: true},
                                ],
                                initialValue: 0
                            })(
                                <InputNumber min={1} max={10000}/>
                            )}
                            <span className="ant-form-text"> lb(s)</span>
                        </Form.Item>
                        <Form.Item
                            label="Color"
                        >
                            {getFieldDecorator('srm', {
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
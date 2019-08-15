import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css'
import '../../../assets/stylesheets/schedule_requests.scss'
import '../../../assets/stylesheets/index.scss'
import 'antd/dist/antd.css';


var $ = require('jquery')

import {
    Button, Modal, Form, List,
    Select, InputNumber,
    Input, DatePicker, Icon, TimePicker, message, Spin
} from 'antd';
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
                fermentable_db: []
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

        render() {
            const {
                visible, onCancel, onCreate, form,
            } = this.props;
            const {getFieldDecorator} = form;
            let searching = this.state.searching;


            return (
                <Modal
                    visible={visible}
                    title="Add Malts, Grains & Fermentables"
                    okText="Create"
                    onCancel={onCancel}
                    onOk={onCreate}
                >
                    <Search
                        placeholder="input search text"
                        onSearch={value => console.log(value)}
                        onChange={this.onChange}

                    />
                    <br/>
                    {searching ? ( <div>
                        <List
                        itemLayout="horizontal"
                        dataSource={this.state.fermentable_db}
                        renderItem={item => (
                            <List.Item>
                                <List.Item.Meta
                                    title={<a href="https://ant.design">{item.name}</a>}
                                    description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                                />
                            </List.Item>
                        )}
                        />
                    </div>) : (
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
                        )}
                </Modal>
            );
        }
    }
);

export default AddFermentableModal;
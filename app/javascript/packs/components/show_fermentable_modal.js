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

import axios from "axios/index";


const {Search} = Input;

const ShowFermentableModal = Form.create({name: 'form_in_modal'})(
    // eslint-disable-next-line

    class extends React.Component {

        constructor(props) {
            super(props);
            this.state = {
                selected_fermentable: null,
            }
        }

        componentDidUpdate(prevProps, prevState) {
            // Typical usage (don't forget to compare props):
            if (prevProps.selected_fermentable !== this.props.selected_fermentable) {
                this.setState({selected_fermentable: this.props.selected_fermentable});
            }
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

            if(this.state.selected_fermentable) {
                let editTitle = `Edit ${this.state.selected_fermentable.name}`

                return (
                    <Modal
                        visible={visible}
                        title={editTitle}
                        okText="Save"
                        onCancel={onCancel}
                        onOk={onCreate}
                    >
                        <Form {...formItemLayout}>

                        </Form>
                    </Modal>
                );
            } else
            {
                return (
                    <div></div>
                )
            }
        }
    }
);

export default ShowFermentableModal;
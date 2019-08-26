import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import '../../../../assets/stylesheets/index.scss';
import 'antd/dist/antd.css';

import {
    Modal, Form,
} from 'antd';

const ShowFermentableModal = Form.create({ name: 'form_in_modal' })(

    class extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                selected_fermentable: null,
            };
        }

        componentDidUpdate(prevProps, prevState) {
            // Typical usage (don't forget to compare props):
            if (prevProps.selected_fermentable !== this.props.selected_fermentable) {
                this.setState({ selected_fermentable: this.props.selected_fermentable });
            }
        }

        render() {
            const {
                visible, onCancel, onCreate, form,
            } = this.props;
            const { getFieldDecorator } = form;
            const { searching } = this.state;
            const { selected_fermentable } = this.state;
            const formItemLayout = {
                labelCol: { span: 6 },
                wrapperCol: { span: 14 },
            };

            if (this.state.selected_fermentable) {
                const editTitle = `Edit ${this.state.selected_fermentable.name}`;
                return (
                    <Modal
                        visible={visible}
                        title={editTitle}
                        okText="Save"
                        onCancel={onCancel}
                        onOk={onCreate}
                    >
                        <Form {...formItemLayout} />
                    </Modal>
                );
            }
                return (
                    <div />
                );
        }
    },
);

export default ShowFermentableModal;

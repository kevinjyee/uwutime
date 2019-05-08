import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css'
import '../../../assets/stylesheets/schedule_requests.scss'
import '../../../assets/stylesheets/index.scss'
import 'antd/dist/antd.css';
import { Link } from 'react-router-dom';

var $ = require('jquery')
import { Menu, Icon } from 'antd';

export default class Admin_sub_menu extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            mode: 'vertical',
            theme: 'light',
            current: this.props.currentState
        }
    }

    handleClick = (e) => {
        console.log('click ', e);
        this.setState({
            current: e.key,
        });
    }


    render() {
        return (
            <div>
                <Menu
                    style={{ width: 256 }}
                    onClick={this.handleClick}
                    selectedKeys={[this.state.current]}
                    mode={this.state.mode}
                    theme={this.state.theme}
                >
                    <Menu.Item key="1">
                        <Link to='/administration/vessels'>
                        <Icon type="mail" />
                        Tanks
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="2">
                        <Icon type="calendar" />
                        Mash
                    </Menu.Item>
                </Menu>
            </div>
        );
    }
}
import React from 'react';
import { PropTypes } from 'prop-types';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import '../../../assets/stylesheets/schedule_requests.scss';
import '../../../assets/stylesheets/index.scss';
import 'antd/dist/antd.css';
import { Menu, Icon, Spin } from 'antd';
import { Link } from 'react-router-dom';

export default class AdminSubMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mode: 'vertical',
      theme: 'light',
      current: this.props.currentPage, // eslint-disable-line react/destructuring-assignment
    };

    // eslint-disable-next-line
    AdminSubMenu.propTypes = {
      currentPage: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
    };
  }

  componentDidUpdate(prevProps, prevState) {
    console.log(prevState);
    // Typical usage (don't forget to compare props):
    const { currentPage } = this.prop;
    if (prevProps.currentPage !== currentPage) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({ current: currentPage });
    }
  }

    handleClick = (e) => {
      console.log('click ', e);
      this.setState({
        current: e.key,
      });
    }

    render() {
      const { current, mode, theme } = this.state;
      if (current) {
        return (
          <div>
            <Menu
              style={{ width: 256 }}
              onClick={this.handleClick}
              selectedKeys={[current]}
              mode={mode}
              theme={theme}
            >
              <Menu.Item key="1">
                <Link to="/administration/vessels">
                  <Icon type="mail" />
                  {' '}
                    Tanks
                </Link>

              </Menu.Item>
              <Menu.Item key="2">
                <Link to="/administration/profiles">
                  <Icon type="calendar" />
                  {' '}
                    Profiles
                </Link>
              </Menu.Item>
            </Menu>
          </div>
        );
      }

      return (

        <Spin />
      );
    }
}

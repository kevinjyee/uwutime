import React from 'react'
import ReactDOM from 'react-dom'
import ScheduleRequestForm from './schedule_request_form'
import ScheduleRequestsList from './schedule_requests_list'
import update from 'immutability-helper';
import moment from 'moment';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css'
import '../../assets/stylesheets/schedule_requests.scss'
import DemoTable from "./demo_table";



import 'antd/dist/antd.css';
import '../../assets/stylesheets/index.scss'
import logo from '../../assets/images/uwu.jpg'
import { Layout, Menu, Breadcrumb } from 'antd';

const { Header, Content, Footer } = Layout;


var $ = require ('jquery')




export default class ScheduleRequests extends React.Component{


    constructor(props) {
        super(props);
        this.state = {
            schedule_requests: this.props.schedule_requests,
            input_product_name: 'test',
            input_preferred_date: moment().toDate(),
            open: true};
        this.handleUserInput  = this.handleUserInput.bind(this)
        this.handleFormSubmit = this.handleFormSubmit.bind(this)
        this.addNewRequest = this.addNewRequest.bind(this)
    }


    componentDidMount() {
        console.log("FIRED FIRED")
    }

    handleUserInput(obj) {
        this.setState(obj);
    }

    addNewRequest(schedule_request) {
        var schedule_requests = update(this.state.schedule_requests, { $push: [schedule_request]});
        this.setState({schedule_requests: schedule_requests});
    }


    handleFormSubmit() {
        var schedule_request = {product_name: this.state.input_product_name,
            requested_preferred_date: this.state.input_preferred_date}

        $.post('/schedule_requests', {schedule_request: schedule_request}).done(function(data){
            this.addNewRequest(data);

        }.bind(this));
    }


    render() {

        return (
            <div>

      <div>
          <Layout className="layout">
              <Header>
                  <div className="logo">
                      <img src={logo}/>
                  </div>
                  <Menu
                      theme="dark"
                      mode="horizontal"
                      defaultSelectedKeys={['1']}
                      style={{ lineHeight: '64px' }}
                  >
                      <Menu.Item key="1">Request</Menu.Item>
                      <Menu.Item key="2">Product Type</Menu.Item>
                      <Menu.Item key="3">Scheduler</Menu.Item>
                  </Menu>
              </Header>
              <Content style={{ height: '100vh', width: '90%', margin: 'auto' }}>
                  {/*<ScheduleRequestForm input_product_name={this.state.input_product_name}*/}
                  {/*input_preferred_date={this.state.input_preferred_date}*/}
                  {/*onUserInput={this.handleUserInput}*/}
                  {/*onFormSubmit={this.handleFormSubmit}/>*/}


                  <ScheduleRequestsList schedule_requests={this.state.schedule_requests}
                                        status={true}/>

                  <ScheduleRequestsList schedule_requests={this.state.schedule_requests}
                                        status={false}/>
              </Content>
              <Footer style={{ textAlign: 'center' }}>
                  uluwu ©2019
              </Footer>
          </Layout>


            </div>
            </div>

        )
    }
}


document.addEventListener('DOMContentLoaded', () => {
    const node = document.getElementById('schedule_request_data')
    const data = JSON.parse(node.getAttribute('data'))
    ReactDOM.render(
        <ScheduleRequests schedule_requests={data} />,
        document.body.appendChild(document.createElement('div')),
)
})

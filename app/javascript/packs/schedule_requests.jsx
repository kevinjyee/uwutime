import React from 'react'
import ReactDOM from 'react-dom'
import ScheduleRequestForm from './schedule_request_form'
import ScheduleRequestsList from './schedule_requests_list'
import update from 'immutability-helper';
import ScheduleRequest from "./schedule_request";


export default class ScheduleRequests extends React.Component{

    constructor(props) {
        super(props);
        this.state = { input_product_name: 'test',
        input_preferred_time: 'test'};
        this.handleUserInput  = this.handleUserInput.bind(this)
        this.handleFormSubmit = this.handleFormSubmit.bind(this)
        this.addNewRequest = this.addNewRequest.bind(this)
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
            preferred_time: this.state.input_preferred_time}

        $.post('/schedule_requests', {schedule_request: schedule_request}).done(function(data){
            this.addNewRequest(data);

        }.bind(this));
    }


    render() {
        return (
            <div>
            <ScheduleRequestForm input_product_name={this.state.input_product_name}
                                 input_appt_time={this.state.input_preferred_time}
                                 onUserInput={this.handleUserInput}
                                 onFormSubmit={this.handleFormSubmit}/>
                <ScheduleRequestsList schedule_requests={this.props.schedule_requests}/>

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
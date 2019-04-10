class ScheduleRequests extends React.Component{

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
        var schedule_requests = React.addons.update(this.state.schedule_requests, { $push: [schedule_request]});
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
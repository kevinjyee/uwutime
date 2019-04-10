class ScheduleRequests extends React.Component{

    constructor(props) {
        super(props);
        this.state = { input_product_name: 'test',
        input_preferred_time: 'test'};
        this.handleUserInput  = this.handleUserInput.bind(this)
        this.handleFormSubmit = this.handleFormSubmit.bind(this)
    }

    handleUserInput(obj) {
        this.setState(obj);
    }

    handleFormSubmit() {
        var schedule_request = {product_name: this.state.input_product_name,
            preferred_time: this.state.input_preferred_time}

        $.post('/schedule_requests', {schedule_request: schedule_request})
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
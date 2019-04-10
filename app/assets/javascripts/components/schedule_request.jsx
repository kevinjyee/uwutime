class ScheduleRequest extends React.Component{
    render() {
        return (
            <div>
                <h3>{this.props.schedule_request.product_name}</h3>
                <p>{this.props.schedule_request.requested_preferred_date}</p>
            </div>
        )
    }
};
class ScheduleRequestsList extends React.Component{
    render() {
        return (
            <div>
                {this.props.schedule_requests.map(function(schedule_request) {
                    return (
                        <ScheduleRequest schedule_request={schedule_request}/>
                    )
                })}
            </div>
        )
    }
}
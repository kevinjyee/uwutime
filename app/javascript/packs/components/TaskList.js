import React, {Component} from 'react'
import {PropTypes} from 'prop-types'

class TaskList extends Component{
    constructor(props){
        super(props);
    }

    static propTypes = {
        schedulerData: PropTypes.object.isRequired,
        newEvent: PropTypes.func.isRequired,
        taskDndSource: PropTypes.object.isRequired,
    }

    render(){
        const {schedulerData, newEvent, taskDndSource} = this.props;
        let DnDTaskItem = taskDndSource.getDragSource();
        let tasks = schedulerData.eventGroups;
        let taskList = tasks.map((item) => {
            return <DnDTaskItem key={item.id} task={item} newEvent={newEvent} schedulerData={schedulerData} />
        });

        return (
            <div className="ant-list ant-list-sm ant-list-split ant-list-bordered ant-list-something-after-last-item">
                {taskList}
            </div>
        )
    }
}

export default TaskList

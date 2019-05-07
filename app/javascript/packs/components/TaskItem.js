import React, {Component} from 'react'
import {PropTypes} from 'prop-types'
import {
    Icon, Popover, Button
} from 'antd';

import '../../../assets/stylesheets/scheduler.scss'


class TaskItem extends Component
{
    constructor(props){
        super(props);
    }

    static propTypes = {
        task: PropTypes.object.isRequired,
    }


    render(){
        const {task, isDragging, connectDragSource, connectDragPreview, schedulerData, removeTask} = this.props;

        let content = <div />

        content = Object.keys(task.state.children).map((key) => {
            return (<p className={key} key={key}>
                <b>{key}</b>: {task.state.children[key].hours/24} days
            </p>)
        })

        let dragContent = (

            <div className='ant-list-item ant-list-split' style={{borderBottom: '1px solid #e8e8e8'}}>
                <div className='task-list-container'>
                    <div className='ant-task-name'>{task.name}</div>
                <Popover content={content} title="Details" trigger="hover">
               <Icon type="info-circle" />
            </Popover>
                    <div className='delete-task-icon-container' onClick={() => {removeTask(schedulerData, task);}}>
                        <Icon type="delete" />
                    </div>
                </div>
        </div>

        );

        return (
            isDragging ? null : (
                <div>
                    {
                        connectDragPreview(
                            connectDragSource(dragContent)
                        )
                    }
                </div>
            )
        )
    }
}

export default TaskItem

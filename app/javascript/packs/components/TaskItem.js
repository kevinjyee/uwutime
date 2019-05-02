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
        const {task, isDragging, connectDragSource, connectDragPreview} = this.props;

        const content = (
            <div>
                <p>Content</p>
                <p>Content</p>
            </div>
        );

        let dragContent = (

            <div className='ant-list-item ant-list-split' style={{borderBottom: '1px solid #e8e8e8'}}>
                <div className='task-list-container'>
                    <div className='ant-task-name'>{task.name}</div>
                <Popover content={content} title="Title" trigger="hover">
               <Icon type="info-circle" />
            </Popover>
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

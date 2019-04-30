import React, {Component} from 'react'
import {PropTypes} from 'prop-types'
import Col from 'antd/lib/col'
import Row from 'antd/lib/row'
import 'antd/lib/grid/style/index.css'
import Scheduler, {SchedulerData, ViewTypes, DnDSource, DemoData} from '../lib/index'
import {DnDTypes} from './DnDTypes'
import TaskItem from './TaskItem'
import TaskList from './TaskList'
import ResourceItem from './ResourceItem'
import ResourceList from './ResourceList'
import withDragDropContext from './withDnDContext'
import '../../../assets/stylesheets/style.css'

class DragAndDrop extends Component{
    constructor(props){
        super(props);

        let schedulerData = new SchedulerData('2017-12-18', ViewTypes.Month, false, false, {
            schedulerWidth: '80%',
            schedulerMaxHeight: 500,
            views: [
                {viewName: 'Agenda View', viewType: ViewTypes.Month, showAgenda: true, isEventPerspective: false},
                {viewName: 'Resource View', viewType: ViewTypes.Month, showAgenda: false, isEventPerspective: false},
                {viewName: 'Task View', viewType: ViewTypes.Month, showAgenda: false, isEventPerspective: true},
            ]
        });
        schedulerData.localeMoment.locale('en');
        schedulerData.setResources(this.props.resources);
        schedulerData.setEvents(this.props.schedule_requests);
        this.state = {
            viewModel: schedulerData,
            taskDndSource: new DnDSource((props) => {return props.task;}, TaskItem, DnDTypes.TASK),
            resourceDndSource: new DnDSource((props) => {return props.resource;}, ResourceItem, DnDTypes.RESOURCE),
        }
    }

    render(){
        const {viewModel, taskDndSource, resourceDndSource} = this.state;
        let h3 = viewModel.isEventPerspective ? 'Drag and drop from outside: Drag a resource and drop to the task view' : 'Drag and drop from outside: Drag a task and drop to the resource view';
        let dndList = viewModel.isEventPerspective ? (
            <ResourceList schedulerData={viewModel} newEvent={this.newEvent} resourceDndSource={resourceDndSource}/>
        ) : (
            <TaskList schedulerData={viewModel} newEvent={this.newEvent} taskDndSource={taskDndSource} />
        );

        //register the external DnDSources
        let dndSources = [taskDndSource, resourceDndSource];
        return (
            <div>
                <div>

                    <Row>
                        <Col span={20}>
                            <Scheduler schedulerData={viewModel}
                                       prevClick={this.prevClick}
                                       nextClick={this.nextClick}
                                       onSelectDate={this.onSelectDate}
                                       onViewChange={this.onViewChange}
                                       eventItemClick={this.eventClicked}
                                       viewEventClick={this.ops1}
                                       viewEventText="Ops 1"
                                       viewEvent2Text="Ops 2"
                                       viewEvent2Click={this.ops2}
                                       updateEventStart={this.updateEventStart}
                                       updateEventEnd={this.updateEventEnd}
                                       moveEvent={this.moveEvent}
                                       movingEvent={this.movingEvent}
                                       newEvent={this.newEvent}
                                       subtitleGetter={this.subtitleGetter}
                                       dndSources={dndSources}
                            />
                        </Col>
                        <Col span={4}>
                            {dndList}
                        </Col>
                    </Row>
                </div>
            </div>
        )
    }

    prevClick = (schedulerData)=> {
        schedulerData.prev();
        schedulerData.setEvents(DemoData.eventsForTaskView);
        this.setState({
            viewModel: schedulerData
        })
    }

    nextClick = (schedulerData)=> {
        schedulerData.next();
        schedulerData.setEvents(DemoData.eventsForTaskView);
        this.setState({
            viewModel: schedulerData
        })
    }

    onViewChange = (schedulerData, view) => {
        schedulerData.setViewType(view.viewType, view.showAgenda, view.isEventPerspective);
        schedulerData.config.creatable = !view.isEventPerspective;
        schedulerData.setEvents(DemoData.eventsForTaskView);
        this.setState({
            viewModel: schedulerData
        })
    }

    onSelectDate = (schedulerData, date) => {
        schedulerData.setDate(date);
        schedulerData.setEvents(DemoData.eventsForTaskView);
        this.setState({
            viewModel: schedulerData
        })
    }

    eventClicked = (schedulerData, event) => {
        alert(`You just clicked an event: {id: ${event.id}, title: ${event.title}}`);
    };

    ops1 = (schedulerData, event) => {
        alert(`You just executed ops1 to event: {id: ${event.id}, title: ${event.title}}`);
    };

    ops2 = (schedulerData, event) => {
        alert(`You just executed ops2 to event: {id: ${event.id}, title: ${event.title}}`);
    };

    newEvent = (schedulerData, slotId, slotName, start, end, type, item) => {
        if(confirm(`Do you want to create a new event? {slotId: ${slotId}, slotName: ${slotName}, start: ${start}, end: ${end}, type: ${type}, item: ${item}}`)){

            let newFreshId = 0;
            schedulerData.events.forEach((item) => {
                if(item.id >= newFreshId)
                    newFreshId = item.id + 1;
            });

            let newEvent = {
                id: newFreshId,
                title: 'New event you just created',
                start: start,
                end: end,
                resourceId: slotId,
                bgColor: 'purple',

            }

            if(type === DnDTypes.RESOURCE){
                newEvent = {
                    ...newEvent,
                    groupId: slotId,
                    groupName: slotName,
                    resourceId: item.id
                };
            }
            else if(type === DnDTypes.TASK){
                let newEnd = new Date(start);
                newEnd.setHours(newEnd.getHours() + 168);
                newEvent = {
                    ...newEvent,
                    end: newEnd.toString(),
                    groupId: item.id,
                    children: item.state.children,
                    groupName: item.name
                };
            }

            schedulerData.addEvent(newEvent);
            this.setState({
                viewModel: schedulerData
            })
        }
    }

    updateEventStart = (schedulerData, event, newStart) => {
        if(confirm(`Do you want to adjust the start of the event? {eventId: ${event.id}, eventTitle: ${event.title}, newStart: ${newStart}}`)) {
            schedulerData.updateEventStart(event, newStart);
        }
        this.setState({
            viewModel: schedulerData
        })
    }

    updateEventEnd = (schedulerData, event, newEnd) => {
        if(confirm(`Do you want to adjust the end of the event? {eventId: ${event.id}, eventTitle: ${event.title}, newEnd: ${newEnd}}`)) {
            schedulerData.updateEventEnd(event, newEnd);
        }
        this.setState({
            viewModel: schedulerData
        })
    }

    moveEvent = (schedulerData, event, slotId, slotName, start, end) => {
        schedulerData.moveEvent(event, slotId, slotName, start, end);
        this.setState({
            viewModel: schedulerData
        })
    }

    movingEvent = (schedulerData, slotId, slotName, newStart, newEnd, action, type, item) => {
        console.log('moving event', schedulerData, slotId, slotName, newStart, newEnd, action, type, item);
    }

    subtitleGetter = (schedulerData, event) => {
        return schedulerData.isEventPerspective ? schedulerData.getResourceById(event.resourceId).name : event.groupName;
    }
}

export default withDragDropContext(DragAndDrop)

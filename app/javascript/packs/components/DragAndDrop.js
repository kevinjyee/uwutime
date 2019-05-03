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
import {Form} from "antd/lib/index";
import update from "immutability-helper/index";
import moment from "moment/moment";

import {
    Button, Modal,
    Select, InputNumber,
    Input, DatePicker, Icon, message, Spin
} from 'antd';

const CollectionCreateForm = Form.create({name: 'form_in_modal'})(
    // eslint-disable-next-line
    class extends React.Component {
        render() {
            const {
                visible, onCancel, onCreate, form,
            } = this.props;
            const {getFieldDecorator} = form;
            return (
                <Modal
                    visible={visible}
                    title="Create a new collection"
                    okText="Create"
                    onCancel={onCancel}
                    onOk={onCreate}
                >
                    <Form layout="vertical">

                        <Form.Item
                            label="Select"
                            hasFeedback
                        >
                            {getFieldDecorator('product', {
                                rules: [
                                    {
                                        required: true,
                                        message: 'Please select a product!'
                                    },
                                ],
                            })(
                                <Select placeholder="Please select a product">
                                    <Option value="Brown">Brown</Option>
                                    <Option value="IPA">IPA</Option>
                                    <Option value="Pale-ale">Pale Ale</Option>
                                    <Option value="Whiskey-stout">Whiskey
                                        Stout</Option>
                                    <Option value="Rye-beer">Rye Beer</Option>
                                </Select>
                            )}
                        </Form.Item>

                        <Form.Item
                            label="Number of Runs"
                        >
                            {getFieldDecorator('run-quantity', {
                                rules: [
                                    {required: true},
                                ],
                                initialValue: 1
                            })(
                                <InputNumber min={1} max={10}/>
                            )}
                            <span className="ant-form-text"> run(s)</span>
                        </Form.Item>


                        <Form.Item
                            label="Brew Hours"
                        >
                            {getFieldDecorator('brew-hours', {
                                rules: [
                                    {required: true},
                                ],
                                initialValue: 1
                            })(
                                <InputNumber min={1}/>
                            )}
                            <span className="ant-form-text"> hour(s)</span>
                        </Form.Item>


                        <Form.Item
                            label="Fermentation Days"
                        >
                            {getFieldDecorator('ferment-days', {
                                rules: [
                                    {required: true},
                                ],
                                initialValue: 1
                            })(
                                <InputNumber min={1}/>
                            )}
                            <span className="ant-form-text"> day(s)</span>
                        </Form.Item>

                        <Form.Item
                            label="Select"
                            hasFeedback
                        >
                            {getFieldDecorator('end-type', {
                                rules: [
                                    {
                                        required: true,
                                        message: 'Please select an end type!'
                                    },
                                ],
                            })(
                                <Select
                                    placeholder="Please select an end type">
                                    <Option value="Can">Can</Option>
                                    <Option value="Bottle">Bottle</Option>
                                    <Option value="Keg 1/4">Keg 1/4</Option>
                                    <Option value="Keg 1/2">Keg 1/2</Option>
                                </Select>
                            )}
                        </Form.Item>

                        <Form.Item
                            label="Preferred Run Date"
                        >
                            {getFieldDecorator('preferred-run-date',
                                {
                                    rules: [{
                                        type: 'object',
                                        required:
                                            true,
                                        message: 'Please select a preferred date'
                                    }]
                                })(
                                <DatePicker/>
                            )}
                        </Form.Item>

                        <Form.Item label="Notes">
                            {getFieldDecorator('notes')(<Input
                                type="textarea"/>)}
                        </Form.Item>
                    </Form>
                </Modal>
            );
        }
    }
);

class DragAndDrop extends Component{
    constructor(props){
        super(props);

        let schedulerData = new SchedulerData('2019-05-20', ViewTypes.Month, false, false, {
            schedulerWidth: '80%',
            schedulerMaxHeight: 0,
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
        this.showModal = this.showModal.bind(this)
    }

    componentDidUpdate(prevProps, prevState) {
        // Typical usage (don't forget to compare props):
        console.log("here");
        if (prevProps.schedule_requests !== this.props.schedule_requests) {
            this.state.viewModel.setEvents(this.props.schedule_requests);
            this.setState({viewModel: this.state.viewModel});
        }
    }

    showModal() {
        this.setState({show_form: true});
    }

    handleCreate = () => {
        const form = this.formRef.props.form;
        form.validateFields((err, values) => {
            if (err) {
                return;
            }

            console.log('Received values of form: ', values);

            var schedule_request_params = {
                product_name: values['product'],
                run_quantity: values['run-quantity'],
                status: 'not_scheduled',
                scheduled: false,
                scheduled_tasks: {

                    'brew': {
                        time: values['brew-hours'],
                        time_interval: 'hours'
                    },
                    'ferment': {
                        time: values['ferment-days'],
                        time_interval: 'days'
                    },
                    'package': {
                        time: 24.0,
                        time_interval: 'hours'
                    }
                },
                end_type: values['end-type'],
                requested_preferred_date: moment(values['preferred-run-date']).format('YYYY-MM-DD HH:mm:00'),
                notes: values[
                    'notes'
                    ]
            }

            console.log(schedule_request_params);
            this.handleFormSubmit(schedule_request_params);
            form.resetFields();
            this.setState({show_form: false});
        });
    }

    saveFormRef = (formRef) => {
        this.formRef = formRef;
    }


    handleFormSubmit(params) {
        this.props.addScheduleRequests(params);
    }

    handleCancel = () => {
        this.setState({show_form: false});
    }

    render(){
        const {viewModel, taskDndSource, resourceDndSource} = this.state;
        let h3 = viewModel.isEventPerspective ? 'Drag and drop from outside: Drag a resource and drop to the task view' : 'Drag and drop from outside: Drag a task and drop to the resource view';

        let buttonContainer = (
            <div className="task-container">
                <Button className='add-request-btn'
                    type="primary"
                        onClick={this.showModal}>
                    <Icon type="plus"/> Request
                </Button>

                <Button className='save-schedule-btn'
                        type="primary"
                        onClick={this.showModal}>
                    <Icon type="cloud-upload" /> Schedule
                </Button>

            </div>
        )

        let dndList = viewModel.isEventPerspective ? (
            <ResourceList schedulerData={viewModel} newEvent={this.newEvent} resourceDndSource={resourceDndSource}/>
        ) : (
            <TaskList schedulerData={viewModel} removedEvent={this.ops1} newEvent={this.newEvent} taskDndSource={taskDndSource} />
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
                                       viewEventText="Remove From Schedule"
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
                        <Col span={4} style={{padding: '10px 10px 0'}}>
                            {buttonContainer }
                            {dndList}
                        </Col>

                        <CollectionCreateForm
                            {...this.props}
                            wrappedComponentRef={this.saveFormRef}
                            visible={this.state.show_form}
                            onCancel={this.handleCancel}
                            onCreate={this.handleCreate}
                        />
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
        console.log("Attempting to remove event")
        schedulerData.removeEvent(event)
        this.setState({
            viewModel: schedulerData
        })
    };

    ops2 = (schedulerData, event) => {
        alert(`You just executed ops2 to event: {id: ${event.id}, title: ${event.title}}`);
    };

    ops3 = (schedulerData, event) => {
        alert(`You just executed ops3 to event: {id: ${event.id}, title: ${event.title}}`);
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
                bgColor: 'transparent',
                visibility: 'visible'

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
                newEnd.setHours(newEnd.getHours() + item.state.totalHours);
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

import React, {Component} from 'react'
import {PropTypes} from 'prop-types'
import Scheduler, {SchedulerData, ViewTypes, DnDSource, DemoData} from '../lib/index'
import withDragDropContext from './withDnDContext'

class Readonly extends Component{
    constructor(props){
        super(props);

        let date = new Date();
        let firstDay = new Date(date.getFullYear(),
            date.getMonth(), 1);

        let schedulerData = new SchedulerData(firstDay, ViewTypes.Month, false, false, {
            startResizable: false,
            endResizable: false,
            movable: false,
            creatable: false,
            scrollToSpecialMomentEnabled: false
        });

        schedulerData.localeMoment.locale('en');
        schedulerData.setResources(this.props.resources);
        // schedulerData.setEvents(DemoData.events);
        schedulerData.setEvents(this.props.events);
        this.state = {
            schedulerData: schedulerData
        }
    }

    componentDidUpdate(prevProps, prevState) {
        console.log(prevState);
        const { resources, events } = this.props;

        // Typical usage (don't forget to compare props):

        if (prevProps.resources !== resources || prevProps.events !== events) {
            let date = new Date();
            let firstDay = new Date(date.getFullYear(),
                date.getMonth(), 1);

            let schedulerData = new SchedulerData(firstDay, ViewTypes.Month, false, false, {
                startResizable: false,
                endResizable: false,
                movable: false,
                creatable: false,
                scrollToSpecialMomentEnabled: false
            });

            schedulerData.localeMoment.locale('en');

            if (prevProps.resources !== resources) {
                schedulerData.setResources(resources);
            }

            if (prevProps.events !== events) {
                // eslint-disable-next-line react/no-did-update-set-state
                schedulerData.setEvents(events);

            }
            this.setState({ schedulerData: schedulerData });
        }
    }

    render(){
        const {schedulerData} = this.state;
        return (
            <div>
                <div>
                    <Scheduler schedulerData={schedulerData}
                               prevClick={this.prevClick}
                               nextClick={this.nextClick}
                               onSelectDate={this.onSelectDate}
                               onViewChange={this.onViewChange}
                               eventItemClick={this.eventClicked}
                               viewEventClick={this.ops1}
                               viewEventText="Ops 1"
                               viewEvent2Text="Ops 2"
                               viewEvent2Click={this.ops2}
                               toggleExpandFunc={this.toggleExpandFunc}
                    />
                </div>
            </div>
        )
    }

    prevClick = (schedulerData)=> {
        schedulerData.prev();
        schedulerData.setEvents(DemoData.events);
        this.setState({
            viewModel: schedulerData
        })
    }

    nextClick = (schedulerData)=> {
        schedulerData.next();
        schedulerData.setEvents(DemoData.events);
        this.setState({
            viewModel: schedulerData
        })
    }

    onViewChange = (schedulerData, view) => {
        schedulerData.setViewType(view.viewType, view.showAgenda, view.isEventPerspective);
        schedulerData.setEvents(DemoData.events);
        this.setState({
            viewModel: schedulerData
        })
    }

    onSelectDate = (schedulerData, date) => {
        schedulerData.setDate(date);
        schedulerData.setEvents(DemoData.events);
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

    toggleExpandFunc = (schedulerData, slotId) => {
        schedulerData.toggleExpandStatus(slotId);
        this.setState({
            viewModel: schedulerData
        });
    }
}

export default withDragDropContext(Readonly)

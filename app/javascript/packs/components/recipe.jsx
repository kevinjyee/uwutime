import React from 'react';
import moment from 'moment';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css'
import '../../../assets/stylesheets/administration.scss'

import '../../../assets/stylesheets/index.scss'
import '../../../assets/stylesheets/recipes.scss'
import beericon from '../../../assets/images/beer-icon.svg'
import 'antd/dist/antd.css';
import {List, message, Avatar, Spin} from 'antd';
import {Link} from 'react-router-dom';
import WindowScroller from 'react-virtualized/dist/commonjs/WindowScroller';
import AutoSizer from 'react-virtualized/dist/commonjs/AutoSizer';
import VList from 'react-virtualized/dist/commonjs/List';
import InfiniteLoader from 'react-virtualized/dist/commonjs/InfiniteLoader';

import AdminSubMenu from './admin_sub_menu'
import AddVesselModal from './add_vessel_modal'

import NavBar from './navbar'

import {Table, Button, Icon} from 'antd';

import '../../../assets/stylesheets/schedule_request_list.scss'

const success = () => {
    message.success('Request successfully submitted');
};

const brewColumns = [
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: 'Temperature',
        dataIndex: 'temperature',
        key: 'temperature',
        width: '10%',
    },
    {
        title: 'Hours',
        dataIndex: 'duration',
        width: '10%%',
        key: 'duration',
    },
];


const fermentColumns = [
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: 'Temperature',
        dataIndex: 'temperature',
        key: 'temperature',
        width: '10%',
    },
    {
        title: 'Day',
        dataIndex: 'day',
        width: '10%%',
        key: 'day',
    },
];


const packagingColumns = [
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: 'Day',
        dataIndex: 'day',
        width: '10%%',
        key: 'day',
    },
];


// rowSelection objects indicates the need for row selection
const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
    onSelect: (record, selected, selectedRows) => {
        console.log(record, selected, selectedRows);
    },
    onSelectAll: (selected, selectedRows, changeRows) => {
        console.log(selected, selectedRows, changeRows);
    },
};

export default class Recipe extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedRecipe: this.props.selectedRecipe,
            recipe: this.props.recipe.payload
        }
    }

    componentDidMount() {
        if (this.state.selectedRecipe && this.state.selectedRecipe.id) {
            this.props.fetchRecipe({id: this.state.selectedRecipe.id});
        }
    }

    componentDidUpdate(prevProps, prevState) {
        // Typical usage (don't forget to compare props):
        if (prevProps.recipe.payload !== this.props.recipe.payload) {
            this.setState({recipe: this.props.recipe});
        }
    }

    render() {
        let data = null;

        if (this.props.recipe && this.props.recipe.payload) {
            data = this.props.recipe.payload
        }

        if (data) {

            let brewData = [];
            for (let i = 0; i < data.recipe_mash_tasks.length; i++) {
                let task = data.recipe_mash_tasks[i];
                let current_task = {
                    key: `mash_task_${task.id}`,
                    name: task.name,
                    children: []
                }

                current_task.children = task.recipe_mash_steps.map((step) => {
                    return {
                        key: `mash_step_${step.id}`,
                        name: step.name,
                        temperature: `${step.temperature}${step.temperature_unit}`,
                        duration: step.duration_hours
                    }
                });
                brewData.push(current_task);
            }


            let fermentData = [];
            for (let i = 0; i < data.recipe_ferment_tasks.length; i++) {
                let task = data.recipe_ferment_tasks[i];
                let current_task = {
                    key: `ferment_task_${task.id}`,
                    name: task.name,
                    children: []
                }

                current_task.children = task.recipe_ferment_steps.map((step) => {
                    return {
                        key: `mash_step_${step.id}`,
                        name: step.name,
                        temperature: `${step.temperature}${step.temperature_unit}`,
                        day: `Day ${step.day}`
                    }
                });
                fermentData.push(current_task);
            }

            let packagingData = [];
            for (let i = 0; i < data.recipe_packaging_tasks.length; i++) {
                let task = data.recipe_packaging_tasks[i];
                let current_task = {
                    key: `packaging_task_${task.id}`,
                    name: task.name,
                    children: []
                }

                current_task.children = task.recipe_packaging_steps.map((step) => {
                    return {
                        key: `packaging_step_${step.id}`,
                        name: step.name,
                        day: `Day ${step.day}`
                    }
                });
                packagingData.push(current_task);
            }


            return (
                <div className='recipe-contents'>
                    <div className='recipe-overview-row'>
                        <div className="ant-card ant-card-bordered">
                            <div className="ant-card-head">
                                <div className="ant-card-head-wrapper">
                                    <div
                                        className="ant-card-head-title">{data.name}
                                    </div>
                                </div>
                            </div>
                            <div className="ant-card-body">
                                <div className="recipe-overview-body-flex">
                                    <div className='recipe-overview-slot'>
                                        <li>
                                            <b>Name: </b> {data.name}
                                        </li>
                                        <li>
                                            <b>Style: </b> {data.brew_type}
                                        </li>
                                    </div>
                                    <div className='recipe-overview-slot'>
                                        <li>
                                            <b>Brew: </b> {data.brew_hours} Hours
                                        </li>
                                        <li>
                                            <b>Ferment: </b> {data.ferment_days} Days
                                        </li>
                                        <li>
                                            <b>Packaging: </b> {data.packaging_days} Days
                                        </li>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='process-overview-row'>
                        <div className="ant-card ant-card-bordered">
                            <div className="ant-card-head">
                                <div className="ant-card-head-wrapper">
                                    <div className="ant-card-head-title">Brew
                                        Profile
                                    </div>
                                </div>
                            </div>
                            <div className="ant-card-body">
                                <Table columns={brewColumns}
                                       rowSelection={rowSelection}
                                       dataSource={brewData}/>,
                            </div>
                        </div>

                        <div className="ant-card ant-card-bordered">
                            <div className="ant-card-head">
                                <div className="ant-card-head-wrapper">
                                    <div
                                        className="ant-card-head-title">Ferment
                                        Profile
                                    </div>
                                </div>
                            </div>
                            <div className="ant-card-body">
                                <Table columns={fermentColumns}
                                       rowSelection={rowSelection}
                                       dataSource={fermentData}/>,
                            </div>
                        </div>

                        <div className="ant-card ant-card-bordered">
                            <div className="ant-card-head">
                                <div className="ant-card-head-wrapper">
                                    <div
                                        className="ant-card-head-title">Packaging
                                        Profile
                                    </div>
                                </div>
                            </div>

                            <div className="ant-card-body">
                                <Table columns={packagingColumns}
                                       rowSelection={rowSelection}
                                       dataSource={packagingData}/>,
                            </div>
                        </div>
                    </div>
                </div>

            )
        }
        else {
            return (
                <div>
                    Not Loaded
                </div>
            )
        }

    }
}
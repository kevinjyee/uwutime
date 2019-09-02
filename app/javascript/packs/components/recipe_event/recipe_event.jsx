import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import '../../../../assets/stylesheets/index.scss';
import '../../../../assets/stylesheets/recipes.scss';
import brewantGrains from '../../../../assets/images/brewant_grain_ico.svg';
import 'antd/dist/antd.css';
import { Table, Button, Icon } from 'antd';
import Readonly from "../Readonly";
import brewantThermometer
    from "../../../../assets/images/brewant_thermometer_ico.svg";
import brewantFermenter
    from "../../../../assets/images/brewant_fermenter_ico.svg";
import brewantPackaging
    from "../../../../assets/images/brewant_packaging_ico.svg";

const TableContext = React.createContext(false);

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

export default class RecipeEvent extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            recipeEvents: this.props.recipeEvents.payload,
            selectedRecipe: this.props.selectedRecipe,
        };
    }

    componentDidMount() {
        const { selectedRecipe } = this.state;
        const { fetchRecipeEvents } = this.props;
        if (selectedRecipe && selectedRecipe.id) {
            fetchRecipeEvents({ recipe_id: selectedRecipe.id });
        }
    }

    componentDidUpdate(prevProps, prevState) {
        console.log(prevState);
        const { recipeEvents, selectedRecipe, fetchRecipeEvents } = this.props;
        // Typical usage (don't forget to compare props):

        if (prevProps.selectedRecipe !== selectedRecipe) {
            fetchRecipeEvents({ recipe_id: selectedRecipe.id });
        }

        if (prevProps.recipeEvents.payload !== recipeEvents.payload) {
            // eslint-disable-next-line react/no-did-update-set-state
            this.setState({ recipeEvents: recipeEvents.payload });
        }
    }

    render() {
        const { recipeEvents, selectedFermentable, isPageTween } = this.state;

        if (recipeEvents) {

            const brewData = [];
            for (let i = 0; i < recipeEvents.recipe_mash_tasks.length; i += 1) {
                const task = recipeEvents.recipe_mash_tasks[i];
                const currentTask = {
                    key: `mash_task_${task.id}`,
                    name: task.name,
                    children: [],
                };

                currentTask.children = task.recipe_mash_steps.map(step => ({
                    key: `mash_step_${step.id}`,
                    name: step.name,
                    temperature: `${step.temperature}${step.temperature_unit}`,
                    duration: step.duration_hours,
                }));
                brewData.push(currentTask);
            }


            const fermentData = [];
            for (let i = 0; i < recipeEvents.recipe_ferment_tasks.length; i += 1) {
                const task = recipeEvents.recipe_ferment_tasks[i];
                const currentTask = {
                    key: `ferment_task_${task.id}`,
                    name: task.name,
                    children: [],
                };

                currentTask.children = task.recipe_ferment_steps.map(step => ({
                    key: `mash_step_${step.id}`,
                    name: step.name,
                    temperature: `${step.temperature}${step.temperature_unit}`,
                    day: `Day ${step.day}`,
                }));
                fermentData.push(currentTask);
            }

            const packagingData = [];
            for (let i = 0; i < recipeEvents.recipe_packaging_tasks.length; i += 1) {
                const task = recipeEvents.recipe_packaging_tasks[i];
                const currentTask = {
                    key: `packaging_task_${task.id}`,
                    name: task.name,
                    children: [],
                };

                currentTask.children = task.recipe_packaging_steps.map(step => ({
                    key: `packaging_step_${step.id}`,
                    name: step.name,
                    day: `Day ${step.day}`,
                }));
                packagingData.push(currentTask);
            }

            return (
                <div className="ant-card ant-card-bordered">
                    <div className="ant-card-head">
                        <div className="ant-card-head-wrapper">
                            <div
                                className="ant-card-head-title"
                            >
                                Operations
                            </div>
                        </div>
                    </div>
                    <div className="operations-overview-row">
                        <Readonly
                            resources={recipeEvents.events.resources}
                            events={recipeEvents.events.templates}
                        />
                    </div>

                    <div className="process-overview-row">
                        <div className="ant-card ant-card-bordered">
                            <div className="ant-card-head">
                                <div className="ant-card-head-wrapper">
                                    <div className="ant-card-head-title">
                                        <span>
                                            <img
                                                className="recipe-icon"
                                                src={brewantThermometer}
                                            />
                                        </span>
                                        Brew Profile
                                    </div>
                                </div>
                            </div>
                            <div className="ant-card-body">
                                <Table
                                    columns={brewColumns}
                                    rowSelection={rowSelection}
                                    dataSource={brewData}
                                />
                                ,
                            </div>
                        </div>

                        <div className="ant-card ant-card-bordered">
                            <div className="ant-card-head">
                                <div className="ant-card-head-wrapper">
                                    <div
                                        className="ant-card-head-title"
                                    >
                                        <span>
                                            <img
                                                className="recipe-icon"
                                                src={brewantFermenter}
                                            />
                                        </span>
                                        Ferment Profile
                                    </div>
                                </div>
                            </div>
                            <div className="ant-card-body">
                                <Table
                                    columns={fermentColumns}
                                    rowSelection={rowSelection}
                                    dataSource={fermentData}
                                />
                                ,
                            </div>
                        </div>

                        <div className="ant-card ant-card-bordered">
                            <div className="ant-card-head">
                                <div className="ant-card-head-wrapper">
                                    <div
                                        className="ant-card-head-title"
                                    >
                                        <img
                                            className="recipe-icon"
                                            src={brewantPackaging}
                                        />
                                        Packaging Profile
                                    </div>
                                </div>
                            </div>

                            <div className="ant-card-body">
                                <Table
                                    columns={packagingColumns}
                                    rowSelection={rowSelection}
                                    dataSource={packagingData}
                                />
                                ,
                            </div>
                        </div>
                    </div>
            </div>
        );
    }
        return (
            <div className="process-overview-row">
                <div className="ant-card ant-card-bordered">
                    <div className="ant-card-head">
                        <div className="ant-card-head-wrapper">
                            <div className="ant-card-head-title">
                                        <span>
                                            <img
                                                className="recipe-icon"
                                                src={brewantThermometer}
                                            />
                                        </span>
                                Brew Profile
                            </div>
                        </div>
                    </div>
                    <div className="ant-card-body">
                        <Table
                            columns={brewColumns}
                            rowSelection={rowSelection}
                            dataSource={[]}
                            loading
                        />
                        ,
                    </div>
                </div>

                <div className="ant-card ant-card-bordered">
                    <div className="ant-card-head">
                        <div className="ant-card-head-wrapper">
                            <div
                                className="ant-card-head-title"
                            >
                                        <span>
                                            <img
                                                className="recipe-icon"
                                                src={brewantFermenter}
                                            />
                                        </span>
                                Ferment Profile
                            </div>
                        </div>
                    </div>
                    <div className="ant-card-body">
                        <Table
                            columns={fermentColumns}
                            rowSelection={rowSelection}
                            dataSource={[]}
                            loading
                        />
                        ,
                    </div>
                </div>

                <div className="ant-card ant-card-bordered">
                    <div className="ant-card-head">
                        <div className="ant-card-head-wrapper">
                            <div
                                className="ant-card-head-title"
                            >
                                <img
                                    className="recipe-icon"
                                    src={brewantPackaging}
                                />
                                Packaging Profile
                            </div>
                        </div>
                    </div>

                    <div className="ant-card-body">
                        <Table
                            columns={packagingColumns}
                            rowSelection={rowSelection}
                            dataSource={[]}
                            loading
                        />
                        ,
                    </div>
                </div>
            </div>
        );
}
}
import React from 'react';
import moment from 'moment';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css'
import '../../../assets/stylesheets/administration.scss'

import '../../../assets/stylesheets/index.scss'
import '../../../assets/stylesheets/recipes.scss'
import brewant_thermometer
    from '../../../assets/images/brewant_thermometer_ico.svg'
import brewant_fermenter
    from '../../../assets/images/brewant_fermenter_ico.svg'
import brewant_packaging
    from '../../../assets/images/brewant_packaging_ico.svg'
import brewant_grains from '../../../assets/images/brewant_grain_ico.svg'
import brewant_hops from '../../../assets/images/brewant_hop_ico.svg'
import brewant_yeasts from '../../../assets/images/brewant_yeast_ico.svg'
import brewant_miscs from '../../../assets/images/brewant_miscs_ico.svg'

import Readonly from './Readonly'
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
import AddFermentableModal from './add_fermentable_modal'
import RecipeFermentableCard from './recipe_fermentable_card'

import NavBar from './navbar'
import {Form} from "antd/lib/index";


import {
    Modal,
    Select, InputNumber,
    Input, DatePicker, TimePicker
} from 'antd';

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

const recipeFermentableColumns = [
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        render: text => <a href="javascript:;">{text}</a>
    },
    {
        title: 'SRM',
        dataIndex: 'srm_precise',
        key: 'srm_precise'
    },
    {
        title: 'Amount',
        dataIndex: 'amount',
        key: 'amount'
    },
    {
        title: 'Usage',
        dataIndex: 'usage',
        key: 'usage'
    }
];

const recipeHopColumns = [
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        render: text => <a href="javascript:;">{text}</a>
    },
    {
        title: 'Alpha Acid',
        dataIndex: 'alpha_acid',
        key: 'alpha_acid'
    },
    {
        title: 'Amount',
        dataIndex: 'amount',
        key: 'amount'
    },
    {
        title: 'Usage',
        dataIndex: 'usage',
        key: 'usage'
    }
];

const recipeYeastColumns = [
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        render: text => <a href="javascript:;">{text}</a>
    },
    {
        title: 'Amount',
        dataIndex: 'amount',
        key: 'amount'
    },
    {
        title: 'Usage',
        dataIndex: 'usage',
        key: 'usage'
    }
];

const recipeMiscColumns = [
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        render: text => <a href="javascript:;">{text}</a>
    },
    {
        title: 'Amount',
        dataIndex: 'amount',
        key: 'amount'
    },
    {
        title: 'Usage',
        dataIndex: 'usage',
        key: 'usage'
    }
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
        this.showModal = this.showModal.bind(this);
        this.handleRecipeFermentableSubmit = this.handleRecipeFermentableSubmit.bind(this);
    }

    componentDidMount() {
        if (this.state.selectedRecipe && this.state.selectedRecipe.id) {
            this.props.fetchRecipe({id: this.state.selectedRecipe.id});
        }
    }

    componentDidUpdate(prevProps, prevState) {
        // Typical usage (don't forget to compare props):
        if (prevProps.recipe.payload !== this.props.recipe.payload) {
            this.setState({recipe: this.props.recipe.payload});
        }
    }

    showModal() {
        this.setState({show_form: true});
    }

    saveFormRef = (formRef) => {
        this.formRef = formRef;
    }

    handleCancel = () => {
        this.setState({show_form: false});
    }

    handleRecipeFermentableSubmit(values) {
        const recipe = this.props.recipe;
        value['recipe_id'] = recipe.id;
        this.props.addRecipeFermentable(value);

    }

    handleCreateRecipeFermentable = () => {
        const form = this.formRef.props.form;
        form.validateFields((err, values) => {
            if (err) {
                return;
            }
            console.log('Received values of form: ', values);
            this.handleRecipeFermentableSubmit(values);
            this.setState({show_form: false});
        });
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

            let recipe_fermentables_data = [];
            let recipe_hops_data = [];
            let recipe_yeasts_data = [];
            let recipe_miscs_data = [];
            for (let i = 0; i < data.recipe_ingredients.length; i++) {
                let ingredient = data.recipe_ingredients[i]
                if (ingredient.category == 'fermentable') {
                    let currentTask = {
                        key: `recipe_fermentable_${ingredient.id}`,
                        name: ingredient.name,
                        srm_precise: ingredient.entity.srm_precise,
                        amount: `${ingredient.amount}${ingredient.amount_unit}`,
                        usage: ingredient.recipe_step
                    };
                    recipe_fermentables_data.push(currentTask);
                }
                else if (ingredient.category == 'hop') {
                    let currentTask = {
                        key: `recipe_hop_${ingredient.id}`,
                        name: ingredient.name,
                        alpha_acid: ingredient.entity.alpha_acid_min,
                        amount: `${ingredient.amount}${ingredient.amount_unit}`,
                        usage: ingredient.recipe_step
                    };
                    recipe_hops_data.push(currentTask);
                }
                else if (ingredient.category == 'yeast') {
                    let currentTask = {
                        key: `recipe_yeast_${ingredient.id}`,
                        name: ingredient.name,
                        amount: `${ingredient.amount}${ingredient.amount_unit}`,
                        usage: ingredient.recipe_step
                    };
                    recipe_yeasts_data.push(currentTask);
                }
                else if (ingredient.category == 'misc') {
                    let currentTask = {
                        key: `recipe_misc_${ingredient.id}`,
                        name: ingredient.name,
                        amount: `${ingredient.amount}${ingredient.amount_unit}`,
                        usage: ingredient.recipe_step
                    };
                    recipe_miscs_data.push(currentTask);
                }
            }


            return (

                <div className='recipe-contents'>
                    <AddFermentableModal
                        {...this.props}
                        wrappedComponentRef={this.saveFormRef}
                        visible={this.state.show_form}
                        onCancel={this.handleCancel}
                        onCreate={this.handleCreateRecipeFermentable}
                    />
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
                                        <li>
                                            <b>Volume per
                                                Turn: </b> {data.volume_per_turn} {data.volume_per_turn_unit}
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

                    <div className='operations-overview-row'>
                        <div className="ant-card-head-title">
                            Operations
                        </div>
                        <Readonly
                            resources={data.events.resources}
                            events={data.events.templates}
                        />
                    </div>

                    <div className='process-overview-row'>
                        <div className="ant-card ant-card-bordered">
                            <div className="ant-card-head">
                                <div className="ant-card-head-wrapper">
                                    <div className="ant-card-head-title">
                                        <span>
                                            <img className="recipe-icon"
                                                 src={brewant_thermometer}/>
                                        </span>
                                        Brew Profile
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
                                        className="ant-card-head-title">
                                        <span>
                                            <img className="recipe-icon"
                                                 src={brewant_fermenter}/>
                                        </span>
                                        Ferment Profile
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
                                        className="ant-card-head-title">
                                        <img className="recipe-icon"
                                             src={brewant_packaging}/>
                                        Packaging Profile
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

                    <div className='ingredients process-overview-row'>
                        <RecipeFermentableCard
                            selectedRecipe={this.state.selectedRecipe}
                            fetchRecipeFermentables={this.props.fetchRecipeFermentables}
                            recipe_fermentables={this.props.recipe_fermentables}
                            addRecipeFermentable={this.props.addRecipeFermentable}
                            deleteRecipeFermentable={this.props.deleteRecipeFermentable}
                        />

                        <div className="ant-card ant-card-bordered">
                            <div className="ant-card-head">
                                <div className="ant-card-head-wrapper">
                                    <div className="ant-card-head-title">
                                        <span>
                                            <img className="recipe-icon"
                                                 src={brewant_hops}/>
                                        </span>
                                        Hops
                                    </div>
                                </div>
                            </div>
                            <div className="ant-card-body">
                                <Table columns={recipeHopColumns}
                                       dataSource={recipe_hops_data}/>
                            </div>
                        </div>
                    </div>

                    <div className='ingredients process-overview-row'>
                        <div className="ant-card ant-card-bordered">
                            <div className="ant-card-head">
                                <div className="ant-card-head-wrapper">
                                    <div className="ant-card-head-title">
                                        <span>
                                            <img className="recipe-icon"
                                                 src={brewant_yeasts}/>
                                        </span>
                                        Yeasts
                                    </div>
                                </div>
                            </div>
                            <div className="ant-card-body">
                                <Table columns={recipeYeastColumns}
                                       dataSource={recipe_yeasts_data}/>
                            </div>
                        </div>

                        <div className="ant-card ant-card-bordered">
                            <div className="ant-card-head">
                                <div className="ant-card-head-wrapper">
                                    <div className="ant-card-head-title">
                                        <span>
                                            <img className="recipe-icon"
                                                 src={brewant_miscs}/>
                                        </span>
                                        Misc
                                    </div>
                                </div>
                            </div>
                            <div className="ant-card-body">
                                <Table columns={recipeMiscColumns}
                                       dataSource={recipe_miscs_data}/>
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
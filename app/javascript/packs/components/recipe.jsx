import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import '../../../assets/stylesheets/administration.scss';
import '../../../assets/stylesheets/index.scss';
import '../../../assets/stylesheets/recipes.scss';
import {
    Table,
} from 'antd';

import brewantThermometer
    from '../../../assets/images/brewant_thermometer_ico.svg';
import brewantFermenter
    from '../../../assets/images/brewant_fermenter_ico.svg';
import brewantPackaging
    from '../../../assets/images/brewant_packaging_ico.svg';
import brewantHops from '../../../assets/images/brewant_hop_ico.svg';
import brewantYeasts from '../../../assets/images/brewant_yeast_ico.svg';
import brewantMiscs from '../../../assets/images/brewant_miscs_ico.svg';

import Readonly from './Readonly';
import 'antd/dist/antd.css';
import RecipeFermentableCard
    from './recipe_fermentable/recipe_fermentable_card';

import RecipeEvent from './recipe_event/recipe_event';

import '../../../assets/stylesheets/schedule_request_list.scss';

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

const recipeHopColumns = [
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        render: text => <a href="javascript:;">{text}</a>,
    },
    {
        title: 'Alpha Acid',
        dataIndex: 'alpha_acid',
        key: 'alpha_acid',
    },
    {
        title: 'Amount',
        dataIndex: 'amount',
        key: 'amount',
    },
    {
        title: 'Usage',
        dataIndex: 'usage',
        key: 'usage',
    },
];

const recipeYeastColumns = [
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        render: text => <a href="javascript:;">{text}</a>,
    },
    {
        title: 'Amount',
        dataIndex: 'amount',
        key: 'amount',
    },
    {
        title: 'Usage',
        dataIndex: 'usage',
        key: 'usage',
    },
];

const recipeMiscColumns = [
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        render: text => <a href="javascript:;">{text}</a>,
    },
    {
        title: 'Amount',
        dataIndex: 'amount',
        key: 'amount',
    },
    {
        title: 'Usage',
        dataIndex: 'usage',
        key: 'usage',
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
        const { selectedRecipe, recipe } = this.props;
        this.state = {
            recipe: recipe.payload,
            selectedRecipe,
        };
        this.handleRecipeFermentableSubmit = this.handleRecipeFermentableSubmit.bind(this);
    }

    componentDidMount() {
        const { selectedRecipe } = this.state;
        const { fetchRecipe } = this.props;
        if (selectedRecipe && selectedRecipe.id) {
            fetchRecipe({ id: selectedRecipe.id });
        }
    }

    componentDidUpdate(prevProps, prevState) {
        // Typical usage (don't forget to compare props):
        console.log(prevState);
        const { recipe, selectedRecipe, fetchRecipe } = this.props;

        if (prevProps.selectedRecipe !== selectedRecipe) {
            fetchRecipe({ id: selectedRecipe.id });
        }
        if (prevProps.recipe.payload !== recipe.payload) {
            // eslint-disable-next-line react/no-did-update-set-state
            this.setState({ recipe: recipe.payload });
        }
    }

    handleRecipeFermentableSubmit(params) {
        const { addRecipeFermentable } = this.props;
        addRecipeFermentable(params);
    }

    render() {
        let data = null;
        const { recipe } = this.props;

        if (recipe && recipe.payload) {
            data = recipe.payload;
        }

        if (data) {
            const brewData = [];
            for (let i = 0; i < data.recipe_mash_tasks.length; i += 1) {
                const task = data.recipe_mash_tasks[i];
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
            for (let i = 0; i < data.recipe_ferment_tasks.length; i += 1) {
                const task = data.recipe_ferment_tasks[i];
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
            for (let i = 0; i < data.recipe_packaging_tasks.length; i += 1) {
                const task = data.recipe_packaging_tasks[i];
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

            const recipeFermentablesData = [];
            const recipeHopsData = [];
            const recipeYeastsData = [];
            const recipeMiscsData = [];
            for (let i = 0; i < data.recipe_ingredients.length; i += 1) {
                const ingredient = data.recipe_ingredients[i];
                if (ingredient.category === 'fermentable') {
                    const currentTask = {
                        key: `recipe_fermentable_${ingredient.id}`,
                        name: ingredient.name,
                        srm_precise: ingredient.entity.srm_precise,
                        amount: `${ingredient.amount}${ingredient.amount_unit}`,
                        usage: ingredient.recipe_step,
                    };
                    recipeFermentablesData.push(currentTask);
                } else if (ingredient.category === 'hop') {
                    const currentTask = {
                        key: `recipe_hop_${ingredient.id}`,
                        name: ingredient.name,
                        alpha_acid: ingredient.entity.alpha_acid_min,
                        amount: `${ingredient.amount}${ingredient.amount_unit}`,
                        usage: ingredient.recipe_step,
                    };
                    recipeHopsData.push(currentTask);
                } else if (ingredient.category === 'yeast') {
                    const currentTask = {
                        key: `recipe_yeast_${ingredient.id}`,
                        name: ingredient.name,
                        amount: `${ingredient.amount}${ingredient.amount_unit}`,
                        usage: ingredient.recipe_step,
                    };
                    recipeYeastsData.push(currentTask);
                } else if (ingredient.category === 'misc') {
                    const currentTask = {
                        key: `recipe_misc_${ingredient.id}`,
                        name: ingredient.name,
                        amount: `${ingredient.amount}${ingredient.amount_unit}`,
                        usage: ingredient.recipe_step,
                    };
                    recipeMiscsData.push(currentTask);
                }
            }


            return (

                <div className="recipe-contents">
                    <div className="recipe-overview-row">
                        <div className="ant-card ant-card-bordered">
                            <div className="ant-card-head">
                                <div className="ant-card-head-wrapper">
                                    <div
                                        className="ant-card-head-title"
                                    >
                                        {data.name}
                                    </div>
                                </div>
                            </div>
                            <div className="ant-card-body">
                                <div className="recipe-overview-body-flex">
                                    <div className="recipe-overview-slot">
                                        <li>
                                            <b>Name: </b>
                                            {' '}
                                            {data.name}
                                        </li>
                                        <li>
                                            <b>Style: </b>
                                            {' '}
                                            {data.brew_type}
                                        </li>
                                        <li>
                                            <b>
                                                Volume per
                                                Turn:
                                                {' '}
                                            </b>
                                            {' '}
                                            {data.volume_per_turn}
                                            {' '}
                                            {data.volume_per_turn_unit}
                                        </li>
                                    </div>
                                    <div className="recipe-overview-slot">
                                        <li>
                                            <b>Brew: </b>
                                            {' '}
                                            {data.brew_hours}
                                            {' '}
                                            Hours
                                        </li>
                                        <li>
                                            <b>Ferment: </b>
                                            {' '}
                                            {data.ferment_days}
                                            {' '}
                                            Days
                                        </li>
                                        <li>
                                            <b>Packaging: </b>
                                            {' '}
                                            {data.packaging_days}
                                            {' '}
                                            Days
                                        </li>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>


                    <RecipeEvent
                            selectedRecipe={this.props.selectedRecipe}
                            recipeEvents={this.props.recipe_events}
                            fetchRecipeEvents={this.props.fetchRecipeEvents}
                            updateRecipeEvents={this.props.updateRecipeEvents}
                            deleteRecipeEvents={this.props.deleteRecipeEvents}
                    />


                    <div className="ingredients process-overview-row">
                        <RecipeFermentableCard
                            selectedRecipe={this.props.selectedRecipe}
                            fetchRecipeFermentables={this.props.fetchRecipeFermentables}
                            recipeFermentables={this.props.recipe_fermentables}
                            addRecipeFermentable={this.props.addRecipeFermentable}
                            deleteRecipeFermentable={this.props.deleteRecipeFermentable}
                        />

                        <div className="ant-card ant-card-bordered">
                            <div className="ant-card-head">
                                <div className="ant-card-head-wrapper">
                                    <div className="ant-card-head-title">
                                        <span>
                                            <img
                                                className="recipe-icon"
                                                src={brewantHops}
                                            />
                                        </span>
                                        Hops
                                    </div>
                                </div>
                            </div>
                            <div className="ant-card-body">
                                <Table
                                    columns={recipeHopColumns}
                                    dataSource={recipeHopsData}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="ingredients process-overview-row">
                        <div className="ant-card ant-card-bordered">
                            <div className="ant-card-head">
                                <div className="ant-card-head-wrapper">
                                    <div className="ant-card-head-title">
                                        <span>
                                            <img
                                                className="recipe-icon"
                                                src={brewantYeasts}
                                            />
                                        </span>
                                        Yeasts
                                    </div>
                                </div>
                            </div>
                            <div className="ant-card-body">
                                <Table
                                    columns={recipeYeastColumns}
                                    dataSource={recipeYeastsData}
                                />
                            </div>
                        </div>

                        <div className="ant-card ant-card-bordered">
                            <div className="ant-card-head">
                                <div className="ant-card-head-wrapper">
                                    <div className="ant-card-head-title">
                                        <span>
                                            <img
                                                className="recipe-icon"
                                                src={brewantMiscs}
                                            />
                                        </span>
                                        Misc
                                    </div>
                                </div>
                            </div>
                            <div className="ant-card-body">
                                <Table
                                    columns={recipeMiscColumns}
                                    dataSource={recipeMiscsData}
                                />
                            </div>
                        </div>
                    </div>
                </div>

            );
        }
        return (
            <div>
                Not Loaded
            </div>
        );
    }
}

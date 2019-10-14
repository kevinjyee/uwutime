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
import AddFermentableModal from "../recipe_fermentable/add_fermentable_modal";
import AddRecipeEventBrewModal from "./add_recipe_event_brew_modal";
import AddRecipeEventFermentModal from "./add_recipe_event_ferment_modal";
import recipe from "../../reducers/recipe";

const TableContext = React.createContext(false);


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
            selectedMashTask: null,
            selectedFermentTask: null
        };

         this.brewColumns = [
            {
                title: 'Name',
                dataIndex: 'name',
                key: 'name',
                render: (text, record) => (
                    <span
                        className='recipe-table-clickable'
                        onClick={(e) => {
                            this.onMashTaskSelect(record, e);
                        }}
                    >
                        {text}
                    </span>)

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
            {
                title: '',
                dataIndex: '',
                key: 'x',
                render: (text, record) => (
                    <span
                        className={`recipe-table-delete`}
                        onClick={(e) => {
                            this.onMashTaskDelete(record, e);
                        }}
                    >
            <Icon type="delete" />
                    </span>
                ),
            }
        ];


        this.fermentColumns = [
            {
                title: 'Name',
                dataIndex: 'name',
                key: 'name',
                render: (text, record) => (
                    <span
                        className='recipe-table-clickable'
                        onClick={(e) => {
                            this.onFermentTaskSelect(record, e);
                        }}
                    >
                        {text}
                    </span>)

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
            {
                title: '',
                dataIndex: '',
                key: 'x',
                render: (text, record) => (
                    <span
                        className={`recipe-table-delete`}
                        onClick={(e) => {
                            this.onFermentTaskDelete(record, e);
                        }}
                    >
            <Icon type="delete" />
                    </span>
                ),
            }
        ];


        this.onMashTaskDelete = this.onMashTaskDelete.bind(this);
        this.onMashTaskSelect = this.onMashTaskSelect.bind(this);
        this.onFermentTaskDelete = this.onFermentTaskDelete.bind(this);
        this.createBrewEvent = this.createBrewEvent.bind(this);
        this.updateBrewEvent = this.updateBrewEvent.bind(this);
    }

    onMashTaskDelete = (record, e) => {
        const { deleteRecipeEvents } = this.props;
        e.preventDefault();
        const { selectedRecipe } = this.state;
        let parsed_record = record.key.split('_');
        let record_id = parsed_record[parsed_record.length - 1];
        const params = { id: selectedRecipe.id, recipe_mash_tasks: [{id: record_id, recipe_mash_steps: [{}] }]};

        deleteRecipeEvents(params);

        // deleteRecipeFermentable({ id: record.id });

    };

    onMashTaskSelect = (record, e) => {
        const { form } = this.formRef.props;
        let existingIds = [];
        for(let i =0; i < record.children.length; i++)
        {
            existingIds.push(i);
        }

        form.setFieldsValue({
            keys: existingIds
        })

        console.log(record);
        console.log(e);

        this.setState({
            show_add_brew_form: true,
            selectedMashTask: record,
            id: record.children.length
        })

    };

    onFermentTaskSelect = (record, e) => {
        const { form } = this.formRefFermentable.props;
        let existingIds = [];
        for(let i =0; i < record.children.length; i++)
        {
            existingIds.push(i);
        }

        form.setFieldsValue({
            keys: existingIds
        })

        console.log(record);
        console.log(e);

        this.setState({
            show_add_ferment_form: true,
            selectedFermentTask: record,
            id: record.children.length
        })

    };

    onFermentTaskDelete = (record, e) => {
        const { deleteRecipeEvents } = this.props;
        e.preventDefault();
        const { selectedRecipe } = this.state;
        let parsed_record = record.key.split('_');
        let record_id = parsed_record[parsed_record.length - 1];
        const params = { id: selectedRecipe.id, recipe_ferment_tasks: [{id: record_id, recipe_ferment_steps: [{}] }]};

        deleteRecipeEvents(params);
    };

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

    saveFormRefBrew = (formRef) => {
        this.formRef = formRef;
    }

    saveFormRefFermentable = (formRef) => {
        this.formRefFermentable = formRef;
    }

    createBrewEvent = (form, values) => {
        if (values.keys && values.keys.length > 0) {
            let recipeMashTask = { name: values.name };
            let recipeMashStepsRecords = [];
            values.keys.forEach((item, index) => {
                console.log(values.step_name[item]);
                const recipe_mash_steps = {
                    name: values.step_display_name[item],
                    display_name: values.step_name[item],
                    duration_hours: values.step_hours[item],
                    step_order: index
                }
                recipeMashStepsRecords.push(recipe_mash_steps);
            })

            recipeMashTask['recipe_mash_steps'] = recipeMashStepsRecords;
            const updateParams = { id: this.props.selectedRecipe.id, recipe_mash_tasks: [recipeMashTask] }
            this.props.updateRecipeEvents(updateParams);
        }
    }

    updateBrewEvent = (form, values) => {
        if (values.keys && values.keys.length > 0) {
            let mash_task_key =  this.state.selectedMashTask.key.split("_");
            let recipeMashTask = { name: values.name, id: mash_task_key[mash_task_key.length-1]};
            let recipeMashStepsRecords = [];
            values.keys.forEach((item, index) => {
                console.log(values.step_name[item]);

                let mash_step_id;
                if(values.mash_step_key && values.mash_step_key[item])
                {
                    let mash_step_key = values.mash_step_key[item].split("_");
                    mash_step_id = mash_step_key[mash_step_key.length-1];
                }

                const recipe_mash_steps = {
                    id: mash_step_id,
                    name: values.step_display_name[item],
                    display_name: values.step_name[item],
                    duration_hours: values.step_hours[item],
                    step_order: index
                }
                recipeMashStepsRecords.push(recipe_mash_steps);
            })

            recipeMashTask['recipe_mash_steps'] = recipeMashStepsRecords;
            const updateParams = { id: this.props.selectedRecipe.id, recipe_mash_tasks: [recipeMashTask] }
            this.props.updateRecipeEvents(updateParams);
        }
    }

    createFermentableEvent = (form, values) => {
        if (values.keys && values.keys.length > 0) {
            let recipeFermentableTask = { name: values.name };
            let recipeFermentableStepsRecords = [];
            values.keys.forEach((item, index) => {
                console.log(values.step_name[item]);
                const recipe_ferment_steps = {
                    name: values.step_display_name[item],
                    display_name: values.step_name[item],
                    day: parseInt(values.step_hours[item]),
                    step_order: index
                }
                recipeFermentableStepsRecords.push(recipe_ferment_steps);
            })

            recipeFermentableTask['recipe_ferment_steps'] = recipeFermentableStepsRecords;
            const updateParams = { id: this.props.selectedRecipe.id, recipe_ferment_tasks: [recipeFermentableTask] }
            this.props.updateRecipeEvents(updateParams);
        }
    }

    handleCreateBrewEvent = () => {
        const { form } = this.formRef.props;

        form.validateFields((err, values) => {
            if (!err) {
                const { keys, names } = values;
                console.log('Received values of form: ', values);

                if(this.state.selectedMashTask)
                {
                    this.updateBrewEvent(form, values);
                }
                else
                {
                    this.createBrewEvent(form, values);
                }

                form.resetFields();
                this.setState({show_add_brew_form: false})
            }
        });
    }

    handleCreateFermentableEvent = () => {
        const { form } = this.formRefFermentable.props;

        form.validateFields((err, values) => {
            if (!err) {
                const { keys, names } = values;
                console.log('Received values of form: ', values);

                // if(this.state.selectedMashTask)
                // {
                //     this.updateBrewEvent(form, values);
                // }
                // else
                // {
                //     this.createBrewEvent(form, values);
                // }

                this.createFermentableEvent(form, values);

                form.resetFields();
                this.setState({show_add_brew_form: false})
            }
        });
    }

    metaDataCallBack = (params) => {
        this.setState(params);
    }

    showAddBrewModal =() => {
        this.setState({ show_add_brew_form: true });
    }

    showAddFermentModal =() => {
        this.setState({ show_add_ferment_form: true });
    }

    handleAddBrewCancel = () => {
        const { form } = this.formRef.props;
        form.resetFields();
        this.setState({ show_add_brew_form: false, show_add_ferment_form: false, selectedMashTask: null, selectedFermentTask: null });
    }

    handleAddFermentCancel = () => {
        const { form } = this.formRefFermentable.props;
        form.resetFields();
        this.setState({ show_add_brew_form: false, show_add_ferment_form: false, selectedMashTask: null, selectedFermentTask: null });
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
                    display_name: step.display_name,
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
                <div>
                    <AddRecipeEventBrewModal
                        {...this.props}
                        wrappedComponentRef={this.saveFormRefBrew}
                        metaDataCallBack={this.metaDataCallBack}
                        selectedMashTask={this.state.selectedMashTask}
                        visible={this.state.show_add_brew_form}
                        onCancel={this.handleAddBrewCancel}
                        onCreate={this.handleCreateBrewEvent}
                        id={this.state.id}
                        isNew
                    />

                    <AddRecipeEventFermentModal
                        {...this.props}
                        wrappedComponentRef={this.saveFormRefFermentable}
                        metaDataCallBack={this.metaDataCallBack}
                        selectedFermentTask={this.state.selectedFermentTask}
                        visible={this.state.show_add_ferment_form}
                        onCancel={this.handleAddFermentCancel}
                        onCreate={this.handleCreateFermentableEvent}
                        id={this.state.id}
                    />

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
                                        <span className="ingredient-button-container">
                                            <Button
                                                className="add-request-btn"
                                                type="primary"
                                                onClick={this.showAddBrewModal}
                                            >
                                                <Icon type="plus" /> Add
                                            </Button>
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="ant-card-body">
                                <Table
                                    columns={this.brewColumns}
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
                                        <span className="ingredient-button-container">
                                            <Button
                                                className="add-request-btn"
                                                type="primary"
                                                onClick={this.showAddFermentModal}
                                            >
                                                <Icon type="plus" /> Add
                                            </Button>
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="ant-card-body">
                                <Table
                                    columns={this.fermentColumns}
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
                            columns={this.brewColumns}
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
                            columns={this.fermentColumns}
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
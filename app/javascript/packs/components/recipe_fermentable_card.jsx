import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css'
import '../../../assets/stylesheets/administration.scss'
import '../../../assets/stylesheets/index.scss'
import '../../../assets/stylesheets/recipes.scss'
import brewant_grains from '../../../assets/images/brewant_grain_ico.svg'
import 'antd/dist/antd.css';
import AddFermentableModal from './add_fermentable_modal'


import {Table, Button, Icon} from 'antd';

import '../../../assets/stylesheets/schedule_request_list.scss'

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
        dataIndex: 'amount_and_unit',
        key: 'amount_and_unit'
    },
    {
        title: 'Usage',
        dataIndex: 'usage',
        key: 'usage'
    }
];


export default class RecipeFermentableCard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            recipe_fermentables: this.props.recipe_fermentables.payload,
            selectedRecipe: this.props.selectedRecipe,
            selectedFermentable: null,
            selectedRecipeStep: null
        }
        this.showModal = this.showModal.bind(this);
        this.handleRecipeFermentableSubmit = this.handleRecipeFermentableSubmit.bind(this);
    }

    componentDidMount() {
        if (this.state.selectedRecipe && this.state.selectedRecipe.id) {
            this.props.fetchRecipeFermentables({recipe_id: this.state.selectedRecipe.id})
        }
    }

    componentDidUpdate(prevProps, prevState) {
        // Typical usage (don't forget to compare props):
        if (prevProps.recipe_fermentables.payload !== this.props.recipe_fermentables.payload) {
            this.setState({recipe_fermentables: this.props.recipe_fermentables.payload});
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

    metaDataCallBack = (params) => {
        this.setState(params);
    }

    handleRecipeFermentableSubmit(values) {
        const recipe = this.state.selectedRecipe
        const fermentable = this.state.selectedFermentable;

        let newRecipeFermentableParams = {
            recipe_id: recipe.id,
            fermentable_id: fermentable.id,
            srm_precise: values['srm_precise'],
            recipe_ingredient: {recipe_id: recipe.id, amount: values['amount']}
        }


        this.props.addRecipeFermentable(newRecipeFermentableParams);


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
        let recipe_fermentables_data = null;

        if (this.props.recipe_fermentables && this.props.recipe_fermentables.payload) {
            recipe_fermentables_data = this.props.recipe_fermentables.payload
        }

        if (recipe_fermentables_data) {
            return (
                <div className="ant-card ant-card-bordered">

                    <AddFermentableModal
                        {...this.props}
                        wrappedComponentRef={this.saveFormRef}
                        metaDataCallBack={this.metaDataCallBack}
                        visible={this.state.show_form}
                        onCancel={this.handleCancel}
                        onCreate={this.handleCreateRecipeFermentable}
                    />
                    <div className="ant-card-head">
                        <div className="ant-card-head-wrapper">
                            <div className="ant-card-head-title">
                                        <span>
                                            <img className="recipe-icon"
                                                 src={brewant_grains}/>
                                        </span>
                                Malts, Grains & Fermentables
                                <span className='ingredient-button-container'>
                                        <Button className='add-request-btn'
                                                type="primary"
                                                onClick={this.showModal}
                                        >
                                            <Icon type="plus"/> Add
                                        </Button>
                                        </span>
                            </div>
                        </div>
                    </div>
                    <div className="ant-card-body">
                        <Table columns={recipeFermentableColumns}
                               dataSource={recipe_fermentables_data}/>
                    </div>
                </div>
            )
        }
        else {
            return (
                <div className="ant-card ant-card-bordered">
                    <div className="ant-card-head">
                        <div className="ant-card-head-wrapper">
                            <div className="ant-card-head-title">
                                        <span>
                                            <img className="recipe-icon"
                                                 src={brewant_grains}/>
                                        </span>
                                Malts, Grains & Fermentables
                                <span className='ingredient-button-container'>
                                        <Button className='add-request-btn'
                                                type="primary"
                                                onClick={this.showModal}
                                        >
                                            <Icon type="plus"/> Add
                                        </Button>
                                        </span>
                            </div>
                        </div>
                    </div>
                    <div className="ant-card-body">
                        <Table columns={recipeFermentableColumns}
                               dataSource={recipe_fermentables_data}
                               loading={true}/>
                    </div>
                </div>
            )
        }

    }
}
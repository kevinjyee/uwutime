import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import '../../../../assets/stylesheets/index.scss';
import '../../../../assets/stylesheets/recipes.scss';
import brewantGrains from '../../../../assets/images/brewant_grain_ico.svg';
import 'antd/dist/antd.css';
import AddFermentableModal from './add_fermentable_modal';
import ShowFermentableModal from './show_fermentable_modal';
import { TweenOneGroup } from 'rc-tween-one';
import { Table, Button, Icon } from 'antd';

const TableContext = React.createContext(false);

export default class RecipeFermentableCard extends React.Component {
    static defaultProps = {
        className: 'recipe-table',
    };

    constructor(props) {
        super(props);
        const { className } = this.props;
        this.state = {
            recipeFermentables: this.props.recipeFermentables.payload,
            selectedRecipe: this.props.selectedRecipe,
            selectedFermentable: null,
            selectedRecipeStep: null,
            isPageTween: false,
        };

        this.recipeFermentableColumns = [

            {
                title: 'Name',
                dataIndex: 'name',
                key: 'name',
                render: (text, record) => (
                    <span
                        className={`${className}-clickable`}
                        onClick={(e) => {
                            this.onSelect(record, e);
                        }}
                    >
                        {text}
                    </span>
                ),
            },
            {
                title: 'SRM',
                dataIndex: 'srm_precise',
                key: 'srm_precise',
            },
            {
                title: 'Amount',
                dataIndex: 'amount_and_unit',
                key: 'amount_and_unit',
            },
            {
                title: 'Usage',
                dataIndex: 'usage',
                key: 'usage',
            },
            {
                title: '',
                dataIndex: '',
                key: 'x',
                render: (text, record) => (
                    <span
                        className={`${className}-delete`}
                        onClick={(e) => {
                            this.onDelete(record, e);
                        }}
                    >
            <Icon type="delete" />
                    </span>
                ),
            },
        ];

        this.enterAnim = [
            {
                opacity: 0, x: 30, backgroundColor: '#fffeee', duration: 0,
            },
            {
                height: 0,
                duration: 200,
                type: 'from',
                delay: 250,
                ease: 'easeOutQuad',
                onComplete: this.onEnd,
            },
            {
                opacity: 1, x: 0, duration: 250, ease: 'easeOutQuad',
            },
            { delay: 1000, backgroundColor: '#fff' },
        ];
        this.pageEnterAnim = [
            {
                opacity: 0, duration: 0,
            },
            {
                height: 0,
                duration: 150,
                type: 'from',
                delay: 150,
                ease: 'easeOutQuad',
                onComplete: this.onEnd,
            },
            {
                opacity: 1, duration: 150, ease: 'easeOutQuad',
            },
        ];
        this.leaveAnim = [
            { duration: 250, opacity: 0 },
            { height: 0, duration: 200, ease: 'easeOutQuad' },
        ];
        this.pageLeaveAnim = [
            { duration: 150, opacity: 0 },
            { height: 0, duration: 150, ease: 'easeOutQuad' },
        ];

        this.animTag = $props => (
            <TableContext.Consumer>
                {isPageTween => (
                    <TweenOneGroup
                        component="tbody"
                        enter={!isPageTween ? this.enterAnim : this.pageEnterAnim}
                        leave={!isPageTween ? this.leaveAnim : this.pageLeaveAnim}
                        appear={false}
                        exclusive
                        {...$props}
                    />
                )}
            </TableContext.Consumer>
        );

        this.showAddModal = this.showAddModal.bind(this);
        this.handleRecipeFermentableSubmit = this.handleRecipeFermentableSubmit.bind(this);
        this.onSelect = this.onSelect.bind(this);
        this.onDelete = this.onDelete.bind(this);
    }

    componentDidMount() {
        const { selectedRecipe } = this.state;
        const { fetchRecipeFermentables } = this.props;
        if (selectedRecipe && selectedRecipe.id) {
            fetchRecipeFermentables({ recipe_id: selectedRecipe.id });
        }
    }

    componentDidUpdate(prevProps, prevState) {
        console.log(prevState);
        const { recipeFermentables } = this.props;
        // Typical usage (don't forget to compare props):
        if (prevProps.recipeFermentables.payload !== recipeFermentables.payload) {
            // eslint-disable-next-line react/no-did-update-set-state
            this.setState({ recipeFermentables: recipeFermentables.payload });
        }
    }

    onEnd = (e) => {
        const dom = e.target;
        dom.style.height = 'auto';
    }

    onAdd = () => {
        const { data } = this.state;
        const i = Math.round(Math.random() * (this.data.length - 1));
        data.unshift({
            key: Date.now(),
            name: this.data[i].name,
            age: this.data[i].age,
            address: this.data[i].address,
        });
        this.setState({
            data,
            isPageTween: false,
        });
    };

    onDelete = (record, e) => {
        const { deleteRecipeFermentable } = this.props;
        e.preventDefault();
        const { recipeFermentables } = this.state;
        const remainingFermentables = recipeFermentables.filter(item => item.id !== record.id);
        deleteRecipeFermentable({ id: record.id });
        this.setState({
            recipeFermentables: remainingFermentables,
            isPageTween: false,
        });
    };


    pageChange = () => {
        this.setState({
            isPageTween: true,
        });
    };

    onSelect = (record, index, event) => {
        console.log(record);
        console.log(index);
        console.log(event);

        this.setState({
            show_show_form: true,
            selectedFermentable: record,

        });
    }

    handleAddCancel = () => {
        this.setState({ show_add_form: false });
    }

    handleShowCancel = () => {
        this.setState({ show_show_form: false });
    }

    handleCreateRecipeFermentable = () => {
        const { form } = this.formRef.props;
        form.validateFields((err, values) => {
            if (err) {
                return;
            }
            console.log('Received values of form: ', values);
            this.handleRecipeFermentableSubmit(values);
            this.setState({ show_add_form: false, isPageTween: false });
        });
    }

    handleSaveRecipeFermentable = () => {
        this.setState({ show_show_form: false });
    }

    saveFormRef = (formRef) => {
        this.formRef = formRef;
    }

    metaDataCallBack = (params) => {
        this.setState(params);
    }

    showAddModal() {
        this.setState({ show_add_form: true });
    }

    showShowModal() {
        this.setState({ show_show_form: true });
    }

    handleRecipeFermentableSubmit(values) {
        const { selectedRecipe, selectedFermentable } = this.state;
        const recipe = selectedRecipe;
        const fermentable = selectedFermentable;

        const newRecipeFermentableParams = {
            recipe_id: recipe.id,
            fermentable_id: fermentable.id,
            srm_precise: values.srm_precise,
            dry_yield: values.dry_yield,
            potential: values.potential,
            recipe_ingredient: {
                recipe_id: recipe.id,
                amount: values.amount,
                amount_unit: 'lb(s)',
            },
        };

        this.props.addRecipeFermentable(newRecipeFermentableParams);
    }

    render() {
        const { recipeFermentables } = this.state;
        let recipeFermentablesData = null;

        if (recipeFermentables) {
            recipeFermentablesData = recipeFermentables;
        }

        if (recipeFermentablesData) {
            return (
                <div className="ant-card ant-card-bordered">

                    <AddFermentableModal
                        {...this.props}
                        wrappedComponentRef={this.saveFormRef}
                        metaDataCallBack={this.metaDataCallBack}
                        visible={this.state.show_add_form}
                        onCancel={this.handleAddCancel}
                        onCreate={this.handleCreateRecipeFermentable}
                    />

                    <ShowFermentableModal
                        {...this.props}
                        visible={this.state.show_show_form}
                        selected_fermentable={this.state.selectedFermentable}
                        onCancel={this.handleShowCancel}
                        onCreate={this.handleSaveRecipeFermentable}
                    />

                    <div className="ant-card-head">
                        <div className="ant-card-head-wrapper">
                            <div className="ant-card-head-title">
                                        <span>
                                            <img
                                                className="recipe-icon"
                                                src={brewantGrains}
                                            />
                                        </span>
                                Malts, Grains & Fermentables
                                <span className="ingredient-button-container">
                                        <Button
                                            className="add-request-btn"
                                            type="primary"
                                            onClick={this.showAddModal}
                                        >
                                            <Icon type="plus" />
                                            {' '}
                                            Add
                                        </Button>
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="ant-card-body">
                        <TableContext.Provider value={this.state.isPageTween}>
                            <Table
                                columns={this.recipeFermentableColumns}
                                dataSource={recipeFermentablesData}
                                components={{ body: { wrapper: this.animTag } }}
                                onChange={this.pageChange}

                            />
                        </TableContext.Provider>
                    </div>
                </div>
            );
        }
        return (
            <div className="ant-card ant-card-bordered">
                <div className="ant-card-head">
                    <div className="ant-card-head-wrapper">
                        <div className="ant-card-head-title">
                                        <span>
                                            <img
                                                className="recipe-icon"
                                                src={brewantGrains}
                                            />
                                        </span>
                            Malts, Grains & Fermentables
                        </div>
                    </div>
                </div>
                <div className="ant-card-body">
                    <Table
                        columns={this.recipeFermentableColumns}
                        dataSource={recipeFermentablesData}
                        loading
                    />
                </div>
            </div>
        );
    }
}

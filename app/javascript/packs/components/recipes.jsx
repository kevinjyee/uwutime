import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import '../../../assets/stylesheets/administration.scss';

import '../../../assets/stylesheets/index.scss';
import '../../../assets/stylesheets/recipes.scss';
import 'antd/dist/antd.css';
import {
    List, message, Avatar, Spin,
} from 'antd';
import { Link } from 'react-router-dom';
import WindowScroller from 'react-virtualized/dist/commonjs/WindowScroller';
import AutoSizer from 'react-virtualized/dist/commonjs/AutoSizer';
import VList from 'react-virtualized/dist/commonjs/List';
import InfiniteLoader from 'react-virtualized/dist/commonjs/InfiniteLoader';
import beericon from '../../../assets/images/beer-icon.svg';
import Recipe from './recipe';

import NavBar from './navbar';


import '../../../assets/stylesheets/schedule_request_list.scss';

export default class Recipes extends React.Component {
    loadedRowsMap = {};

    constructor(props) {
        super(props);
        this.state = {
            show_form: false,
            recipes: this.props.recipes.payload || [],
            loading: this.props.recipes.isLoading,
            selectedRecipe: null,
            previousClickKey: null,
        };
        this.recipeListItem = null;
        this.showModal = this.showModal.bind(this);
        this.setRecipeListItemRef = this.setRecipeListItemRef(this);
    }

    componentDidMount() {
        this.props.fetchRecipes();
    }

    setRecipeListItemRef = element => {
        this.recipeListItem = element;
    }

    handleInfiniteOnLoad = ({ startIndex, stopIndex }) => {
        const data = this.state.recipes;
        this.setState({
            loading: true,
        });
        for (let i = startIndex; i <= stopIndex; i++) {
            // 1 means loading
            this.loadedRowsMap[i] = 1;
        }
        if (data.length > 19) {
            message.warning('Virtualized List loaded all');
            this.setState({
                loading: false,
            });
            return;
        }
        this.props.fetchRecipes();
    };

    isRowLoaded = ({ index }) => !!this.loadedRowsMap[index];

    selectRecipe = (item, clickKey) => {
        console.log(item);

        if (this.state.previousClickKey) {
            this[this.state.previousClickKey].className="recipe-item-container"
            this[this.state.previousClickKey].style.backgroundColor = '';
        }
        this[clickKey].style.backgroundColor = 'aliceblue';

        this.setState({
            selectedRecipe: item,
            previousClickKey: clickKey
        });



    }

    renderItem = ({ index, key, style }) => {
        const { recipes, selectedRecipe } = this.state;
        const item = recipes[index];

        let className = "recipe-item-container";

        if (selectedRecipe && item.id == selectedRecipe.id)
        {
            className = "recipe-item-container list-item-selected";
        }

        let clickKey = `RecipeItem${item.id}`;
        return (
            <div
                className={className}
                key={clickKey}
                id={clickKey}
                ref={input => {
                    this[clickKey] = input;
                }}
                 onClick={() => {
                     this.selectRecipe(item, clickKey);
                 }}
            >
                <List.Item key={key} style={style}>
                    <List.Item.Meta
                        avatar={<Avatar src={beericon} />}
                        title={item.name}
                        description={item.brew_type}
                    />
                </List.Item>
            </div>
        );
    };

    componentDidUpdate(prevProps, prevState) {
        // Typical usage (don't forget to compare props):
        if (prevProps.recipes.payload !== this.props.recipes.payload) {
            this.setState({ recipes: this.props.recipes.payload });
            if (this.props.recipes.payload && this.props.recipes.payload.length > 0 && this.state.selectedRecipe == null) {
                this.setState({ selectedRecipe: this.props.recipes.payload[0], previousClickKey: `RecipeItem${this.props.recipes.payload[0].id}` });

            }
        }

        if (prevProps.recipes.isLoading !== this.props.recipes.isLoading) {
            this.setState({ loading: this.props.recipes.isLoading });
        }
    }

    showModal() {
        this.setState({ show_form: true });
    }


    saveFormRef = (formRef) => {
        this.formRef = formRef;
    }


    handleCancel = () => {
        this.setState({ show_form: false });
    }


    handleCreate = () => {
        const { form } = this.formRef.props;
        form.validateFields((err, values) => {
            if (err) {
                return;
            }

            console.log('Received values of form: ', values);

            const vessel_params = {
                identifier: values.identifier,
                volume: values.volume,
                volume_unit: values.volume_unit,
                vessel_type: values.vessel_type,
            };

            this.props.addVessel(vessel_params);

            form.resetFields();
            this.setState({ show_form: false });
        });
    }

    render() {
        const data = this.state.recipes;

        if (data && data.length > 0) {
            const vlist = ({
                               height, isScrolling, onChildScroll, scrollTop, onRowsRendered, width,
                           }) => (
                <VList
                    autoHeight
                    height={height}
                    isScrolling={isScrolling}
                    onScroll={onChildScroll}
                    overscanRowCount={2}
                    rowCount={data.length}
                    rowHeight={73}
                    rowRenderer={this.renderItem}
                    onRowsRendered={onRowsRendered}
                    scrollTop={scrollTop}
                    width={width}
                />
            );
            const autoSize = ({
                                  height, isScrolling, onChildScroll, scrollTop, onRowsRendered,
                              }) => (
                <AutoSizer disableHeight>
                    {({ width }) => vlist({
                        height,
                        isScrolling,
                        onChildScroll,
                        scrollTop,
                        onRowsRendered,
                        width,
                    })
                    }
                </AutoSizer>
            );
            const infiniteLoader = ({
                                        height, isScrolling, onChildScroll, scrollTop,
                                    }) => (
                <InfiniteLoader
                    isRowLoaded={this.isRowLoaded}
                    loadMoreRows={this.handleInfiniteOnLoad}
                    rowCount={data.length}
                >
                    {({ onRowsRendered }) => autoSize({
                        height,
                        isScrolling,
                        onChildScroll,
                        scrollTop,
                        onRowsRendered,
                    })
                    }
                </InfiniteLoader>
            );

            return (
                <div>
                    <NavBar currentPage="2" />
                    <div className="recipe-flex-container">
                        <div className="recipe-list-container">
                            <List>
                                {data.length > 0
                                && <WindowScroller>{infiniteLoader}</WindowScroller>}
                                {this.state.loading
                                && <Spin className="demo-loading" />}
                            </List>
                        </div>
                        <Recipe
                            selectedRecipe={this.state.selectedRecipe}
                            recipe={this.props.recipe}
                            recipe_fermentables={this.props.recipe_fermentables}
                            recipe_events={this.props.recipe_events}
                            fetchRecipe={this.props.fetchRecipe}
                            fetchRecipeFermentables={this.props.fetchRecipeFermentables}
                            addRecipeFermentable={this.props.addRecipeFermentable}
                            deleteRecipeFermentable={this.props.deleteRecipeFermentable}
                            fetchRecipeEvents={this.props.fetchRecipeEvents}
                            updateRecipeEvents={this.props.updateRecipeEvents}
                            deleteRecipeEvents={this.props.deleteRecipeEvents}

                        />
                    </div>

                </div>

            );
        }

        return (
            <div>
                <NavBar currentPage="2" />
            </div>
        );
    }
}

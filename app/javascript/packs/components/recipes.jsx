import React from 'react';
import moment from 'moment';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css'
import '../../../assets/stylesheets/administration.scss'

import '../../../assets/stylesheets/index.scss'
import '../../../assets/stylesheets/recipes.scss'
import beericon from '../../../assets/images/beer-icon.svg'
import 'antd/dist/antd.css';
import { List, message, Avatar, Spin } from 'antd';
import { Link } from 'react-router-dom';
import WindowScroller from 'react-virtualized/dist/commonjs/WindowScroller';
import AutoSizer from 'react-virtualized/dist/commonjs/AutoSizer';
import VList from 'react-virtualized/dist/commonjs/List';
import InfiniteLoader from 'react-virtualized/dist/commonjs/InfiniteLoader';
import Recipe from './recipe'

import AdminSubMenu from './admin_sub_menu'
import AddVesselModal from './add_vessel_modal'

import NavBar from './navbar'

import {Table, Button, Icon} from 'antd';

import '../../../assets/stylesheets/schedule_request_list.scss'

const columns = [{
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: (text, record) => <Link to={'/administration/profile/' + record.id}>{text}</Link>,
    width: 300,
}, {
    title: 'Brew Hours',
    dataIndex: 'brew_hours',
    key: 'brew_hours',
    width: 300,
}, {
    title: 'Ferment Days',
    dataIndex: 'ferment_days',
    key: 'ferment_days',
    width: 300,
}, {
    title: 'Packaging Days',
    dataIndex: 'packaging_days',
    key: 'packaging_days',
    width: 300,
}];

const success = () => {
    message.success('Request successfully submitted');
};


export default class Recipes extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            show_form: false,
            recipes: this.props.recipes.payload || [],
            loading: this.props.recipes.isLoading,
            selectedRecipe: null,
        }
        this.showModal = this.showModal.bind(this);
    }

    loadedRowsMap = {};

    componentDidMount() {
        this.props.fetchRecipes();
    }


    handleInfiniteOnLoad = ({ startIndex, stopIndex }) => {
        let data = this.state.recipes;
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

    selectRecipe = (item) => {
        console.log(item);
    }

    renderItem = ({ index, key, style }) => {
        const { recipes } = this.state;
        const item = recipes[index];
        return (
            <div className='recipe-item-container' key={item.id} onClick={() => {this.selectRecipe(item);}}>
            <List.Item key={key} style={style}>
                <List.Item.Meta
                    avatar={<Avatar src={beericon} />}
                    title={<a href="https://ant.design">{item.name}</a>}
                    description={item.brew_type}
                />
            </List.Item>
            </div>
        );
    };

    componentDidUpdate(prevProps, prevState) {
        // Typical usage (don't forget to compare props):
        if (prevProps.recipes.payload !== this.props.recipes.payload) {
            this.setState({recipes: this.props.recipes.payload});
            if (this.props.recipes.payload && this.props.recipes.payload.length > 0 && this.state.selectedRecipe == null) {
                this.setState({selectedRecipe: this.props.recipes.payload[0]})
            }
        }

        if (prevProps.recipes.isLoading !== this.props.recipes.isLoading) {
            this.setState({loading: this.props.recipes.isLoading});
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


    handleCreate = () => {
        const form = this.formRef.props.form;
        form.validateFields((err, values) => {
            if (err) {
                return;
            }

            console.log('Received values of form: ', values);

            var vessel_params = {
                identifier: values['identifier'],
                volume: values['volume'],
                volume_unit: values['volume_unit'],
                vessel_type: values['vessel_type']
            }

            this.props.addVessel(vessel_params);

            form.resetFields();
            this.setState({show_form: false});
        });
    }

    render() {
        let data = this.state.recipes;

        if (data && data.length > 0) {

            const vlist = ({ height, isScrolling, onChildScroll, scrollTop, onRowsRendered, width }) => (
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
            const autoSize = ({ height, isScrolling, onChildScroll, scrollTop, onRowsRendered }) => (
                <AutoSizer disableHeight>
                    {({ width }) =>
                        vlist({
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
            const infiniteLoader = ({ height, isScrolling, onChildScroll, scrollTop }) => (
                <InfiniteLoader
                    isRowLoaded={this.isRowLoaded}
                    loadMoreRows={this.handleInfiniteOnLoad}
                    rowCount={data.length}
                >
                    {({ onRowsRendered }) =>
                        autoSize({
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
                    <NavBar currentPage="2"/>
                    <div className = 'recipe-flex-container'>
                        <div className='recipe-list-container'>
                        <List>
                            {data.length > 0 && <WindowScroller>{infiniteLoader}</WindowScroller>}
                            {this.state.loading && <Spin className="demo-loading" />}
                        </List>
                        </div>
                    <Recipe
                        selectedRecipe={this.state.selectedRecipe}
                        recipe={this.props.recipe}
                        fetchRecipe={this.props.fetchRecipe}
                    />
                    </div>

                </div>

            )
        }
        else {
            return (
                <div>
                    <NavBar currentPage="2"/>
                </div>
            )
        }

    }
}
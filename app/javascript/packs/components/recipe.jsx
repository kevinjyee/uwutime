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


export default class Recipe extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedRecipe: this.props.selectedRecipe,
            recipe: this.props.recipe.payload
        }
    }


    componentDidMount() {
        if(this.state.selectedRecipe && this.state.selectedRecipe.id) {
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
        let data = this.state.selectedRecipe;

        if (data) {

            return (
                <div className='recipe-contents'>

                    <div className='recipe-overview-row'>
                    <div className="ant-card ant-card-bordered">
                        <div className="ant-card-head">
                            <div className="ant-card-head-wrapper">
                                <div className="ant-card-head-title">{data.name}
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
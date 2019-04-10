import React from 'react';

export default class ScheduleRequestForm extends React.Component{

    constructor(props) {
        super(props)
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange(e) {
        var name = e.target.name;
        obj = {};
        obj[name] = e.target.value;
        this.props.onUserInput(obj);
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.onFormSubmit();
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <input name='input_product_name' placeholder='Product Name' value={this.props.input_product_name} onChange={ this.handleChange }/>
                <input name='input_prefererred_time' placeholder='Preferred Time' value={this.props.input_preferred_time} onChange={this.handleChange}/>
                <input type='submit' value='Submit'/>
            </form>
        )
    }
}
import React from 'react';
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import Button from 'antd/lib/button';

export default class ScheduleRequestForm extends React.Component{

    constructor(props) {
        super(props)
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.setDatePicked = this.setDatePicked.bind(this)
    }

    handleChange(e) {
        var name = e.target.name;
        const obj = {};
        obj[name] = e.target.value;
        this.props.onUserInput(obj);
    }

    setDatePicked(e) {
        var name = 'input_preferred_date';
        var obj = {};
        if(obj[name] = e.toDate()) {
            this.props.onUserInput(obj);
        }
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.onFormSubmit();
    }

    render() {
        var inputProps = {
            name: 'input_preferred_date'
        }

        return (



            <form onSubmit={this.handleSubmit}>

                <div className="form-row">
                        <input name='input_product_name' placeholder='Product Name'
                               value={this.props.input_product_name}
                               onChange={ this.handleChange }/>

                        <DatePicker
                            selected={this.props.input_preferred_date}
                            onChange={this.handleChange}
                        />

                    <Button type="primary" htmlType="submit">Submit</Button>
                </div>


            </form>
        )
    }
}
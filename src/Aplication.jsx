import React from 'react';
import autobind from 'autobind-decorator';

import Field from './components/field.jsx';
import Form from './components/form.jsx';
import { saveToLocalStorage, loadFromLocalStorage } from './utils/data';

const STORE_NAME = 'heavy';

export default class Application extends React.Component {
    state = {
        name: '',
        hours: 0,
        days: 0,
        perDay: 0,
        today: 0,
    }

    componentDidMount() {
        const data = loadFromLocalStorage(STORE_NAME);
        this.setState(data);
    }

    componentDidUpdate() {
        saveToLocalStorage(STORE_NAME, this.state);
    }

    render() {
        return (
            <div>
                <Form>
                    <Field
                        label="Task name"
                        value={this.state.name}
                        onChange={this.handleChangeTaskName}
                    />
                    <Field
                        label="Hours"
                        value={this.state.hours}
                        onChange={this.handleChangeTaskHours}
                    />
                    <Field
                        label="Days"
                        value={this.state.days}
                        onChange={this.handleChangeTaskDays}
                    />
                    <div>
                        You have to work {this.state.perDay} hours per day.
                    </div>
                </Form>
                <Form onSubmit={this.handleChangeTaskSubmitTodayInput}>
                    <div>Days remaining: {this.state.days}</div>
                    <div>Work today: {this.state.perDay - this.state.today}</div>
                    <Field
                        label="Today work"
                        value={this.state.todayInput}
                        onChange={this.handleChangeTaskTodayInput}
                    />
                    <button>
                        Add
                    </button>
                </Form>
            </div>
        );
    }

    @autobind
    handleChangeTaskName(name) {
        this.setState({
            name,
        });
    }

    @autobind
    handleChangeTaskHours(hours) {
        this.setState({
            hours,
            perDay: hours / this.state.days
        });
    }

    @autobind
    handleChangeTaskDays(days) {
        this.setState({
            days,
            perDay: this.state.hours / days
        });
    }

    @autobind
    handleChangeTaskSubmitTodayInput() {
        if (this.state.todayInput === '') return;

        this.setState({
            today: parseInt(this.state.today) + parseInt(this.state.todayInput),
            todayInput: ''
        });
    }

    @autobind
    handleChangeTaskTodayInput(todayInput) {
        this.setState({
            todayInput,
        });
    }
}
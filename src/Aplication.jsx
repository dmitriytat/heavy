import React from 'react';
import autobind from 'autobind-decorator';
import moment from 'moment';

import Field from './components/field/field.jsx';
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
        date: Date.now(),
        dayDiff: 0
    }

    componentDidMount() {
        const data = loadFromLocalStorage(STORE_NAME);

        if (!data) return;

        const now = moment(Date.now());
        const then = moment(data.date ? data.date : Date.now());

        console.log(now.format(), then.format());

        const dayDiff = now.diff(then, 'days');
        console.log(dayDiff);

        data.dayDiff = dayDiff;

        this.setState(data);
    }

    componentDidUpdate() {
        saveToLocalStorage(STORE_NAME, this.state);
    }

    render() {
        return (
            <div>
                <Form>
                    <div>Date: {moment(this.state.date).format('MMMM Do YYYY, h:mm:ss a')}</div>
                    <div>dayDiff: {this.state.dayDiff}</div>
                </Form>
                <Form>
                    <Field
                        id="task-name"
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
                {!this.state.dayDiff &&
                <Form onSubmit={this.handleChangeTaskSubmitTodayInput}>
                    <div>Days remaining: {this.state.days}</div>
                    <div>Work today: {this.state.today > 0 ? this.state.today : `You over worked ${this.state.today - this.state.perDay}`}</div>
                    <Field
                        label="Today work"
                        value={this.state.todayInput}
                        onChange={this.handleChangeTaskTodayInput}
                    />
                    <button>
                        Add
                    </button>
                </Form>
                }
                {!!this.state.dayDiff &&
                <Form>
                    <div>You don't work: {this.state.dayDiff} day{this.state.dayDiff > 1 ? 's' : ''}</div>
                    <div>Move today: {this.state.today + (this.state.dayDiff - 1) * this.state.perDay} hours</div>
                    <div>Spread: {(this.state.today + (this.state.dayDiff - 1) * this.state.perDay) / (this.state.days - this.state.dayDiff)} instead {this.state.perDay} per day</div>
                </Form>
                }
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
            today: parseInt(this.state.today) - parseInt(this.state.todayInput),
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
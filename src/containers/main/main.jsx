import React from 'react';
import { connect } from 'react-redux';
import autobind from 'autobind-decorator';
import moment from 'moment';

import * as actions from '../../actions.js';

import Field from '../../components/field/field.jsx';
import Button from '../../components/button/button.jsx';
import Form from '../../components/form.jsx';

import './main.css';
const cn = require('bem-cn')('main');

@connect(state => {
    var perDay = moment.duration(state.perDay, 'hours');
    var perDayHours = Math.floor(perDay.asHours());
    var perDayMinutes = Math.floor(perDay.asMinutes()) - perDayHours * 60;

    var d = moment.duration(state.daysHours[0], 'hours');
    var hours = Math.floor(d.asHours());
    var minutes = Math.floor(d.asMinutes()) - hours * 60;

    return {
        name: state.name,
        elapsed: state.elapsed,
        perDay: {
            hours: perDayHours,
            minutes: perDayMinutes,
        },
        today: {
            hours: hours,
            minutes: minutes,
        },
    }
})
export default class Main extends React.Component {
    render() {
        const today = this.formatTime(this.props.today);
        const perDay = this.formatTime(this.props.perDay);

        return (
            <Form className={cn()}>
                {today &&
                <div className={cn('title')}>
                    {this.props.name}: {today} to work today. ({perDay} per day)
                </div>
                }
                <Field
                    label="Elapsed minutes"
                    value={this.props.elapsed}
                    onChange={this.handleChangeElapsed}
                />
                <div className={cn('space')}></div>
                <Button onClick={this.addToday}>Add time</Button>
                <Button onClick={this.handleGoSettings}>Settings</Button>
            </Form>
        );
    }

    formatTime(time) {
        if (time.hours < 0) return 'nothing';

        const hours = time.hours && `${time.hours} hours` || '';
        const minutes = time.minutes && `${time.minutes} minutes` || '';

        return (hours + ' ' + minutes).trim();
    }

    @autobind
    handleChangeElapsed(elapsed) {
        this.props.dispatch(actions.changeElapsed(elapsed));
    }

    @autobind
    addToday() {
        this.props.dispatch(actions.addToday());
    }

    @autobind
    handleGoSettings() {
        this.props.dispatch(actions.changePage('Settings'));
    }
}

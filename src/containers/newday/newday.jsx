import React from 'react';
import { connect } from 'react-redux';
import autobind from 'autobind-decorator';
import moment from 'moment';

import * as actions from '../../actions.js';

import Field from '../../components/field/field.jsx';
import Button from '../../components/button/button.jsx';
import Form from '../../components/form.jsx';

import './newday.css';
const cn = require('bem-cn')('newday');

@connect(state => {
    console.log(state.perDay , state.daysHours[0] , (state.days - 1), state.perDay + state.daysHours[0] / (state.days - 1))
    var perDay = moment.duration(state.perDay + state.daysHours[0] / (state.days - 1), 'hours');
    var perDayHours = Math.floor(perDay.asHours());
    var perDayMinutes = Math.floor(perDay.asMinutes()) - perDayHours * 60;

    var today = moment.duration(state.daysHours[0] + state.daysHours[1], 'hours');
    var hours = Math.floor(today.asHours());
    var minutes = Math.floor(today.asMinutes()) - hours * 60;

    var stayed = moment.duration(state.daysHours[0], 'hours');
    var stayedHours = Math.floor(stayed.asHours());
    var stayedMinutes = Math.floor(stayed.asMinutes()) - stayedHours * 60;

    return {
        name: state.name,
        elapsed: state.elapsed,
        spread: {
            hours: perDayHours,
            minutes: perDayMinutes,
        },
        today: {
            hours: hours,
            minutes: minutes,
        },
        stayed: {
            hours: stayedHours,
            minutes: stayedMinutes,
        },
    }
})
export default class Newday extends React.Component {
    render() {
        const today = this.formatTime(this.props.today);
        const spread = this.formatTime(this.props.spread);
        const stayed = this.formatTime(this.props.stayed);

        return (
            <Form className={cn()}>
                {stayed &&
                <div className={cn('title')}>
                    {this.props.name}: {stayed} stayed.
                </div>
                }
                <div className={cn('title')}>
                    Move today: {today} today.
                </div>
                <div className={cn('title')}>
                    Spread: {spread} per day.
                </div>
                <div className={cn('space')}></div>
                <Button onClick={this.moveToday}>Move today</Button>
                <Button onClick={this.spreadOverAll}>Spread over all</Button>
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
    moveToday() {
        this.props.dispatch(actions.moveToday());
    }

    @autobind
    spreadOverAll() {
        this.props.dispatch(actions.spreadOverAll());
    }
}

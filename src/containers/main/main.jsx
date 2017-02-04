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
    const today = (state.hours / state.days - state.worked) || 0 ;

    var d = moment.duration(today, 'hours');
    var todayHours = Math.floor(d.asHours());
    var todayMinutes = Math.floor(d.asMinutes()) - todayHours * 60;

    var worked = moment.duration(state.worked, 'hours');
    var workedHours = Math.floor(worked.asHours());
    var workedMinutes = Math.floor(worked.asMinutes()) - workedHours * 60;

    return {
        name: state.name,
        elapsed: state.elapsed,
        today: {
            hours: todayHours,
            minutes: todayMinutes,
        },
        worked: {
            hours: workedHours,
            minutes: workedMinutes,
        },
    }
})
export default class Main extends React.Component {
    render() {
        const today = this.formatTime(this.props.today);
        const worked = this.formatTime(this.props.worked);

        return (
            <Form className={cn()}>
                {today &&
                <div className={cn('title')}>
                    {this.props.name}: {today} to work today. {worked && `Worked ${worked}.`}
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

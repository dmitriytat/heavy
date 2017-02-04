import React from 'react';
import { connect } from 'react-redux';
import autobind from 'autobind-decorator';
import moment from 'moment';

import * as actions from './actions.js';
import * as commonActions from '../../actions.js';

import Field from '../../components/field/field.jsx';
import Button from '../../components/button/button.jsx';
import Form from '../../components/form.jsx';

import './settings.css';
const cn = require('bem-cn')('settings');

@connect(state => {
    const perDay = state.settings.hours / state.settings.days || 0;

    var d = moment.duration(perDay, 'hours');
    var hours = Math.floor(d.asHours());
    var minutes = Math.floor(d.asMinutes()) - hours * 60;

    return {
        name: state.settings.name,
        hours: state.settings.hours,
        days: state.settings.days,
        perDay: {
            hours,
            minutes,
        },
    }
})
export default class Settings extends React.Component {
    render() {
        const hours = this.props.perDay.hours && `${this.props.perDay.hours} hours` || '';
        const minutes = this.props.perDay.minutes && `${this.props.perDay.minutes} minutes` || '';

        return (
            <Form className={cn()}>
                <Field
                    label="Task"
                    value={this.props.name}
                    onChange={this.handleChangeTaskName}
                />
                <Field
                    label="Hours"
                    value={this.props.hours}
                    onChange={this.handleChangeTaskHours}
                />
                <Field
                    label="Days"
                    value={this.props.days}
                    onChange={this.handleChangeTaskDays}
                >
                </Field>
                {(hours || minutes) &&
                <div>
                    You have to work {hours} {minutes} per day.
                </div>
                }
                <div className={cn('space')}></div>
                <Button onClick={this.handleGoOut}>Ok</Button>
            </Form>
        );
    }

    @autobind
    handleChangeTaskName(name) {
        this.props.dispatch(actions.changeSettings({ name }));
    }

    @autobind
    handleChangeTaskHours(hours) {
        this.props.dispatch(actions.changeSettings({ hours: parseInt(hours) >= 0 ? parseInt(hours) : 0 }));
    }

    @autobind
    handleChangeTaskDays(days) {
        this.props.dispatch(actions.changeSettings({ days: parseInt(days) >= 0 ? parseInt(days) : 1 }));
    }

    @autobind
    handleGoOut() {
        this.props.dispatch(commonActions.changePage('Main'));
    }
}

import React from 'react';
import autobind from 'autobind-decorator';

import './field.css';
const cn = require('bem-cn')('field');

export default class Field extends React.Component {
    static propTypes = {
        id: React.PropTypes.string,
        label: React.PropTypes.string,
        value: React.PropTypes.oneOfType([
            React.PropTypes.string,
            React.PropTypes.number,
        ]),
        type: React.PropTypes.string,
        onChange: React.PropTypes.func,
    }

    static defaultProps = {
        label: '',
        value: '',
        type: 'text',
        onChange: () => {},
    }

    render () {
        return (
            <div
                id={this.props.id}
                className={cn()}
            >
                <label className={cn('label')} >{this.props.label}</label>
                <div>
                    <input
                        className={cn('input')}
                        type={this.props.type}
                        value={this.props.value}
                        onChange={this.handleChange}
                    />
                </div>
            </div>
        );
    }

    @autobind
    handleChange(event) {
        this.props.onChange(event.target.value);
    }
}
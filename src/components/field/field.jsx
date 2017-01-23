import React from 'react';
import autobind from 'autobind-decorator';

export default class Field extends React.Component {
    static propTypes = {
        id: React.PropTypes.string,
        label: React.PropTypes.string,
        value: React.PropTypes.string,
        onChange: React.PropTypes.func,
    }

    static defaultProps = {
        label: '',
        value: '',
        onChange: () => {},
    }

    render () {
        return (
            <div id={this.props.id}>
                <label>{this.props.label}</label>
                <br/>
                <input
                    type="text"
                    value={this.props.value}
                    onChange={this.handleChange}
                />
            </div>
        );
    }

    @autobind
    handleChange(event) {
        this.props.onChange(event.target.value);
    }
}
import React from 'react';
import autobind from 'autobind-decorator';

import './form.css';
const cn = require('bem-cn')('form');

export default class Form extends React.Component {
    static propTypes = {
        onSubmit: React.PropTypes.func,
    }

    static defaultProps = {
        onSubmit: () => {
        },
    }

    render() {
        return (
            <form
                onSubmit={this.handleSubmit}
                className={cn.mix(this.props.className)}
            >
                {this.props.children}
            </form>
        );
    }

    @autobind
    handleSubmit(event) {
        event.preventDefault();
        this.props.onSubmit(event);
    }
}
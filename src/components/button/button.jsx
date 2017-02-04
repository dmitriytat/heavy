import React from 'react';

import './button.css';
const cn = require('bem-cn')('button');

export default class Button extends React.Component {
    static propTypes = {
        onClick: React.PropTypes.func,
    }

    static defaultProps = {
        onClick: () => {},
    }

    render() {
        return (
            <button
                className={cn()}
                onClick={this.props.onClick}
            >
                {this.props.children}
            </button>
        );
    }
}
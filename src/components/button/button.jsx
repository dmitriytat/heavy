import React from 'react';
import autobind from 'autobind-decorator';

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
                onClick={this.handleClick}
            >
                {this.props.children}
            </button>
        );
    }

    @autobind
    handleClick(e) {
        e.preventDefault();
        this.props.onClick(e);
    }
}

import React from 'react';
import autobind from 'autobind-decorator';

const FORM_STYLE = {
    marginBottom: '20px'
}

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
                style={FORM_STYLE}
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
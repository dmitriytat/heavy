import React from 'react';
import { connect } from 'react-redux';
// import autobind from 'autobind-decorator';
// import moment from 'moment';
//
// import { startTimeOut } from './actions';
//
// import Field from './components/field/field.jsx';
// import Form from './components/form.jsx';
// import { saveToLocalStorage, loadFromLocalStorage } from './utils/data';

import Settings from './containers/settings/settings.jsx';

import './Application.css';

const cn = require('bem-cn')('application');

@connect(state => ({
    page: state.global.page,
}))
export default class Application extends React.Component {
    render() {
        return (
            <div className={cn()}>
                {this.props.page === 'Settings' && <Settings />}
            </div>
        );
    }
}

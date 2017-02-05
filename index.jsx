import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';

import './reset.css';

import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import createLogger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';

import Application from './src/Aplication.jsx';

import rootReducer from './src/reducers';
import sagas from './src/sagas';

import {
    saveToLocalStorage,
    loadFromLocalStorage
} from './src/utils/data';

const initialState = Object.assign({
        page: 'Settings',

        elapsed: 0,

        name: '',
        hours: 0,
        days: 1,
        perDay: 0,

        oldDate: Date.now(),

        daysHours: [],
    },
    loadFromLocalStorage('heavy')
);

const sagaMiddleware = createSagaMiddleware();
const logger = createLogger();

const finalCreateStore = compose(
    applyMiddleware(
        sagaMiddleware, logger,
    ),
    typeof window === 'object' && typeof window.devToolsExtension !== 'undefined' ? window.devToolsExtension() : f => f
)(createStore);

const store = finalCreateStore(rootReducer, initialState);

sagaMiddleware.run(sagas);

render(
    <Provider store={store}>
        <Application />
    </Provider>,
    document.getElementById('root')
);

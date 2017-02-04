import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';

import './reset.css';

import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import createLogger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';

import Application from './src/Aplication.jsx';

import rootReducer from './src/root';
import sagas from './src/sagas';

const initialState = {
    global: {
        page: 'Settings',
    },
    settings: {
        name: '',
        hours: '',
        endDate: '',
    }
};

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

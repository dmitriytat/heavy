import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';

import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import createLogger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';

import Application from './src/Aplication.jsx';

import reducers from './src/reducers';
import sagas from './src/sagas';

const initialState = {
    message: 'asdf'
};

const sagaMiddleware = createSagaMiddleware();
const logger = createLogger();

const finalCreateStore = compose(
    applyMiddleware(
        sagaMiddleware, logger,
    ),
    typeof window === 'object' && typeof window.devToolsExtension !== 'undefined' ? window.devToolsExtension() : f => f
)(createStore);

const store = finalCreateStore(reducers, initialState);

sagaMiddleware.run(sagas);

render(
    <Provider store={store}>
        <Application />
    </Provider>,
    document.getElementById('root')
);

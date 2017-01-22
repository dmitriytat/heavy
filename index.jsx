import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';

import Application from './src/Aplication.jsx';

render(<Application />, document.querySelector('#root'));
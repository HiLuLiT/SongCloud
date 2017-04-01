import 'normalize.css/normalize.css';
import 'roboto-fontface/css/roboto/roboto-fontface.css';
import 'font-awesome/css/font-awesome.css';
import './assets/styles/main.scss';

import ReactDOM from 'react-dom';
import React from 'react';

import Root from './components/Root'

ReactDOM.render(<Root/>, document.querySelector('#root'));

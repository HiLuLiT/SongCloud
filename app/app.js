import 'normalize.css/normalize.css';
import 'roboto-fontface/css/roboto/roboto-fontface.css';
import 'font-awesome/css/font-awesome.css';
import './assets/styles/main.scss';

import ReactDOM from 'react-dom';
import React from 'react';
import Routes from './components/routes/Routes'
import store from './store';

function renderApp() {
  ReactDOM.render(<Routes/>, document.querySelector('#root'));
}

renderApp();

store.subscribe(() => {
  renderApp();
});

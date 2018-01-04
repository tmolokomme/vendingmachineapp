import React from 'react';
import ReactDOM from 'react-dom';
import { combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
//import rootReducer from './reducers/';
//import Async from './middlewares/async';
//import store from './store';
//const client = require('./client');

import {initStore} from './store';
import App from 'components/app';

//import registerServiceWorker from './registerServiceWorker';


const store = initStore();

ReactDOM.render(
<Provider store={store}>
<App />
</Provider>,
document.getElementById('container'));
//registerServiceWorker();


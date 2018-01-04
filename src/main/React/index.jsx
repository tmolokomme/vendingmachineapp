import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from './reducers';
import Async from './middlewares/async';
import store from './store';
//const client = require('./client');

import App from './components/app';

import registerServiceWorker from './registerServiceWorker';

const storeWithMiddleware = applyMiddleware(Async)(createStore);

ReactDOM.render(
<Provider store={storeWithMiddleware(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())}>
<App />
</Provider>,
document.getElementById('container'));
registerServiceWorker();

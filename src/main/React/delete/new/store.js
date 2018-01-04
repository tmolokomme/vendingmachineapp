import { createStore, applyMiddleware } from 'redux'
import rootReducer from './reducers';
import Async from './middlewares/async';

const store = createStore(rootReducer);

const storeWithMiddleware = applyMiddleware(Async)(store);

export default storeWithMiddleware;
import thunkMiddleware from 'redux-thunk'
import { createStore, combineReducers, applyMiddleware } from 'redux'
//import rootReducer from './reducers';
import Async from './middlewares/async';
import * as reducers from 'reducers'


//const store = createStore(rootReducer);
const reducer  = combineReducers(reducers)

//const storeWithMiddleware = applyMiddleware(thunkMiddleware)(createStore)(Async)(reducer);

//export default storeWithMiddleware;

//---
//import thunkMiddleware from 'redux-thunk'
//import { createStore, combineReducers, applyMiddleware } from 'redux'
//import * as reducers from 'reducers'

//const reducer  = combineReducers(reducers)

export function initStore(initialState){
    return applyMiddleware(thunkMiddleware)(createStore)(Async)(reducer, initialState)

}

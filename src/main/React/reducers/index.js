import { combineReducers } from 'redux';
import beveragesReducer from './beverages';

const rootReducer = combineReducers({
	beverages: beveragesReducer
});

export default rootReducer;
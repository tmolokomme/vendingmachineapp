import
{
    FETCH_BEVERAGES,
    EXPORT_BEVERAGE,
    UPDATE_DISPLAY,
    ACCEPT_PAYMENT
} from '../actions/types';
import _ from 'underscore';

const initialState = {
    data: [],
    selected: {},
    message: 'Please select a product...',
    userAmount: 0
};

const beverages = (state = initialState, action) => {

    switch(action.type) {

        case 'FETCH_BEVERAGES':

            // fetching data using mock rest service [action.payload.data ]
            // fetching data using static data [action.payload ]
            // fetching data using spring rest api [action.payload.embedded.beverages ]

            console.debug(' FETCH_BEVERAGES.action', action);

            return {
                ...state,
                data: [ ...action.payload.data ],
                selected: {}
            };

        case 'EXPORT_BEVERAGE':

            //console.debug(' EXPORT_BEVERAGE.action', action);

            return {
                ...state,
                //data: [ ...action.payload ],
                selected: action.selectedBeverage
            };

        case 'UPDATE_DISPLAY':

            //console.debug(' UPDATE_DISPLAY.action', action);

            return {
                ...state,
                message: action.message
            };

        case 'ACCEPT_PAYMENT':

            //console.debug(' ACCEPT_PAYMENT.action', action);

            return {
                ...state,
                userAmount: state.userAmount += action.userAmount
            };

        case 'RESET':

            //console.debug(' RESET.action', action);

            return {
                ...state,
                userAmount: action.userAmount,
                selected: action.selected,
                message: initialState.message
            };

        case 'DEDUCT_PRODUCT':

            //console.debug(' DEDUCT_PRODUCT.action', action);

            // We have two options for updating the display product list.
            // 1. Do this in the frontend, take this selected (returned from backend) and
            //    using js, update the list here ourselves.
            // 2. Do this in the backend, return a list each time we make a sale (maybe
            //    not so perfomant). However this makes it easy in that we will just
            //    replace this state list with the one received from the backend. action.payload.embbeded.data

            let original = state.data.slice();
            let updatedItem = action.payload.data;

            // replace the updated product in the original list
            _.extend(_.findWhere(original, { name: updatedItem.name }), updatedItem);

            // in the new state, set the update list instead
            return {
                ...state,
                data: [ ...original ],
                selected: action.payload.data
            };

        default:
            return state;
    }

};

export default beverages;

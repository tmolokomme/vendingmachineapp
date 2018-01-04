import axios from 'axios';

import { FETCH_BEVERAGES, EXPORT_BEVERAGE, UPDATE_DISPLAY, ACCEPT_PAYMENT, RESET, DEDUCT_PRODUCT } from './types';

export const fetchBeverages = () => {

    let request = axios.get('http://localhost:8080/product/beverages');
    return {
        type: FETCH_BEVERAGES,
        payload: request
    }
};

export const exportBeverage = (selectedBeverage) => {

    const exportedBeverage = {
        type: EXPORT_BEVERAGE,
        selectedBeverage
    };
    //console.debug('[ Export beverage action ]', exportedBeverage);
    return exportedBeverage;
};

export const updateDisplay = (message) => {

    const latestMessage = {
        type: UPDATE_DISPLAY,
        message
    };
    //console.debug('[ Update display action ]', latestMessage);
    return latestMessage;
};

export const acceptPayment = (userAmount) => {

    const payment = {
        type: ACCEPT_PAYMENT,
        userAmount
    };
    //console.debug('[ Accept payment action ]', payment);
    return payment;
};

export const reset = (resetObject) => {

    const reset = {
        type: RESET,
        userAmount: resetObject.userAmount,
        message: resetObject.message,
        selected: resetObject.selected
    };
    //console.debug('[ Accept payment action ]', reset);
    return reset;
};

export const deductProduct = (selectedBeverage) => {

    let request = axios.get('http://localhost:8080/product/beverage/deduct/' + selectedBeverage.id);
    return {
        type: DEDUCT_PRODUCT,
        payload: request
    };
};

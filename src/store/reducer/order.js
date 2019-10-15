import * as actionTypes from '../action/actionTypes';

const initState = {
    orders: [],
    loading: false,
    purchased: false
}



const reducer = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.PURCHASE_INIT: 
        return {
            ...state,
            purchased: false
        }
        case actionTypes.PURCHASE_STATE:
            return {
                ...state,
                loading: true
            }
        case actionTypes.PURCHASE_SUC:
            const newOrder = {
                ...action.orderData,
                purchased: true,
                id: action.orderId
            }
            return {
                ...state,
                orders: state.orders.concat(newOrder),
                loading: false
            }
        case actionTypes.PURCHASE_FAIL:
            return {
                ...state,
                loading: false
            }
        case actionTypes.ORDER_START:
            return {
                ...state,
                loading: true
            }
        case actionTypes.ORDER_SUC:
            return {
                ...state,
                order: action.order,
                loading: false
            }
        case actionTypes.ORDER_FAIL:
            return {
                ...state,
                loading: false
            }
        default:
            return state;
    }
}

export default reducer;
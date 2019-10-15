import * as actionTypes from './actionTypes';
import axios from '../../axios-orders'


export const purchaseSuc = (id, orderData) => {
    return {
        type: actionTypes.PURCHASE_SUC,
        orderId: id,
        orderData: orderData
    }
}


export const purchaseFail = (error) => {
    return {
        type: actionTypes.PURCHASE_FAIL,
        error: error
    }
}

export const purchaseState = () => {
    return {
        type: actionTypes.PURCHASE_STATE
    }
}

export const purchaseReady = (orderData, token) => {
    return dispatch => {
        dispatch(purchaseState());
        axios.post('/order.json?auth=' + token, orderData)
        .then(Response => {
           dispatch(purchaseSuc(Response.data.name, orderData))
        })
        .catch(error => {
            dispatch(purchaseFail(error))
        });

    }
}


export const purchaseInit = () => {
    return {
        type: actionTypes.PURCHASE_INIT
    }
}


export const orderSuc = order => {
    return {
        type: actionTypes.ORDER_SUC,
        order: order
    }
}

export const orderFail = (error) => {
    return {
        type: actionTypes.ORDER_FAIL,
        error: error
    }
}

export const orderStart = () => {
    return {
        type: actionTypes.ORDER_START
    }
}

export const order = (token, userId) => {
    return dispatch => {
        dispatch(orderStart());
        const queryParams = '?auth=' + token + '&orderBy="userId"&equalTo="' + userId + '"';
        axios.get('/order.json' + queryParams).then(res => {
            const fetchOrders = [];
                for ( let key in res.data ) {
                    fetchOrders.push( {
                        ...res.data[key],
                        id: key
                    } );
                }
            dispatch(orderSuc(fetchOrders))
        }).catch(err => {
            dispatch(orderFail(err))
        })
    }
}

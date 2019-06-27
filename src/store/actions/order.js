import * as actionTypes from './actionTypes';
import axios from '../../axios-order';

export const purchaseBurgerSuccess = (id, orderData) => {
    return {
        type: actionTypes.PURCHASE_BURGER_SUCCESS,
        orderId: id,
        orderData: orderData
    }
}

export const purchaseBurgerFail = (error) => {
    return{
        type: actionTypes.PURCHASE_BURGER_FAIL,
        error: error
    };
}

export const purchaseBurgerStart = () => {
    return{
        type: actionTypes.PURCHASE_BURGER_START,
        loading: true
    }
}

export const purchaseBurger = (orderData) => {
    return dispatch => {
        dispatch(purchaseBurgerStart());
        axios.post('/orders.json ', orderData)
        .then(response => {
            console.log(response.data);
          dispatch(purchaseBurgerSuccess(response.data.name, orderData))           
        })
        .catch( error => {
            dispatch(purchaseBurgerFail(error));
        });
    };
};

export const purchaseInit = () =>{
    return{
        type: actionTypes.PURCHASE_INIT
    }
} 



export const fetchOrdersSuccess = (orders) => {
    return {
        type: actionTypes.FETCH_ORDERS_SUCCESS,
        orders: orders
    }
}

export const fetchOrdersFail = (error) => {
    return{
        type: actionTypes.FETCH_ORDERS_FAIL,
        error: error
    };
}

export const fetchOrdersStart = () => {
    return{
        type: actionTypes.FETCH_ORDERS_START
    }
}

export const fetchOrders = () =>{
    return dispatch =>{
        dispatch(fetchOrdersStart());
        let fetchedOrders = [];
        axios.get('/orders.json').then(res => {
            for(let el in res.data){
                fetchedOrders.push({
                    ...res.data[el],
                    id: el
                });
            }
            console.log(fetchedOrders);
           dispatch(fetchOrdersSuccess(fetchedOrders));
        }).catch(err => {
            console.log(err);
            dispatch(fetchOrdersFail(err));
        });  
    }
}
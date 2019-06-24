import  * as actionTypes from '../actions/actionTypes';

const initialState = {
    ingredients: null,
    price: 3,
    orderability: false,
    error: false
}

const INGREDIENT_PRICES = {
    salad: 0.2,
    bacon: 0.5,
    meat: 1.2,
    cheese: 0.4
}

const reducer = (state = initialState, action) =>{
    switch (action.type){
        case actionTypes.ADD_INGREDIENT:{

            return{
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] + 1
                },
                price: state.price + INGREDIENT_PRICES[action.ingredientName],
            }
        }
        case actionTypes.REMOVE_INGREDIENT:{
            return{
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] - 1
                },
                price: state.price - INGREDIENT_PRICES[action.ingredientName]
            }
        }
        case actionTypes.SET_INGREDIENTS:{
            return{
                ...state,
                ingredients: action.ingredients,
                error: false,
                price: 3
            }
        }
        case actionTypes.FETCH_INGREDIENTS_FAILED:{
            return{
                ...state,
                error: true
            }
        }
        default:
            return state
    }
}

export default reducer;
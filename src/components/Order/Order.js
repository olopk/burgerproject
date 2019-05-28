import React from 'react';
import classes from './Order.module.css';

const Order = (props) => {
    
    const ingredients = [];

    for(let ingredientName in props.ingredients){
        ingredients.push({name: ingredientName, amount: props.ingredients[ingredientName]})
    }

    const parseIng = ingredients.map(el => {

        return (
            <span style={{
                textTransform: 'capitalize',
                display: 'inline-block',
                margin: '0 8px',
                border: '1px solid #eee',
                padding: '5px'}}
            
            >{el.name}:{el.amount}</span>
        )
    })

    return (
        <div className={classes.Order}>
            <p>Ingredients: {parseIng}</p>
            <p>Price : <strong>{props.price}</strong></p>
        </div>
    );
}

export default Order;
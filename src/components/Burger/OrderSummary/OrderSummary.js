import React from 'react';
import Aux from '../../../hoc/Auxiliary/Auxiliary';
import Button from '../../UI/Button/Button';

const orderSummary = (props) => {
    const summaryList = Object.keys(props.ingredients).map(el => { 
        return (
            <li key={el}>
                <span style={{textTransform: 'capitalize'}}>{el}</span>: {props.ingredients[el]}
            </li>
        );
    });

    return(
    <Aux>
        <h3>Your Order</h3>
        <p> Burger with: </p>
        <p><strong>Total Price: {props.totalPrice.toFixed(2)}$</strong></p>
        <ul>
            {summaryList}
        </ul>
        <Button type="Danger" clicked={props.cancel}>CANCEL</Button>
        <Button type="Success" clicked={props.continue}>CONTINUE</Button>
    </Aux>
    )
};

export default orderSummary
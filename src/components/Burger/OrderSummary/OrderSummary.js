import React from 'react';
import Aux from '../../../hoc/Aux';

const orderSummary = (props) => {
    const summaryList = Object.keys(props.ingredients).map(el => { 
        return (
            <li key={el}>
                <span style={{textTransform: 'capitalize'}}>{props.ingredients[el]}</span>: {el}
            </li>
        );
    });

    return(
    <Aux>
        <h3>Your Order</h3>
        <p> Burger with: </p>
        <ul>
            {summaryList}
        </ul>
    </Aux>
    )
};

export default orderSummary
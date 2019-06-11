import React from 'react';
import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';
import classess from './CheckoutSummary.module.css';

const checkoutSummary = (props) => {
    return(

        <div className={classess.CheckoutSummary}>
            <h1> Hope it was good</h1>
            <div style={{width: '100%', margin: 'auto'}}>
                <Burger ingredients={props.ingredients}/>
            </div>
            <Button type="Danger" clicked={props.checkoutCanceled}>CANCEL</Button>
            <Button type="Success" clicked={props.checkoutContinued}>CONTINUE</Button>
        </div>
    )

}

export default checkoutSummary;
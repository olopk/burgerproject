import React from 'react';
import classes from './Burger.module.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

// import {withRouter} from 'react-router-dom';

const burger = (props) => {
    console.log(props);
    let transformedIngredients = Object.keys(props.ingredients)
    .map(igKey =>{
        return [...Array(props.ingredients[igKey])].map((_,i) => {
            return <BurgerIngredient key={igKey + i} type={igKey}/>
        })
    }).reduce((prev,curr) => {
        return prev.concat(curr)
    },[]);

    if (transformedIngredients.length === 0){
        transformedIngredients = 'Add some ingredients man'
    }

    return (
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top"/>
            {transformedIngredients}
            <BurgerIngredient type="bread-bottom"/>
        </div>
    );
};

// export default withRouter(burger);
export default burger;
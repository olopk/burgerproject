import React, { Component } from 'react';
import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

const INGREDIENT_PRICES = {
    salad: 0.2,
    bacon: 0.5,
    meat: 1.2,
    cheese: 0.4
}

class BurgerBuilder extends Component{
    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
    price: 3    
    }
    
    addIngredient = (type) => {
        const oldCount = this.state.ingredients[type];
        const newCount = oldCount +1;
        const updIngr = {...this.state.ingredients}
        updIngr[type] = newCount;

        const oldPrice = this.state.price;
        const updPrice = oldPrice + INGREDIENT_PRICES[type];

        this.setState({ingredients: updIngr, price: updPrice});

    }

    remIngredient = (type) => {
        const oldCount = this.state.ingredients[type];
        const newCount = oldCount -1;
        if(newCount < 0){
            return;
        }
        const updIngr = {...this.state.ingredients}
        updIngr[type] = newCount;

        const oldPrice = this.state.price;
        const updPrice = oldPrice - INGREDIENT_PRICES[type];

        this.setState({ingredients: updIngr, price: updPrice});
    }

    render() {

        const disabledInfo = {
            ...this.state.ingredients
        }

        for(let i in disabledInfo){
            // if(disabledInfo[i] == 0){
            //     disabledInfo[i] = true
            // }
            // else {
            //     disabledInfo[i] = false
            // }

            disabledInfo[i] = disabledInfo[i] <= 0

        }
        

        return(
            <Aux>
                <Burger ingredients={this.state.ingredients}/>
                <BuildControls 
                add={this.addIngredient}
                rem={this.remIngredient} 
                disabled={disabledInfo}
                price={this.state.price}
                />
            </Aux>
        );
    }
};

export default BurgerBuilder;
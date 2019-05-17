import React, { Component } from 'react';
import Aux from '../../hoc/Auxiliary/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-order';
import Spinner from '../../components/UI/Spinner/Spinner';

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
    price: 3,
    orderability: false,
    ordervisible: false,
    loading: false
    }
    
    addIngredient = (type) => {
        const oldCount = this.state.ingredients[type];
        const newCount = oldCount +1;
        const updIngr = {...this.state.ingredients}
        updIngr[type] = newCount;

        const oldPrice = this.state.price;
        const updPrice = oldPrice + INGREDIENT_PRICES[type];

        this.setState({ingredients: updIngr, price: updPrice});
        this.updOrderab(updIngr);
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
        this.updOrderab(updIngr);
    }

    updOrderab = (data) =>{
        const count = Object.keys(data).map(el => { return data[el] }).reduce((sum,curr) => { return sum + curr},0);
        this.setState({orderability: count > 0});
    }

    ordervisHandler = () => {
        this.setState({ordervisible: true})
    }

    purchaseCancelHandler = () => {
        this.setState({ordervisible: false})
    }
    purchaseContinueHandler = () =>{
        // alert('You made it john');
        this.setState({loading: true});

        const order = {
            ingredients: this.state.ingredients,
            price: this.state.price,
            author: 'Ololek'
        }
        axios.post('/orders.json ', order).then(response => this.setState({loading: false, ordervisible: false}))
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


        let summary =  <OrderSummary 
                    ingredients={this.state.ingredients} 
                    cancel={this.purchaseCancelHandler}
                    continue={this.purchaseContinueHandler}
                    totalPrice={this.state.price}
                    />;
        
        if(this.state.loading){
            summary = <Spinner />
        }
        

        return(
            <Aux>
                <Modal show={this.state.ordervisible} backdropHandler={this.purchaseCancelHandler} >
                   {summary}
                </Modal>
                <Burger ingredients={this.state.ingredients}/>
                <BuildControls 
                add={this.addIngredient}
                rem={this.remIngredient} 
                disabled={disabledInfo}
                price={this.state.price}
                orddis={this.state.orderability}
                visib={this.ordervisHandler}
                
                />
            </Aux>
        );
    }
};

export default BurgerBuilder;
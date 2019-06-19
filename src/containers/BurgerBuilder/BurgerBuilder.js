import React, { Component } from 'react';
import Aux from '../../hoc/Auxiliary/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-order';
// import axios from 'axios';
import Spinner from '../../components/UI/Spinner/Spinner';

import * as actionTypes from '../../store/actions/actionTypes';
import { connect } from 'react-redux';

import {addIngredient, removeIngredient, initIngredients} from '../../store/actions/index';



class BurgerBuilder extends Component{
    state = {
    // orderability: false,
    ordervisible: false,
    loading: false
    }
    
    // addIngredient = (type) => {
    //     const oldCount = this.state.ingredients[type];
    //     const newCount = oldCount +1;
    //     const updIngr = {...this.state.ingredients}
    //     updIngr[type] = newCount;

    //     const oldPrice = this.state.price;
    //     const updPrice = oldPrice + INGREDIENT_PRICES[type];

    //     this.setState({ingredients: updIngr, price: updPrice});
    //     this.updOrderab(updIngr);
    // }

    // remIngredient = (type) => {
    //     const oldCount = this.state.ingredients[type];
    //     const newCount = oldCount -1;
    //     if(newCount < 0){
    //         return;
    //     }
    //     const updIngr = {...this.state.ingredients}
    //     updIngr[type] = newCount;

    //     const oldPrice = this.state.price;
    //     const updPrice = oldPrice - INGREDIENT_PRICES[type];

    //     this.setState({ingredients: updIngr, price: updPrice});
    //     this.updOrderab(updIngr);
    // }
    
    updOrderab = (data) =>{
        const count = Object.keys(data).map(el => { return data[el] }).reduce((sum,curr) => { return sum + curr},0);
        return count > 0;
        // this.setState({orderability: count > 0});
    }
   

    ordervisHandler = () => {
        this.setState({ordervisible: true})
    }

    purchaseCancelHandler = () => {
        this.setState({ordervisible: false})
    }
    purchaseContinueHandler = () =>{
        // alert('You made it john');
    

        const query = [];

        for(let i in this.state.ingredients){
            query.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]))
        }
        query.push('price=' + this.props.price);
        const queryString = query.join('&');

        this.props.history.push({
            pathname: '/checkout',
            search: '?' + queryString
        });

    }

    componentWillMount(){
      console.log('did mount man');
      this.props.onIngredientsFetch();
    }


    render() {

        const disabledInfo = {
            ...this.props.ings
            // ...this.state.ingredients
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
                    ingredients={this.props.ings} 
                    cancel={this.purchaseCancelHandler}
                    continue={this.purchaseContinueHandler}
                    totalPrice={this.props.price}
                    />;
        
        if(this.state.loading){
            summary = <Spinner />
        }
        
        let burger = '';

        this.props.error ? burger = <p>Ooops! The burger cant be loaded!</p> : burger = <Burger ingredients={this.props.ings}/>;

        return(
            <Aux>
                <Modal show={this.state.ordervisible} backdropHandler={this.purchaseCancelHandler} >
                   {summary}
                </Modal>
                {burger}
                <BuildControls 
                add={this.props.onIngredientAdded}
                rem={this.props.onIngredientRemoved} 
                disabled={disabledInfo}
                price={this.props.price}
                // orddis={this.props.orderability}
                orddis={this.updOrderab(this.props.ings)}
                visib={this.ordervisHandler}
                />
            </Aux>
        );
    }
};

const stateMapToProps = state =>{
    return{
        ings: state.ingredients,
        price: state.price,
        orderability: state.orderability,
        error: state.error
    }
}

const dispatchMapToProps = dispatch =>{
    return{
        onIngredientAdded: (ingName) => dispatch(addIngredient(ingName)),
        onIngredientRemoved: (ingName) => dispatch(removeIngredient(ingName)),
        onIngredientsFetch: () => dispatch(initIngredients())
    }
}


export default connect(stateMapToProps, dispatchMapToProps)(BurgerBuilder);
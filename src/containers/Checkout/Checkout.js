import React, { Component } from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import {Route} from 'react-router-dom';
import ContactData from './ContactData/ContactData';

class Checkout extends Component{

    state = {
        ingredients: {
            salad: 1,
            cheese: 1,
            bacon: 1,
            meat: 1
        }
    }

    onCheckoutCancel = () => {
        this.props.history.goBack();
    }

    onCheckoutContinue  = () =>  {
        this.props.history.replace('/checkout/contact-data');
    }

    componentDidMount(){
        const query = new URLSearchParams(this.props.location.search);
        const ingredients = {};

        for(let i of query.entries()){
            ingredients[i[0]] = +i[1];
        }
        this.setState({ingredients: ingredients})
    }

    render(){
        return(
            <div>
                <CheckoutSummary
                 checkoutCanceled={this.onCheckoutCancel}
                  checkoutContinued={this.onCheckoutContinue} 
                  ingredients={this.state.ingredients}/>
                <Route path={this.props.match.path + '/contact-data'} component={ContactData}/>
            </div>
        );
    }
}

export default Checkout;
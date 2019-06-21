import React, { Component } from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import {Route, Redirect} from 'react-router-dom';
import ContactData from './ContactData/ContactData';
import {connect} from 'react-redux';

class Checkout extends Component{

    onCheckoutCancel = () => {
        this.props.history.goBack();
    }

    onCheckoutContinue  = () =>  {
        this.props.history.replace('/checkout/contact-data');
    }

    componentWillMount(){
        const query = new URLSearchParams(this.props.location.search);
        const ingredients = {};

        let price = 0;

        for(let i of query.entries()){
            if (i[0] === 'price'){
                price = i[1];
            }else{
            ingredients[i[0]] = +i[1];
            }
        }
        this.setState({ingredients: ingredients, price: price})
    }

    render(){
        let summary = <Redirect to="/"/>;

       
        if(this.props.ings){
        
            const purchasedRedirect = this.props.purchased ? <Redirect path="/"/> : null;

            summary = (
                <div>
                {purchasedRedirect}
                <CheckoutSummary
                     checkoutCanceled={this.onCheckoutCancel}
                      checkoutContinued={this.onCheckoutContinue} 
                      ingredients={this.props.ings}/>
                    <Route path={this.props.match.path + '/contact-data'} render={(props)=> <ContactData ingredients={this.state.ingredients} price={this.state.price} {...props}/>}/>
                 </div>
            )
        }
        return summary
    }
}

const mapStateToProps = state => {
    return{
        ings: state.burgerBuilder.ingredients,
        purchased: state.orders.purchased
    }
}

export default connect(mapStateToProps)(Checkout);
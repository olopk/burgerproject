import React, {Component} from 'react';
import {connect} from 'react-redux';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.module.css';
import axios from '../../../axios-order';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../../store/actions/index';

class ContactData extends Component{
    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 3,
                    maxLength: 8
                },
                valid: false,
                touched: false
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your street'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            postalCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'ZIP Code'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Country'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            }, 
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Mail'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            delivermethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: 'fastest', displayValue: 'Fastest'},
                        {value: 'cheapest', displayValue: 'Cheapest'}
                    ] 
                },
                validation: {
                    required: true
                },
                valid: true,
                value: 'fastest',
            }
        },
        formValidity: false
    }

    orderHandler = (event) => {
        event.preventDefault();
        // console.log(this.props.ingredients);
        // this.setState({loading: true});
        const formData = {};

        for(let formElementIdentifier in this.state.orderForm){
            formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
        }

        const order = {
            ingredients: this.props.ings,
            price: this.props.price,
            order: formData
        }

        this.props.onOrderBurger(this.props.token, order);
        // axios.post('/orders.json ', order).then(response => {
        //             this.setState({loading: false});
        //             this.props.history.push('/');
        //         }
        //     ).catch( error => {
        //         this.setState({loading: false})
        //     }
        //     )
        }
    
    checkValidity = (value, rules) =>{
        let valid = true;

        if(rules.required){
            valid = value.trim() !== '' && valid;
        }
        if(rules.minLength){
            valid = value.length >= rules.minLength && valid;
        }
        if(rules.maxLength){
            valid = value.length <= rules.maxLength && valid;
        }

        return valid;
    }
    
    inputChangedHandler = (event, id) =>{
        const updatedOrderForm = {...this.state.orderForm};
        const updatedFormElem = {...updatedOrderForm[id]};

        updatedFormElem.value = event.target.value;
        updatedFormElem.valid = this.checkValidity(updatedFormElem.value, updatedFormElem.validation);
        updatedFormElem.touched = true;
        updatedOrderForm[id] = updatedFormElem;

        let formIsValid = true;

        for(let el in updatedOrderForm){
            formIsValid = updatedOrderForm[el].valid && formIsValid;
            console.log(formIsValid);
        }
        
        this.setState({orderForm: updatedOrderForm, formValidity: formIsValid});

    }

    render(){
        const formElementsArray = [];

        for(let key in this.state.orderForm){
            formElementsArray.push({
                id: key,
                config: this.state.orderForm[key]
            });
        }


        let form = (
            <form onSubmit={this.orderHandler}>
                {formElementsArray.map(formElement => (
                    <Input
                    key={formElement.id}
                    inputtype={formElement.config.elementType}
                    elementConfig={formElement.config.elementConfig} 
                    value={formElement.config.value}
                    invalid={!formElement.config.valid}
                    touched={formElement.config.touched}
                    shouldValidate={formElement.config.validation}
                    change={(event) => this.inputChangedHandler(event, formElement.id)}
                    />
                ))}
                <Button disabled={!this.state.formValidity} type="Success">ORDER</Button>
            </form>
        );

        if (this.props.loading){
            form = <Spinner/>;
        }

        return (
            <div className={classes.ContactData}>
                <h2>Write your contact data</h2>
               {form}
            </div>
        );
    }
}

const mapStateToProps = (state) =>{
    return{
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.price,
        loading: state.orders.loading,
        token: state.auth.token
    }
};

const mapDispatchToProps = dispatch => {
    return{
        onOrderBurger: (orderData, token) => dispatch(actions.purchaseBurger(token, orderData))
    }
};


export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios));
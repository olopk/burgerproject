import React, {Component} from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.module.css';
import axios from '../../../axios-order';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';

class ContactData extends Component{
    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: ''
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your street'
                },
                value: ''
            },
            postalCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'ZIP Code'
                },
                value: ''
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Country'
                },
                value: ''
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Mail'
                },
                value: ''
            },
            delivermethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: 'fastest', displayValue: 'Fastest'},
                        {value: 'cheapest', displayValue: 'Cheapest'}
                    ] 
                },
                value: ''
            }
        },
        loading: false
    }

    orderHandler = (event) => {
        event.preventDefault();
        // console.log(this.props.ingredients);

        this.setState({loading: true});

        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            author: 'Ololek'
        }
        axios.post('/orders.json ', order).then(response => {
                    this.setState({loading: false});
                    this.props.history.push('/');
                }
            )
        }

    render(){
        
        let form = (
            <form>
                <Input inputtype='input' type="text" name="name" placeholder="Your Name" />
                <Input inputtype='input' type="text" name="email" placeholder="Email" />
                <Input inputtype='input' type="text" name="street" placeholder="Street" />
                <Input inputtype='input' type="text" name="postal" placeholder="Postal Code" />
                <Button clicked={this.orderHandler} type="Success">ORDER</Button>
            </form>
        );

        if (this.state.loading){
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

export default ContactData;
import React, {Component} from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.module.css';
import axios from '../../../axios-order';
import Spinner from '../../../components/UI/Spinner/Spinner';
import { throwStatement } from '@babel/types';

class ContactData extends Component{
    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: ''
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
                <input type="text" name="name" placeholder="Your Name" />
                <input type="text" name="email" placeholder="Email" />
                <input type="text" name="street" placeholder="Street" />
                <input type="text" name="postal" placeholder="Postal Code" />
                <Button clicked={this.orderHandler} type="Success">ORDER</Button>
            </form>
        );

        if (this.state.loading){
            form = <Spinner/>;
        }

        return (
            <div className={classes.ContactData}>
               {form}
            </div>
        );
    }
}

export default ContactData;
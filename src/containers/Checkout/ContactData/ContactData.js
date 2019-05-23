import React, {Component} from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.module.css';

class ContactData extends Component{
    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: ''
        }
    }
    render(){
        return (
            <div className={classes.ContactData}>
                <form>
                    <input type="text" name="name" placeholder="Your Name" />
                    <input type="text" name="email" placeholder="Email" />
                    <input type="text" name="street" placeholder="Street" />
                    <input type="text" name="postal" placeholder="Postal Code" />
                    <Button type="Success">ORDER</Button>
                </form>
            </div>
        );
    }
}

export default ContactData;
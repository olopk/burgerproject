import React, {Component} from 'react';
import Order from '../../components/Order/Order';
import axios from '../../axios-order';
import Spinner from '../../components/UI/Spinner/Spinner';
import order from '../../axios-order';

class Orders extends Component{

    state = {
        orders: [],
        loading: true,
    }

    componentDidMount(){
        let fetchedOrders = [];
        axios.get('/orders.json').then(res => {
            for(let el in res.data){
                fetchedOrders.push({
                    ...res.data[el],
                    id: el
                });
            }
            this.setState({orders: fetchedOrders, loading: false});
            console.log(this.state.orders);
        }).catch(err => {
            console.log('we have a bug: ' + err);
            this.setState({loading: false});
        });
    }

    render(){
        return(

            <div>
                {this.state.orders.map(ord => (
                <Order key={order.id} ingredients={ord.ingredients} price={ord.price}/>)
                )}                
            </div>

        )
    }
}

export default Orders;
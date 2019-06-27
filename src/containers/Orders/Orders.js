import React, {Component} from 'react';
import Order from '../../components/Order/Order';
import Spinner from '../../components/UI/Spinner/Spinner';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';
import axios from '../../axios-order';

class Orders extends Component{
    componentDidMount(){
        this.props.onFetchOrders();
    }

    render(){
        let content = <Spinner/>;

        if(!this.props.loading){
            content = this.props.orders.map(ord => (
                <Order key={ord.id} ingredients={ord.ingredients} price={ord.price}/>
                ))};                
        return(
            <div>
                {content}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return{
        orders: state.orders.orders,
        loading: state.orders.loading
    }
}

const mapDispatchToProps = dispatch =>{
    return{
        onFetchOrders: () => dispatch(actions.fetchOrders())
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Orders, axios);
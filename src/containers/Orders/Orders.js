import React, {Component} from 'react';
import Order from '../../components/Order/Order';
import Spinner from '../../components/UI/Spinner/Spinner';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';
import axios from '../../axios-order';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

class Orders extends Component{
    componentDidMount(){
        this.props.onFetchOrders(this.props.token);
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
        loading: state.orders.loading,
        token: state.auth.token
    }
}

const mapDispatchToProps = dispatch =>{
    return{
        onFetchOrders: (token) => dispatch(actions.fetchOrders(token))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));
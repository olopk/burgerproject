import React, {Component} from 'react';
import Order from '../../components/Order/Order';
import Spinner from '../../components/UI/Spinner/Spinner';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';

class Orders extends Component{
    componentWillMount(){
        this.props.onFetchOrders();
    }

    render(){
        let content = <Spinner/>

        if(this.props.orders){
            content = (
                <div>
                {this.props.orders.map(ord => (
                <Order key={ord.id} ingredients={ord.ingredients} price={ord.price}/>)
                )}                
            </div>
            )
        }

        return(
            <div>
            {content}
            </div>

        )
    }
}

const mapStateToProps = state => {
    return{
        orders: state.orders,
        loading: state.loading
    }
}

const mapDispatchToProps = dispatch =>{
    return{
        onFetchOrders: () => dispatch(actions.fetchOrders)
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Orders);
import React, { Component } from 'react';
import Aux from '../../hoc/Auxiliary/Auxiliary';
import classes from './Layout.module.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';
import {connect} from 'react-redux';


class Layout extends Component {
    
    state = {
        showSideDrawer: false
    }

    sideDrawerClosedHandler = () => {
        this.setState(prevState => {
            return {showSideDrawer: !prevState.showSideDrawer}
        })
    }
    
    render () {
        return (
            <Aux>
                <Toolbar isAuth={this.props.isAuthenticated} clicked={this.sideDrawerClosedHandler}/>
                <SideDrawer isAuth={this.props.isAuthenticated} clicked={this.sideDrawerClosedHandler} show={this.state.showSideDrawer}/>
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Aux>
        )
    }
}

const mapStateToProps = state =>{
    return{
        isAuthenticated: state.auth.userId !== null
    }
}

export default connect(mapStateToProps)(Layout);
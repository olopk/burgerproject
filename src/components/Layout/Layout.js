import React, { Component } from 'react';
import Aux from '../../hoc/Auxiliary/Auxiliary';
import classes from './Layout.module.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer'

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
            <Toolbar clicked={this.sideDrawerClosedHandler}/>
            <SideDrawer clicked={this.sideDrawerClosedHandler} show={this.state.showSideDrawer}/>
            <main className={classes.Content}>
                {this.props.children}
            </main>ping 
        </Aux>
        )
    }
}

export default Layout;
import React, {Component} from 'react';
import './App.css';
import Layout from './components/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout/Logout';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Orders from './containers/Orders/Orders';
import {connect} from 'react-redux';
import * as actions from './store/actions/index';

class App extends Component {

  componentDidMount(){
    this.props.onTryAutoSignin();
  }

  render(){
    return (
      <div>
        <BrowserRouter>
          <Layout>
            <Switch>
              <Route path="/orders" component={Orders} />
              <Route path="/checkout" component={Checkout} />
              <Route path="/auth" component={Auth} />
              <Route path="/logout" component={Logout} />
              <Route path="/" component={BurgerBuilder}/>
          </Switch>
          </Layout>
        </BrowserRouter>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch =>{
  return{
    onTryAutoSignin: () => dispatch(actions.authCheckState())
  }
}

export default connect(null, mapDispatchToProps)(App);

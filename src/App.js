import React from 'react';
import './App.css';
import Layout from './components/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Layout>
          <Switch>
            <Route path="/checkout" component={Checkout} />
            <Route path="/" component={BurgerBuilder} />
         </Switch>
        </Layout>
      </BrowserRouter>
    </div>
  );
}

export default App;

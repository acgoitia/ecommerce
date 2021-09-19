import React, { useState } from 'react';
import './App.css';
import { Route, Switch, useHistory } from 'react-router-dom';
import ScrollToTop from './scrollToTop/ScrollToTop';
import Header from './header/Header';
import ItemBrowser from './itemBrowser/ItemBrowser';
import ItemDetail from './itemDetail/ItemDetail';
import SignUp from './signUp/SignUp';
import Login from './login/Login';
import Cart from './cart/Cart';

// Add ScrollToTop Component at the end

function App() {
  return (
    <div>
  
      <Header />
      <main>
        <Switch>
          <Route exact path="/">
            <ItemBrowser />
          </Route>
          <Route exact path="/product/:id" component={ItemDetail} />
          <Route exact path="/sign-up">
            <SignUp />
          </Route>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/cart">
            <Cart />
          </Route>
        </Switch>
      </main>
      
    </div>
  );
}

export default App;

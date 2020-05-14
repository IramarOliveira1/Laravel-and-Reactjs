import React from 'react';

import {BrowserRouter as Router,Switch, Route } from "react-router-dom";
import PrivateRoute from './services/auth';

import product from  './pages/products/product';
import Login from './pages/Login/login';
import Category from './pages/categories/category'
import Home from './pages/home/home';



// state: { from: props.location}

export default function Routes() {
  return (
    <>
        <Router>
            <Switch>
                <Route path="/login" component={Login}/>
                <PrivateRoute path="/home" component={Home}/>
                <PrivateRoute path="/produtos" component={product} />
                <PrivateRoute path="/categorias" component={Category} />
            </Switch>
        </Router>
    </>
  );
}

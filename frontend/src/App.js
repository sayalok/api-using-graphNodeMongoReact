import React, { Component } from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom'

import Login from './pages/Login'
import Product from './pages/Product'
import Cart from './pages/Cart'

import './App.css';

class App extends Component {
    render() {
        return (
            <BrowserRouter>
            	<Switch>
	                <Redirect from="/" to="/login" exact/>
	                <Route path="/login" component={Login}/>
	                <Route path="/product" component={Product}/>
	                <Route path="/cart" component={Cart}/>
	            </Switch>
            </BrowserRouter>
        );
    }
}

export default App;

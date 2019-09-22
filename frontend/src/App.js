import React, { Component } from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom'

import AuthContext from './context/auth-context';
import Header from './inc/Header/Header'
import Auth from './pages/Auth'
import Product from './pages/Product'
import Cart from './pages/Cart'

import './App.css';

class App extends Component {
	state = {
		token: null,
		userId: null
	}
	logIn = (token,userId,exp) => {
		this.setState({
			token: token,
			userId: userId
		})
	}
	logOut = () => {
		this.setState({
			token: null,
			userId: null
		})
	}
    render() {
        return (
            <BrowserRouter>
            	<React.Fragment>
            		<AuthContext.Provider 
            			value={
            				{
	            				token: this.state.token, 
	            				userId: this.state.userId, 
	            				login: this.logIn, 
	            				logout: this.logOut
	            			}
	            		}>
		            	<Header/>
		            	<div className="container">
			            	<Switch>
				                {!this.state.token &&  <Redirect from="/cart" to="/auth" exact/>}
				                {!this.state.token &&  <Redirect from="/product" to="/auth" exact/>}
				                {this.state.token &&  <Redirect from="/auth" to="/product" exact/>}

				                {!this.state.token &&  (<Route path="/auth" component={Auth}/>)}
				                <Route path="/product" component={Product}/>
				                {this.state.token &&  (<Route path="/cart" component={Cart}/>)}
				                {!this.state.token &&  <Redirect to="/auth" exact/>}
				            </Switch>
			            </div>
			        </AuthContext.Provider>
		        </React.Fragment>
            </BrowserRouter>
        );
    }
}

export default App;

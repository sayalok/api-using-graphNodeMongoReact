import React, { Component } from 'react';
import AuthContext from '../context/auth-context';

class Auth extends Component {
	constructor(props) {
    	super(props);
	    this.emailEl = React.createRef();
	    this.passwEl = React.createRef();
  	}
  	state = {
		isLogin: true
	}
	static contextType = AuthContext;
	

  	switchLoginRegister = () => {
  		this.setState({isLogin: !this.state.isLogin})
  	}
	submitHandle = e => {
		e.preventDefault()
		const email = this.emailEl.current.value;
		const passw = this.passwEl.current.value;

		if(email.trim().length === 0 || passw.trim().length === 0 ){
			return;
		}
		let queryBody = {
			query: `
				query {
				  login(email: "${email}", password: "${passw}"){
				    userID
				    token
				    tokenExp
				  }
				}
			`
		}
		if(!this.state.isLogin) {
			queryBody = {
				query: `
					mutation {
	  					createUser(userInput: {
							    email: "${email}",
							    password: "${passw}",
	  						}
	  					)
					  	{
					  		_id
						    email
						}
					}
				`
			};
		}

		fetch('http://localhost:3030/api', {
			method: 'POST',
			body: JSON.stringify(queryBody),
			headers: {
				'content-type': 'application/json'
			}
		})
		.then(res => {
			if(res.status !== 200 && res.status !== 201){
				throw new Error('Failed!')
			}
			return res.json()
		})
		.then(result => {
			console.log(result)
			if(result.data.login.token) {
				this.context.login(
					result.data.login.token,
					result.data.login.userID,
					result.data.login.tokenExp 
				)
			}
		})
		.catch(err => {
			console.log(err)
		})
	}
    render() {
        return (
        	<div className="container">
        		<h3 className="text-center"> {!this.state.isLogin ? 'Register' : 'Login'} </h3>
	            <form onSubmit={this.submitHandle}>
					<div className="form-group">
						<label htmlFor="email">Email address</label>
						<input 
							type="email" className="form-control" 
							id="email" placeholder="Enter email"
							ref={this.emailEl}/>
					</div>
					<div className="form-group">
						<label htmlFor="password">Password</label>
						<input 
							type="password" className="form-control" 
							id="password" placeholder="Password"
							ref={this.passwEl}/>
					</div>
					<button type="submit" className="btn btn-success mr-2">Submit</button>
					<button type="button" className="btn btn-primary" onClick={this.switchLoginRegister}> 
						Switch To {this.state.isLogin ? 'Register' : 'Login'}
					</button>
				</form>
        	</div>
        );
    }
}

export default Auth;

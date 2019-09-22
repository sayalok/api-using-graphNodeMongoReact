import React from 'react';
import { NavLink } from 'react-router-dom';
import AuthContext from '../../context/auth-context';

const Header = props => (
	<AuthContext.Consumer>
    	{context => {
		      	return (
			        <header>
						<nav className="navbar navbar-expand-lg navbar-dark bg-dark">
							<div className="container">
								<a className="navbar-brand" href="#">LetsBUy</a>
								<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
									<span className="navbar-toggler-icon"></span>
								</button>
								<div className="collapse navbar-collapse" id="navbarSupportedContent">
								    <ul className="navbar-nav ml-auto">
								      	{ context.token && (
								      		<React.Fragment>
										      	<li className="nav-item active">
										        	<NavLink className="nav-link" to="product">Product</NavLink>
										      	</li>
									      		<li className="nav-item">
													<NavLink className="nav-link" to="cart">Cart</NavLink>
									      		</li>
									      		<li className="nav-item">
													<button className="btn btn-danger" onClick={context.logout}>Log Out</button>
									      		</li>
									      	</React.Fragment>
								      	) }
								      	{ !context.token && <li className="nav-item">
								        	<NavLink className="nav-link" to="auth">Login / Cretae</NavLink>
								      	</li> }
								    </ul>
							  	</div>
							</div>
						</nav>
					</header>
		      	);
    		}
    	}
	</AuthContext.Consumer>
);


export default Header;
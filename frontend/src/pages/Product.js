import React, { Component } from 'react';
import AuthContext from '../context/auth-context';

import Backdrop from '../inc/Backdrop/Backdrop';
import Modal from '../inc/Modal/Modal';
import ProductForm from '../inc/ProductForm/ProductForm';

class Product extends Component {
    render() {
        return (
            <React.Fragment>
            	<Backdrop/>
            	<div className="addProductBtn text-center">
	            	<button type="button" className="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
	  					Add Product
					</button>
				</div>
				<Modal title="Add Product">
					<ProductForm/>
				</Modal>
            </React.Fragment>
        );
    }
}

export default Product;
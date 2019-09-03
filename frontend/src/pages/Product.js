import React, { Component } from 'react';

import Backdrop from '../inc/Backdrop/Backdrop';
import ModalForm from '../inc/ModalForm/ModalForm';

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
				<ModalForm title="Add Product">
				</ModalForm>
            </React.Fragment>
        );
    }
}

export default Product;

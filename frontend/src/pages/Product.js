import React, { Component } from 'react';
//import AuthContext from '../context/auth-context';

import Backdrop from '../inc/Backdrop/Backdrop';
import Modal from '../inc/Modal/Modal';
import ProductForm from '../inc/ProductForm/ProductForm';

class Product extends Component {
    
    state = {
        products: []
    }
    componentDidMount() {
         this.getProduct()
    }

    getProduct() {
        const queryBody = {
            query: `
                query {
                    products {
                        _id
                        title
                        desc
                        price
                        date
                        createdBy {
                            _id
                            email
                        }
                    }
                }
            `
        };

        fetch('http://localhost:3030/api', {
          method: 'POST',
          body: JSON.stringify(queryBody),
          headers: {
            'Content-Type': 'application/json'
          }
        })
        .then(res => {
            if(res.status !== 200 && res.status !== 201){
                throw new Error('Failed!')
            }
            return res.json()
        })
        .then(result => {
            const products = result.data.products;
            this.setState({products: products})
        })
        .catch(err => {
            console.log(err)
        })
    }
    render() {
        const productLists = this.state.products.map(product => {
            return  <li key={product._id} className="list-group-item">{product.title}</li>
        })
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
                <h2>Product List</h2>
                <ul className="list-group">
                    {productLists}
                </ul>
            </React.Fragment>
        );
    }
}

export default Product;
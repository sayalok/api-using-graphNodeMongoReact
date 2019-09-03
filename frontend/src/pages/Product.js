	import React, { Component } from 'react';

import Backdrop from '../inc/Backdrop/Backdrop';
import ModalForm from '../inc/ModalForm/ModalForm';

class Product extends Component {
	constructor(props) {
    	super(props);
		this.titleRef = React.createRef();
		this.priceRef = React.createRef();
		this.dateRef = React.createRef();
		this.descRef = React.createRef();
	}
	modalConfirmHandler = e => {
		e.preventDefault();
		const title = this.titleRef.current.value;
		const price = this.priceRef.current.value;
		const date = this.dateRef.current.value;
		const desc = this.descRef.current.value;
	}
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
					<form onSubmit={this.modalConfirmHandler}>
						<div className="form-group">
							<label>Enter Title</label>
							<input 
								type="text" className="form-control" 
								id="title" aria-describedby="titleHelp" 
								placeholder="Enter title"
								ref={this.titleRef}/>
						</div>
						<div className="form-group">
							<label>Enter Price</label>
							<input 
								type="text" className="form-control" 
								id="Price" aria-describedby="PriceHelp" 
								placeholder="Enter Price" ref={this.priceRef}/>
						</div>
						<div className="form-group">
							<label>Enter Date</label>
							<input 
								type="date" className="form-control" id="date" 
								aria-describedby="dateHelp" ref={this.dateRef}/>
						</div>
						<div className="form-group">
							<label>Enter Description</label>
							<textarea 
								className="form-control" id="desc" rows="3"
								ref={this.descRef}></textarea>
						</div>
		        		<button type="submit" className="btn btn-primary">Save</button>
					</form>
				</ModalForm>
            </React.Fragment>
        );
    }
}

export default Product;

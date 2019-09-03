import React, { Component } from 'react';
import AuthContext from '../../context/auth-context';

class ProductForm extends Component {

	static contextType = AuthContext;

	constructor(props) {
    	super(props);
		this.titleRef 	= React.createRef();
		this.priceRef 	= React.createRef();
		this.dateRef 	= React.createRef();
		this.descRef 	= React.createRef();
	}
	modalConfirmHandler = e => {
		e.preventDefault();
		const title 	= this.titleRef.current.value;
		const price 	= +this.priceRef.current.value;
		const date 		= this.dateRef.current.value;
		const desc 		= this.descRef.current.value;
		
		if(
			title.trim().length === 0 ||
			price.length === 0 ||
			date.trim().length  === 0 ||
			desc.trim().length  === 0 
		) 
		{
			return;
		}

		const product = { title, price, date, desc}
		console.log(product)

		const queryBody = {
			query: `
				mutation {
  					createProduct(productInput: {
						    title: ${title},
						    desc: ${desc},
						    price: ${price},
						    date: ${date}
  						}
  					)
				  	{
				  		_id
					    title
					    desc
					    price
					    date
					    creator {
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
				'content-type': 'application/json',
				'Aauthorization': 'Bearer ' + this.contextType.token
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
		})
		.catch(err => {
			console.log(err)
		})
	}
    render() {
        return (
            <React.Fragment>
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
							type="datetime-local" className="form-control" id="date" 
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
            </React.Fragment>
        );
    }
}

export default ProductForm;
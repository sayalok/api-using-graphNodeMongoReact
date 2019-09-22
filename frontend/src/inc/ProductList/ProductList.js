import React from 'react'

import ProductListItem from './ProductListItem'

const ProductList = props => {
	const products = props.productLists.map(product => {
        return (
        	<ProductListItem key={product._id} productId={product._id} title={product.title} />
        )
    })

    return (
    	<React.Fragment>
	    	<h2>Product List</h2>
	    	<ul className="list-group">
		        {products}
		    </ul>
		</React.Fragment>
    )
}

export default ProductList;
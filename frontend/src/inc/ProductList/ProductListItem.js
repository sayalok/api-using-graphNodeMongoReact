import React from 'react'

const ProductListItem = props => {
	return (
		<li key={props.productId} className="list-group-item">
			{props.title}
		</li>
	)
}

export default ProductListItem;
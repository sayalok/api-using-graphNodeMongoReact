const { DateFormation }		= require('../../helpers/date')
const User 				= require('../../models/user')
//const Purchase 				= require('../../models/purchase')
const Product 				= require('../../models/product')

const dataProcess = data => {
	return {
		...data._doc,
		date: DateFormation(data.date),
		createdBy: getUser.bind(this, data.createdBy)
	}
}
const dataProcessPurchase = data => {
	return {
		...data._doc,
		productId: getSingleProduct.bind(this, data.productId),
		users: getUser.bind(this, data.users),
		createdAt: DateFormation(data.createdAt),
		updateddAt: DateFormation(data.updatedAt)
	}
}
const getProducts = productIds => {
	return Product.find({_id: {$in: productIds}})
					.then(datas => {
						return datas.map(data => {
							return dataProcess(data)
						})
					})
					.catch(err => {
						throw err
					})
}

const getSingleProduct = async productId => {
	try {
		const product = await Product.findById(productId)
		return dataProcess(product)
	} catch (err) {
		throw err
	}
}

const getUser = userId => {
	return User.findById(userId)
				.then(user => {
					return {
						...user._doc,
						createdProduct: getProducts.bind(this, user.createdProduct)
					}
				})
				.catch(err => {
					throw err
				})
}

exports.dataProcess 		= dataProcess
exports.dataProcessPurchase = dataProcessPurchase
exports.getProducts 		= getProducts
exports.getSingleProduct 	= getSingleProduct
exports.getUser 			= getUser
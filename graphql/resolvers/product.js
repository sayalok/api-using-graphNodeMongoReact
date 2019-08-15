const Product 			= require('../../models/product')
const User 				= require('../../models/user')
const { dataProcess } 	= require('./resloverHelpers')
const { DateFormation }		= require('../../helpers/date')


module.exports = { 
	products: () => {
		return Product.find()
			.populate('createdBy')
			.then(res => {
				return res.map(data => {
					return dataProcess(data)
				})
			})
			.catch(err => {
				throw err
			})
	},
	createProduct: (args, req) => {
		if(!req.isAuth) throw new Error('User not authenticated!')
		const product = new Product({
			title: args.productInput.title,
			desc: args.productInput.desc,
			price: +args.productInput.price,
			date: DateFormation(args.productInput.date),
			createdBy: req.userId
		})
		let newCreatedProduct;
		return product
			.save()
			.then(res => {
				newCreatedProduct = dataProcess(res)
				return User.findById(req.userId)
			})
			.then(user => {
				if (!user) {
					throw new Error('Sorry Not Valid User')
				}
				user.createdProduct.push(product)
				return user.save()
			})
			.then(result => {
				return newCreatedProduct
			})
			.catch(err => {
				console.log(err)
				throw err;
			})
	}
};
const bcrypt 			= require("bcryptjs") 
const Product 			= require('../../models/product')
const User 				= require('../../models/user')

const getProducts = productIds => {
	return Product.find({_id: {$in: productIds}})
					.then(datas => {
						return datas.map(data => {
							return {
								...data._doc,
								createdBy: getUser.bind(this, data.createdBy)
							}
						})
					})
					.catch(err => {
						throw err
					})
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

module.exports = { 
	products: () => {
		return Product.find()
			.populate('createdBy')
			.then(res => {
				return res.map(data => {
					return {
						...data._doc,
						date: new Date(data.date).toISOString(),
						createdBy: getUser.bind(this, data.createdBy)
					}
				})
			})
			.catch(err => {
				throw err
			})
	},
	users: () => {
		return User.find()
			.populate('createdProduct')
			.then(res => {
				return res
			})
			.catch(err => {
				throw err
			})
	},
	createProduct: args => {
		const product = new Product({
			title: args.productInput.title,
			desc: args.productInput.desc,
			price: +args.productInput.price,
			date: new Date(args.productInput.date),
			createdBy: "5d53c58f2ac9eb077acaac71"
		})
		let newCreatedProduct;
		return product
			.save()
			.then(res => {
				newCreatedProduct = {
					...res._doc,
					createdBy: getUser.bind(this, res.createdBy)
				}
				return User.findById('5d53c58f2ac9eb077acaac71')
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
	},

	createUser: args => {
		return User.findOne({ email: args.userInput.email})
			.then( user => {
				if (user) {
					throw new Error('User Exists Already')
				}
				return bcrypt.hash(args.userInput.password,13)
			})
			.then(hashPass => {
				const user = new User({
					email: args.userInput.email,
					password: hashPass
				})
				return user.save()
			})
			.then(res => {
				return res
			})
			.catch(err => {
				throw err
			})
	}
 };
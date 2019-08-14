const bcrypt 			= require("bcryptjs") 
const Product 			= require('../../models/product')
const User 				= require('../../models/user')
const Purchase			= require('../../models/purchase')

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

const getSingleProduct = async productId => {
	try {
		const product = await Product.findById(productId)
		return {
			...product._doc,
			createdBy: getUser.bind(this, product.createdBy)
		}
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
	purchase: async () => {
		try {
			const purchaseList = await Purchase.find()
			return purchaseList.map(purchaseItem => {
				return {
					...purchaseItem._doc,
					productId: getSingleProduct.bind(this, purchaseItem.productId),
					users: getUser.bind(this, purchaseItem.users),
					createdAt: new Date(purchaseItem.createdAt).toISOString(),
					updateddAt: new Date(purchaseItem.updatedAt).toISOString()
				}
			})
		} catch (err) {
			throw err
		}
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
	},
	createPurchase: async args => {
		const getProductId = await Product.findOne({_id: args.productId})
		const purchase = new Purchase({
			users: "5d53c58f2ac9eb077acaac71",
			productId: getProductId
		})
		const result = await purchase.save()
		return {
			...result._doc,
			productId: getSingleProduct.bind(this, result.productId),
			users: getUser.bind(this, result.users),
			createdAt: new Date(result.createdAt).toISOString(),
			updateddAt: new Date(result.updatedAt).toISOString()
		}
	},
	cancelPurchase: async args => {
		try {
			const fetchpurchaseData = await Purchase.findById(args.purchaseId).populate('productId')
			const purchaseDetails = {
				...fetchpurchaseData.productId._doc,
				createdBy: getUser.bind(this, fetchpurchaseData.users),
			}
			await Purchase.deleteOne({_id: args.purchaseId})
			return purchaseDetails
		} catch (err) {
			throw err
		}
	}
};
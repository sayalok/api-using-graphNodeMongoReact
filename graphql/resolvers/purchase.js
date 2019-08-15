const Purchase 				= require('../../models/purchase')
const Product 				= require('../../models/product')

const {dataProcess, dataProcessPurchase } 		= require('./resloverHelpers')

module.exports = { 
	purchase: async (args, req) => {
		if(!req.isAuth) throw new Error('User not authenticated!')
		try {
			const purchaseList = await Purchase.find()
			return purchaseList.map(purchaseItem => {
				return dataProcessPurchase(purchaseItem)
			})
		} catch (err) {
			throw err
		}
	},
	createPurchase: async (args, req) => {
		if(!req.isAuth) throw new Error('User not authenticated!')
		const getProductId = await Product.findOne({_id: args.productId})
		const purchase = new Purchase({
			users: req.userId,
			productId: getProductId
		})
		const result = await purchase.save()
		return dataProcessPurchase(result)
	},
	cancelPurchase: async (args, req) => {
		if(!req.isAuth) throw new Error('User not authenticated!')
		try {
			const fetchpurchaseData = await Purchase.findById(args.purchaseId).populate('productId')
			const purchaseDetails = dataProcess(fetchpurchaseData.productId)
			await Purchase.deleteOne({_id: args.purchaseId})
			return purchaseDetails
		} catch (err) {
			throw err
		}
	}
};
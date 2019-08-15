const Purchase 				= require('../../models/purchase')
const Product 				= require('../../models/product')

const {dataProcess, dataProcessPurchase } 		= require('./resloverHelpers')

module.exports = { 
	purchase: async () => {
		try {
			const purchaseList = await Purchase.find()
			return purchaseList.map(purchaseItem => {
				return dataProcessPurchase(purchaseItem)
			})
		} catch (err) {
			throw err
		}
	},
	createPurchase: async args => {
		const getProductId = await Product.findOne({_id: args.productId})
		const purchase = new Purchase({
			users: "5d53c58f2ac9eb077acaac71",
			productId: getProductId
		})
		const result = await purchase.save()
		return dataProcessPurchase(result)
	},
	cancelPurchase: async args => {
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
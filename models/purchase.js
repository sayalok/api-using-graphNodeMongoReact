const mongoose			= require("mongoose")
const Schema 			= mongoose.Schema

const purchaseSchema = new Schema(
	{
		productId: {
			type: Schema.Types.ObjectId,
			ref: 'Products'
		},
		users: {
			type: Schema.Types.ObjectId,
			ref: 'User'
		},
	},
	{
		timestamps: true
	}
)

module.exports = mongoose.model('Purchase', purchaseSchema)
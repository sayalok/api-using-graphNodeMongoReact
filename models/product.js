const mongoose			= require("mongoose")
const Schema 			= mongoose.Schema

const productSchema = new Schema({
	title: {
		type: String,
		required: true
	},
	desc:  {
		type: String,
		required: true
	},
	price:  {
		type: Number,
		required: true
	},
	date:  {
		type: Date,
		required: true
	},
	createdBy:  {
		type: Schema.Types.ObjectId,
		ref: 'User'
	},
})

module.exports = mongoose.model('Products', productSchema)
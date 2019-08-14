const mongoose			= require("mongoose")
const Schema 			= mongoose.Schema

const userSchema = new Schema({
	email: {
		type: String,
		required: true
	},
	password:  {
		type: String,
		required: true
	},
	createdProduct:  [
		{
			type: Schema.Types.ObjectId,
			ref: 'Products'
		}
	]
})

module.exports = mongoose.model('User', userSchema)
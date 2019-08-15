const bcrypt 			= require("bcryptjs") 
const User 				= require('../../models/user')

module.exports = { 
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
};
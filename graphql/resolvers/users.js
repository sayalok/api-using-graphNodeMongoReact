const bcrypt 	= require("bcryptjs")
const jwt 		= require('jsonwebtoken')
const User 		= require('../../models/user')

module.exports = { 
	users: (args, req) => {
		if(!req.isAuth) throw new Error('User not authenticated!')
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
	login: async ({ email, password }) => {
		const user = await User.findOne({ email: email});
		if ( !user ) throw new Error(" User Does Not Exists! ")

		const passMatch = await bcrypt.compare(password, user.password)
		if ( !passMatch ) throw new Error(" Password Not Match! ")
		const token = jwt.sign(
				{ userId: user.id, email: user.email },
				'usingjsonwebtokenfortoken',
				{
					expiresIn: '1h'
				} 	
			)
		return {
			userID: user.id,
			token: token,
			tokenExp: 1
		}
	}
};
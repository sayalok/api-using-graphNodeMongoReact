const users 	= require('./users')
const product 	= require('./product')
const purchase 	= require('./purchase')


const RootReslovers = {
	...users,
	...product,
	...purchase
}

module.exports = RootReslovers
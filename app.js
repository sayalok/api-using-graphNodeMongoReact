const express           = require('express')
const bodyParser        = require('body-parser')
const graphqlHttp       = require('express-graphql')
const { buildSchema }   = require('graphql')
const mongoose			= require("mongoose")
const Product 			= require('./models/product')

const app = express();

app.use(bodyParser.json())

var schemaStrcture = buildSchema(`
	
	type ProductType {
		_id: ID!
		title: String!
		desc: String!
		price: Float!
		date: String!
	}

	input ProductInput {
		title: String!
		desc: String!
		price: Float!
		date: String!
	}

	type RootQuery {
		products: [ProductType!]!
	}

	type RootMutation {
		createProduct(productInput:ProductInput): ProductType
	}

	schema {
		query: RootQuery
		mutation: RootMutation
	}
`);

var rootValStrcture = { 
	products: () => {
		return Product.find()
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
			date: new Date(args.productInput.date)
		})
		return product
			.save()
			.then(res => {
				return res;
			})
			.catch(err => {
				console.log(err)
				throw err;
			})
	}
 };


app.use('/api', graphqlHttp({
    schema: schemaStrcture,
    rootValue: rootValStrcture,
    graphiql: true
}))

mongoose.connect(
	`
		mongodb+srv://${process.env.dbUser}:${process.env.dbPass}@cluster0-bgzjc.mongodb.net/
		${process.env.dbName}
		?retryWrites=true&w=majority
	`,
	{
    	useNewUrlParser: true
	}
).then(() => {
 	console.log('connect...')
 	app.listen(3000)
})
 .catch(err => console.log(err))
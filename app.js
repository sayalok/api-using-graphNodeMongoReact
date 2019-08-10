const express           = require('express')
const bodyParser        = require('body-parser')
const graphqlHttp       = require('express-graphql')
const { buildSchema }   = require('graphql')


const app = express();

const productList = []

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
		return productList
	},
	createProduct: args => {
		const product = {
			_id: Math.random().toString(),
			title: args.productInput.title,
			desc: args.productInput.desc,
			price: +args.productInput.price,
			date: args.productInput.date
		};
		console.log(args)
		productList.push(product)
		return product
	}
 };


app.use('/api', graphqlHttp({
    schema: schemaStrcture,
    rootValue: rootValStrcture,
    graphiql: true
}))

app.listen(3000)
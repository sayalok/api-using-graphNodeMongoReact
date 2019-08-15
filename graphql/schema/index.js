const { buildSchema }   = require('graphql')

module.exports = buildSchema(`
	
	type PurchaseType {
		_id: ID!
		productId: ProductType!
		users: UserType!
		createdAt: String!
		updatedAt: String!
	}

	type ProductType {
		_id: ID!
		title: String!
		desc: String!
		price: Float!
		date: String!
		createdBy: UserType
	}

	type UserType {
		_id: ID!
		email: String!
		password: String
		createdProduct: [ProductType!]
	}

	type AuthData {
		userID: ID!
		token: String!
		tokenExp: Int!
	}

	input ProductInput {
		title: String!
		desc: String!
		price: Float!
		date: String!
	}

	input UserInput {
		email: String!
		password: String!
	}

	type RootQuery {
		products: [ProductType!]!
		users: [UserType!]!
		purchase: [PurchaseType!]!
		login(email: String!, password: String!): AuthData!
	}

	type RootMutation {
		createProduct(productInput:ProductInput): ProductType
		createUser(userInput: UserInput): UserType
		createPurchase(productId: ID!): PurchaseType!
		cancelPurchase(purchaseId: ID!): ProductType!
	}

	schema {
		query: RootQuery
		mutation: RootMutation
	}
`);
const express           = require('express')
const bodyParser        = require('body-parser')
const graphqlHttp       = require('express-graphql')
const { buildSchema }   = require('graphql')


const app = express();

app.use(bodyParser.json())

var schemaStrcture = buildSchema(`
	type RootQuery {
		events: [String!]!
	}

	type RootMutation {
		createEvent(name: String): String
	}

	schema {
		query: RootQuery
		mutation: RootMutation
	}
`);

var rootValStrcture = { 
	events: () => {
		return ['faisal','md','foysal']
	},
	createEvent: args => {
		return args.name
	}
 };


app.use('/api', graphqlHttp({
    schema: schemaStrcture,
    rootValue: rootValStrcture,
    graphiql: true
}))

app.listen(3000)
const express           = require('express')
const bodyParser        = require('body-parser')
const graphqlHttp       = require('express-graphql')
const mongoose			= require("mongoose")
const authMildwr		= require('./middleware/authMiddleware')

const schemaStrcture = require('./graphql/schema/index')
const rootValStrcture = require('./graphql/resolvers/index')


const app = express();

app.use(bodyParser.json())

app.use(authMildwr)

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
 	app.listen(3030)
})
 .catch(err => console.log(err))
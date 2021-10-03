const express = require('express')
const  graphqlHTTP  = require('express-graphql').graphqlHTTP
const schema = require('./schema/schema')

app = express()

app.use(
	'/graphql',
	graphqlHTTP({
		schema,
		graphiql: true
	})
)

const PORT = process.env.PORT || 4000

app.listen(PORT, () => {
	console.log(`Now listening on port ${PORT}`)
})

const express = require('express')
const graphqlHTTP = require('express-graphql')
const schema = require('./schema/schema')
const mongoose = require('mongoose')
const dotenv = require('dotenv')

// configure the environment
dotenv.config()

// connect to mongo db
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })

mongoose.connection.once('open', () => {
	console.log('Mongo DB connected!')
})

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

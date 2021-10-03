const graphql = require('graphql')
const _ = require('lodash')
let authors = require('./authors.json')
let books = require('./books.json')

// console.log({books})
// console.log({authors})

const { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID, GraphQLInt } = graphql

const BookType = new GraphQLObjectType({
	name: 'Book',
	fields: () => ({
		id: { type: GraphQLID },
		name: { type: GraphQLString },
		genre: { type: GraphQLString }
	})
})

let auths = [{
  "id": 1,
  "name": "Dael Yonge",
  "age": 53
}, {
  "id": 2,
  "name": "Novelia Mateo",
  "age": 66
}, {
  "id": 3,
  "name": "Stefa Wybrow",
  "age": 46
}]

let bks = [{
  "id": 1,
  "name": "Marilyn Hotchkiss' Ballroom Dancing & Charm School",
  "genre": "Comedy|Drama|Romance"
}, {
  "id": 2,
  "name": "Kismet",
  "genre": "Adventure|Fantasy"
}, {
  "id": 3,
  "name": "Charlie Wilson's War",
  "genre": "Comedy|Drama|War"
}]

console.log({ authors })

const AuthorType = new GraphQLObjectType({
	name: 'Author',
	fields: () => ({
		id: { type: GraphQLID },
		name: { type: GraphQLString },
		age: { type: GraphQLInt }
	})
})

const RootQuery = new GraphQLObjectType({
	name: 'RootQueryType',
	fields: {
		book: {
			type: BookType,
			args: { id: { type: GraphQLID } },
			resolve(parent, args) {
				// code to get data from db source
				// let foundBook = books.find( book => book.id === id );
				return _.find(bks, { id: args.id })
			}
		},
		author: {
			type: AuthorType,
			args: { id: { type: GraphQLID } },
			resolve(parent, args) {
				// code to get data from db source
				// let foundAuthor = authors.find( author => author.id === id );
				return _.find(auths, { id: args.id })
			}
		}
	}
})

module.exports = new GraphQLSchema({
	query: RootQuery
})

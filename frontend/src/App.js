import ApolloClient from 'apollo-boost'
import React, { Component } from 'react'
import { ApolloProvider } from 'react-apollo'
import './App.css'
import AddBook from './components/AddBook'
import BookList from './components/BookList'

// Apollo client setup
const client = new ApolloClient({
	uri: 'http://localhost:4001/graphql'
})

class App extends Component {
	render() {
		return (
			<ApolloProvider client={client}>
				<div id="main">
					<h1>CodenificienT Reading List</h1>
					<BookList />
          <br />
          <AddBook />
				</div>
			</ApolloProvider>
		)
	}
}

export default App

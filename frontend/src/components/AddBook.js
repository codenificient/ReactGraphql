import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import { addBookMutation, getAuthorsQuery, getBooksQuery } from '../queries/queries'
import {flowRight as compose} from 'lodash';

class AddBook extends Component {
	constructor(props) {
		super(props)
		this.state = {
			name: '',
			genre: '',
			authorId: ''
		}
	}

	displayAuthors() {
		let data = this.props.getAuthorsQuery
		if (data.loading) {
			return <option disabled>Loading authors...</option>
		} else {
			return data.authors.map((author) => {
				return (
					<React.Fragment key={author.id}>
						<option value={author.id}>{author.name}</option>
					</React.Fragment>
				)
			})
		}
	}

	handleSubmit(e) {
		e.preventDefault()
		console.log(this.props)
        this.props.addBookMutation({
            variables: {
                name: this.state.name,
                genre: this.state.genre,
                authorId: this.state.authorId
            },
            refetchQueries: [{ query: getBooksQuery}]
        })
        document.getElementById("add-book").reset()
	}

	render() {
		// console.log(this.props.addBookMutation)
		return (
			<form id="add-book" onSubmit={this.handleSubmit.bind(this)}>
				<div className="field">
					<label htmlFor="name">Book name:</label>
					<input type="text" onChange={(e) => this.setState({ name: e.target.value })} />
				</div>
				<div className="field">
					<label htmlFor="genre">Genre:</label>
					<input type="text" onChange={(e) => this.setState({ genre: e.target.value })} />
				</div>
				<div className="field">
					<label>Author:</label>

					<select onChange={(e) => this.setState({ authorId: e.target.value })}>
						<option>Select author</option>
						{this.displayAuthors()}
					</select>
				</div>
				<br />
				<button>+</button>
			</form>
		)
	}
}

export default compose(
	graphql(getAuthorsQuery, { name: 'getAuthorsQuery' }),
	graphql(addBookMutation, { name: 'addBookMutation' })
)(AddBook)

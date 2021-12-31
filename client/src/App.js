import React from 'react'
import './App.css'
// components
import BookList from './components/BookList'
// apollo client setup

function App() {
	return (
		<div className="App">
			<h1>CodenificienT Reading List</h1>
			<BookList />
		</div>
	)
}

export default App

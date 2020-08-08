import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import ListBooks from './ListBooks'
import SearchBook from './SearchBook'
import { BrowserRouter, Route, Link } from 'react-router-dom'

class BooksApp extends React.Component {
  state = {
    books: [],
  }

  // to switch what shelf a book is on
  changeShelf = async (book, shelf) => {
    BooksAPI.update(book, shelf);
    BooksAPI.getAll().then(data => this.setState({ books: data }))
  }

  
  componentDidMount() {
    BooksAPI.getAll() // fetching all books from BooksAPI
      .then((books) => {
        this.setState(() => ({
          books
        }))
      })
  }

  addBook = (book) => {
    console.log('adding book', book)
  }

  render() {
    return (
      <div className="app">
 
        <Route exact path='/' render={() => (
          <ListBooks 
          books={this.state.books}
          changeShelf={this.changeShelf}
          />
        )} />
                    
        <Route path ='/search' render={({ history }) => (
          <SearchBook 
            books={this.state.books}
            changeShelf={this.changeShelf}
            onAddBook={(book) => {
              this.addBook(book)
              history.push('/')
            }} 
          />
        )} 
        />
      
      
      </div>
      )
  }
}

export default BooksApp

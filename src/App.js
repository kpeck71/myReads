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
    console.log('book',book,'shelf',shelf)
    await BooksAPI.update(book, shelf);
    // use async/await to ensure update runs THEN getAll
    await BooksAPI.getAll()
    .then((books) => {
      this.setState(() => ({ 
        books 
      }), () => {console.log('updated state =>', this.state)})
      })
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
            // onAddBook={(book) => {
            //   this.addBook(book)
            //   history.push('/')
            // }} 
          />
        )} 
        />
      
      
      </div>
      )
  }
}

export default BooksApp

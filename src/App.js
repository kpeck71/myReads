import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import ListBooks from './ListBooks'
import AddBook from './AddBook'
import { BrowserRouter, Route, Link } from 'react-router-dom'

class BooksApp extends React.Component {
  state = {
    books: [],
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: false
  }

  // changeShelf = (newShelf, book) => {
  //   BooksAPI.update(book, newShelf);
  //   BooksAPI.getAll().then(data => this.setState({ books: data }))
  // }

  changeShelf = async (book, shelf) => {
    BooksAPI.update(shelf, book);
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

    getResults = (query) => {
      BooksAPI.search(query)
          .then((books) => {
              console.log(books)
              this.setState((books) => ({
                  books
              }))
          })
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
          <AddBook 
            books={this.state.books}
            getResults={this.getResults}
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

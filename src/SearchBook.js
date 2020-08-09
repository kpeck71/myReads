import React from 'react'
import ListBooks from './ListBooks'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'

class SearchBook extends React.Component {    

    state = {
        query: '',
        searchResults: [],
    }

    getResults = (query) => {
        this.setState({
            query
        })
        if (query) {
        BooksAPI.search(query)
            .then((results) => {
                if (results.error) {
                    console.error(`BookAPI responded with error: ${results.error}`)
                    this.setState({searchResults: []})
                } else {
                this.matchShelves(results)
                }  
            })
        } else {
            this.setState({searchResults: []});
        }
    }

    matchShelves = (results) => {
        const matchedBooks = results.map(searchBook => {
            searchBook.shelf = "none";
            this.props.books.map(book => (
                book.id === searchBook.id ?
                searchBook.shelf = book.shelf : '')
            );
            return searchBook
        });

        this.setState({
            searchResults: matchedBooks
        })
    }

    // update shelf when changing book in Search page
    // ensures shelf is updated when returning to home / page as well
    updateBooks = (book, shelf) => {
        let currentResults = this.state.searchResults;
        const bookToUpdate = currentResults.filter (cBook => cBook.id === book.id)[0];
        bookToUpdate.shelf = shelf;
        this.setState({ searchResults: currentResults});
        this.props.changeShelf(book, shelf)
    }
    
    
    render () {
        const { getResults, changeShelf, books, updateBooks } = this.props

    return (
        <div className="search-books">
            <div className="search-books-bar">
            <Link 
                className="close-search"
                to="/">
            </Link>
              <div className="search-books-input-wrapper">
               
                <input type="text" placeholder="Search by title or author" onChange={e => this.getResults(e.target.value)}/>

              </div>
            </div>
            
                <div className="search-books-results">
                <ol className="books-grid">
                  {this.state.searchResults.map((book) => (
                       <li key={book.id}>
                       <div className="book">
                           <div className="book-top">
                               <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url("${book.imageLinks && book.imageLinks.thumbnail}")` }}></div>
                               <div className="book-shelf-changer">
                                   <select value={book.shelf} onChange={e => this.updateBooks(book, e.target.value)}>
                                   <option value="move" disabled>Move to...</option>
                                   <option value="currentlyReading">Currently Reading</option>
                                   <option value="wantToRead">Want to Read</option>
                                   <option value="read">Read</option>
                                   <option value="none">None</option>
                                   </select>
                               </div>
                           </div>
                           <div className="book-title">{book.title}</div>
                           <div className="book-authors">{book.authors}</div>
                       </div>
                   </li>
                  ))}
                </ol>
                
                </div>

        </div>
                


        )
    }
}

export default SearchBook;

import React from 'react'
import BookGrid from './BookGrid'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'

class AddBook extends React.Component {    
    
    handleSearch = (e) => {
        e.preventDefault();
        const query = e.target.value
        // console.log(query)
        this.props.getResults(query)
    }
    
    
    render () {
        const { onAddBook, books, getResults } = this.props

    return (
        <div className="search-books">
            <div className="search-books-bar">
            <Link 
                className="close-search"
                to="/">
            </Link>
              <div className="search-books-input-wrapper">
                {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.*/}
               
                <input type="text" placeholder="Search by title or author" onChange={this.handleSearch}/>

              </div>
            </div>
            
                <div className="search-books-results">
                {this.books && (<ol className="books-grid">
                    <BookGrid books={this.books} />
                </ol>)}
                </div>
                
            
          </div>

        )
    }
}

export default AddBook;

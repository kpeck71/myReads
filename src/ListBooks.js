import React from 'react'
import BookShelf from './BookShelf'
import { Link } from 'react-router-dom'

class ListBooks extends React.Component {

    render() {
        
        const { books, changeShelf } = this.props

        return (
            
            <div className="list-books">
                <div className="list-books-title"><h1>MyReads</h1></div>
                <div>
                    <div className="list-books-content">
                        <BookShelf 
                        shelfTitle="Current Reading"
                        books={books.filter(book => book.shelf === "currentlyReading")} 
                        changeShelf={changeShelf}
                        />    
                    </div>
                    <div className="list-books-content">
                        <BookShelf 
                        shelfTitle="Want to Read"
                        books={books.filter(book => book.shelf === "wantToRead")} 
                        changeShelf={changeShelf}
                        /> 
                    </div>
                    <div className="list-books-content">
                        <BookShelf 
                        shelfTitle="Read"
                        books={books.filter(book => book.shelf === "read")} 
                        changeShelf={changeShelf}
                        />         
                    </div>
                </div>
            <Link 
                to='/search'
                className='open-search'>
                <button>Add Book</button>
            </Link>
            </div>
        
        )
        
    }
};

export default ListBooks;
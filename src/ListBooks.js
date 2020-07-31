import React from 'react'
import BookGrid from './BookGrid'

class ListBooks extends React.Component {

    render() {
        // let shelfTypes = [ 
        //     {
        //         'value': 'currentReading',
        //         'heading': 'Currently Reading'
        //     },
        //     {
        //         'value': 'wantToRead',
        //         'heading': 'Want to Read'
        //     }, 
        //     {
        //         'value': 'haveRead',
        //         'heading': 'Read'
        //     },
        // ]


        const { books, changeShelf } = this.props

        // let bookshelves = shelfTypes.map(shelf => shelf.heading);
        // console.log(bookshelves)

        let currentlyReading = books.filter(book => book.shelf === "currentlyReading");
        let toRead = books.filter(book => book.shelf === "wantToRead");
        let haveRead = books.filter(book => book.shelf === "read");

        return (
            <div>
            <div className="list-books-content">
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Currently Reading</h2>
                  <div className="bookshelf-books">
                  <BookGrid bookList={currentlyReading} changeShelf={changeShelf}/>        
                  </div>
                </div>
            </div>
            <div className="list-books-content">
                <div className="bookshelf">
                <h2 className="bookshelf-title">Want to Read</h2>
                <div className="bookshelf-books">
                <BookGrid bookList={toRead} changeShelf={changeShelf}/>        
                </div>
                </div>
            </div>
            <div className="list-books-content">
                <div className="bookshelf">
                <h2 className="bookshelf-title">Read</h2>
                <div className="bookshelf-books">
                <BookGrid bookList={haveRead} changeShelf={changeShelf}/>        
                </div>
            </div>
            </div>
            </div>
        )
        
    }
};

export default ListBooks;
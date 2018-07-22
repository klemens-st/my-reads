import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Book from './Book';

class BookList extends Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
    changeShelf: PropTypes.func.isRequired
  }

  handleSelect(book, shelf) {
    // Create a new object with overriden shelf
    this.props.changeShelf(
      Object.assign(book, {shelf})
    );
  }

  render() {
    const books = this.props.books;
    // Put books in appropriate arrays.
    // Store arrays in respective objects
    const read = {
      books: books.filter((book) => 'read' === book.shelf),
      title: 'Read',
      key: 'read'
    };
    const wantToRead = {
      books: books.filter((book) => 'wantToRead' === book.shelf),
      title: 'Want To Read',
      key: 'wantToRead'
    };
    const currentlyReading = {
      books: books.filter((book) => 'currentlyReading' === book.shelf),
      title: 'Currently Reading',
      key: 'currentlyReading'
    };

    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            {[read, wantToRead, currentlyReading].map((shelf) => (
              <div className="bookshelf" key={shelf.key}>
                <h2 className="bookshelf-title">{shelf.title}</h2>
                <div className="bookshelf-books">
                  <ol className="books-grid">
                    {shelf.books.map((book) => (
                      <Book
                        key={book.id}
                        book={book}
                        changeShelf={this.props.changeShelf}
                      />
                    ))}
                  </ol>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="open-search">
          <Link to="/search">Add a book</Link>
        </div>
      </div>

    );
  }
}

export default BookList;
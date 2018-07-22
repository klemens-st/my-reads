import React, { Component } from 'react';
import PropTypes from 'prop-types';

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
                      <li key={book.id}>
                        <div className="book">
                          <div className="book-top">
                            <div
                              className="book-cover"
                              style={{
                                width: 128,
                                height: 193,
                                backgroundImage: `url(${book.imageLinks.thumbnail})`
                              }}>
                            </div>
                            <div className="book-shelf-changer">
                              <select
                                value={book.shelf}
                                onChange={(e) => this.handleSelect(book, e.target.value)}>
                                <option value="move" disabled>Move to...</option>
                                <option value="currentlyReading">Currently Reading</option>
                                <option value="wantToRead">Want to Read</option>
                                <option value="read">Read</option>
                                <option value="none">None</option>
                              </select>
                            </div>
                          </div>
                          <div className="book-title">{book.title}</div>
                          <div className="book-authors">{book.authors.join(', ')}</div>
                        </div>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="open-search">
          <a onClick={() => this.setState({ showSearchPage: true })}>Add a book</a>
        </div>
      </div>

    );
  }
}

export default BookList;
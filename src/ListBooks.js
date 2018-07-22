import React, { Component } from 'react';
import PropTypes from 'prop-types';
import BookShelf from './BookShelf';

class BookList extends Component {
  static propTypes = {
    books: PropTypes.array.isRequired
  }

  render() {
    const books = this.props.books;
    // Put books in appropriate arrays.
    const read = books.filter((book) => 'read' === book.shelf);
    const wantToRead = books.filter((book) => 'wantToRead' === book.shelf);
    const currentlyReading = books.filter((book) => 'currentlyReading' === book.shelf);

    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            <BookShelf shelfBooks={read} title='Read' />
            <BookShelf shelfBooks={wantToRead} title='Want To Read' />
            <BookShelf shelfBooks={currentlyReading} title='Currrently Reading' />
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
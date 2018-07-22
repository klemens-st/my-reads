import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Book from './Book';

class BookShelf extends Component {
  static propTypes = {
    shelfBooks: PropTypes.array.isRequired,
    title: PropTypes.string.isRequired
  }


  render() {
    const {shelfBooks, title} = this.props;

    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{title}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {shelfBooks.map((book) => (
              <li key={book.id}>
                <Book book={book}/>
              </li>
            ))}
          </ol>
        </div>
      </div>
    );
  }
}

export default BookShelf;
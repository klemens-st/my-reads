import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Book extends Component {
  static propTypes = {
    book: PropTypes.object.isRequired,
    changeShelf: PropTypes.func.isRequired,

  }

  handleSelect(book, shelf) {
    // Create a new object with overriden shelf
    this.props.changeShelf(
      Object.assign(book, {shelf})
    );
  }

  render() {
    const book = this.props.book;

    return (
      <li>
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
    );
  }
}

export default Book;
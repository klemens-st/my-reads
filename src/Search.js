import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { search } from './BooksAPI';
import Book from './Book';

class Search extends Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
    changeShelf: PropTypes.func.isRequired
    // handleSearch: PropTypes.func.isRequired
  }

  state = {
    query: '',
    results: []
  }

  updateQuery = (query) => {
    this.setState({query: query});
    // Don't call the API if the query is empty
    // Also reset results
    if ('' === query) {
      this.setState({results: []});
      return;
    }
    this.fetchResults(query);
  }

  fetchResults(query) {
    // Filter out books that are already assigned
    // To shelves and get them from App state
    const currentIDs = this.props.books.map((book) => book.id);
    search(query.trim()).then((results) => {
      console.log(results);
      if (!results || 'error' in results) throw new Error('Invalid results');

      this.setState((state) => {
        results = results.filter((book) => !currentIDs.includes(book.id))
          .concat(this.props.books);
        // Attempt to solve the 'holding backspace' bug.
        // Attempt successful, but this took a lot of time to figure out.
        '' === state.query && (results = []);
        return {results};
      });
    }).catch(() => {
      this.setState({results: []});
    });
  }

  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/" className="close-search">Close</Link>
          <div className="search-books-input-wrapper">
            {/*
              NOTES: The search from BooksAPI is limited to a particular set of search terms.
              You can find these search terms here:
              https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

              However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
              you don't find a specific author or title. Every search is limited by search terms.
            */}
            <input
              type="text"
              placeholder="Search by title or author"
              value={this.state.query}
              onChange={(e) => this.updateQuery(e.target.value)}
            />

          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {this.state.results.map((book) => (
              <Book
                key={book.id}
                book={book}
                changeShelf={this.props.changeShelf}
              />
            ))}
          </ol>
        </div>
      </div>
    );
  }
}

export default Search;
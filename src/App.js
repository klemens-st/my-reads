import React from 'react';
import { Route } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import './App.css';
import ListBooks from './ListBooks';
import Search from './Search';

class BooksApp extends React.Component {
  state = {
    books: [],
    showSearchPage: false
  }

  componentDidMount() {
    // Only returns books assigned to shelves
    BooksAPI.getAll().then((books) => {
      this.setState({books});
      console.log(books);
    });
  }

  changeShelf = (book) => {
    this.setState((state) => ({
      // Get all books except the one we are changing
      // If we are adding a new book we will simply get
      // the entire array from state.
      // Then push our new book to the array.
      books: state.books.filter((oldBook) => (
        oldBook.id !== book.id
      )).concat([book])
    }));
  }

  render() {
    return (
      <div className="app">
        <Route path="/search" render={() => (
          <Search
            books={this.state.books}
            changeShelf={this.changeShelf}
          />
        )}/>
        <Route exact path="/" render={() => (
          <ListBooks
            books={this.state.books}
            changeShelf={this.changeShelf}
          />
        )}/>
      </div>
    );
  }
}

export default BooksApp;

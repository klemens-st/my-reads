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
    BooksAPI.getAll().then((books) => {
      this.setState({books});
      console.log(books);
    });
  }

  changeShelf = (book) => {
    this.setState((state) => ({
      books: state.books.map((oldBook) => {
        if (book.id !== oldBook.id) return oldBook;
        return book;
      })
    }));
  }

  render() {
    return (
      <div className="app">
        <Route path="/search" render={() => (
          <Search />
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

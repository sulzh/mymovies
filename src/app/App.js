// Core
import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

// Components
import { Provider } from '../components/HOC/withProps';

//Navigation
import { book } from '../navigation/book'

// Pages
import Main from '../pages/Main';
import Film from '../pages/Film';
import Search from '../pages/Search';
import Favorites from '../pages/Favorites';

export default class App extends Component {
  state = {
    favoriteMoviesIds: localStorage.getItem('favMovies') ? localStorage.getItem('favMovies').split(',') : [],
  };

  render () {
    const { favoriteMoviesIds } = this.state;

    return (
      <Provider value = {{ favoriteMoviesIds }}>
        <Switch>
          <Route
            exact
            component = { Main }
            path = { book.main }          
          />
          <Route
            exact
            component = { Favorites }
            path = { book.favorites }          
          />
          <Route
            exact
            component = { Search }
            path = { book.search }          
          />
          <Route
            exact
            component = { Film }
            path = { book.movie }          
          />
        </Switch>
      </Provider>
    );
  };
}

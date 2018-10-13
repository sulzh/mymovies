// Core
import React, { Component, Fragment } from 'react';

// Instruments
import { api } from '../../REST/api';

// Components
import Header from '../../components/Header';
import Movie from '../../components/Movie';
import Spinner from '../../components/Spinner';
import { withProps } from '../../components/HOC/withProps';

export class Favorites extends Component {
  state = {
    favoriteMovies: [],
    isSpinning: false,
  };

  componentDidMount() {
    this._fetchFavoriteMoviesAsync();
  };

  _setMoviesFetchingState = (stateSpin) => {
    this.setState({ isSpinning: stateSpin });
  };

  _fetchFavoriteMoviesAsync = async () => {
    try {
      this._setMoviesFetchingState(true);

      const { favoriteMoviesIds } = this.props;
      const favoriteMovies = await api.fetchFavoriteMovies(favoriteMoviesIds);

      this.setState({ favoriteMovies });
    } catch ({message}) {
      console.log(message);
    } finally {
      this._setMoviesFetchingState(false);
    }
  };

  render () {
    const { favoriteMovies, isSpinning } = this.state;
    const { favoriteMoviesIds } = this.props;

    const movies = favoriteMovies.map(movie => (
      <Movie 
        favoriteMoviesIds = { favoriteMoviesIds }
        fetchFavoriteMoviesAsync = { this._fetchFavoriteMoviesAsync }
        key = { movie.id } 
        { ...movie }
      />
    ));

    return (
      <Fragment>
        <Header />
        <main id = "main" className = "main main_favorites">
          <div className = "container">
            <div id = "movies-list" className = "movie-list">
              <Spinner isSpinning = { isSpinning } />
              { movies }
            </div>
          </div>
        </main>
      </Fragment>
    );
  };
}

export default withProps(Favorites);
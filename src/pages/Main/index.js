// Core
import React, { Component, Fragment } from 'react';

// Instruments
import { api } from '../../REST/api';
import { debounce } from '../../instruments';

// Components
import SearchBar from '../../components/SearchBar';
import Header from '../../components/Header';
import Movie from '../../components/Movie';
import Spinner from '../../components/Spinner';
import { withProps } from '../../components/HOC/withProps';

export class Main extends Component {
  state = {
    popularMovies: [],
    isSpinning: false,
  };

  page = {
    pages: 1,
    totalPages: 1,
  };

  componentDidMount() {
    const { pages } = this.page;

    this._fetchPopularMoviesAsync(pages);
    window.addEventListener('scroll', this._initInfiniteScroll);
  };

  componentWillUnmount() {
    window.removeEventListener('scroll', this._initInfiniteScroll);
  };

  _initInfiniteScroll = debounce(() => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight && this.page.pages < this.page.totalPages) {
      this.page.pages += 1;
      this._fetchPopularMoviesAsync(this.page.pages);
    }
  });

  _setMoviesFetchingState = (stateSpin) => {
    this.setState({ isSpinning: stateSpin });
  };

  _fetchPopularMoviesAsync = async (page) => {
    try {
      this._setMoviesFetchingState(true);

      const { popularMovies, totalPages } = await api.fetchPopularMovies(page);

      if (this.page.totalPages !== totalPages) {
        this.page.totalPages = totalPages;
      };

      this.setState({ popularMovies: this.state.popularMovies.concat(popularMovies) });
    } catch ({message}) {
      console.log(message);
    } finally {
      this._setMoviesFetchingState(false);
    }
  };

  render () {
    const { popularMovies, isSpinning } = this.state;
    const { favoriteMoviesIds } = this.props;

    const movies = popularMovies.map(movie => (
      <Movie
        favoriteMoviesIds = { favoriteMoviesIds }
        key = { movie.id } 
        { ...movie }
      />
    ));

    return (
      <Fragment>
        <Header />
        <main id = "main" className = "main">
          <div className = "container">
            <div className = "heading">
              <h1 className = "heading__title">Discover, find and save movies to your collection of favorites</h1>
            </div>
            <SearchBar />
            <div id = "movies-list" className = "movie-list">
              { movies }
            </div>
            <Spinner isSpinning = { isSpinning } />
          </div>
        </main>
      </Fragment>
    );
  };
}

export default withProps(Main);
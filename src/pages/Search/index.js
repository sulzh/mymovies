// Core
import React, { Component, Fragment } from 'react';

// Instruments
import qs from 'query-string';
import { api } from '../../REST/api';
import { debounce } from '../../instruments';

// Components
import Header from '../../components/Header';
import SearchBar from '../../components/SearchBar';
import Movie from '../../components/Movie';
import Spinner from '../../components/Spinner';
import NoResults from '../../components/NoResults';
import { withProps } from '../../components/HOC/withProps';

class Search extends Component {
  state = {
    foundMovies: [],
    isSpinning: false,
    noResults: false,
  };

  page = {
    query: qs.parse(this.props.location.search).results,
    prevQuery: qs.parse(this.props.location.search).results,
    pages: 1,
    totalPages: 1,
  };

  componentDidMount () {
    const { query, pages } = this.page;

    this._searchMoviesAsync(query, pages);
    window.addEventListener('scroll', this._initInfiniteScroll);
  };

  componentDidUpdate (prevProps) {
    this._compareQueries(prevProps);
  };

  componentWillUnmount() {
    window.removeEventListener('scroll', this._initInfiniteScroll);
  };

  _compareQueries = (prevProps) => {
    const prevQuery = qs.parse(prevProps.location.search).results;
    const newQuery = qs.parse(this.props.location.search).results;

    if (prevQuery !== newQuery) {
      this.page = {
        query: newQuery,
        prevQuery: newQuery,
        pages: 1,
        totalPages: 1,
      };
      this._searchMoviesAsync(newQuery, this.page.pages, true);
    }
  };

  _setMoviesFetchingState = (stateSpin) => {
    this.setState({ isSpinning: stateSpin });
  };

  _setNoResultsState = (isNoResults) => {
    this.setState({ noResults: isNoResults });
  };

  _initInfiniteScroll = debounce(() => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight && this.page.pages < this.page.totalPages) {
      this.page.pages += 1;
      this._searchMoviesAsync(this.page.query, this.page.pages);
    }
  });

  _searchMoviesAsync = async (query, page, isNewQuery) => {
    try {
      this._setMoviesFetchingState(true);

      const { foundMovies, totalPages } = await api.searchMovies(query, page);

      if (this.page.totalPages !== totalPages) {
        this.page.totalPages = totalPages;
      }

      if (isNewQuery) {
        this.setState({ foundMovies });
      } else {
        this.setState({ foundMovies: this.state.foundMovies.concat(foundMovies) });
      }

      if (this.state.noResults) {
        this._setNoResultsState(false);
      }
    } catch ({message}) {
      this._setNoResultsState(true);
      console.log(message);
    } finally {
      this._setMoviesFetchingState(false);
    }
  };

  render () {
    const { foundMovies, isSpinning, noResults } = this.state;
    const { favoriteMoviesIds } = this.props;
    const { query } = this.page;

    const movies = foundMovies.map(movie => (
        <Movie 
          favoriteMoviesIds = { favoriteMoviesIds }
          key = { movie.id } 
          { ...movie }
        />
    ));

    return (
      <Fragment>
        <Header />
        <main id = "main" className = "main main_search">
          <div className = "container">
            <div className = "heading">
              <h1 className = "heading__title">
                {
                  foundMovies.length !== 0 ?
                  `Results by searching "${ query }".` :
                  `Results by searching "${ query }". Try out more...`
                }
              </h1>
            </div>
            <SearchBar />
            <div id = "movies-list" className = "movie-list">
              {
                noResults ? <NoResults /> : movies
              }
            </div>
            <Spinner isSpinning = { isSpinning } />
          </div>
        </main>
      </Fragment>
    );
  };
}

export default withProps(Search);
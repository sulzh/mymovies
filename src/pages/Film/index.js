// Core
import React, { Component, Fragment } from 'react';

// Instruments
import qs from 'query-string';
import { api } from '../../REST/api';

// Components
import Header from '../../components/Header';
import { withProps } from '../../components/HOC/withProps';

//Styles
import './styles.css';

class Film extends Component {
  state = {
    movieData: {},
  };

  componentDidMount () {
    const id = qs.parse(this.props.location.search).id

    this._fetchMovieAsync(id);
  };

  _fetchMovieAsync = async (id) => {
    try {
      const movieData = await api.fetchMovie(id);

      this.setState({ movieData });
    } catch ({message}) {
      console.log(message);
    } finally {
      // this._setMoviesFetchingState(false);
    }
  };

  render () {
    const { 
      poster_path, 
      original_title, 
      tagline, 
      overview, 
      vote_average, 
      genres, 
      release_date 
    } = this.state.movieData;

    const genre = genres ? genres.map(item => {
      return (<li key = { item.id  } className = "film__genre">{ item.name }</li>);
    }) : null;

    return (
      <Fragment>
        <Header />
        <div className = "film container">
          <div className = "film__poster">
            <img className = "film__img" 
              src = { `https://image.tmdb.org/t/p/w300/${ poster_path }` }
              alt = { `${original_title} poster` }
            />
          </div>
          <div className = "film__info">
            <h1 className = "film__title">{ original_title }</h1>
            <h2 className = "film__subtitle">{ tagline }</h2>
            <span className = "film__rate">Rate: { vote_average }</span>
            <span className = "film__date">Release date: { release_date }</span>
            <div className = "film__genres-block">
              <span className = "film__text">Genres:</span>
              <ul className = "film__genres">{ genre }</ul>
            </div>
            <p className = "film__description">{ overview }</p>
          </div>
        </div>
      </Fragment>
    );
  };
}

export default withProps(Film);
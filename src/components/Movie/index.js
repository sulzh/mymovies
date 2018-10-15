//Core
import React, {Component} from 'react';
import { Link } from 'react-router-dom';

//Styles
import './index.css';

export default class Movie extends Component {
  state = {
    like: this.props.favoriteMoviesIds.includes(this.props.id.toString()),
  };

  _toggleLike = () => {
    const { like } = this.state;
    const id = this.props.id.toString();
    const { fetchFavoriteMoviesAsync } = this.props;
    
    if (like) {
      this._deleteMovieId(id);
      this.setState({ like: false });
    } else {
      this._setMovieId(id);
      this.setState({ like: true });
    }

    if (fetchFavoriteMoviesAsync) {
      fetchFavoriteMoviesAsync();
    }
  };

  _setMovieId = (id) => {
    const { favoriteMoviesIds } = this.props;

    favoriteMoviesIds.push(id);
    localStorage.setItem('favMovies', favoriteMoviesIds);
  };

  _deleteMovieId = (id) => {
    const { favoriteMoviesIds } = this.props;

    favoriteMoviesIds.splice(favoriteMoviesIds.indexOf(id), 1);
    localStorage.setItem('favMovies', favoriteMoviesIds);
  };

  render () {
    const { id, poster_path, original_title, release_date, vote_average } = this.props;
    const { like } = this.state;

    const imgJsx = (
      <img className = "movie__poster" 
        src = { `https://image.tmdb.org/t/p/w300/${ poster_path }` }
        alt = { `${original_title} poster` }
      />
    );

    const noImgJsx = (<div className = "movie__no-poster"></div>);

    return (
      
      <div className = "movie">
        <div className = "movie__container">
          { poster_path ? imgJsx : noImgJsx }
          <div className = "movie__info">
            <Link className = "movie__link" to = {{ pathname: "/movie", search: `?id=${id}` }}>
              <h2 className = "movie__title">{ original_title }</h2>
            </Link>
            <div className = "movie__block">
              <div className = "movie__wrap">
                <span className = "movie__rate">{ `Rate: ${vote_average}` }</span>
                <span className = "movie__date">{ `Date: ${release_date}` }</span>
              </div>
              <button 
                className = { like ? "movie__like movie__like_active" : "movie__like" }
                onClick = { this._toggleLike }
              >
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
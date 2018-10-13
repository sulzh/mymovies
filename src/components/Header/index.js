//Core
import React, {Component} from 'react';
import { Link } from 'react-router-dom';

//Styles
import './index.css';

export default class Header extends Component {
  _openSearch = () => {
    const { _toggleSearch } = this.props;

    _toggleSearch(true);
  };

  render () {
    return (
      <header className = "header">
        <div className = "header__wrapper container">
          <div className = "logo">
            <Link to = '/' className = "logo__link" >MyMovies</Link>
          </div>
          <div className = "header__links header-links">
            <Link to = '/favorites' className = "header-links__item header-links__item_fav" ></Link>
          </div>
        </div>
      </header>
    );
  }
}
//Core
import React, {Component} from 'react';
import { NavLink } from 'react-router-dom';

//Styles
import './index.css';

export default class Header extends Component {
  render () {
    return (
      <header className = "header">
        <div className = "header__wrapper container">
          <div className = "logo">
            <NavLink to = '/' className = "logo__link" >MyMovies</NavLink>
          </div>
          <div className = "header__links header-links">
            <NavLink to = '/favorites' className = "header-links__item header-links__item_fav"></NavLink>
          </div>
        </div>
      </header>
    );
  }
}
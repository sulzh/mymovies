//Core
import React, {Component} from 'react';
import history from '../../navigation/history';

//Styles
import './index.css';

export default class SearchBar extends Component {
  state = {
    query: ''
  };

  _handleFormSubmit = (e) => {
    e.preventDefault();
    this._submitQuery();
  };

  _updateQuery = (e) => {
    const {value: query} = e.target;

    this.setState({query});
  };

  _submitQuery = () => {
    const { query } = this.state;

    if (!query) return null;
    
    history.push({
      pathname: '/search',
      search: `results=${query}`
    });

    this.setState({query: ''});
  };

  _handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      this._submitQuery();
    }
  };

  render () {
    return (
      <div className = "search">
        <form
          className = "search-form"
          onSubmit = { this._handleFormSubmit }
        >
          <input
            className = "search-form__input" 
            type = "text" 
            placeholder = "Find movies"
            onChange = { this._updateQuery }
            onKeyDown = { this._handleKeyDown }
          />
          <button type = "submit" className = "btn search-form__btn"></button>
        </form>
      </div>
    );
  }
}
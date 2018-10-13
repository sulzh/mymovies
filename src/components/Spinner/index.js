//Core
import React, { Component } from 'react';

//Styles
import './style.css';

export default class Spinner extends Component {
  render() {
    const { isSpinning } = this.props;

    return isSpinning ? <div className = "spinner"><div></div><div></div><div></div><div></div></div> : null;
  }
}
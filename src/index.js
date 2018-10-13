// Core
import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';
import history from './navigation/history';

// Theme
import './theme/index.css';

// App
import App from './app/App';

ReactDOM.render(
    <Router history = { history } basename = { process.env.PUBLIC_URL + '/' }>
      <App/>
    </Router>,
  document.getElementById('root')
);
registerServiceWorker();

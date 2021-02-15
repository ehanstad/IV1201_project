/**
 * @file The indexfile in witch the ReactDOM is rendered
 * @author Erik Hanstad
 * @requires react
 * @requires react-dom
 * @requires react-redux
 */
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root'),
);

reportWebVitals();

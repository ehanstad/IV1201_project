/**
 * @file The indexfile in witch the ReactDOM is rendered
 * @author Erik Hanstad
 * @requires react
 * @requires react-dom
 * @requires react-redux
 */
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <BrowserRouter>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </BrowserRouter>,
  document.getElementById('root'),
);

reportWebVitals();

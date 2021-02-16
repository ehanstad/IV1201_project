/**
 * @file React base Component
 * @requires react-router-dom
 * @author Erik Hanstad
 */
import React from 'react';
import { Route } from 'react-router-dom';
import './App.css';
import Registration from './components/registration';
import Login from './components/login';

function App() {
  return (
    <div className="App">
      <Route exact path="/registration" component={Registration} />
      <Route exact path="/" component={Login} />
    </div>
  );
}

export default App;

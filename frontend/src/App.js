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
import Admin from './components/admin';
import Application from './components/application';

function App() {
  return (
    <div className="App">
      <Route exact path="/" component={Login} />
      <Route exact path="/registration" component={Registration} />
      <Route exact path="/application" component={Application} />
      <Route exact path="/admin" component={Admin} />
    </div>
  );
}

export default App;

/**
 * @file React base Component
 * @requires react-router-dom
 * @author Erik Hanstad
 */
import React, { useEffect } from 'react';
import { Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import Registration from './components/registration';
import Login from './components/login';
import Admin from './components/admin';
import Application from './components/application';
import store from './store';
import { loadUser } from './redux/actions/authActions';

function App() {
  useEffect(() => {
    store.dispatch(loadUser());
  });
  return (
    <Provider store={store}>
      <div className="App">
        <Route exact path="/" component={Login} />
        <Route exact path="/registration" component={Registration} />
        <Route exact path="/applicant" component={Application} />
        <Route exact path="/recuiter" component={Admin} />
      </div>
    </Provider>
  );
}

export default App;

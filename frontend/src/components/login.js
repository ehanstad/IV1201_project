/**
 * @file
 * @author Erik Hanstad
 * @author Lucas Villarroel
 */

import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Alert, Form, Card } from 'react-bootstrap';
import { login } from '../redux/actions/authActions';
import { clearError } from '../redux/actions/errorActions';
import { LOGIN_FAIL } from '../redux/types';

function Login() {
  /**
   * Action dispatcher.
   */
  const dispatch = useDispatch();

  /**
   * Local states
   */
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  /**
   * Subscribe to global states.
   */
  const auth = useSelector((state) => state.auth);
  const error = useSelector((state) => state.error);

  /**
   * Dispatches login action based on form parameters.
   * Will prevent empty fields
   * @param {object} e - Event
   */
  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(clearError());
    dispatch(login({ username, password }));
  };

  if (auth.isAuthenticated) {
    if (auth.user.rid === '1') {
      return <Redirect to="/recruiter" />;
    }
    if (auth.user.rid === '2') {
      return <Redirect to="/applicant" />;
    }
  } else if (auth.user) {
    return <Redirect to="/old/update" />;
  }

  /**
   * Generate status alert of login.
   */
  let message;
  if (error.id === LOGIN_FAIL) {
    message = (
      <Alert variant="danger" color="danger">
        {error.message}
      </Alert>
    );
  }

  return (
    <>
      <Card style={{ width: '40rem' }} className="mx-auto">
        <Card.Body>
          <h2>Login</h2>
          {message}
          <Form onSubmit={handleLogin}>
            <Form.Group>
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter username"
                required
                onChange={(e) => setUsername(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter password"
                required
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="on"
              />
            </Form.Group>
            <Button type="submit">LOGIN</Button>
            <inline> or</inline>
            <Button variant="link" href="./registration">
              Create a new account.
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </>
  );
}

export default Login;

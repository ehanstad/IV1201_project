/**
 * @file The component for adding a new applicant
 * @author Erik Hanstad
 * @author Lucas Villarroel
 */
import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Alert, Form, Card, Spinner } from 'react-bootstrap';
import { register } from '../redux/actions/authActions';
import { REGISTER_FAIL, REGISTER_SUCCESS } from '../redux/types';

function Registration() {
  /**
   * Action dispatcher.
   */
  const dispatch = useDispatch();

  /**
   * Local states
   */
  const [fname, setFname] = useState('');
  const [lname, setLname] = useState('');
  const [ssn, setSsn] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  /**
   * Subscribe to global states.
   */
  const auth = useSelector((state) => state.auth);
  const error = useSelector((state) => state.error);

  /**
   * Adds the applicants information to a database
   *
   * @param {button} e - The forms submitbutton
   */
  const addApplicant = (e) => {
    e.preventDefault();
    dispatch(register({ fname, lname, ssn, email, username, password }));
  };

  if (auth.isAuthenticated) {
    if (auth.user.rid === '1') {
      return <Redirect to="/recruiter" />;
    }
    if (auth.user.rid === '2') {
      return <Redirect to="/applicant" />;
    }
  }

  /**
   * Generate status alert of registration.
   */
  let message;
  switch (error.id) {
    case REGISTER_FAIL:
      message = <Alert variant="danger">{error.message}</Alert>;
      break;
    case REGISTER_SUCCESS:
      message = <Alert variant="success">{error.message}</Alert>;
      break;
    default:
  }

  return (
    <Card style={{ width: '40rem' }} className="mx-auto">
      <Card.Body>
        <h2>Registration</h2>
        {message}
        <Form onSubmit={addApplicant}>
          <Form.Group>
            <Form.Label>First name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter first name"
              required
              onChange={(e) => setFname(e.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Last name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter last name"
              required
              onChange={(e) => setLname(e.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Social security number</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter social security #"
              required
              onChange={(e) => setSsn(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter email"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
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
            />
          </Form.Group>
          {auth.loading ? (
            <Button type="submit" disabled>
              <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
            </Button>
          ) : (
            <Button type="submit">REGISTER</Button>
          )}
        </Form>
        <a href="./">Login</a>
      </Card.Body>
    </Card>
  );
}

export default Registration;

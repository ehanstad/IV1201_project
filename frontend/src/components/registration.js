/**
 * @file The component for adding a new applicant
 * @author Erik Hanstad
 * @author Lucas Villarroel
 */
import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Alert, Form, Card } from 'react-bootstrap';
import { register } from '../redux/actions/authActions';
import { clearError } from '../redux/actions/errorActions';

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
  const [prevError, setPrevError] = useState('');
  const [status, setStatus] = useState({ message: null, loading: false });

  /**
   * Subscribe to global states.
   */
  const auth = useSelector((state) => state.auth);
  const error = useSelector((state) => state.error);

  /**
   * Sets states on registration success.
   */
  const registerSuccess = () => {
    setStatus({ message: 'Account created successfully.', loading: false });
  };

  /**
   * Handles state changes based on registration status.
   */
  useEffect(() => {
    if (error.id !== prevError) {
      if (error.id === 'REGISTER_FAIL') {
        setStatus({ message: error.message, loading: false });
      } else {
        dispatch(clearError());
      }
      setPrevError(error.id);
    }
    if (status.loading) {
      if (!auth.loading) {
        registerSuccess();
      }
    }
  }, [error, auth.loading, prevError, dispatch, status]);

  /**
   * Adds the applicants information to a database
   *
   * @param {button} e - The forms submitbutton
   */
  const addApplicant = (e) => {
    e.preventDefault();
    setStatus({ message: null, loading: true });
    dispatch(clearError());
    dispatch(register({ fname, lname, ssn, email, username, password }));
  };

  return (
    <Card style={{ width: '40rem' }} className="mx-auto">
      <Card.Body>
        <h2>Registration</h2>
        {
          // eslint-disable-next-line no-nested-ternary
          status.message ? (
            error.status ? (
              <Alert variant="danger">{status.message}</Alert>
            ) : (
              <Alert variant="success">{status.message}</Alert>
            )
          ) : null
        }
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
          <Button type="submit">Register</Button>
        </Form>
        <a href="./">Login</a>
      </Card.Body>
    </Card>
  );
}

export default Registration;

/**
 * @file React Component responseble for updating old user
 * information
 * @requires react-redux
 * @requires react-bootstrap
 * @author Erik Hanstad
 * @author Lucas Villarroel <lucasvi@kth.se>
 */
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Button, Card, Alert, Spinner } from 'react-bootstrap';
import { updateOldUser } from '../redux/actions/authActions';
import { clearError } from '../redux/actions/errorActions';
import { UPDATE_OLD_USER_FAIL, UPDATE_OLD_USER_SUCCESS } from '../redux/types';

function UpdateUser() {
  /**
   * Action dispatcher.
   */
  const dispatch = useDispatch();

  /**
   * Local states
   */
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [ssn, setSsn] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  /**
   * Subscribe to global states.
   */
  const auth = useSelector((state) => state.auth);
  const error = useSelector((state) => state.error);

  /**
   * Dispatches update old user action based on form parameters.
   * Will prevent empty fields
   * @param {object} e - Event
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    const { username } = auth.user;
    dispatch(clearError());
    dispatch(updateOldUser({ username, name, surname, ssn, email, password }));
  };

  if (auth.user) {
    if (auth.user.name) {
      if (auth.user.name !== name) {
        setName(auth.user.name);
      }
    }
    if (auth.user.surname) {
      if (auth.user.surname !== surname) {
        setSurname(auth.user.surname);
      }
    }
    if (auth.user.ssn) {
      if (auth.user.ssn !== ssn) {
        setSsn(auth.user.ssn);
      }
    }
    if (auth.user.email) {
      if (auth.user.email !== email) {
        setEmail(auth.user.email);
      }
    }
  } else {
    return <Redirect to="/" />;
  }

  /**
   * Generate status alert of update.
   */
  let message;
  let success = false;
  switch (error.id) {
    case UPDATE_OLD_USER_FAIL:
      message = (
        <Alert variant="danger" color="danger">
          {error.message}
        </Alert>
      );
      break;
    case UPDATE_OLD_USER_SUCCESS:
      success = true;
      message = (
        <Alert variant="success" color="success">
          {error.message}
        </Alert>
      );
      break;
    default:
  }

  return (
    <>
      <Card style={{ width: '40rem' }} className="mx-auto">
        <Card.Body>
          <h2>Update account details</h2>
          <p>
            It looks like you have an old account, please update your credentials to be able to log
            in.
          </p>
          {message}
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder={name}
                required
                readOnly={!!auth.user.name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Surname</Form.Label>
              <Form.Control
                type="text"
                placeholder={surname}
                required
                readOnly={!!auth.user.surname}
                onChange={(e) => setSurname(e.target.value)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Social security number</Form.Label>
              <Form.Control
                type="text"
                placeholder="YYYYMMDDXXXX"
                required
                readOnly={!!auth.user.ssn}
                onChange={(e) => setSsn(e.target.value)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter email"
                required
                readOnly={!!auth.user.email}
                onChange={(e) => setEmail(e.target.value)}
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
              <Form.Text className="text-muted">
                Please re-enter your password to confirm the changes.
              </Form.Text>
            </Form.Group>
            {auth.loading ? (
              <Button type="submit" disabled>
                <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
              </Button>
            ) : (
              <Button type="submit" disabled={success}>
                UPDATE
              </Button>
            )}
          </Form>
          <a href="/">Go back</a>
        </Card.Body>
      </Card>
    </>
  );
}
export default UpdateUser;

/* eslint-disable react/no-did-update-set-state */
/**
 * @file
 * @author Erik Hanstad
 * @author Lucas Villarroel
 */

import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Alert, Form, Card } from 'react-bootstrap';
import { login } from '../redux/actions/authActions';
import { LOGIN_FAIL } from '../redux/types';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      uname: '',
      pass: '',
      message: null,
      loading: false,
    };
  }

  /**
   * Updates error message and checks if login success.
   * @param {Object} prevProps - Previous props
   */
  componentDidUpdate(prevProps) {
    const { error, auth } = this.props;
    const { loading } = this.state;
    if (error !== prevProps.error) {
      if (error.id === LOGIN_FAIL) {
        this.setState({ message: 'Incorrect username or password' });
      } else {
        this.setState({ message: null });
      }
    }
    if (loading) {
      if (auth.isAuthenticated) {
        this.loginSuccess();
      }
    }
  }

  /**
   * Updates states on login success.
   */
  loginSuccess = () => {
    const { loading } = this.state;
    this.setState({
      loading: !loading,
      message: null,
    });
  };

  /**
   * changes the state for the username
   *
   * @param {input} e - The inputbox for the username
   */
  usernameChange = (e) => {
    this.setState({ uname: e.target.value });
  };

  /**
   * changes the state for the password
   *
   * @param {input} e - The inputbox for the password
   */
  passwordChange = (e) => {
    this.setState({ pass: e.target.value });
  };

  /**
   * checks if the login is correct and sends the person to next side
   *
   * @param {button} e - The forms submitbutton
   */
  login = (e) => {
    e.preventDefault();
    const { uname, pass } = this.state;
    const { dispatchLogin } = this.props;
    this.setState({
      loading: true,
      message: null,
    });
    dispatchLogin({ uname, pass });
  };

  render() {
    const { message } = this.state;
    const { auth } = this.props;
    if (auth.isAuthenticated) {
      if (auth.user.rid === '1') {
        return <Redirect to="/admin" />;
      }
      if (auth.user.rid === '2') {
        return <Redirect to="/application" />;
      }
    }
    return (
      <Card style={{ width: '40rem' }} className="mx-auto">
        <Card.Body>
          <h2>Login</h2>
          {message ? (
            <Alert variant="danger" color="danger">
              {message}
            </Alert>
          ) : null}
          <Form onSubmit={this.login}>
            <Form.Group>
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter username"
                required
                onChange={this.usernameChange}
              />
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter password"
                required
                onChange={this.passwordChange}
              />
            </Form.Group>
            <Button type="submit">LOGIN</Button>
            <inline> or</inline>
            <Button variant="link" href="./registration">
              Create a new account.
            </Button>
            <inline> or</inline>
            <Button variant="link" href="./oldUser">
              Update old account.
            </Button>
          </Form>
        </Card.Body>
      </Card>
    );
  }
}

Login.propTypes = {
  dispatchLogin: PropTypes.func.isRequired,
  error: PropTypes.shape.isRequired,
  auth: PropTypes.shape.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  error: state.error,
});

export default connect(mapStateToProps, { dispatchLogin: login })(Login);

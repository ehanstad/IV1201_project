/* eslint-disable react/no-did-update-set-state */
/**
 * @file The component for adding a new applicant
 * @author Erik Hanstad
 * @author Lucas Villarroel
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Alert, Form, Card } from 'react-bootstrap';
import { register } from '../redux/actions/authActions';
import { REGISTER_FAIL } from '../redux/types';

class Registration extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fname: '',
      lname: '',
      ssn: '',
      email: '',
      username: '',
      pass: '',
      message: '',
      loading: false,
      error: false,
    };
  }

  /**
   * Updates error message and checks if registration successful.
   * @param {Object} prevProps - Previous props
   */
  componentDidUpdate(prevProps) {
    const { error, auth } = this.props;
    const { loading } = this.state;
    if (error !== prevProps.error) {
      if (error.id === REGISTER_FAIL) {
        this.setState({
          message: 'A person with that email or username already exists.',
          loading: false,
          error: true,
        });
      } else {
        this.setState({ message: null });
      }
    }
    if (loading) {
      if (!auth.loading) {
        this.registerSuccess();
      }
    }
  }

  /**
   * Updates states on registration success.
   */
  registerSuccess = () => {
    this.setState({
      loading: false,
      message: 'Account created successfully.',
      error: false,
    });
  };

  /**
   * Adds the applicants information to a database
   *
   * @param {button} e - The forms submitbutton
   */
  addApplicant = (e) => {
    e.preventDefault();
    this.setState({
      loading: true,
    });
    const { fname, lname, ssn, email, username, pass } = this.state;
    const { dispatchRegister } = this.props;
    console.log({ fname, lname, ssn, email, username, pass });
    dispatchRegister({ fname, lname, ssn, email, username, pass });
  };

  /**
   * changes the state for the first name
   *
   * @param {input} e - The inputbox for the firstname
   */
  fnameChange = (e) => {
    this.setState({ fname: e.target.value });
  };

  /**
   * changes the state for the surname
   *
   * @param {input} e - The inputbox for the surname
   */
  lnameChange = (e) => {
    this.setState({ lname: e.target.value });
  };

  /**
   * changes the state for the social security number
   *
   * @param {input} e - The inputbox for the ssn
   */
  ssnChange = (e) => {
    this.setState({ ssn: e.target.value });
  };

  /**
   * changes the state for the email
   *
   * @param {input} e - The inputbox for the email
   */
  emailChange = (e) => {
    this.setState({ email: e.target.value });
  };

  /**
   * changes the state for the username
   *
   * @param {input} e - The inputbox for the username
   */
  usernameChange = (e) => {
    this.setState({ username: e.target.value });
  };

  /**
   * changes the state for the password
   *
   * @param {input} e - The inputbox for the password
   */
  passwordChange = (e) => {
    this.setState({ pass: e.target.value });
  };

  render() {
    const { message, error } = this.state;
    return (
      <Card style={{ width: '40rem' }} className="mx-auto">
        <Card.Body>
          <h2>Registration</h2>
          {
            // eslint-disable-next-line no-nested-ternary
            message ? (
              error ? (
                <Alert variant="danger">{message}</Alert>
              ) : (
                <Alert variant="success">{message}</Alert>
              )
            ) : null
          }
          <Form onSubmit={this.addApplicant}>
            <Form.Group>
              <Form.Label>First name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter first name"
                required
                onChange={this.fnameChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Last name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter last name"
                required
                onChange={this.lnameChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Social security number</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter social security #"
                required
                onChange={this.ssnChange}
              />
            </Form.Group>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter email"
                required
                onChange={this.emailChange}
              />
            </Form.Group>
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
            <Button type="submit">Register</Button>
          </Form>
          <a href="./">Login</a>
        </Card.Body>
      </Card>
    );
  }
}

Registration.propTypes = {
  dispatchRegister: PropTypes.func.isRequired,
  error: PropTypes.shape.isRequired,
  auth: PropTypes.shape.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  error: state.error,
});

export default connect(mapStateToProps, { dispatchRegister: register })(Registration);

/**
 * @file The component for adding a new applicant
 * @author Erik Hanstad
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { register } from '../redux/actions/authActions';

class Registration extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fname: '',
      lname: '',
      ssn: '',
      email: '',
      uname: '',
      pass: '',
    };
  }

  /**
   * Adds the applicants information to a database
   *
   * @param {button} e - The forms submitbutton
   */
  addApplicant = (e) => {
    e.preventDefault();
    const { fname, lname, ssn, email, uname, pass } = this.state;
    const { dispatchRegister } = this.props;
    dispatchRegister({ fname, lname, ssn, email, uname, pass });
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

  render() {
    return (
      <div className="App">
        <h2>Registration</h2>
        <form onSubmit={this.addApplicant}>
          <div>
            <p>First name:</p>
            <input type="text" id="fname" required onChange={this.fnameChange} />
            <p>Last name:</p>
            <input type="text" id="lname" required onChange={this.lnameChange} />
            <p>Social security number:</p>
            <input type="text" id="ssn" required onChange={this.ssnChange} />
            <p>Email:</p>
            <input type="text" id="email" required onChange={this.emailChange} />
            <p>Username:</p>
            <input type="text" id="username" required onChange={this.usernameChange} />
            <p>Password:</p>
            <input type="password" id="password" required onChange={this.passwordChange} />
          </div>
          <button type="submit">Register</button>
        </form>
        <a href="./">Login</a>
      </div>
    );
  }
}

Registration.propTypes = {
  dispatchRegister: PropTypes.func.isRequired,
};

export default connect(null, { dispatchRegister: register })(Registration);

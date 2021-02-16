/**
 * @file The component for adding a new applicant
 * @requires axios
 * @author Erik Hanstad
 */
import axios from 'axios';
import React, { Component } from 'react';

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
    axios.post('/api/registration', this.state).then(() => {
      alert('Success');
    }).catch(() => {
      alert('Something went wrong');
    });
  };

  /**
   * changes the the state for the first name
   *
   * @param {input} e - The inputbox for the firstname
   */
  fnameChange = (e) => {
    this.setState({ fname: e.target.value });
  };

  /**
   * changes the the state for the surname
   *
   * @param {input} e - The inputbox for the surname
   */
  lnameChange = (e) => {
    this.setState({ lname: e.target.value });
  };

  /**
   * changes the the state for the social security number
   *
   * @param {input} e - The inputbox for the ssn
   */
  ssnChange = (e) => {
    this.setState({ ssn: e.target.value });
  };

  /**
   * changes the the state for the email
   *
   * @param {input} e - The inputbox for the email
   */
  emailChange = (e) => {
    this.setState({ email: e.target.value });
  };

  /**
   * changes the the state for the username
   *
   * @param {input} e - The inputbox for the username
   */
  usernameChange = (e) => {
    this.setState({ uname: e.target.value });
  };

  /**
   * changes the the state for the password
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
          <button type="submit" data-testid="sendButton">
            Registrate
          </button>
        </form>
      </div>
    );
  }
}

export default Registration;

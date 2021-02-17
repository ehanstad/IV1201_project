/**
 * @file
 * @requires
 * @author Erik Hanstad
 */

import React, { Component } from 'react';
import axios from 'axios';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      uname: '',
      pass: '',
    };
  }

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
    let person;

    axios.post('/api/user/login', this.state).then((res) => {
      person = res;
    }).catch(() => {
      alert('No user by that name, please try again');
    });

    const { pass } = person;
    const { password } = this.state;
    if (pass === password) {
      if (person.role_id === 1) {
        /* SEND TO ADMIN SIDE */
      } else {
        /* SEND TO APPLICATION SIDE */
      }
    } else {
      alert('Wrong password, please try again');
    }
  };

  render() {
    return (
      <div>
        <h2> LOGIN </h2>
        <form onSubmit={this.login}>
          <div>
            <p>Username:</p>
            <input type="text" id="username" required onChange={this.usernameChange} />
            <p>Password:</p>
            <input type="password" id="password" required onChange={this.passwordChange} />
          </div>
          <button type="submit">
            LOGIN
          </button>
        </form>
        <a href="./registration">
          Create a new account.
        </a>
      </div>
    );
  }
}

export default Login;

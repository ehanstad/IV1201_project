/**
 * @file
 * @requires
 * @author Erik Hanstad
 */

import React, { Component } from 'react';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      uname: '',
      pass: '',
    };
  }

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

  /**
   *
   *
   * @param {button} e - The forms submitbutton
   */
  login = (e) => {
    e.preventDefault();
    console.log(this.state);
    /* TODO call getuser function and crosscheck with written infromation */
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
          <button type="button">
            Registrate
          </button>
        </a>
      </div>
    );
  }
}

export default Login;

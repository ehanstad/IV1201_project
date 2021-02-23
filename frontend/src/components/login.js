/**
 * @file
 * @requires
 * @author Erik Hanstad
 */

import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      uname: '',
      pass: '',
      rid: '',
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
    const { uname, pass } = this.state;
    axios
      .post('/api/user/login', { uname, pass })
      .then((res) => {
        const { pid, rid } = res.data;
        console.log(pid);
        /* SET STATE TO LOGGED IN */
        this.setState({ rid });
      })
      .catch((err) => {
        console.log(err);
        alert('No user by that name, please try again');
      });
  };

  render() {
    const { rid } = this.state;
    if (rid === '1') {
      return <Redirect to="/admin" />;
    }
    if (rid === '2') {
      return <Redirect to="/application" />;
    }
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
          <button type="submit">LOGIN</button>
        </form>
        <a href="./registration">Create a new account.</a>
      </div>
    );
  }
}

export default Login;

/**
 * @file
 * @author Erik Hanstad
 */

import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { login } from '../redux/actions/authActions';

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
    const { dispatchLogin } = this.props;
    dispatchLogin({ uname, pass });
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

Login.propTypes = {
  dispatchLogin: PropTypes.func.isRequired,
};

export default connect(null, { dispatchLogin: login })(Login);

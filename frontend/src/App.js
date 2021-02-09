/**
 * @file The component for adding a new applicant
 * @author Erik Hanstad
 */

import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fname: '',
      lname: '',
      ssn: '',
      email: '',
      pass: '',
    };
  }

  addApplicant = (e) => {
    const {
      fname,
      lname,
      ssn,
      email,
      pass,
    } = this.state;
    console.log(this.state);
    console.log(fname);
    console.log(lname);
    console.log(ssn);
    console.log(email);
    console.log(pass);
    console.log(e);
  };

  fnameChange = (e) => {
    this.setState({ fname: e.target.value });
  };

  lnameChange = (e) => {
    this.setState({ lname: e.target.value });
  };

  ssnChange = (e) => {
    this.setState({ ssn: e.target.value });
  };

  emailChange = (e) => {
    this.setState({ email: e.target.value });
  };

  passChange = (e) => {
    this.setState({ pass: e.target.value });
  };

  render() {
    return (
      <div className="App">
        <h2>Add applicant</h2>
        <form onSubmit={this.addApplicant}>
          <div>
            <p>First name:</p>
            <input type="text" id="fname" onChange={this.fnameChange} />
            <p>Last name:</p>
            <input type="text" id="lname" onChange={this.lnameChange} />
            <p>Social security number:</p>
            <input type="text" id="ssn" onChange={this.ssnChange} />
            <p>Email:</p>
            <input type="text" id="email" onChange={this.emailChange} />
            <p>Password:</p>
            <input type="password" id="password" onChange={this.passChange} />
          </div>
          <button type="submit" data-testid="sendButton">
            Add
          </button>
        </form>
      </div>
    );
  }
}

export default App;

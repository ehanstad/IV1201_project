/**
 * @file The component for adding a new applicant
 * @requires axios
 * @author Erik Hanstad
 */
import axios from 'axios';
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
      console.log('Success');
    }).catch(() => {
      console.log('Something went wrong');
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

  render() {
    return (
      <div className="App">
        <h2>Add applicant</h2>
        <form>
          <div>
            <p>First name:</p>
            <input type="text" id="fname" onChange={this.fnameChange} />
            <p>Last name:</p>
            <input type="text" id="lname" onChange={this.lnameChange} />
            <p>Social security number:</p>
            <input type="text" id="ssn" onChange={this.ssnChange} />
            <p>Email:</p>
            <input type="text" id="email" onChange={this.emailChange} />
          </div>
          <button type="submit" data-testid="sendButton" onClick={this.addApplicant}>
            Add
          </button>
        </form>
      </div>
    );
  }
}

export default App;

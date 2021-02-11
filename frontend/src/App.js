/**
 * @file The component for adding a new applicant
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

  addApplicant = (e) => {
    e.preventDefault();
    axios.post('/api/registration', this.state).then(() => {
      alert('Success');
    }).catch(() => {
      alert('Something went wrong');
    });
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

/**
 * @file React base Component
 * @requires react-router-dom
 * @author Erik Hanstad
 */
import React, { Component } from 'react';
import axios from 'axios';

class Application extends Component {
  login = (e) => {
    e.preventDefault();
    axios.post('/api/application/register',
      {
        com: [{
          cid: 1,
          yoe: 3,
        }],
        pid: 4,
        fromDate: '2013-12-13',
        toDate: '2014-01-03',
      }).then((res) => {
      console.log(res);
    });
  };

  render() {
    return (
      <div>
        Application
        <button type="submit" onClick={this.login}>
          LOGIN
        </button>
      </div>
    );
  }
}

export default Application;

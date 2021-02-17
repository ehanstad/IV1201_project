const { json, response } = require('express');
const { Pool } = require('pg');
require('dotenv').config();

// connect to db
const connectionString = process.env.DATABASE_URL;
const pool = new Pool({
  connectionString,
  ssl: {
    rejectUnauthorized: false,
  },
});

/*
Creates a new user and inserts user data to the person table
*/
const newUser = async (name, surname, ssn, email, pass, username) => {
  pool.query('INSERT INTO person (Name, Surname, Ssn, Email, Role_id, Password, Username) VALUES ($1, $2, $3, $4, $5, $6, $7)',
    [name, surname, ssn, email, 2, pass, username], (err, res) => {
      if (err) throw err;
      return res;
    });
};

const login = async (username, pass) => {
  pool.query('SELECT * FROM person WHERE Username = $1 AND Password = $2', [username, pass], (err, res) => {
    if (err) throw err;
    console.log('Result from db: ', res.rowCount);
    return res.rows;
  });
};

module.exports = { newUser, login };

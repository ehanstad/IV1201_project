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

const newUser = async (name, surname, ssn, email) => {
  pool.query('INSERT INTO person (Name, Surname, Ssn, Email, Role_id) VALUES ($1, $2, $3, $4, $5)',
    [name, surname, ssn, email, 2], (err, res) => {
      if (err) throw err;
      return res;
    });
};

module.exports = { newUser };

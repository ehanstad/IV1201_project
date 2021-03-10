/**
 * @file User queries.
 * @author Erik Hanstad
 * @author Lucas Villarroel
 */
const { pool } = require('../db');
const { validate } = require('../validate');

/**
 * Creates a new user and inserts user data to the person table
 */
const insertPerson = async (fname, surname, ssn, email, password, username) => {
  const client = await pool.connect();
  try {
    const valid = validate({
      email, fname, surname, ssn, username,
    });
    await client.query('BEGIN');
    const queryText = 'INSERT INTO person (Name, Surname, Ssn, Email, Role_id, Password, Username) VALUES ($1, $2, $3, $4, $5, $6, $7)';
    await client.query(queryText,
      [valid.fname, valid.surname, valid.ssn, valid.email, 2, password, valid.username]);
    await client.query('COMMIT');
  } catch (e) {
    await client.query('ROLLBACK');
    throw e;
  } finally {
    client.release();
  }
};

/*
 * Returns the user with the corresponding username
 */
const selectUser = async (username) => {
  const valid = validate({ username });
  const res = await pool.query('SELECT * FROM person WHERE Username= $1', [valid.username]);
  return res.rows;
};

/*
 * Updates the information of a a person.
 */
const updatePerson = async ({
  email, fname, surname, ssn, username,
}) => {
  const client = await pool.connect();
  try {
    const valid = validate({
      email, fname, surname, ssn, username,
    });
    await client.query('BEGIN');
    await pool.query('UPDATE person SET name=$1, surname=$2, ssn=$3, email=$4 WHERE username= $5',
      [valid.fname, valid.surname, valid.ssn, valid.email, valid.username]);
    await client.query('COMMIT');
  } catch (e) {
    await client.query('ROLLBACK');
    throw e;
  } finally {
    client.release();
  }
};

const findByUsernameEmail = async (username, email) => {
  const valid = validate({ username, email });
  const res = await pool.query('SELECT * FROM person WHERE Username=$1 OR Email=$2', [valid.username, valid.email]);
  return res.rows;
};

module.exports = {
  insertPerson,
  selectUser,
  updatePerson,
  findByUsernameEmail,
};

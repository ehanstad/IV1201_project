/**
 * @file User queries.
 * @author Erik Hanstad
 * @author Lucas Villarroel
 */
const { pool } = require('../db');
const { validate } = require('../validate');

/**
 * Creates a new user and inserts user data to the person table
 * @param {string} fname - name of person
 * @param {string} surname - surname of person
 * @param {string} ssn - social security number of person
 * @param {string} email - email of person
 * @param {string} password - password of person
 * @param {string} username - username of person
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

/**
 * Returns the user with the corresponding username.
 * @param {string} username - person username
 * @returns an array of users with username.
 */
const selectUser = async (username) => {
  const valid = validate({ username });
  const res = await pool.query('SELECT * FROM person WHERE Username= $1', [valid.username]);
  return res.rows;
};

/**
 * Updates the user information of a a person.
 * @param {string} fname - name of person
 * @param {string} surname - surname of person
 * @param {string} ssn - social security number of person
 * @param {string} email - email of person
 * @param {string} username - username of person
 */
const updatePerson = async (fname, surname, ssn, email, username) => {
  const client = await pool.connect();
  try {
    const valid = validate({
      fname, surname, ssn, email, username,
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

/**
 * Finds persons with username or email.
 * @param {string} username - person username
 * @param {string} email - person email
 * @returns - persons with specified email or username.
 */
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

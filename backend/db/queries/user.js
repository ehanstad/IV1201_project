const { pool } = require('../db');

/*
 * Creates a new user and inserts user data to the person table
 */
const insertPerson = async (fname, surname, ssn, email, password, username) => {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    const queryText = 'INSERT INTO person (Name, Surname, Ssn, Email, Role_id, Password, Username) VALUES ($1, $2, $3, $4, $5, $6, $7)';
    await client.query(queryText, [fname, surname, ssn, email, 2, password, username]);
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
const selectUser = async (username) => pool.query('SELECT * FROM person WHERE Username= $1', [username]).then((res) => res.rows);

/*
 * Returns the user with the corresponding username
 */
const getPersonByEmail = async (email) => pool.query('SELECT * FROM person WHERE email= $1', [email]).then((res) => res.rows);

/*
 * Updates the user with new data
 */
const updatePerson = async (email, name, surname, password, ssn, username) => pool.query('UPDATE person SET name=$1, surname=$2, password=$3, ssn=$4, username=$5 WHERE email= $6',
  [name, surname, password, ssn, username, email]).then((res) => res.rows);

module.exports = {
  insertPerson,
  selectUser,
  getPersonByEmail,
  updatePerson,
};

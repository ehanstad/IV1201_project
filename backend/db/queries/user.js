const { pool } = require('../db');

/*
 * Creates a new user and inserts user data to the person table
 */
const insertPerson = async (name, surname, ssn, email, pass, username) => {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    const queryText = 'INSERT INTO person (Name, Surname, Ssn, Email, Role_id, Password, Username) VALUES ($1, $2, $3, $4, $5, $6, $7)';
    client.query(queryText, [name, surname, ssn, email, 2, pass, username]);
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

module.exports = { insertPerson, selectUser };

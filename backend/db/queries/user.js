const { pool } = require('../db');

/*
 * Creates a new user and inserts user data to the person table
 */
const setUser = async (name, surname, ssn, email, pass, username) => pool.query('INSERT INTO person (Name, Surname, Ssn, Email, Role_id, Password, Username) VALUES ($1, $2, $3, $4, $5, $6, $7)',
  [name, surname, ssn, email, 2, pass, username]).then((res) => res);

/*
 * Returns the user with the corresponding username
 */
const getUser = async (username) => pool.query('SELECT * FROM person WHERE Username= $1', [username]).then((res) => res.rows);

/*
 * Returns the user with the corresponding username
 */
const getUpdateInfo = async (email) => pool.query('SELECT * FROM person WHERE email= $1', [email]).then((res) => res.rows);

/*
 * Updates the user with new data
 */
const updateInfo = async (email, name, surname, password, ssn, username) => pool.query('UPDATE person SET name=$1, surname=$2, password=$3, ssn=$4, username=$5 WHERE email= $6', 
  [name, surname, password, ssn, username, email]).then((res) => res.rows);

module.exports = { setUser, getUser, getUpdateInfo, updateInfo };

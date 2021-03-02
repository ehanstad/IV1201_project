const { pool } = require('../db');

/*
 * Returns the competence id with the corresponding competence name
 */
const getCompetence = async () => pool.query('SELECT * FROM competence').then((res) => res);

/*
 * Creates a new application and inserts application data to the person table
 */
const createApplication = async (competenceId, personId, yearsOfExperience) => {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    const queryText = 'INSERT INTO competence_profile (competence_id, person_id, years_of_experience) VALUES($1, $2, $3)';
    pool.query(queryText, [competenceId, personId, yearsOfExperience]);
    await client.query('COMMIT');
  } catch (e) {
    await client.query('ROLLBACK');
    throw e;
  } finally {
    client.release();
  }
};

/*
 *  Inserts availabilty data to the availability table
 */
const createAvailability = async (fromDate, toDate, pid) => {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    const queryText = 'INSERT INTO availability (from_date, person_id, to_date) VALUES($1, $2, $3)';
    client.query(queryText, [fromDate, pid, toDate]);
    await client.query('COMMIT');
  } catch (e) {
    await client.query('ROLLBACK');
    throw e;
  } finally {
    client.release();
  }
};

module.exports = { getCompetence, createApplication, createAvailability };

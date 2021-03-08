const { pool } = require('../db');

/*
 * Returns the competences in the db
 */
const selectCompetence = async () => pool.query('SELECT * FROM competence').then((res) => res);


/*
 * Returns the competence id with the corresponding competence name
 */
const selectCompetenceId = async (competenceName) => pool.query('SELECT competence_id FROM competence WHERE name=$1', [competenceName]).then((res) => res.rows[0].competence_id);

/*
 * Creates a new application and inserts application data to the person table
 */
const insertCompetenceProfile = async (competenceId, personId, yearsOfExperience) => {
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
 * Inserts availabilty data to the availability table
 */
const insertAvailability = async (fromDate, toDate, pid) => {
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

/*
 * Inserts the application data
 */
const insertApplication = async (compitences, availabilities, id) => {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    compitences.map((com) =>  {
      selectCompetenceId(com.competence).then((cid) => {
        insertCompetenceProfile(cid, id, com.yoe);
      });
    });
    availabilities.map((avail) => insertAvailability(avail.startDate, avail.endDate, id));
    await client.query('COMMIT');
  } catch (e) {
    await client.query('ROLLBACK');
    throw e;
  } finally {
    client.release();
  }
};

module.exports = { selectCompetence, insertApplication };

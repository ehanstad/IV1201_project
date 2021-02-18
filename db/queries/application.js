const { pool } = require('./db');

/*
 * Returns the competence id with the corresponding competence name
 */
const getCompetence = async () => pool.query('SELECT * FROM competence').then((res) => res);

/*
 * Creates a new application and inserts application data to the person table
 */
const setApplication = async (competenceId, personId, yearsOfExperience) => pool.query('INSERT INTO competence_profile (competence_id, person_id, years_of_experience) VALUES($1, $2, $3)',
  [competenceId, personId, yearsOfExperience]);

/*
 *
 */
const setAvailability = async (fromDate, toDate, pid) => pool.query('INSERT INTO availability (from_date, person_id, to_date) VALUES($1, $2, $3)', [fromDate, pid, toDate]);

module.exports = { getCompetence, setApplication, setAvailability };

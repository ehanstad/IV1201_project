const { pool } = require('./db');

/*
 * Returns the competence id with the corresponding competence name
 */
const getCompetence = async (competence) => pool.query('SELECT * FROM competence WHERE name=$1', [competence]);

/*
 * Creates a new application and inserts application data to the person table
 */
const setApplication = async (competenceId, personId, yearsOfExperience) => pool.query('INSERT INTO competence_profile (competence_id, person_id, years_of_experience) VALUES($1, $2, $3)',
  [competenceId, personId, yearsOfExperience]);

module.exports = { getCompetence, setApplication };

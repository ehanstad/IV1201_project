const { pool } = require('../db');

/*
 * Gets all applications from database
 */
const getApplications = async () => pool.query(
  'SELECT person.*, competence.name, competence_profile.years_of_experience, availability.from_date, availability.to_date '
  + 'FROM availability, person, role, competence, competence_profile '
  + 'WHERE availability.person_id=person.person_id '
  + 'AND role.role_id=2 '
  + 'AND competence.competence_id = competence_profile.competence_id '
  + 'AND competence_profile.person_id = person.person_id;',
).then((res) => res.rows);

module.exports = { getApplications };

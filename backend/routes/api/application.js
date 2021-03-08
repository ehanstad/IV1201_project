const { Router } = require('express');
const { insertApplication, selectCompetence } = require('../../db/queries/application');
const { verify } = require('../../middleware/verify');

const router = Router();

/**
 * Sends registration form data to db module.
 * Responds with either a success or error 500.
 */
router.post('/register', async (req, res) => {
  insertApplication(req.body.competences, req.body.availability, req.body.id).then(() => {
    res.json({ msg: 'application added' });
  }).catch((err) => {
    console.log(err);
    res.status(500).json({ msg: 'Internal server error.' });
  });
});

/**
 * Gets a list of competences from db module
 * Responds with either a success or error 500.
 */
router.post('/competence', async (req, res) => {
  selectCompetence().then((dbRes) => {
    res.json(dbRes.rows);
  }).catch((dbErr) => {
    console.log(dbErr);
    res.status(500).json({ msg: 'Internal server error.' });
  });
});

module.exports = router;

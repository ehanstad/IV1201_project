const { Router } = require('express');
const { insertCompetenceProfile, selectCompetence, insertAvailability } = require('../../db/queries/application');

const router = Router();

/**
 * Sends registration form data to db module.
 * Responds with either a success or error 500.
 */
router.post('/register', async (req, res) => {
  let err = false;
  req.body.com.map((comp) => insertCompetenceProfile(comp.cid, req.body.pid, comp.yoe)
    .catch((dbErr) => {
      console.log(dbErr);
      err = true;
      res.status(500).json({ msg: 'Internal server error.' });
    }));
  if (!err) {
    insertAvailability(req.body.fromDate, req.body.toDate, req.body.pid).then(() => {
      res.json({ msg: 'application added' });
    }).catch((dbErr) => {
      console.log(dbErr);
      res.status(500).json({ msg: 'Internal server error.' });
    });
  }
});

/**
 * Gets a list of competences from db module
 * Responds with either a success or error 500.
 */
router.post('/competence', async (req, res) => {
  selectCompetence().then((dbRes) => {
    res.json(dbRes);
  }).catch((dbErr) => {
    console.log(dbErr);
    res.status(500).json({ msg: 'Internal server error.' });
  });
});

module.exports = router;

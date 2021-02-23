const { Router } = require('express');
const { createApplication, getCompetence, createAvailability } = require('../../db/queries/application');

const router = Router();

/**
 * Sends registration form data to db module.
 * Responds with either a success or error 500.
 */
router.post('/register', async (req, res) => {
  let err = false;
  req.body.com.map((comp) => createApplication(comp.cid, req.body.pid, comp.yoe)
    .catch((dbErr) => {
      console.log(dbErr);
      err = true;
      res.status(500).json({ msg: 'Internal server error.' });
    }));
  if (!err) {
    createAvailability(req.body.fromDate, req.body.toDate, req.body.pid).then(() => {
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
  getCompetence().then((dbRes) => {
    res.json(dbRes);
  }).catch((dbErr) => {
    console.log(dbErr);
    res.status(500).json({ msg: 'Internal server error.' });
  });
});

module.exports = router;

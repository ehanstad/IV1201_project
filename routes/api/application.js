const { Router } = require('express');
const { getCompetence, setApplication } = require('../../db/queries/application');

const router = Router();

/**
 * Sends registration form data to db module.
 * Responds with either a success or error 500.
 */
router.post('/register', (req, res) => {
  let err = false;
  req.body.cid.map((comId) => setApplication(getCompetence(comId), req.body.pid, req.body.yoe))
    .catch((dbErr) => {
      console.log(dbErr);
      err = true;
      res.status(500).json({ msg: 'Internal server error.' });
    });
  if (!err) { res.json({ msg: 'application added' }); }
});

module.exports = router;

const { Router } = require('express');
const { setApplication } = require('../../db/queries/application');

const router = Router();

/**
 * Sends registration form data to db module.
 * Responds with either a success or error 500.
 */
router.post('/register', async (req, res) => {
  let err = false;
  req.body.com.map((comp) => setApplication(comp.cid, req.body.pid, comp.yoe)
    .catch((dbErr) => {
      console.log(dbErr);
      err = true;
      res.status(500).json({ msg: 'Internal server error.' });
    }));
  if (!err) { res.json({ msg: 'application added' }); }
});

module.exports = router;

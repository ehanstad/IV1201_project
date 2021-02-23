const { Router } = require('express');
const { getApplications } = require('../../db/queries/admin');

const router = Router();

/**
 * Gets registration forms from db module.
 * Responds with either a the table or error 500.
 */
router.post('/applications', async (req, res) => {
  console.log(req.body);
  getApplications().then((dbRes) => {
    console.log(dbRes);
    res.json(dbRes);
  }).catch((dbErr) => {
    console.log(dbErr);
    res.status(500).json({ msg: 'Internal server error.' });
  });
});

module.exports = router;

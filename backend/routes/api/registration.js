const { Router } = require('express');
const { newUser } = require('../../db');

const router = Router();

/**
 * 
  Sends registration form data to db module.
  Responds with either a success or error 500.
 */
router.post('/', (req, res) => {
  newUser(req.body.fname, req.body.lname, req.body.ssn, req.body.email)
    .then((dbRes) => {
      res.json(dbRes);
    }).catch((dbErr) => {
      res.status(500).json(dbErr);
    });
  res.json('response');
});

module.exports = router;

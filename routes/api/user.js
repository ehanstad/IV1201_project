const { Router } = require('express');
const { newUser } = require('../../db');

const router = Router();

/**
 *
  Sends registration form data to db module.
  Responds with either a success or error 500.
 */
router.post('/', (req, res) => {
  newUser(req.body.fname, req.body.lname, req.body.ssn, req.body.email, req.body.pass,
    req.body.username)
    .then(() => {
      res.json({ msg: 'user added' });
    }).catch((dbErr) => {
      console.log(dbErr);
      res.status(500).json({ msg: 'Internal server error.' });
    });
});

module.exports = router;

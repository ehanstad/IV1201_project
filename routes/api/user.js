const { Router } = require('express');
const bcrypt = require('bcryptjs');
const { newUser, login } = require('../../db');

const router = Router();

/**
 *
  Sends registration form data to db module.
  Responds with either a success or error 500.
 */
router.post('/register', (req, res) => {
  bcrypt.genSalt(10, (serr, salt) => {
    if (serr) throw serr;
    bcrypt.hash(req.body.pass, salt, (herr, hash) => {
      if (herr) throw herr;
      newUser(req.body.fname, req.body.lname, req.body.ssn, req.body.email, hash,
        req.body.username)
        .then(() => {
          res.json({ msg: 'user added' });
        }).catch((dbErr) => {
          console.log(dbErr);
          res.status(500).json({ msg: 'Internal server error.' });
        });
    });
  });
});

router.post('/login', async (req, res) => {
  login(req.body.username, req.body.pass)
    .then((dbRes) => {
      bcrypt.compare(req.body.pass, dbRes[0].password).then((result) => {
        if (result) res.json(dbRes[0]);
        else if (!result) res.status(403).json({ msg: 'Access denied.' });
      });
    }).catch((err) => {
      console.log(err);
      res.status(500).json({ msg: 'Internal server error' });
    });
});

module.exports = router;

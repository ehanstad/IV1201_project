const { Router } = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { setUser, getUser } = require('../../db/queries/user');

const secretKey = process.env.SECRET_KEY;

const router = Router();

/**
 * Sends and adds user data to db module.
 * Responds with either a success or error 500.
 */
router.post('/register', (req, res) => {
  bcrypt.genSalt(10, (serr, salt) => {
    if (serr) throw serr;
    bcrypt.hash(req.body.pass, salt, (herr, hash) => {
      if (herr) throw herr;
      setUser(req.body.fname, req.body.lname, req.body.ssn, req.body.email, hash,
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

/*
Method for login
Compares password with hashed password from DB
Returns JWT with users id and role id
*/
router.post('/login', async (req, res) => {
  getUser(req.body.uname, req.body.pass)
    .then((dbRes) => {
      bcrypt.compare(req.body.pass, dbRes[0].password).then((result) => {
        if (result) {
          const user = {
            id: dbRes[0].person_id,
            rid: dbRes[0].role_id,
          };
          jwt.sign({ user }, secretKey, { expiresIn: '1h' }, (err, token) => {
            res.json({ token });
          });
        } else if (!result) res.status(403).json({ msg: 'Access denied.' });
      });
    }).catch((err) => {
      console.log(err);
      res.status(500).json({ msg: 'Internal server error' });
    });
});

/*
Verifies token in order to grant access to 'protected' routes
If verification fails 'Access denied' is returned
*/
// const verify = function verifyToken(req, res, next) {
//   const bearerHeader = req.headers.authorization;
//   if (typeof bearerHeader !== 'undefined') {
//     const bearer = bearerHeader.split(' ');
//     const bearerToken = bearer[1];
//     req.token = bearerToken;
//     next();
//   } else {
//     res.status(403).json({ msg: 'Access denied' });
//   }
// };

module.exports = router;
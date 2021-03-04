/**
 * @file API endpoints regarding users
 * @author Klas Engberg
 * @author Lucas Villarroel
 * @requires express
 * @requires bcrypt
 * @requires jwt
 */
const { Router } = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { insertPerson, selectUser } = require('../../db/queries/user');
const { verify } = require('../../middleware/verify');

/**
 * Express router to mount user related functions on.
 * @type {object}
 * @const
 */
const router = Router();

/**
 * Secret key for JWT
 * @type {string}
 * @const
 */
const secretKey = process.env.SECRET_KEY;

/**
 * Sends and adds user data to db module.
 * Responds with either a success or error 500.
 * @param {string} path - Express path
 * @param {function} callback - Express middleware
 */
router.post('/register', (req, res) => {
  bcrypt.genSalt(10, (serr, salt) => {
    if (serr) throw serr;
    bcrypt.hash(req.body.pass, salt, (herr, hash) => {
      if (herr) throw herr;
      insertPerson(req.body.fname, req.body.lname, req.body.ssn, req.body.email, hash,
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

/**
 * Method for login
 * Compares password with hashed password from DB
 * Returns JWT with users id and role id
 * @param {string} path - Express path
 * @param {function} callback - Express middleware
 */
router.post('/login', async (req, res) => {
  selectUser(req.body.uname, req.body.pass)
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

/**
 * Route to get authenticated user information.
 * @param {string} path - Express path
 * @param {function} middleware - Authentication middleware function
 * @param {function} callback - Express middleware
 */
router.get('/auth', verify, async (req, res) => {
  const { user } = req.token;
  res.json(user);
});

module.exports = router;

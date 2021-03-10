/**
 * @file API endpoints regarding users
 * @author Klas Engberg
 * @author Lucas Villarroel
 * @author Erik Hanstad
 * @requires express
 * @requires bcrypt
 * @requires jwt
 */
const { Router } = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const {
  insertPerson, selectUser, updatePerson, findByUsernameEmail,
} = require('../../db/queries/user');
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
 * Patches incomplete user account, given the user has a username and password.
 * @param {string} path - Express path
 * @param {function} callback - Express middleware
 */
router.patch('/old',
  body('username').not().isEmpty().trim()
    .escape(),
  body('password').not().isEmpty().trim()
    .escape(),
  body('name').not().isEmpty().trim()
    .escape()
    .isAlpha('sv-SE'),
  body('surname').not().isEmpty().trim()
    .escape()
    .isAlpha('sv-SE'),
  body('ssn').not().isEmpty().trim()
    .escape()
    .isNumeric(),
  (req, res) => {
    if (!validationResult(req).isEmpty()) {
      res.status(400).json({ msg: 'Bad request' });
    } else {
      const {
        username, password, name: fname, surname, ssn, email,
      } = req.body;
      selectUser(username).then((result) => {
        if (!result) { res.status(404).json({ msg: 'Not found' }); }
        bcrypt.compare(password, result[0].password).then((plainPassword) => {
          if (!plainPassword) { res.status(401).json({ msg: 'Unauthorized' }); } else {
            updatePerson(fname, surname, ssn, email, username).then(() => res.json({ msg: 'User info updated' })).catch(() => res.status(500).json({ msg: 'Internal server error' }));
          }
        });
      }).catch(() => res.status(500).json({ msg: 'Internal server error' }));
    }
  });

/**
 * Sends and adds user data to db module.
 * Responds with either a success or error.
 * @param {string} path - Express path
 * @param {function} callback - Express middleware
 */
router.post('/register',
  body('fname').not().isEmpty().trim()
    .escape()
    .isAlpha('sv-SE'),
  body('lname').not().isEmpty().trim()
    .escape()
    .isAlpha('sv-SE'),
  body('ssn').not().isEmpty().trim()
    .escape()
    .isNumeric(),
  body('email').not().isEmpty().trim()
    .escape()
    .isEmail(),
  body('username').not().isEmpty().trim()
    .escape(),
  body('password').not().isEmpty().trim()
    .escape(),
  (req, res) => {
    if (!validationResult(req).isEmpty()) {
      res.status(400).json({ msg: 'Bad request' });
    } else {
      findByUsernameEmail(req.body.username, req.body.email).then((result) => {
        if (result.length > 0) res.status(403).json({ msg: 'Forbidden.' });
        bcrypt.genSalt(10, (serr, salt) => {
          if (serr) throw serr;
          bcrypt.hash(req.body.password, salt, (herr, hash) => {
            if (herr) throw herr;
            insertPerson(req.body.fname, req.body.lname, req.body.ssn, req.body.email, hash,
              req.body.username)
              .then(() => res.json({ msg: 'user added' })).catch(() => res.status(500).json({ msg: 'Internal server error.' }));
          });
        });
      }).catch(() => res.status(500).json({ msg: 'Internal server error.' }));
    }
  });

/**
 * Method for login
 * Compares password with hashed password from DB
 * Returns JWT with users id and role id
 * @param {string} path - Express path
 * @param {function} callback - Express middleware
 */
router.post('/login', body('uname').escape(), body('pass').escape(), async (req, res) => {
  if (!validationResult(req).isEmpty()) {
    res.status(400).json({ msg: 'Bad request' });
  } else {
    selectUser(req.body.username, req.body.password)
      .then((dbRes) => {
        if (dbRes.length === 0) {
          res.status(401).json({ msg: 'Access denied.' });
        } else {
          bcrypt.compare(req.body.password, dbRes[0].password).then((result) => {
            if (result) {
              if (!dbRes[0].name || !dbRes[0].surname || !dbRes[0].ssn || !dbRes[0].email) {
                const user = {
                  username: dbRes[0].username,
                  name: dbRes[0].name,
                  surname: dbRes[0].surname,
                  ssn: dbRes[0].ssn,
                  email: dbRes[0].email,
                };
                res.json({ user });
              } else {
                const user = {
                  id: dbRes[0].person_id,
                  rid: dbRes[0].role_id,
                };
                jwt.sign({ user }, secretKey, { expiresIn: '1h' }, (err, token) => {
                  res.json({ token });
                });
              }
            } else if (!result) res.status(401).json({ msg: 'Access denied.' });
          });
        }
      }).catch((err) => {
        console.log(err);
        res.status(500).json({ msg: 'Internal server error' });
      });
  }
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

/**
 * @file Authentication and authorization middleware
 * @author Klas Engberg
 * @author Lucas Villarroel
 * @requires jwt
 */
const jwt = require('jsonwebtoken');

/**
 * Secret key for JWT
 * @type {string}
 * @const
 */
const secretKey = process.env.SECRET_KEY;

/**
 * Verifies token in order to grant access to 'protected' routes
 * If verification fails either 'No token' or 'Invalid token' is returned
 * @param {object} req - Express request object
 * @param {object} res - Express respnse object
 * @param {function} next - Express next middleware function
 */
const verify = function verifyToken(req, res, next) {
  const bearerHeader = req.headers.authorization;

  if (!bearerHeader) { res.status(401).json({ msg: 'No token' }); } else {
    const bearer = bearerHeader.split(' ');
    const bearerToken = bearer[1];
    try {
      const auth = jwt.verify(bearerToken, secretKey);
      req.token = auth;
      next();
    } catch (err) {
      res.status(400).json({ msg: 'Invalid token' });
    }
  }
};

/**
 * Middleware handling applicant authorization. Will redirect to login
 * on authorization fail.
 * @param {object} req - Express request object
 * @param {object} res - Express respnse object
 * @param {function} next - Express next middleware function
 */
const verifyApplicant = function verifyToken(req, res, next) {
  const bearerHeader = req.headers.authorization;

  if (!bearerHeader) { res.status(401).redirect('/'); } else {
    const bearer = bearerHeader.split(' ');
    const bearerToken = bearer[1];
    try {
      const auth = jwt.verify(bearerToken, secretKey);
      if (auth.user.rid !== '2') { res.status(401).redirect('/'); }
      req.token = auth;
      next();
    } catch (err) {
      res.status(401).redirect('/');
    }
  }
};

/**
 * Middleware handling applicant authorization. Will redirect to login
 * on authorization fail.
 * @param {object} req - Express request object
 * @param {object} res - Express respnse object
 * @param {function} next - Express next middleware function
 */
const verifyRecruiter = function verifyToken(req, res, next) {
  const bearerHeader = req.headers.authorization;

  if (!bearerHeader) { res.status(401).json({ msg: 'No token' }); } else {
    const bearer = bearerHeader.split(' ');
    const bearerToken = bearer[1];
    try {
      const auth = jwt.verify(bearerToken, secretKey);
      if (auth.user.rid !== '1') { res.status(401).json({ msg: 'Unauthorized' }); }
      req.token = auth;
      next();
    } catch (err) {
      res.status(400).json({ msg: 'Invalid token' });
    }
  }
};

module.exports = { verify, verifyApplicant, verifyRecruiter };

const jwt = require('jsonwebtoken');

const secretKey = process.env.SECRET_KEY;

/**
* Verifies token in order to grant access to 'protected' routes
* If verification fails 'Access denied' is returned
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
 * Middleware handling applicant authorization.
 * @param {Object} req
 * @param {Object} res
 * @param {*} next
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
 * Middleware handling recruiter authorization.
 * @param {Object} req
 * @param {Object} res
 * @param {*} next
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

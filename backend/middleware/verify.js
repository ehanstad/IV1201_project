const jwt = require('jsonwebtoken');

const secretKey = process.env.SECRET_KEY;

/*
Verifies token in order to grant access to 'protected' routes
If verification fails 'Access denied' is returned
*/
const verify = function verifyToken(req, res, next) {
  const bearerHeader = req.headers.authorization;

  if (!bearerHeader) { res.status(401).json({ msg: 'No token' }); } else {
    const bearer = bearerHeader.split(' ');
    const bearerToken = bearer[1];
    try {
      const user = jwt.verify(bearerToken, secretKey);
      req.verified = user;
      next();
    } catch (err) {
      res.status(400).json({ msg: 'Invalid token' });
    }
  }
};

module.exports = verify;

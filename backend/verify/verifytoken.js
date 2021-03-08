/*
Verifies token in order to grant access to 'protected' routes
If verification fails 'Access denied' is returned
*/
const verify = (req, res, next) => {
  const bearerHeader = req.headers.authorization;
  if (typeof bearerHeader !== 'undefined') {
    const bearer = bearerHeader.split(' ');
    const bearerToken = bearer[1];
    req.token = bearerToken;
    next();
  } else {
    res.status(403).json({ msg: 'Access denied' });
  }
};

module.exports = { verify };

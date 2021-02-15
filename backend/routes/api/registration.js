const { Router } = require('express');
const { newUser } = require('../../db');

const router = Router();

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

const { Router } = require('express');
const { newUser } = require('../../db');

const router = Router();

router.post('/', (req, res) => {
  console.log(req.body);
  newUser(req.body.fname, req.body.lname, req.body.ssn, req.body.email);
  res.json('response');
});

module.exports = router;

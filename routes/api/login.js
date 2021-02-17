const { Router, json } = require('express');
const { login } = require('../../db');

const router = Router();

/**
 *
 */
router.post('/', async (req, res) => {
  const dbRes = await login(req.body.username, req.body.pass);
  console.log(dbRes);
  res.json(dbRes);
  // login(req.body.username, req.body.pass)
  //   .then((dbRes) => {
  //     console.log(dbRes);
  //     res.json(dbRes);
  //   }).catch((dbErr) => {
  //     res.status(500).json(dbErr);
  //   });
});

module.exports = router;

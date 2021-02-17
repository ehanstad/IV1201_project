const { Router, json } = require('express');
const { login } = require('../../db');

const router = Router();

/**
 *
 */
router.post('/', (req, res) => {
  login(req.body.username, req.body.pass)
  .then((dbRes) => {
      res.json(dbRes);
    }).catch((dbErr) => {
      res.status(500).json(dbErr);
    });
});

module.exports = router;
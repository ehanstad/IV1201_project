const { Router } = require('express');
const { Client } = require('pg');

const router = Router();

// connect to db
const connectionString = process.env.DATABASE_URL;
const client = new Client({
  connectionString,
  ssl: {
    rejectUnauthorized: false,
  },
});
client.connect().then(() => console.log('Connected to db.')).catch((err) => console.log(err));

router.post('/', (req, res) => {
  client.query(`INSERT INTO person (Name, Surname, Ssn, Email, Password)` + 
  `VALUES (${req.body.fname}, ${req.body.lname}, ${req.body.ssn}, ${req.body.email}, ${req.body.pass})`, 
  (err, resE) => {
    if(err) res.json(err);
    res.json(resE);
  });
  client.end();
})

module.exports = router;
const { Pool } = require('pg');
require('dotenv').config();

// connect to db
const connectionString = process.env.DATABASE_URL;
const pool = new Pool({
  connectionString,
  ssl: {
    rejectUnauthorized: false,
  },
});

module.exports = { pool };

const { Pool } = require('pg');
require('env2')('./config.env');

let DB_URL = process.env.DB_URL;
if (process.env.NODE_ENV === "test") {
  DB_URL = process.env.LOCAL_DB;
}

if (!DB_URL)
  throw new Error("Enviroment variable DB_URL must be set");

const pool = new Pool({
  connectionString: DB_URL
});

module.exports = pool;

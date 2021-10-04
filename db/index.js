const { Pool } = require('pg');

const devConfig = {
    user: process.env.PGUSER,
    host: process.env.PGHOST,
    database: process.env.PGDATABASE,
    password: process.env.PGPASSWORD,
    port: process.env.PGPORT
};

const prodConfig = {
    connectionString: process.env.DATABASE_URL, // comes from heroku addon
    ssl: {
      rejectUnauthorized: false
    }
};

//const prodConfig = process.env.DATABASE_URL; // comes from heroku addon

const pool = new Pool(process.env.NODE_ENV === "production" ? prodConfig : devConfig);

module.exports = {
  query: (text, params) => pool.query(text, params)
}
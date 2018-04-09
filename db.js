const pg = require('pg');
const travel = require('./models/travel');
const user = require('./models/user');

const configs = {
  user: 'tanenkai',
  host: '127.0.0.1',
  database: 'travel',
  port: 5432
};

const pool = new pg.Pool(configs);

pool.on('error', function (err) {
  console.log('idle client error', err.message, err.stack);
});

module.exports = {
  pool: pool,
  travel: travel(pool),
  user: user(pool)
};
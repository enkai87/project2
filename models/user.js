const bcrypt = require('bcrypt');

/**
 * ===========================================
 * Export model functions as a module
 * ===========================================
 */
module.exports = (dbPool) => {
  // `dbPool` is accessible within this function scope
  return {
    create: (user, callback) => {
      // run user input password through bcrypt to obtain hashed password
      bcrypt.hash(user.password, 1, (error, hashed) => {
        if (error) console.error('hash error!', error);

        // set up query
        const queryString = 'INSERT INTO users (username, age, gender, nationality, email, occupation, types_of_travellers, password) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)';
        const values = [
          user.username,
          user.age,
          user.gender,
          user.nationality,
          user.email,
          user.occupation,
          user.traveller,
          hashed
        ];

        // execute query
        dbPool.query(queryString, values, (error, queryResult) => {
          // invoke callback function with results after query has executed
          callback(error, queryResult);
        });
      });
    },

    get: (id, callback) => {
      // set up query
      const queryString = 'SELECT * from users WHERE id=$1';
      const values = [id];

      // execute query
      dbPool.query(queryString, values, (error, queryResult) => {
        // invoke callback function with results after query has executed
        callback(error, queryResult);
      });
    },

    login: (user, callback) => {
      // TODO: Add logic here
      console.log(user);
      const username = user.username;
      const userpass = user.password;
      const queryString = 'SELECT * from users WHERE username=$1';
      dbPool.query(queryString, [username], (error, queryResult) => {
        if (error) {
          console.error('unable to match password', error.stack)
        }
        bcrypt.compare(userpass, queryResult.rows[0].password, (error, response) => {
          console.log(error);
          console.log(response);
          if (response) {
            callback(true);
          } else {
            callback(false);
          }
        });
      });
    }
  };
};

/**
 * ===========================================
 * Export model functions as a module
 * ===========================================
 */
module.exports = (dbPool) => {
  // `dbPool` is accessible within this function scope
  return {
  //create: (pokemon, callback) => {
    create: (travel, callback) => {
      // set up query
      const queryString = `INSERT INTO logs (title, country, city, travel_period, content, types_of_travellers)
        VALUES ($1, $2, $3, $4, $5, $6)`;
      const values = [
        travel.title,
        travel.country,
        travel.city,
        travel.travel,
        travel.content,
        travel.travellertype
      ];

      // execute query
      dbPool.query(queryString, values, (err, queryResult) => {
        // invoke callback function with results after query has executed
        callback(err, queryResult);
      });
    },

    get: (id, callback) => {
      const values = [id];

      dbPool.query('SELECT * from logs WHERE id=$1', values, (error, queryResult) => {
        callback(error, queryResult);
      });
    }
  };
};
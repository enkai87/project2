/**
 * ===========================================
 * Controller logic
 * ===========================================
 */
const get = (db) => {
  return (request, response) => {
    // use pokemon model method `get` to retrieve pokemon data
    db.travel.get(request.params.id, (error, queryResult) => {
      // queryResult contains pokemon data returned from the pokemon model
      if (error) {
        console.error('error getting pokemon:', error);
        response.sendStatus(500);
      } else {
        // render pokemon.handlebars in the pokemon folder
        response.render('pokemon/pokemon', { pokemon: queryResult.rows[0] });
      }
    });
  };
};

const updateForm = (db) => {
  return (request, response) => {
    // TODO: Add logic here
    db.travel.updateForm(request.params.id, (error, queryResult) => {
      if (error) {
        console.error('error updating pokemon:', error);
        response.sendStatus(500);
      } else {
        // render pokemon.handlebars in the pokemon folder
        console.log("results", queryResult.rows[0]);
        response.render('pokemon/edit', { pokemon: queryResult.rows[0] });
      }
    });
  };
};

const update = (db) => {
  return (request, response) => {
    // TODO: Add logic here
    db.travel.updatePokemon([request.params.id, request.body], (error, queryResult) => {
      if (error) {
        console.error('error getting pokemon:', error);
        response.sendStatus(500);
      } else {
        response.redirect('/');
      }
    });
  };
};

const createForm = (request, response) => {
  response.render('travel/new');
};

const create = (db) => {
  return (request, response) => {
    db.travel.create(Object.assign(request.body, request.cookies), (error) => {
      if (error) {
        response.end('Oops, something went wrong. Please try again!');
      } else {
        response.redirect(301, '/');
      }
    })
  }
}

// const create = (db) => {
//   return (request, response) => {
//     // use pokemon model method `create` to create new pokemon entry in db
//     db.travel.create(request.body, (error, queryResult) => {
//       // queryResult of creation is not useful to us, so we ignore it
//       // (console log it to see for yourself)
//       // (you can choose to omit it completely from the function parameters)

//       if (error) {
//         console.error('error getting pokemon:', error);
//         response.sendStatus(500);
//       }

//       if (queryResult.rowCount >= 1) {
//         console.log('Pokemon created successfully');
//       } else {
//         console.log('Pokemon could not be created');
//       }

//       // redirect to home page after creation
//       response.redirect('/');
//     });
//   };
// };

/**
 * ===========================================
 * Export controller functions as a module
 * ===========================================
 */
module.exports = {
  get,
  updateForm,
  update,
  createForm,
  create
};


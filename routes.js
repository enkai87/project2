const travel = require('./controllers/travel');
const users = require('./controllers/user');

module.exports = (app, db) => {
  /*
   *  =========================================
   *  Users
   *  =========================================
   */
  // CRUD users
  app.get('/users/new', users.newForm);
  app.post('/users/new', users.create(db));

  // Authentication
  app.post('/users/logout', users.logout);
  app.get('/users/login', users.loginForm);
  app.post('/users/login', users.login(db));

  /*
   *  =========================================
   *  Travel
   *  =========================================
   */
  // CRUD pokemons
  // app.get('/pokemons/:id/edit', pokemons.updateForm(db));
  // app.post('/pokemons/:id/edit', pokemons.update(db));
  // app.get('/pokemons/new', pokemons.createForm);
  // app.post('/pokemons', pokemons.create(db));
  // app.get('/pokemons/:id', pokemons.get(db));
  app.get('/travel/:id/edit', travel.updateForm(db));
  app.post('/travel/:id/edit', travel.update(db));
  app.get('/travel/new', travel.createForm);
  app.post('/travel/new', travel.create(db));
  app.get('/travel/:id', travel.get(db));
};
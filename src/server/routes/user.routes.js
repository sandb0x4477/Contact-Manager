module.exports = (app) => {
  const users = require('../controllers/user.controller.js');

  // app.get('/api/users', users.findAll);

  app.post('/api/autenticate', users.findOne);

}

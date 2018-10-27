module.exports = (app) => {
  const contacts = require('../controllers/contact.controller.js');

  app.get('/api/contacts', contacts.findAll);

  app.post('/api/contacts', contacts.create);

  app.get('/api/contacts/:contactId', contacts.findOne);

  app.put('/api/contacts/:contactId', contacts.update);

  app.delete('/api/contacts/:contactId', contacts.delete);
}

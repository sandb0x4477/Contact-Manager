const Contact = require('../models/contact.model.js');

// Retrieve and return all contacts from the database.
exports.findAll = (req, res) => {
  Contact.find()
    .then(contacts => {
      res.send(contacts);
    }).catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving notes."
      });
    });
};

// Create and Save a new Contact
exports.create = (req, res) => {

  // Create a Contact
  const contact = new Contact({
    name: req.body.name,
    address: req.body.address,
    city: req.body.city,
    postcode: req.body.postcode,
    email: req.body.email,
    phone: req.body.phone,
    photoUrl: req.body.photoUrl
  });

  // Save Contact in the database
  contact.save()
    .then(data => {
      res.send(data);
    }).catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Contact."
      });
    });
};

// Delete a contact with the specified contactId in the request
exports.delete = (req, res) => {
  Contact.findByIdAndRemove(req.params.contactId)
    .then(contact => {
      if (!contact)
      {
        return res.status(404).send({
          message: "Contact not found with id " + req.params.contactId
        });
      }
      res.send({ message: "Contact deleted successfully!" });
    }).catch(err => {
      if (err.kind === 'ObjectId' || err.name === 'NotFound')
      {
        return res.status(404).send({
          message: "Contact not found with id " + req.params.contactId
        });
      }
      return res.status(500).send({
        message: "Could not delete contact with id " + req.params.contactId
      });
    });
};

// Find a single contact with a contactId
exports.findOne = (req, res) => {
  Contact.findById(req.params.contactId)
    .then(contact => {
      if (!contact)
      {
        return res.status(404).send({
          message: "contact not found with id " + req.params.contactId
        });
      }
      res.send(contact);
    }).catch(err => {
      if (err.kind === 'ObjectId')
      {
        return res.status(404).send({
          message: "Contact not found with id " + req.params.contactId
        });
      }
      return res.status(500).send({
        message: "Error retrieving Contact with id " + req.params.contactId
      });
    });
};

// Update a contact identified by the contactId in the request
exports.update = (req, res) => {

// Find contact and update it with the request body
Contact.findByIdAndUpdate(req.params.contactId, {
  name: req.body.name,
  address: req.body.address,
  city: req.body.city,
  postcode: req.body.postcode,
  email: req.body.email,
  phone: req.body.phone,
  photoUrl: req.body.photoUrl
}, { new: true })
  .then(contact => {
    if (!contact)
    {
      return res.status(404).send({
        message: "Contact not found with id " + req.params.contactId
      });
    }
    res.send(contact);
  }).catch(err => {
    if (err.kind === 'ObjectId')
    {
      return res.status(404).send({
        message: "Contact not found with id " + req.params.contactId
      });
    }
    return res.status(500).send({
      message: "Error updating contact with id " + req.params.contactId
    });
  });
};

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const User = require('../models/user.model.js');

// Retrieve and return all users from the database.
// exports.findAll = (req, res) => {
//   User.find()
//     .then(users => {
//       res.send(users);
//     }).catch(err => {
//       res.status(500).send({
//         message: err.message || "Some error occurred while retrieving notes."
//       });
//     });
// };

// Find a single user with a contactId
exports.findOne = (req, res) => {
  // console.log(res);

  const user = req.body;

  User.findOne({ username: user.username }, (err, result) => {
    if (!result)
    {
      return res.status(404).json({ error: 'User not found...' });
    }

    if (!bcrypt.compareSync(user.password, result.password))
    {
      return res.status(401).json({ error: 'Incorrect password...' });
    }

    const payload = {
      username: result.username,
      admin: result.admin
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '4h' });

    return res.json({
      message: 'successfuly autenticated',
      token: token
    });
  });
};

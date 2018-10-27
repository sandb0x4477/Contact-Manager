const express = require('express');
const bodyParser = require('body-parser');
const path = require("path");
const checkJwt = require('express-jwt');
const router = express.Router();

// create express app
const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
  extended: true
}))

// parse application/json
app.use(bodyParser.json())

// Configuring the database
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

// .env config
require("dotenv").config();

// Connecting to the database
mongoose.connect(process.env.DB_CONN, {
  useNewUrlParser: true
}).then(() => {
  console.log("Successfully connected to the database");
}).catch(err => {
  console.log('Could not connect to the database. Exiting now...');
  process.exit();
});

// Static files
app.use(express.static(path.join(__dirname, "public")));

router.use(checkJwt({
    secret: process.env.JWT_SECRET
  })
  .unless({
    path: '/api/autenticate'
  }));

router.use((err, req, res, next) => {
  if (err.name === 'UnauthorizedError') {
    res.status(401).send({
      error: err.message
    });
  }
})

require('./routes/contact.routes.js')(app);
require('./routes/user.routes.js')(app);

// SPA
app.use("*", (req, res) => {
  return res.sendFile(path.join(__dirname, "public/index.html"));
});

// listen for requests
app.listen(3001, "0.0.0.0", () => {
  console.log("Server is listening on port 3001");
});

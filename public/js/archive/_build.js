const mongoose = require('mongoose');
const dotenv = require('dotenv').config();

// MODELS
const packagesModel = require('./models/gallery-model.js');

// Databases
const packagesSeed = require('./public/js/vacation-packages.js');

/*******************************/
/* Mongoose/MongoDB Connection */
/*******************************/

// Connects to DB
const dbURL = process.env.MONGODB_URL;
mongoose.connect(dbURL, {
  useUnifiedTopology: true,
  useNewUrlParser: true
});

var db = mongoose.connection;

// Display error if any.
db.on('error', function(error){
  console.log(`Connection Error: ${error.message}`)
});

// Uploads documents in gallery-mod based on the gallery-model schematic.
db.once('open', function() {
  console.log('Connected to DB...');
  packagesModel.insertMany(packagesSeed, function(error, destination) {
    console.log('Data import completed.')
    mongoose.connection.close();
  });
});
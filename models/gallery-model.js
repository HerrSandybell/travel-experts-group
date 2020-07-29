const mongoose = require('mongoose');

// Define Schema
const packagesSchema =  new mongoose.Schema({
  Id:                 Number,
  packageName:        String,
  packageDescription: String,
  packageStartDate:   Date,
  packageEndDate:     Date, 
  packagePrice:       Number,
	imageFile:          String,
});

// Export model to mongoDB using the above schema
module.exports = mongoose.model('package', packagesSchema);
// Define Schema
const mongoose = require('mongoose');
const packagesSchema =  new mongoose.Schema({
  Id:String,
  packageName: String,
  packagedDescription: String,
  packageStartDate: Date,
  packageEndDate: Date, 
  packagePrice:String,
	imageFile: String,
});
// Export model to mongoDB using the above schema
module.exports = mongoose.model('Package', packagesSchema);
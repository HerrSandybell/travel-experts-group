const mongoose = require('mongoose');

// Define Schema
const customersSchema =  new mongoose.Schema({
  "_id" : Number, 
  "CustomerId" : Number, 
  "CustFirstName" : String, 
  "CustLastName" : String, 
  "CustAddress" : String, 
  "CustCity" : String, 
  "CustProv" : String,
  "CustPostal" : String, 
  "CustCountry" : String, 
  "CustHomePhone" : String, 
  "CustBusPhone" : String, 
  "CustEmail" : String, 
  "AgentId" : Number, 
  "userid" : String, 
  "passwd" : String
});

// Export model to mongoDB using the above schema
module.exports = mongoose.model('customer', customersSchema);
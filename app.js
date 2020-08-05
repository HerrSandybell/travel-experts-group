// import modules
const path = require('path');
const express = require('express');
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const moment = require('moment');

const cors = require("cors");
const Package = require('./models/gallery-model.js');
const { response } = require('express');

//***********************************************************
/* Mongoose/MongoDB Connection */
/*******************************/
// Hide credential. from repo
//-------------------------------------//
dotenv.config();
mongoose
	.connect(process.env.MONGODB_URL, {
		useUnifiedTopology: true,
		useNewUrlParser: true
	})
	.then(() => console.log('db connected..!'))
	.catch(() => console.log('error in connecting database'));
  
  const db = mongoose.connection

  // Bind connection to error event (to get notification of connection errors)
  db.on('error', console.error.bind(console, 'MongoDB connection error:'));

  // Set a callback to let us know we've successfully connected
  db.once('open', function() {
    console.log('Connected to DB...');
  });
//***********************************************************
 

// create express app
const app = express();
app.set('view engine', 'ejs');

// automatically check if requested file is found in /public
// if yes, return that file as a response to the browser
app.use(express.static(path.join(__dirname, './public')));

app.get('/', function(request, response){
  response.render('index',{});
});

// Access any ejs/html file in the views folder.
 app.get('/:path', function(request, response){
  response.render(request.params.path,{});
});

// app.get('/api/packages', function(request, response) {
// 	console.log('Get data for all packages');
// 	Package.find(function(error, packages) {
// 		response.json(packages);
// 	});
// });

app.get('/api/:file', (req, res) => {
  db.collection(req.params.file).find().toArray()
  .then(results => res.json(results))
})

// if no, send a 404 error as a response to the browser
app.get('*', function(req, res){
  res.send('<h1>404: Page not found.</h1>');
})

// start up server
const PORT = process.env.PORT || 3000;

app.listen(PORT, function(){
  console.log(`Listening on port ${PORT}`);
});
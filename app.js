// import modules
const path = require('path');
const express = require('express');
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const moment = require('moment');
const cors = require("cors");
var bodyParser = require('body-parser');

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
  response.render(request.params.path,{ message:''});
});

// Access a collection in the mongoDB
app.get('/api/:file', (req, res) => {
  db.collection(req.params.file).find().toArray()
  .then(results => res.json(results))
})

// Registration form  data transfer to database & confirmation message to registration page.
app.use(bodyParser.json());
app.use(
	bodyParser.urlencoded({
		extended: true
	})
);
app.post('/registration', function(req, res) {
	var name = req.body.fullName;
	var email = req.body.Email;
	var userName = req.body.username;
	var pass = req.body.Password;
	var address = req.body.address;
	var cellPhone = req.body.businessPhone;
	var homePhone = req.body.homePhone;

	var data = {
		CustFullName: name,
		CustEmail: email,
		CustUserName: userName,
		CustPassword: pass,
		CustAddress: address,
		CustCellPhone: cellPhone,
		CustHomePhone: homePhone
	};
	db.collection('customers').insertOne(data, function(err, collection) {
		if (err) throw err;
		console.log('Record inserted Successfully');
	});

	res.render('registration', { message: 'Thank you, your registration  has been successfully completed' });
});

// if no, send a 404 error as a response to the browser
app.get('*', function(req, res){
  res.send('<h1>404: Page not found.</h1>');
})

// start up server
const PORT = process.env.PORT || 3000;

app.listen(PORT, function(){
  console.log(`Listening on port ${PORT}`);
});
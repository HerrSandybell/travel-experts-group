// import modules
const path         = require('path');
const express      = require('express');
const mongoose     = require("mongoose");
const dotenv       = require("dotenv");
const moment       = require('moment');
const assert       = require('assert');
const cors         = require("cors");
const session      = require('express-session');
const cookieParser = require('cookie-parser');
const flash        = require('connect-flash')


const Package = require('./app/models/gallery-model.js');
const Customer = require('./app/models/customers-model.js');
const { response } = require('express');
const { json } = require('body-parser');
const { resolve } = require('path');

let bodyParser = require('body-parser');

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

// cors origin URL - Allow inbound traffic from origin
corsOptions = {
  origin: "https://travel-experts-site.herokuapp.com/",
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  };
  app.use(cors(corsOptions));

// MOMENT/TIME
const yearFormat="YYYY";
const dateFormat="DD/MM/YYYY";
app.locals.moment = moment;
app.locals.yearFormat = yearFormat;
app.locals.dateFormat = dateFormat;
console.log(moment());

// automatically check if requested file is found in /public
// if yes, return that file as a response to the browser
app.use(express.static(path.join(__dirname, './public')));

app.get('/', (request, response) => {
  response.render('index',{});
});

// Access any ejs/html file in the views folder.
 app.get('/:path', function(request, response){
  response.render(request.params.path,{ message:'', errorMessage:''});
});

// Access a collection in the mongoDB
app.get('/api/:coll', (req, res) => {
  db.collection(req.params.coll).find().toArray()
  .then(results => res.json(results))
})

// Registration form  data transfer to database & confirmation message to registration page.
let urlencodedParser = bodyParser.urlencoded({ extended: false })

// Parse the HTML for variables (for forms)
app.use(bodyParser.json());
app.use(
	bodyParser.urlencoded({
		extended: true
	})
);


app.post('/registration', urlencodedParser, function(req, res) {
  // Create a document with the posted information.
  let registrationData = req.body;
  let email = registrationData.CustomerEmail;
  let username = registrationData.CustomerUserName;
  let password = registrationData.CustomerPassword;
  let confirmPassword = registrationData.confirmPassword;
  const customers = db.collection('customers'); 

  checkForm()

  // This function checks validity of registration inputs (and duplication in database) and posts the form to mongo if no errors are resulted.
  function checkForm() {
    let errors = {};
    customers.find({'CustomerEmail' : email}).toArray()
    .then(doc => {
      if (doc.length != 0) {
        console.log('ERROR: EMAIL EXISTS')
        errors['emailMessage']='Email already exists'
      }
    })
    .then(() => {
      customers.find({'CustomerUserName' : username}).toArray().then(function (doc) {
        if(Object.keys(doc).length != 0){
          console.log('USER ERROR: Username already exists')
          errors['usernameMessage'] = 'The Username already exists';
        }
      })
    })
    .then(() => {
      if (password !== confirmPassword) {
        errors['passwordMessage']= 'The passwords must match';
      }
    })
    .then(() => {
      console.log(errors)
      if (Object.keys(errors).length == 0) {
        db.collection('customers').insertOne(registrationData, (err, collection) => {
          if (err) throw err;
          console.log('Record inserted Successfully');
        });
        res.render('registration', { message: 'Thank you, your registration has been successfully completed', errorMessage: '' })
      } else {
        res.render('registration', {message: '', errorMessage: errors})
      }
    })
    .catch(err => console.log(err))
  }
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
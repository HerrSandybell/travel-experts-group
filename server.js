// import modules
const express      = require('express'),
      dotenv       = require("dotenv"),
      path         = require('path'),
      mongoose     = require("mongoose"),
      moment       = require('moment'),
      cors         = require("cors"),
      assert       = require('assert'),
      session      = require('express-session'),
      cookieParser = require('cookie-parser'),
      flash        = require('connect-flash');

// create express app
const app = express();

// ************** Configurations ****************

// Load Environment Variables
dotenv.config();

// Find static/public assets
app.use(express.static(path.join(__dirname, './public')));

// Set EJS for templating
app.set('view engine', 'ejs');

// MOMENT/TIME
const yearFormat="YYYY";
const dateFormat="DD/MM/YYYY";
app.locals.moment = moment;
app.locals.yearFormat = yearFormat;
app.locals.dateFormat = dateFormat;


//* Mongoose/MongoDB Connection *//
mongoose
	.connect(process.env.MONGODB_URL, {
		useUnifiedTopology: true,
		useNewUrlParser: true
	})
	.then(() => console.log('db connected..!'))
	.catch((e) => {
    console.log('error in connecting database.');
    console.log(e)
  });
  
  const db = mongoose.connection

  // Bind connection to error event (to get notification of connection errors)
  db.on('error', console.error.bind(console, 'MongoDB connection error:'));

  // Set a callback to let us know we've successfully connected
  db.once('open', function() {
    console.log('Connected to DB...');
  });
//-------------------------------------//

// cors origin URL - Allow inbound traffic from origin
corsOptions = {
  origin: "https://travel-experts-site.herokuapp.com/",
  // some legacy browsers (IE11, various SmartTVs) choke on 204
  optionsSuccessStatus: 200 
  };
  app.use(cors(corsOptions));

// *************** Set Routes ******************
app.use(require('./app/routes'))

// *************** Start up server *****************
const PORT = process.env.PORT || 3000;
app.listen(PORT, function(){
  console.log(`Listening on http://localhost:${PORT}`);
});
const path         = require('path'),
      express      = require('express'),
      mongoose     = require("mongoose"),
      bodyParser   = require('body-parser');

const router = express.Router(),
      mainController = require('./controllers/main.controller');

const app = express();

// Export Router to server (Attach all routers to the exports)
module.exports = router;

// use mongoDB
db = mongoose.connection;

// Setup Bodyparser: Registration form  data transfer to database & confirmation message to registration page.
// Parse the HTML for variables (for forms)
app.use(bodyParser.json());
app.use(
	bodyParser.urlencoded({
		extended: true
	})
);

let urlencodedParser = bodyParser.urlencoded({ extended: false });


// **** Define Routes ****

// Home Screen
router.get('/', mainController.showIndex);

// View Vacation packages
router.get('/VacPack', mainController.showAllPackages);

// Registration
router.get('/registration', mainController.showRegistration);

// Access any other ejs/html file in the views folder.
router.get('/:path', mainController.showPage);

// Post new user data via registration form to mongoDB
router.post('/registration', urlencodedParser, mainController.postRegistration);

// Login
// router.get('/login', mainController.showLogin);

// Access a collection in the mongoDB
// router.get('/api/:coll', mainController.showColl);


// Here, we store all backend and server functions of the app

module.exports = {
  // Show homepage
  showIndex: (req, res) => {
    let collections = {};
    db.collection('packages').find().toArray()
    .then(allPackages => {
      collections['packages'] = allPackages;})
      db.collection('regions').find().toArray()
      .then(allRegions => {
        collections['regions'] = allRegions;
        res.render('index',{collections})
      })  
  },

  // render vacpack with packages collections
  showAllPackages: (req, res) => {
    db.collection('packages').find().toArray()
    .then(packages => res.render('VacPack',{packages}))
  },

  // Render Registration page
  showRegistration: (req, res) => {
    res.render('registration',{ message:'', errorMessage:''})
  },

  // render requested page, if it exists
  showPage: (req, res) => {
    res.render(req.params.path,{ message:'', errorMessage:''})
  },

  // validate submitted registration data then post it if it passes
  postRegistration: (req, res) => {
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
  }
}

  // Render login page
  // showLogin: (req, res) => {
  //   res.render('login',{})
  // },

  // Find requested collection and return the json
  // showColl: (req, res) => {
  //   db.collection(req.params.coll).find().toArray()
  //   .then(results => res.json(results))
  // },


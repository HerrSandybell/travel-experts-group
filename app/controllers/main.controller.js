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
   //Render Contact Page
  showContact: (req, res) => {
  res.render('contact', { message: '' });
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

          const output = `
          <h2>Registration Confirmation</h2>
          <h3>Welcome to Travel Expert </h3>
          <ul>  
            <li>username: ${registrationData.CustomerUserName}</li>
            
            <li>email: ${registrationData.CustomerEmail}</li>
          </ul>
          
          `;


          const pass =process.env.PASS
          const user=process.env.USER
          let transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
              user: process.env.USER ,  // generated ethereal user
              pass:process.env.PASS     // hide user name
              
            },
            tls: {
              rejectUnauthorized: false
            }
          });


          let mailOptions = {
            from: '"Travel Expert Admin"<your@email.com>', // sender address
            to: [ 'smaslam2018@gmail.com', registrationData.CustomerEmail  ], // list of receivers
            subject: 'Registration Confirmation', // Subject line
            text: 'Hello world?', // plain text body
            html: output // html body
          };

          transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
              return console.log(error);
            }
            console.log('Message sent: %s', info.messageId);
            console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
        
          });
                      
            });
            res.render('registration', { message: 'Thank you, your registration has been successfully completed', errorMessage: '' })
          } else {
            res.render('registration', {message: '', errorMessage: errors})
          }
        })
        .catch(err => console.log(err))
      }
  },
//*********************contact us email notification **************** */

postContact: (req, res) => {
  console.log(req.body);
  const output = `
  <p>You have a new contact request</p>
  <h3>Contact Details</h3>
  <ul>  
    <li>name: ${req.body.name}</li>
    <li>subject: ${req.body.subject}</li>
    <li>email: ${req.body.email}</li>
  </ul>
  <h3>Message</h3>
  <p>${req.body.message}</p>
`;
  // create reusable transporter object using the default SMTP transport
  const pass =process.env.PASS
  const user=process.env.USER
  let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.USER , // generated ethereal user
      pass:process.env.PASS   //  
      
    },
    tls: {
      rejectUnauthorized: false
    }
  });

  // setup email data with unicode symbols
  let mailOptions = {
    from: '"Travel Expert Admin"<your@email.com>', // sender address
    to: [ 'smaslam2018@gmail.com', 'markfish47@ymail.com', 'talatrach@gmail.com' ], // list of receivers
    subject: 'Contact Request', // Subject line
    text: 'Hello world?', // plain text body
    html: output // html body
  };

  // send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log('Message sent: %s', info.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

    res.render('contact', { message: 'Thank you, your message has been sent' });
  });
}
};









  // Render login page
  // showLogin: (req, res) => {
  //   res.render('login',{})
  // },

  // Find requested collection and return the json
  // showColl: (req, res) => {
  //   db.collection(req.params.coll).find().toArray()
  //   .then(results => res.json(results))
  // },


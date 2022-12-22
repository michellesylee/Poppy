const express = require('express');
const popupController = require('../controllers/popupcontroller')
const userController = require('../controllers/userController')
const cookieController = require('../controllers/cookieController')
// const oauthController = require('../controllers/isUserAuthenticated')
const Auth = require('../controllers/Authenticated')

const router = express.Router();
const session = require('express-session');

function isLoggedIn(req, res, next) {
  req.user ? next() : res.sendStatus(401);
}
router.use(require('body-parser').urlencoded({ extended: true }));

router.get('/',
  popupController.getVendors,
  (req, res) => res.status(200).json(res.locals.vendors)
)


router.get('/viewratings',
  popupController.viewReviews,
  (req, res) => res.status(200).json(res.locals.reviews)
);

// const { isAuth } = require("./controllers/Authenticated");
const passport = require('passport');
// require('./passport.js');


router.get('/auth/google',
  passport.authenticate('google', { scope: ['email'] }),
);

router.get('/auth/google/callback',
  passport.authenticate('google', {
    successRedirect: '/api/auth/google/success',
    // successRedirect: '/api',
    failureRedirect: '/signup',  
  }),
)


router.get('/auth/google/success', function(req, res, next) {
  console.log(req.session)
  res.send('Hello ' + req.user.firstname + ', you are now logged in!')
  // res.status(200).json(res.locals.req)
  // res.redirect('http://localhost:8080/')
});


router.post("/submit", function(req, res){
  const review = req.body.review;
  
  // Once the user is authenticated and their session gets saved, their user details are saved to req.user.
  //   console.log(req.user.id);

});
  

router.post('/addvendor',
  popupController.addVendor,
  (req, res) => res.status(200).json(res.locals.vendors)
);

router.post('/addrating',
  popupController.addRating,
  (req, res) => res.status(200).json(res.locals.rating)
);

router.put('/editrating',
  popupController.editReview,
  (req, res) => res.status(200).json(res.locals.rating)
);


router.put('/adduser',
  userController.createUser, cookieController.setSSIDCookie, passport.authenticate("local"),
  (req, res) => res.status(200).json(res.locals.users)
);

router.post('/verifyuser',
  userController.verifyUser, cookieController.setSSIDCookie, passport.authenticate("local"),
  (req, res) => res.status(200).json(res.locals.users)
);


router.delete('/delete/:id',
  popupController.deleteVendor,
  (req, res) => res.status(200).json(res.locals.deleted)
);

router.delete('/viewratings/:id',
  popupController.deleteReview,
  (req, res) => res.status(200).json(res.locals.deleted)
);


router.get('/logout', (req, res) => {
  req.logout(); 
  req.session.destroy();
  res.redirect('/');
});



module.exports = router;

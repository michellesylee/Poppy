const express = require('express');
const popupController = require('../controllers/popupcontroller');
const userController = require('../controllers/userController');
const cookieController = require('../controllers/cookieController');
// const oauthController = require('../controllers/isUserAuthenticated')
const Auth = require('../controllers/Authenticated');

const router = express.Router();
const session = require('express-session');

function isLoggedIn(req, res, next) {
  req.user ? next() : res.sendStatus(401);
}
router.use(require('body-parser').urlencoded({ extended: true }));

router.get('/', popupController.getVendors, (req, res) =>
  res.status(200).json(res.locals.vendors)
);

router.get('/viewratings', popupController.viewReviews, (req, res) =>
  res.status(200).json(res.locals.reviews)
);

// const { isAuth } = require("./controllers/Authenticated");
const passport = require('passport');

router.get(
  '/auth/google',
  passport.authenticate('google', { scope: ['email', 'profile'] })
);

router.get(
  '/auth/google/callback',
  passport.authenticate('google', {
    successRedirect: '/api/auth/google/success',
    failureRedirect: '/signup',
  })
);

//userController.logIn,
router.get('/auth/google/success', (req, res) => {
  res.redirect('http://localhost:8080/success');
});

router.get('/auth/google/render', (req, res) => {
  if (req.user) {
    res.status(200).json({
      success: true,
      message: 'successful!',
      user: req.user,
    });
  } else {
    res.sendStatus(401);
  }
});

router.post('/submit', function (req, res) {
  const review = req.body.review;
  // Once the user is authenticated and their session gets saved, their user details are saved to req.user.
  //   console.log(req.user.id);
});

router.post('/addvendor', popupController.addVendor, (req, res) =>
  res.status(200).json(res.locals.vendors)
);

router.post('/addrating', popupController.addRating, (req, res) =>
  res.status(200).json(res.locals.rating)
);

router.put('/editrating', popupController.editReview, (req, res) =>
  res.status(200).json(res.locals.rating)
);

router.put(
  '/adduser',
  userController.createUser,
  cookieController.setSSIDCookie,
  passport.authenticate('local'),
  (req, res) => res.status(200).json(res.locals.users)
);

router.post(
  '/verifyuser',
  userController.verifyUser,
  cookieController.setSSIDCookie,
  passport.authenticate('local'),
  (req, res) => res.status(200).json(res.locals.users)
);

router.delete('/delete/:id', popupController.deleteVendor, (req, res) =>
  res.status(200).json(res.locals.deleted)
);

router.delete('/viewratings/:id', popupController.deleteReview, (req, res) =>
  res.status(200).json(res.locals.deleted)
);

router.get('/logout', (req, res, next) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    // console.log('logged out')
    req.session.destroy();
    res.redirect('http://localhost:8080');
    console.log('logged out')
  });
});

module.exports = router;

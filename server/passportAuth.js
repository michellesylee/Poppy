
// const express = require('express');
// const session = require('express-session');
// const app = express();
// const passport = require('passport');
// const GoogleStrategy = require('passport-google-oauth2').Strategy;

// const GOOGLE_CLIENT_ID = '1002091958769-s96diuq2khj97un1lf2iau0bmutcd240.apps.googleusercontent.com';
// const GOOGLE_CLIENT_SECRET = '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';

// const db = require('./models/popupModels.js');
  
  
// passport.use(new GoogleStrategy({
//   clientID: GOOGLE_CLIENT_ID,
//   clientSecret: GOOGLE_CLIENT_SECRET,
//   callbackURL: 'http://localhost:3000/google/callback',
//   passReqToCallback: true,
//   scope: ['profile', 'email'],
// },
  
//  (request, accessToken, refreshToken, profile, done) => {
//   // console.log(profile)
//   const queryString =
//     "SELECT google_identity, email, firstname FROM googleusers WHERE google_identity = $1";
//   const values = [profile.id]
  
//   const user = db.query(queryString, values);
//   // db.get('SELECT * FROM Users WHERE provider = ? AND subject = ?', [
//   //   'https://accounts.google.com',
//   //   profile.id
//   // ], function(err, cred) {
//   //   if (err) { return cb(err); }
//   if (user.rows.length > 0) {
//     done(null, user.rows[0])
//   } else {
//     const newValues = [profile.id, profile.email, profile.given_name];
//     const queryStr = "INSERT INTO googleusers (google_identity, email, firstname) VALUES($1, $2, $3) RETURNING google_identity, email, firstname";
//     const newUser =  db.query(queryStr, newValues);
//     return done(null, newUser.rows[0])
//   }
// }));

// passport.serializeUser((user, done) => {
//   done(null, user)
//   // done(null, user)
// });
    
// passport.deserializeUser(async(id, done) => {
//   const values = [id];
//   // console.log(id)
//   const queryString = "Select google_identity, email, firstname from googleusers WHERE google_identity = $1";
//   const googleUser = await db.query(queryString, values)
//   done(null, googleUser.rows[0])
// });
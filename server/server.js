const path = require('path');
const express = require('express');
const app = express();
const apiRouter = require('./routes/api');
const bodyParser = require('body-parser');
// const { isAuth } = require("./controllers/Authenticated");
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth2').Strategy;

const session = require('express-session');
const cookieSession = require('cookie-session');

const PORT = 3000;

app.use(express.static('public'));

app.use(
  session({
    secret: 'Our little secret.',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 24 * 60 * 60 * 1000, secure: false },
  })
);

app.use(passport.initialize()); // Used to initialize passport
app.use(passport.session()); // Used to persist login sessions

passport.serializeUser((user, done) => {
  //  console.log(user.google_identity),
  done(null, user);
  // done(null, user)
});

passport.deserializeUser(async (id, done) => {
  const values = [id.google_identity];
  // console.log(id.google_identity)
  const queryString =
    'Select google_identity, email, firstname from googleusers WHERE google_identity = $1';
  const googleUser = await db.query(queryString, values);
  done(null, googleUser.rows[0]);
});

const GOOGLE_CLIENT_ID =
  '1002091958769-s96diuq2khj97un1lf2iau0bmutcd240.apps.googleusercontent.com';
const GOOGLE_CLIENT_SECRET = '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';

const db = require('./models/popupModels.js');

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: 'http://localhost:3000/api/auth/google/callback',
      passReqToCallback: true,
    },
    async (request, accessToken, refreshToken, profile, done) => {
      const queryString =
        'SELECT google_identity, email, firstname FROM googleusers WHERE google_identity = $1';
      const values = [profile.id];

      const user = await db.query(queryString, values);
      let providerData = profile._json;
      providerData.accessToken = accessToken;
      providerData.refreshToken = refreshToken;
      // db.get('SELECT * FROM Users WHERE provider = ? AND subject = ?', [
      //   'https://accounts.google.com',
      //   profile.id
      // ], function(err, cred) {
      //   if (err) { return cb(err); }
      if (user.rows.length > 0) {
        done(null, user.rows[0]);
      } else {
        const newValues = [profile.id, profile.email, profile.given_name];
        const queryStr =
          'INSERT INTO googleusers (google_identity, email, firstname) VALUES($1, $2, $3) RETURNING google_identity, email, firstname';
        const newUser = await db.query(queryStr, newValues);
        done(null, newUser.rows[0]);
      }
    }
  )
);

// oauth2Client.setCredentials({
//   refresh_token: `STORED_REFRESH_TOKEN`
// });

//parsing request body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//added below
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

//handle requests for static files
app.use('/build', express.static(path.join(__dirname, '../build')));

// // // The middleware receives the data from Google and runs the function on Strategy config

// //define route handlers
app.use('/api', apiRouter);

// catch-all route handler for any requests to an unknown route
app.use((req, res) =>
  res.status(404).send("This is not the page you're looking for...")
);

//express error handler
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

//start server
app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}...`);
});

module.exports = app;

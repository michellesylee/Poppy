// const db = require('../models/userModel');
const db = require('../models/popupModels');

const userController = {};

userController.createUser = async (req,res,next) => {
  try {
    const queryString = 'INSERT INTO users (Username, Password, email) VALUES ($1, $2, $3)'
    const values = [req.body.username, req.body.password, req.body.email];
    const newUser = await db.query(queryString, values);
    res.locals.users = newUser.rows;
    return next();
  }    
  catch (err) {
    next({
      log: 'error on createUser middleware function',
      message: {
        err: 'userController.createUser: ERROR: Check server logs for details',
      },
    })
  }
};

userController.verifyUser = async (req, res, next) => {

  try {
    const queryString = 'Select * from users WHERE (Username, Password) = VALUES ($1, $2)'
    const values = [req.body.username, req.body.password];
    const user = await db.query(queryString, values);
    console.log(user)
    res.locals.user = user.rows[0];
    req.session.loggedin = true;
    req.session.user = values[0];  
    console.log(req.session)
    res.redirect('/');
    return next();
  }    
  catch (err) {
    next({
      log: 'error on verifyUser middleware function',
      message: {
        err: 'userController.verifyUser: ERROR: Check server logs for details',
      },
    })
  }
};
  // write code here
//   const { username, password } = req.body;
//   //pull username and password from request body
//   User.findOne({username}, (err, user) => {
//     if (err) return next({
//       log: 'error on userController.verifyUser middleware function',
//       message: {
//         error: err,
//       }
//     });
//     else if (!user) {
//       res.redirect('/signup')
//     } else {
//       bcrypt
//         .compare(password, user.password)
//         .then(result => {
//           if (!result) {
//             res.redirect('/signup')
//           } else {
//             res.locals.user = user;
//             return next();
//           }
//         })
//     }
//   });
// };

module.exports = userController;
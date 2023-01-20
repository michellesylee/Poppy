const db = require('../models/popupModels');

const popupController = {};

popupController.getVendors = async (req,res,next) => {
  try {
    const queryString = 'SELECT * from Vendors'
    const query = await db.query(queryString);
    res.locals.vendors = query.rows;
    next();
  }
  catch (err) {
    next({
      log: 'error on popup getVendors middleware function',
      message: {
        err: 'popupController.getVendors: ERROR: Check server logs for details',
      }
    })
  }
}

popupController.viewReviews = async (req,res,next) => {
  try {
    // const queryString = 'SELECT vendors.name, ratings.rating, ratings.reviewername, ratings.date, ratings.reviewtext from Ratings INNER JOIN Vendors ON  Vendors.vendorID=Ratings.vendor_id'

    const queryString = 'select * from ratings'
    const query = await db.query(queryString);
    res.locals.reviews = query.rows;
    next();
  }
  catch (err) {
    next({
      log: 'error on popup viewReviews middleware function',
      message: {
        err: 'popupController.viewReviews: ERROR: Check server logs for details',
      }
    })
  }
}




popupController.editReview = async (req,res,next) => {
        try {
    // const queryString = 'SELECT vendors.name, ratings.rating, ratings.reviewername, ratings.date, ratings.reviewtext from Ratings INNER JOIN Vendors ON  Vendors.vendorID=Ratings.vendor_id'
    const queryString = 'UPDATE RATINGS SET date = $2, reviewtext = $3, rating = $4 WHERE reviewername = $1'
    const values = [req.body.reviewerName, req.body.date, req.body.reviewtext, req.body.givenRating];
    const query = await db.query(queryString, values);
    res.locals.rating = query.rows;
    console.log(res.locals.rating)
    next();
  }
  catch (err) {
    next({
      log: 'error on popup editReview middleware function',
      message: {
        err: 'popupController.editReview: ERROR: Check server logs for details',
      }
    })
  }
}

// const [startDate, setStartDate] = useState(new Date());
// const [endDate, setEndDate] = useState(new Date());



popupController.addVendor = async (req,res,next) => {
  try {
    const queryString = 'INSERT INTO Vendors (Name, FoodCategory, Address, Dates, Time, Menu, enddate) VALUES ($1, $2, $3, $4, $5, $6)'
    const values = [req.body.name, req.body.foodCategory, req.body.address, req.body.startDate, req.body.time, req.body.menu];
    const newVendor = await db.query(queryString, values);
    res.locals.vendors = newVendor.rows;
    next();
  }    
  catch (err) {
    next({
      log: 'error on addVendor middleware function',
      message: {
        err: 'popupController.addVendor: ERROR: Check server logs for details',
      },
    })
  }
};

popupController.deleteVendor = async (req,res,next) => {
  try {
    const queryString = 'DELETE FROM Vendors WHERE Name = $1';
    const values = [req.params.id];
    const deletedVendor = await db.query(queryString, values);
    res.locals.deleted = deletedVendor;
    next();
  }    
  catch (err) {
    next({
      log: 'error on deleteVendor middleware function',
      message: {
        err: 'popupController.deleteVendor: ERROR: Check server logs for details',
      },
    })
  }
};

popupController.deleteReview = async (req,res,next) => {
  try {
    const queryString = 'DELETE FROM Ratings WHERE reviewername = $1';
    const values = [req.params.id];
    const deletedReview = await db.query(queryString, values);
    res.locals.deleted = deletedReview;
    next();
  }    
  catch (err) {
    next({
      log: 'error on deleteReview middleware function',
      message: {
        err: 'popupController.deleteReview: ERROR: Check server logs for details',
      },
    })
  }
};


popupController.createUser = async (req,res,next) => {
  try {
    const queryString = 'INSERT INTO Users (Username, Password) VALUES ($1, $2)'
    const values = [req.body.userName, req.body.pw];
    const newUser = await db.query(queryString, values);
    res.locals.users = newUser.rows;
    next();
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

popupController.addVendor = async (req,res,next) => {
  try {
    const queryString = 'INSERT INTO Vendors (Name, FoodCategory, Address, Dates, Time, Menu) VALUES ($1, $2, $3, $4, $5, $6)'
    const values = [req.body.name, req.body.foodCategory, req.body.address, req.body.dates, req.body.time, req.body.menu];
    const newVendor = await db.query(queryString, values);
    res.locals.vendors = newVendor.rows;
    return next();
  }    
  catch (err) {
    next({
      log: 'error on addVendor middleware function',
      message: {
        err: 'popupController.addVendor: ERROR: Check server logs for details',
      },
    })
  }
};



popupController.addRating = async (req,res,next) => {
  try {
    const queryString = 'INSERT INTO RATINGS (vendor_id, reviewername, date, reviewtext, rating) VALUES ($1, $2, $3, $4, $5)'
    const values = [req.body.vendorid,req.body.reviewerName, req.body.date, req.body.review, req.body.givenRating];
    const newVendor = await db.query(queryString, values);
    res.locals.rating = newVendor.rows;
    return next();
  }    
  catch (err) {
    next({
      log: 'error on addRating middleware function',
      message: {
        err: 'popupController.addRating: ERROR: Check server logs for details',
      },
    })
  }
};

module.exports = popupController;
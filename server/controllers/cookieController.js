const cookieController = {};

cookieController.setCookie = (req, res, next) => {

    const randomNum = Math.floor(Math.random() * 100).toString();
  
    // write code here
    res.cookie('codesmith', 'hi');
    res.cookie('secret', randomNum)
    console.log(res.cookie)
    return next();
  }

  cookieController.setSSIDCookie = (req, res, next) => {

    res.cookie('ssid', res.locals.user, {httpOnly: true});
    return next();
    // })
  }

module.exports = cookieController;

var bcrypt = require('bcrypt');
var crypto = require('crypto');
var express = require('express');
var router = express.Router();

var sqldb = require('../components/oauth/sqldb');
var User = sqldb.User;

function authenticate(email, password, cb) {
            console.log("=====>login2:"+email+","+password);

  User.findOne({ where: {username: email}}).then(user=> {
      console.log("=====>login322:"+JSON.stringify(user));
                 // console.log("=====>login3:"+err+","+user);

    if (!user) return cb("error");
    cb(null, bcrypt.compareSync(password, user.password) ? user : null);
  });
}


router.post('/', function(req, res, next) {

    authenticate(req.body.email, req.body.password, function(err, user) {
              console.log("=====>login5:"+err+","+JSON.stringify(user));

    if (err) return next(err);

    if (user) {
      req.session.userId = user.id;
      req.session.username = user.username;
      req.session.save();
      var redirect = (req.query.redirect != null ? req.query.redirect : '/account');
      console.log("===>redirect:"+redirect);
      res.redirect(redirect);
    } else {
      res.status(401).render('login');
    }
  });

});

router.get('/', function(req, res, next) {
    console.log("=====>login");
  res.render('login');
});
module.exports = router;

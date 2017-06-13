var express = require('express');
var router = express.Router();

function censor(censor) {
  var i = 0;

  return function(key, value) {
    if(i !== 0 && typeof(censor) === 'object' && typeof(value) == 'object' && censor == value) 
      return '[Circular]'; 

    if(i >= 29) // seems to be a harded maximum of 30 serialized objects?
      return '[Unknown]';

    ++i; // so we know we aren't using the original object anymore

    return value;  
  }
}

/* GET home page. */
router.get('/', function(req, res, next) {
    console.log("req:"+ JSON.stringify(req, censor(req)));
  if (!req.session.userId) {
    return res.redirect('/login?redirect=' + req.path + '&client_id=' +
      req.query.client_id +'&redirect_uri=' + req.query.redirect_uri);
  }
  console.log("loged in:"+req.session.userId+","+req.session.username);
  res.render('index', { user: 
      {
          userid: req.session.userId,
          username:req.session.username
      } 
  });
});

module.exports = router;

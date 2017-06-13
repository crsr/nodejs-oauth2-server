/**
 * Created by Manjesh on 14-05-2016.
 */

var oauthServer = require('oauth2-server');
var Request = oauthServer.Request;
var Response = oauthServer.Response;
var config = require('../../config');
var db = config.db==='mongo' ? require('./mongodb') : require('./sqldb');

var oauth = require('./oauth')

module.exports = function(app){
  app.all('/oauth/token', function(req,res,next){
    var request = new Request(req);
    var response = new Response(res);
    request.user = {
        id: req.session.userId
    };
    console.log("==>body:", JSON.stringify(req.body));
    oauth
      .token(request,response)
      .then(function(token) {
        // Todo: remove unnecessary values in response
        delete token.client;
        delete token.user;
        
        if (request.body.grant_type == 'authorization_code')
            return res.json(token)
        else (request.body.response_type == 'token' )
            res.redirect(request.body.redirect_uri+"#token="+token.access_token);
      }).catch(function(err){
        throw err;// for dev debug

        return res.status(500).json(err)
      })
  });

  app.post('/oauth/authorise', function(req, res){
      
      if (!req.session.userId) {
          var red_url = "/login?redirect="+req.path;
    
          var i = req.url.indexOf('?');
          if ( i >= 0)
                red_url = red_url + "?" + encodeURIComponent(req.url.substr(i+1));
        console.log("red_url="+red_url);
          return res.redirect(red_url);
      }
      
    var request = new Request(req);
    var response = new Response(res);
console.log("===>authorize:"+req.session.userId);

    request.user = {
        id: req.session.userId
    };
    
    // TODO should use customed authentication handler in options
    return oauth.authorize(request, response).then(function(success) {
      //  if (req.body.allow !== 'true') return callback(null, false);
      //  return callback(null, true, req.user);
        // res.json(success)
        console.log(JSON.stringify(success));
        res.redirect(success.redirectUri+"?code="+success.code);
    }).catch(function(err){
      res.status(err.code || 500).json(err);
      throw err;// for dev debug
    })
  });

  app.get('/oauth/authorise', function(req, res) {
      console.log("===>get authorize:");
      
      if (!req.session.userId) {
          var red_url = "/login?redirect="+req.path;
    
          var i = req.url.indexOf('?');
          if ( i >= 0)
                red_url = red_url + "?" + encodeURIComponent(req.url.substr(i+1));
        console.log("red_url="+red_url);
          return res.redirect(red_url);
      }
      console.log("===>already login");
      if (req.query.response_type == "code"){
          if (req.session.allow != true)
          // should render a form ask user for permission authorization
            res.render("authorise", {args:req.query});
        else{
                
            }
        }
      else if (req.query.response_type == "token"){
          //var red_url = "/oauth/token?";
          //var i = req.url.indexOf('?');
          //if ( i >= 0)
          //      red_url = red_url + "?" + encodeURIComponent(req.url.substr(i+1));
          //res.redirect(red_url);
          if (req.session.allow != true)
                res.render("implicit", {args:req.query});
          else{
          }

      }
      
      
      
      
/*
    return db.OAuthClient.findOne({
        where: {
          client_id: req.query.client_id,
          redirect_uri: req.query.redirect_uri,
        },
        attributes: ['id', 'name'],
      })
      .then(function(model) {
        if (!model) return res.status(404).json({ error: 'Invalid Client' });
        return res.json(model);
      }).catch(function(err){
        return res.status(err.code || 500).json(err)
      });*/
      
      
  });
}

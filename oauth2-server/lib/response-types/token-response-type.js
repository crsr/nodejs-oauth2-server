'use strict';

/**
 * Module dependencies.
 */

var ServerError = require('../errors/server-error');

/**
 * Constructor.
 */

function TokenResponseType(token) {
  //throw new ServerError('Not implemented.');
  this.token = token;
}

TokenResponseType.prototype.buildRedirectUri = function(redirectUri) {
  if (!redirectUri) {
    throw new InvalidArgumentError('Missing parameter: `redirectUri`');
  }

  //var uri = url.parse(redirectUri, true);

  //uri.query.token = this.code;
  //uri.search = null;


  var uri = redirectUri+"#"+this.token;
  return uri;
};


/**
 * Export constructor.
 */

module.exports = TokenResponseType;

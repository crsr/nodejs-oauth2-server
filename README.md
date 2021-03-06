# nodejs-oauth2-server
login/signup implementation which based on oauth2, support multi-tenant, and 3rd part login via facebook, twitter, wechat, weibo

## Installation

```
git clone https://github.com/jackieju/nodejs-oauth2-server.git
npm install
npm start or node ./bin/www
```

## Quick Start
test code flow:
===
In browser
http://localhost:3000/oauth/authorise?response_type=code&client_id=democlient&redirect_uri=http://localhost/cb&state=teststate&scope=profile

GET /oauth/authorise?response_type=code&client_id=democlient&redirect_uri=http://localhost/cb&state=teststate&scope=profile 200
Will redirect to login page

GET /login?redirect=/oauth/authorise 200
login using admin/admin

POST /login?redirect=/oauth/authorise 302 222.979 ms - 76
redirect to /oauth/authorise

GET /oauth/authorise 200
will render authorization form because session has userid

form will be post to /oauth/authorise

then
should be direct to http://localhost/cb?code=xxxxxxxx

step 2: get token
post
http://localhost:3000/oauth/token
with form: code=9fd70f9cd96697144066ffa3d69bb8b8b1b44785&grant_type=authorization_code&client_id=democlient&state=teststate&
client_secret=democlientsecret&redirect_uri=http://localhost/cb


test js flow(implicit flow)
===
In browser
http://localhost:3000/oauth/authorise?response_type=token&client_id=democlient&redirect_uri=http://localhost/cb&state=teststate&scope=profile


test open api
===
http://localhost:3000/me?access_token=c6459dd390b3d015bc4a0f80fef3b9cedd8cef56


After running with node, visting http://127.0.0.1:3000 should present you with a json response saying your access token could not be found.


## Features

- Supports authorization_code, implicit(user agent) password, refresh_token, client_credentials and extension (custom) grant types
- Implicitly supports any form of storage e.g. PostgreSQL, MySQL, Mongo, Redis...


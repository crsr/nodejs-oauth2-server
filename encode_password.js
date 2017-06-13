// help to calculate encoded password
var bcrypt = require('bcrypt');

bcrypt.hash('admin', 10, function(err, out){console.log(out);});


//$2a$10$pxvtisMnVKWIVR.1oAA5WumS6YX6qBeCD6ihFvpgw5q8f7U/jFV4m

var oauthModel = require('../models/oauth.js');
oauthModel.createUser('matt.boetger@gmail.com', 'test', function(err, count) { console.log("created: "+ count);} );

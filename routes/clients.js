var express = require('express');
var router = express.Router();
var oauth = require('../models/oauth.js');

router.get('/', function(req, res) {
  oauth.getClients(function(err, clients) {
    if (err) { res.render('error', err); }

    res.render('admin/clients', { "clients": clients, "title": 'Admin Clients' });
  });
});

router.post('/', function(req, res) {
  console.log('client_secret: ' + req.body.client_secret);
  console.log('redirect_uri: ' + req.body.redirect_uri);
  oauth.addClient(req.body.client_secrect, req.body.redirect_uri, function(err, clients) {
    if (err) { res.render('error', err); }

    res.render('admin/clients', { "clients": clients, "title": 'Admin Clients' });
  });
});

module.exports = router;

var express = require('express');
var router = express.Router();
var oauth = require('../models/oauth.js');
var clients = require('./clients.js');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('admin/', { title: 'Admin Index' });
});
router.get('/users', function(req, res) {
  oauth.getUsers(function(err, users) {
    if (err) { res.render('error', err); }

    res.render('admin/users', { "users": users, "title": 'Admin Users' });
  });
});

router.use('/clients', clients); 

module.exports = router;

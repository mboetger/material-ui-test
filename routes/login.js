var express = require('express');
var oauth = require('../models/oauth.js');

function createRouter(passport) {

  var router = express.Router();
  router.get('/login', function(req, res) {
    res.render('login', { title: 'Login' });
  });

  router.post('/login', 
    passport.authenticate('local', { failureRedirect: '/login' }),
    function(req,res) {
      res.redirect('/');
  });

  return router;
}

module.exports = createRouter;

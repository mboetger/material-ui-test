var express = require('express');
var router = express.Router();
var passport = require('passport');

/* GET home page. */
router.get('/login', function(req, res) {
  res.render('admin/login', { title: 'Login' });
});
module.exports = router;

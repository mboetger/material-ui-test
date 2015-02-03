var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('noobs/', { title: 'Noobs Index' });
});

module.exports = router;

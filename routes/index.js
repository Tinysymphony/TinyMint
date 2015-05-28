var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'TinyMint | Web Designer' });
});

router.get('/home', function(req, res, next) {
    res.render('home', { title: 'TinyMint | Create Your Web' });
});

module.exports = router;

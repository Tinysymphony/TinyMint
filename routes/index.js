var express = require('express');
var router = express.Router();
//var redis = require('redis');
//var bcrypt = require('bcrypt');
//var db = redis.createClient();

//db.on('error', function(err){
//   console.log('Error ' + err);
//});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'TinyMint | Web Designer' });
});

//router.submit('/', function(){
//
//});

//router.get('/home', function(req, res, next) {
//    res.render('home', { title: 'TinyMint | Create Your Web' });
//});

module.exports = router;

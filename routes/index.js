var express = require('express');
var User = require('../lib/user');
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

exports.submit = function (req, res, next) {
    var data = req.body.user;
    User.getByName(data.name, function (err, user) {
        if(err) return next(err);
        if(user.id) {
            res.error("Username already exists!");
            res.redirect('back');
        }else{
            user = new User({
                name: data.name,
                pass: data.password,
                mail: data.mail
            });

            user.save(function(err){
                if(err) return next(err);
                req.session.uid = user.id;
                res.redirect('/');
            })
        }
    })
}

//router.submit('/', function(){
//
//});

//router.get('/home', function(req, res, next) {
//    res.render('home', { title: 'TinyMint | Create Your Web' });
//});

module.exports = router;

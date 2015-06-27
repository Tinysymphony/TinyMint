var express = require('express');
var fs = require('fs');
var rmdir= require('rimraf');
var router = express.Router();

var pwdSlice = __dirname.split('/');
pwdSlice.pop();
var pwd = pwdSlice.join('/') + "/UserSpace/"

router.get('/', checkLogin);
router.get('/', function(req, res, next){
    var userPath = pwd + req.session.user.name;
    fs.mkdir(userPath, function(err){
        if(err) console.log("Router.get : user dir exists, pass");
    });
    fs.readdir(userPath, function(err, files){
        if(err) {
            console.log("ReadDir Error : " + err);
            res.redirect('Error404');
            return;
        }
        res.render('dashboard', {
            username: req.session.user.name,
            mints: files,
            title: "TinyMint | " + req.session.user.name + " Dashboard"
        });
    });
});

router.post('/create', function(req, res, next){

    var title = req.body.title;

    var userPath = pwd + req.session.user.name + "/";
    var subPath = userPath + title;

    fs.mkdir(userPath, function(err){
        if(err) console.log("user dir exists, pass");
        fs.mkdir(subPath, function(err){
            if(err) {
                console.log("subdir exists, pass"); //mint has created
                res.json({"fail": "The name has been used !"});
                return;
            }
            res.json({"success": "New Mint has been created ~"});
        });
    });
});

router.post('/delete', function(req, res, next){
    var title = req.body.title;
    var userPath = pwd + req.session.user.name + "/";
    var subPath =  userPath + title;

    rmdir(subPath, function(err){
        if(err) {
            console.log(err);
            res.json({"fail": "Cannot delete " + title});
        } else {
            res.json({"info": title + " has been deleted."});
        }
    })

});

router.post('/logout', function(req, res, next){
    console.log(req.body.exitSignal);
    if(req.body.exitSignal) {
        req.session.user = null;
        res.json({"info": "Bye"});
    }
});

function checkLogin(req, res, next) {
    if (!req.session.user) {
        res.redirect('Error404');
        return;
    }
    next();
}

module.exports = router;
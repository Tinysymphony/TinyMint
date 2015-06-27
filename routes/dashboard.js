var express = require('express');
var fs = require('fs');
var rmdir= require('rimraf');
var monk = require('monk');
var router = express.Router();

var pwdSlice = __dirname.split('/');
pwdSlice.pop();
var pwd = pwdSlice.join('/') + "/UserSpace/"

router.get('/', checkLogin);
router.get('/', function(req, res, next){
    var userPath = pwd + req.session.user.name;
    var db = monk('localhost/userInfo');
    fs.mkdir(userPath, function(err){
        if(err) console.log("Router.get : user dir exists, pass");
    });
    fs.readdir(userPath, function(err, files){
        if(err) {
            console.log("ReadDir Error : " + err);
            res.redirect('Error500');
            return;
        }
        var table = db.get('info');

        table.find({name: req.session.user.name}, function(err, doc){
            if(err){
                db.close();
                console.log("Database error: read user info failed.");
                res.redirect('Error500');
                return;
            }
            if(doc.length){
                db.close();
                console.log(doc[0]);
                res.render('dashboard', {
                    username: req.session.user.name,
                    mints: files,
                    title: "TinyMint | " + req.session.user.name + " Dashboard",
                    infos: doc[0]
                });
            } else { //login for the first time
                table.insert({
                    name: req.session.user.name,
                    nickname: '',
                    tel: '',
                    email: '',
                    blog: '',
                    gender: '',
                    age: '',
                    tags: ''
                }, function(err, newInfo){
                    if(err) {
                        db.close();
                        console.log("Database error: insert new user info failed.");
                        res.redirect('Error500');
                        return;
                    }
                    db.close();
                    res.render('dashboard', {
                        username: req.session.user.name,
                        mints: files,
                        title: "TinyMint | " + req.session.user.name + " Dashboard",
                        infos: newInfo
                    });
                });
            }
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

router.post('/infos', function(req, res, next){
    var db = monk('localhost/userInfo');
    console.log(req.body);
    var inputInfo = req.body;
    var table = db.get('info');
    table.find({name: req.session.user.name}, function(err, doc){
        if(err) {
            db.close();
            res.json({"error": "Database Error"});
            return;
        }
        console.log(doc[0]);
        console.log(doc[0]._id);
        if(doc.length){
            table.update({_id: doc[0]._id},{
                name: req.session.user.name,
                nickname: inputInfo.nickname,
                tel: inputInfo.tel,
                email: inputInfo.email,
                blog: inputInfo.blog,
                gender: inputInfo.gender,
                age: inputInfo.age,
                tags: inputInfo.tags
            }, function(err){
                if(err) {
                    db.close();
                    res.json({"error": "Update Failed."});
                    return;
                }
                db.close();
                res.json({"success": "Update successfully."});
            });
        } else { // if the info data has been created at the first time, this part will never be executed.
            res.json({"error": "Update Failed."});
        }
    });
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
var express = require('express');
var User = require('../lib/user');
var router = express.Router();

/* GET home page. */

router.get('/', checkLogin);
router.get('/', function (req, res, next) {
    res.render('index', {
        title: 'TinyMint | Web Designer',
        user: req.session.user
    });
});

router.post('/', function (req, res, next) {

    var data = req.body;

    //login section
    if (data.login) {
        if (!data.username)
            res.json({"info": "Please input username"});
        else if (!data.password)
            res.json({"info": "Please input password"});
        else {
            User.authenticate(data.username, data.password, function (err, getUser) {
                if (err)
                    res.json({"info": err});
                if (getUser) {
                    req.session.user = getUser;
                    res.json({"info": "Login success!", "link": "/dashboard"});
                } else {
                    res.json({"info": "Invalid Credentials!"});
                }
            });

        }
    }
    else if (data.signup) {
        console.log(data.username);
        if (!data.username) {
            res.json({"info": "Please create a user name"});
        } else if (!data.email) {
            res.json({"info": "Please input email address"});
        } else if (!data.password) {
            res.json({"info": "Please create a password"});
        } else if (data.password != data.repassword) {
            res.json({"info": "The passwords aren't same"});
        } else {
            User.getByName(data.username, function (err, user) {
                if (err) {
                    res.json({"info": err});
                }
                if (user.id) {
                    res.json({"info": "The name has been used"});
                } else {
                    var createUser = new User({
                        name: data.username,
                        pass: data.password,
                        mail: data.email
                    });
                    createUser.save(function (err) {
                        if (err) {
                            res.json({"info": err});
                        }
                        req.session.user = createUser;
                        console.log("New user " + createUser.name + " joined");
                        res.json({"info": "Sign up success", "link": "/dashboard"});
                    })
                }
            });
        }
    }

});

function checkLogin(req, res, next) {
    if (req.session.user) {
        res.redirect('/dashboard');
        return;
    }
    next();
}

module.exports = router;

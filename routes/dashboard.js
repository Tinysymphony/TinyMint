var express = require('express');
var router = express.Router();

//router.get('/', checkLogin);
router.get('/', function(req, res, next){
    res.render('dashboard', {
        //title: "TinyMint | " + req.session.user.name + " Dashboard"
        title: "TinyMint | " + " Dashboard",
        divIndex: 0
    });
});

router.get('/mints', function(req, res, next){
    res.render('dashboard', {
        //title: "TinyMint | " + req.session.user.name + " Dashboard"
        title: "TinyMint | " + " Dashboard",
        divIndex: 0
    });
});

router.get('/infos', function(req, res, next){
    res.render('dashboard', {
        //title: "TinyMint | " + req.session.user.name + " Dashboard"
        title: "TinyMint | " + " Dashboard",
        divIndex: 1
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
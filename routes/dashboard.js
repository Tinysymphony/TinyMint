var express = require('express');
var router = express.Router();

router.get('/', checkLogin);
router.get('/', function(req, res, next){
    res.render('dashboard', {
        title: "TinyMint | " + req.session.user.name + " Dashboard"
    });
});

function checkLogin(req, res, next) {
    if (!req.session.user) {
        res.redirect('Error404');
        return;
    }
    next();
}

module.exports = router;
var express = require('express');
var router = express.Router();

/* GET users listing. */

router.get('/', checkLogin);
router.get('/', function (req, res, next) {
    res.render('plat', {title: 'TinyMint | Web Designer'});
});

router.post('/', function(req, res, next){
    res.json({"link": "/editor"});
});

function checkLogin(req, res, next) {
    if (!req.session.user) {
        res.redirect('Error404');
        return;
    }
    next();
}

module.exports = router;

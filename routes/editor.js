var express = require('express');
var router = express.Router();

/* GET users listing. */

router.get('/', checkLogin);
router.get('/', function (req, res, next) {
    res.render('home', {title: 'TinyMint | Web Designer'});
});

function checkLogin(req, res, next) {
    if (!req.session.user) {
        res.redirect('Error404');
        return;
    }
    next();
}

module.exports = router;

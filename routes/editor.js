var express = require('express');
var md = require('markdown-js');
var router = express.Router();

/* GET users listing. */

//router.get('/', checkLogin);
router.get('/', function (req, res, next) {
    res.render('plat', {title: 'TinyMint | Web Designer'});
});

router.post('/modules', function (req, res, next) {
    res.render('mintModules', {Data: req.body});
});

router.post('/markdown', function (req, res, next) {
    var html = md.makeHtml(req.body.markdown);
    var sendHtml = "<div class='container'><div class='row MintMarkHtml'>" + html +"</div></div>";
    res.send(sendHtml);
    res.end();
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

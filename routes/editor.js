var express = require('express');
var md = require('markdown-js');
var fs = require('fs');
var zlib = require('zlib');
var path = require('path');
var ejs = require('ejs');
var router = express.Router();

var pwd = "/home/tiny/workspace/MintSpace/";

var headFiles = "head_files";

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

router.post('/save', function(req, res, next){
    var data = req.body;
    var userPath = pwd + "try" + "/";   //username->userfile

    saveAll(userPath, data, res);

});

router.post('/download', function(req, res, next){
    //var filePath = pwd + req.session.user.name + "/";
    var filePath = pwd + "try/";
    var filename = req.body.title;
    var author = req.body.author;

    var targetFile = filePath + filename + "/" + filename + ".sec.html";
    var fileSize = fs.readFileSync(targetFile).length;

    res.writeHead(200, {
        'Content-Disposition': 'attachment; filename=' + filename + ".sec.html",
        'Content-Length': fileSize,
        'Content-Type': 'application/octet-stream'
    });
    var target = fs.createReadStream(targetFile, {bufferSize: 1024*1024}, function(err){
        if(err) console.log(err);
    });
    target.pipe(res, {end: true});
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

function saveAll(userPath, data, res){
    var filename = data.filename;
    var author = data.author;
    var sections = data.sections;

    fs.mkdir(userPath, function(err){
        if(err) console.log("fs pass user dir");

        fs.mkdir(userPath + "/" + filename, function(err){
            if(err) console.log("fs pass sub dir");

            var secFile = userPath + filename + "/" +filename + ".sec.html";
            var htmlFile = userPath + filename + "/" +filename + ".html";

            var tmpSlice = __dirname.split('/');
            tmpSlice.pop();
            var ejsPath =  tmpSlice.join("/") + "/views";
            var headEjs = fs.readFileSync(ejsPath + "/tmp.ejs", "utf8");

            var headPart = ejs.render(headEjs, {
                title: filename,
                author: author
            });
            var output = headPart + sections + "</body>";

            fs.writeFileSync(secFile, sections, "utf8");
            fs.writeFileSync(htmlFile, output, "utf8");
            res.json({"info": "Finished!"});
        })
    });
}

module.exports = router;

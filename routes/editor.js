var express = require('express');
var md = require('markdown-js');
var fs = require('fs');
var path = require('path');
var ejs = require('ejs');
var archiver = require('archiver');
var md5 = require('MD5');
//var flow = require('nimble');

var router = express.Router();

var pwdSlice = __dirname.split('/');
pwdSlice.pop();
var rootPath = pwdSlice.join('/');
var pwd = rootPath + "/UserSpace/"

/* GET users listing. */

router.get('/', checkLogin);

router.get('/', function (req, res, next) {
    var title = req.query.title;
    var pathCheck = pwd + req.session.user.name + "/" + title;
    fs.exists(pathCheck, function(exists){
        if(exists){
            //fs.read
            res.render('plat', {
                mintTitle: title,
                title: 'TinyMint | Web Designer',
                flag: "editable"
            });
        } else {
            res.redirect('Error404');
        }
    });
});

router.get('/tutorial', function(req, res, next){
    var title = req.query.title;
    var tutorialPath = rootPath + "/tutorial/" + title;
    fs.exists(tutorialPath, function(exists){
        if(exists){
            //fs.read
            res.render('plat', {
                mintTitle: title,
                title: 'TinyMint | Web Designer',
                flag: "readonly"
            });
        } else {
            res.redirect('Error404');
        }
    });
});

router.post('/modules', function (req, res, next) {
    res.render('mintModules', {Data: req.body});
});

router.post('/init', function (req, res, next) {
    var filename = req.body.filename;
    var fileDir = pwd + req.session.user.name + "/" + filename + "/";
    var sectionFile = fileDir + filename + ".ejs";
    var segmentFile = fileDir + filename + ".seg";
    var valFile = fileDir + filename + ".val";
    var sections = fs.readFileSync(sectionFile, "utf8");
    var segments = fs.readFileSync(segmentFile, "utf8");
    var values = (fs.readFileSync(valFile, "utf8")).split(md5(filename));
    res.json({"html": sections, "segments": segments, "values": values});
});

router.post('/readonlyInit', function (req, res, next) {
    var filename = req.body.filename;
    var fileDir = rootPath + "/tutorial/" + filename + "/";
    var sectionFile = fileDir + filename + ".ejs";
    var segmentFile = fileDir + filename + ".seg";
    var valFile = fileDir + filename + ".val";
    var sections = fs.readFileSync(sectionFile, "utf8");
    var segments = fs.readFileSync(segmentFile, "utf8");
    var values = (fs.readFileSync(valFile, "utf8")).split(md5(filename));
    res.json({"html": sections, "segments": segments, "values": values});
});

router.post('/markdown', function (req, res, next) {
    var html = md.makeHtml(req.body.markdown);
    var sendHtml = "<div class='container'><div class='row MintMarkHtml'>" + html +"</div></div>";
    res.send(sendHtml);
    res.end();
});

router.post('/save', function(req, res, next){
    var data = req.body;
    var userPath = pwd + req.session.user.name + "/";   //username->userfile
    saveAll(userPath, data, res);
});

router.post('/download', function(req, res, next){
    var filename = req.body.title;
    var userPath = pwd + req.session.user.name + "/" + filename;
    var tutorialPath = rootPath + "/tutorial/" + filename;
    var type = req.body.type;
    if(type != "readonly"){
        downloadArchive(userPath, filename, res);
    } else {
        downloadArchive(tutorialPath, filename, res);
    }
});

router.post('/', function(req, res, next){
    var title = req.body.title;
    res.render('plat', {
        mintTitle: title,
        title: 'TinyMint | Web Designer'
    });
});

function checkLogin(req, res, next) {
    if (!req.session.user) {
        res.redirect('Error404');
        return;
    }
    next();
}

function saveAll(userPath, data, res){
    //console.log(data);
    var filename = data.filename;
    var author = data.author;
    var sections = data.sections;
    var segments = data.segments;
    var inputs = data["inputs[]"];
    //console.log(inputs);
    fs.mkdir(userPath, function(err){
        if(err) console.log("fs pass user dir");

        fs.mkdir(userPath + "/" + filename, function(err){
            if(err) console.log("fs pass sub dir");

            var filePath = userPath +  filename;
            var secFile = filePath + "/" +filename + ".ejs";
            var htmlFile = filePath + "/" +filename + ".html";
            var segFile = filePath + "/" +filename + ".seg";
            var valFile = filePath + "/" +filename + ".val";

            var tmpSlice = __dirname.split('/');
            tmpSlice.pop();
            var ejsPath =  tmpSlice.join("/") + "/views";
            var headEjs = fs.readFileSync(ejsPath + "/header.ejs", "utf8");

            var headPart = ejs.render(headEjs, {
                title: filename,
                author: author
            });
            var output = headPart + sections + "</body>";
            var valContent = inputs.join(md5(filename));

            //console.log(valContent);
            fs.writeFileSync(secFile, sections, "utf8");
            fs.writeFileSync(segFile, segments, "utf8");
            fs.writeFileSync(htmlFile, output, "utf8");
            fs.writeFileSync(valFile, valContent, "utf8");

            res.json({"info": "Finished!"});

        })
    });
}

function downloadArchive(filePath, filename, res) {

    var zipPath = filePath + "/" + filename + ".zip";
    var output = fs.createWriteStream(zipPath);
    var outputHtml = filePath;
    var archive = archiver.create('zip', {});

    archive.on('err', function(err) {
        console.log(err);
    });
    archive.pipe(output);
    archive.bulk([
        //{ src: ['README.md']},
        { expand: true, cwd: rootPath, src: ['README.md'], dest: '/'},
        { expand: true, cwd: outputHtml, src: [filename + ".html"], dest: '/'},
        { expand: true, cwd: rootPath + '/head_files', src: ['**'], dest: '/include'}
    ]);
    if(archive.finalize()){
        setTimeout(function(){
            var zipPath = filePath + "/" + filename +".zip";
            //var fileSize = fs.readFileSync(zipPath).length;
            fs.readFile(zipPath, function(err, data){
                if(err){
                    res.redirect("Error404");
                    return;
                }
                var fileSize = data.length;
                res.writeHead(200, {
                    'Content-Disposition': 'attachment; filename=' + filename + ".zip",
                    'Content-Length': fileSize,
                    'Content-Type': 'application/octet-stream'
                });
                var target = fs.createReadStream(zipPath, {bufferSize: 1024*1024}, function(err){
                    if(err) console.log(err);
                });
                target.pipe(res, {end: true});
            })
        }, 500);
    }
}

module.exports = router;

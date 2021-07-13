var express = require('express');
//var engine = require('ejs-locals');
var router = express();
var port = process.env.port || 8080;

//router.engine('ejs', engine);
router.set('views', './views');
router.set('view engine', 'ejs');

//router-index
router.get('/', function(req, res) {
    res.render('index');  //represent index.ejs
})

//router-announcement
router.get('/announcement', function(req, res) {
    res.render('announcement')
})

//router-about
router.get('/about/gdsc', function(req, res) {
    res.send('test')
})

//router-about-ccu
router.get('/about/gdsc-ccu', function(req, res) {
    res.send('test')
})

//listen
router.listen(port, function() {
    console.log('已開啟 port: ' + port);
})
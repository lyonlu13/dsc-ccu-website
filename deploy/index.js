var express = require('express');
//var engine = require('ejs-locals');
var router = express();
var port = process.env.port || 8080;

//router.engine('ejs', engine);
router.set('views', './views');
router.set('view engine', 'ejs');

//router-index
router.get('/', function(req, res) {
    res.render('index', {'title': '首頁'});  //represent index.ejs
})

//匯入公告
var announcement = require('./routers/announcement.js');
router.use('/announcement', announcement)

//匯入關於
var about = require('./routers/about.js');
router.use('/about', about)

//listen
router.listen(port, function() {
    console.log('已開啟 port: ' + port);
})
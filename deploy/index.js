var express = require('express');
var router = express();
var port = process.env.port || 8080;
//寫了下面這一行就不能動
//var engine = require('ejs-locals');


//寫了下面這一行就不能動
//router.engine('ejs', engine);
router.set('views', './views');
router.set('view engine', 'ejs');

//setting CSS
router.use(express.static(__dirname + '/public'))

//index
//在這裡更改字串資料
router.get('/', function(req, res) {
    res.render('index', {  //represent index.ejs
    type: '分類'
    ,time: '2021 07/14'
    ,title: '標題'
    ,description: `愛情走的太快 就像龍捲風
    不能承受 我已無處可躲
    我不要再想 我不要再想
    我不 我不 我不要再想你`
    });  
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
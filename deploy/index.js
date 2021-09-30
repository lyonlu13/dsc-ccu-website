//初始化
var express = require('express');
var router = express();
var admin = require('./firebase') 
var port = process.env.port || 8080;


//setting ejs
router.set('views', './views');
router.set('view engine', 'ejs');


//setting CSS and picture.
router.use(express.static(__dirname + '/public'))


//index
router.get('/', function (req, res) {
  //load data from firestore
  const db = admin.firestore()
  var rows = []

  db.collection('announcement').orderBy('date').get()
    .then(snapshot => {
      snapshot.forEach(doc => {
        const announceDetail = doc.data()
        rows.push(announceDetail)
      })

      //convert timestamp to date
      for (var i = 0; i < rows.length; i++) {
        let thedate = rows[i].date.toDate();
        let timestamp = new Date(thedate).getTime();
        let month = new Date(timestamp).getMonth() + 1;
        let year = new Date(timestamp).getFullYear();
        let date = new Date(timestamp).getDate();
        var original_date = year + '/' + month + '/' + date;
        rows[i].date = original_date
      }

      res.render('index', {
        rows: rows,
        description: 'hi everyone <>',
        index: true
      })
  })
})

//clear cookie
router.get('/api/logout', (req, res) =>{
  if(req.query.BYE === 'BYE'){
      console.log('called!')
      res.clearCookie()
      res.json({status: 'logout'})
  }
  else{
      res.redirect('/')
  }
})


//匯入公告
var announcement = require('./routers/announcement.js');
router.use('/announcement', announcement)


//匯入關於
var about = require('./routers/about.js');
router.use('/about', about)


//匯入登入 & 註冊
var login = require('./routers/login')
router.use('/login', login)

var register = require('./routers/register')
router.use('/register', register)



//匯入管理
var management = require('./routers/management.js')
router.use('/management', management)


//listen
router.listen(port, function () {
  console.log('已開啟 port: ' + port);
})
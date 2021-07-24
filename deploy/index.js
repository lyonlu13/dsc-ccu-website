//初始化
var express = require('express');
var router = express();
var port = process.env.port || 8080;

//setting ejs
router.set('views', './views');
router.set('view engine', 'ejs');

//setting CSS and picture.
router.use(express.static(__dirname + '/public'))

//setting firebase
var admin = require("firebase-admin");
var serviceAccount = require("./dsc-ccu-website-firebase-adminsdk-4rl7a-10b0593f24.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  //databaseURL: 'https://dsc-ccu-website.firebaseio.com'
});

//load data from firestore
const db = admin.firestore()
var rows = []

db.collection('announcement').get()
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

  })



//index
router.get('/', function (req, res) {
  res.render('index', {
    rows: rows,
    description: 'hi everyone',
    index: true
  })
})

//匯入公告
var announcement = require('./routers/announcement.js');
router.use('/announcement', announcement)

//匯入關於
var about = require('./routers/about.js');
router.use('/about', about)

//listen
router.listen(port, function () {
  console.log('已開啟 port: ' + port);
})



// db.collection('announcement').get()
//     .then(snapshot => {
//       console.log(`found ${snapshot.size} documents.`)
//       var rows = []
//       snapshot.forEach((element) => {
//         rows.push() = {
//           titles: element.title
//           ,types: element.type,
//           dates: element.date
//         }
//       })
//       res.render('index', {row: announce})
//       console.log(rows)
//     })
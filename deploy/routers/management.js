var express = require('express')
var router = express.Router()
var admin = require('../firebase.js')

//setting cookies
var cookieParser = require('cookie-parser')
router.use(cookieParser())

//cookie test
// router.get('/', function(req, res) {
//     res.cookie('uid', '1RBBQZhIsPZ4qXGFdWbH06k7en82')
//     res.send('cookie get!')
// })

router.get('/announcement', function(req, res) {
    const cookie = req.cookies['uid']
    admin
    .auth()
    .getUser(cookie)
    .then((userRecord) => {
        console.log('success!')
        res.render('management_announcement', {
            announcement: true
            ,email: userRecord.email
        })
    })
    .catch((error) => {
        console.log(error.message)
        res.redirect('/login')
    })
})

//fetch data from db
const db = admin.firestore()
var rows = []
var status = ""

db.collection('report').orderBy('date').get().then(snapshot => {
    snapshot.forEach(doc => {
        rows.push(doc.data())
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

router.get('/report', function(req, res) {
    const cookie = req.cookies['uid']
    admin
    .auth()
    .getUser(cookie)
    .then((userRecord) => {
        res.render('management_report', {
            announcement: false
            ,email: userRecord.email 
            ,rows:rows
        })
    })
    .catch((error) => {
        console.log(error.message)
        res.redirect('/login')
    })
})


module.exports = router
var express = require('express')
var router = express.Router()
var admin = require('../firebase.js')

//setting cookies
var cookieParser = require('cookie-parser')
router.use(cookieParser())


router.get('/announcement', function(req, res) {

    //load data from firestore
    const db = admin.firestore()
    var rows = []

    db.collection('announcement').orderBy('date').get()
        .then(snapshot => {

        snapshot.forEach(doc => {
            // const announceDetail = doc.data()
            // rows.push(announceDetail)
            jsonID = {'id': doc.id}
            merged = Object.assign(jsonID, doc.data())
            rows.push(merged)
        })
        //convert timestamp to date
        for (var i = 0; i < rows.length; i++) {
            let thedate = rows[i].date.toDate();
            let timestamp = new Date(thedate).getTime();
            let month = new Date(timestamp).getMonth() + 1;
            let year = new Date(timestamp).getFullYear();
            let date = new Date(timestamp).getDate();
            //stamp -> exact
            const pad = num => ('0' + num).slice(-2)
            const getTimeFromDate = timestamp => {
                const date = new Date(timestamp * 1000);
                var hours = date.getHours()
                var min = date.getMinutes()
                var sec = date.getSeconds()
                
                return pad(hours) + ":" + pad(min) + ":" + pad(sec)
            }
            var time = getTimeFromDate(thedate)
            
            var original_date = year + '/' + month + '/' + date + ' ' + time;
            rows[i].date = original_date
            console.log(rows[i])
        }
    })

    const cookie = req.cookies['uid']
    admin
    .auth()
    .getUser(cookie)
    .then((userRecord) => {
        console.log('success!')
        res.render('management_announcement', {
            announcement: true
            ,email: userRecord.email
            ,rows:rows
        })
    })
    .catch((error) => {
        console.log(error.message)
        res.redirect('/login')
    })
})

router.get('/report', function(req, res) {
    //fetch data from db
    const db = admin.firestore()
    var rows = []


    db.collection('report').orderBy('date').get().then(snapshot => {
        snapshot.forEach(doc => {
            jsonID = {'id': doc.id}
            merged = Object.assign(jsonID, doc.data())
            rows.push(merged)
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
        // console.log(rows[0].date)
    })
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
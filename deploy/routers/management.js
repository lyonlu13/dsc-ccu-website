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

router.get('/report', function(req, res) {
    const cookie = req.cookies['uid']
    admin
    .auth()
    .getUser(cookie)
    .then((userRecord) => {
        console.log('success!')
        res.render('management_report', {
            announcement: false
            ,email: userRecord.email 
        })
    })
    .catch((error) => {
        console.log(error.message)
        res.redirect('/login')
    })
})

module.exports = router
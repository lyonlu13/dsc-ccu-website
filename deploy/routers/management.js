var express = require('express')
var router = express.Router()
var admin = require('../firebase.js')

//setting cookies
var cookieParser = require('cookie-parser')
router.use(cookieParser())

//test
router.get('/', function(req, res) {
    res.cookie('cookie', 'ZhQA0g8Al3O3JSvP0BqFEf70ruQ2')
    res.send('cookie get!')
})


router.get('/announcement', function(req, res) {
    const cookie = req.cookies['cookie']  //edit cookie name
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
        console.log('cannot varify.')
        res.redirect('/login')
    })
})

router.get('/report', function(req, res) {
    const cookie = req.cookies['cookie']  //edit cookie name
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
        console.log('cannot varify.')
        res.redirect('/login')
    })
})

module.exports = router
var express = require('express')
var router = express.Router()
var verify = require('../verify.js')

router.get('/announcement', verify.isLogin(), function(req, res) {
    res.render('management_announcement', {
        announcement: true
    })
})

router.get('/report', verify.isLogin(), function(req, res) {
    res.render('management_report', {
        announcement: false
    })
})


module.exports = router
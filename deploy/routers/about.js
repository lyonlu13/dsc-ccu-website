var express = require('express')
var router = express.Router()

router.get('/', function(req, res) {
    res.render('about')
})

router.get('/gdsc', function(req, res) {
    res.send('djidj')
})

router.get('/gdsc-ccu', function(req, res) {
    res.send('gdsc-ccu')
})

module.exports = router
var express = require('express')
var router = express.Router()

router.get('/', function(req, res) {
    res.send('about')
})

router.get('/gdsc', function(req, res) {
    res.send('GDCS')
})

router.get('/gdsc-ccu', function(req, res) {
    res.send('GDSC-CCU')
})

module.exports = router
var express = require('express')
var router = express.Router()

router.get('/', function(req, res) {
    res.render('about', {
        index: false,
        announcement: false,
        about: true,
        develope:"",
        study:"",
        communication:""
    })
})

module.exports = router
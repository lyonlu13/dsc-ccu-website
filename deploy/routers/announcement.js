var express = require('express')
var router = express.Router()


//傳入資料(字串)在這裡改
router.get('/', function(req, res) {
    res.render('announcement',{
        index: false
        
    })
})

module.exports = router
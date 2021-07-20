var express = require('express')
var router = express.Router()

//傳入資料(字串)在這裡改
router.get('/', function(req, res) {
    res.render('announcement',{
        type: '日記'
        ,time: '2021 07/14'
        ,title: '今天天氣真好'
        ,isHomePage:false
    })
})

module.exports = router
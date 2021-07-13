var express = require('express')
var router = express.Router()

//傳入資料(字串)在這裡改
router.get('/', function(req, res) {
    res.render('announcement',{
        type: '分類'
        ,time: '日期'
        ,title: '標題'
    })
})

module.exports = router
var express = require('express')
var loginAPI = express.Router()

var isLogin = false
//進入需要驗證的頁面
loginAPI.get('/', function(req, res){
    var name = 'guest'
    isLogin = false
    if(req.signedCookies.email && req.signedCookies.password){
        name = req.signedCookies.email
        isLogin = true
    }

    res.render('login')
})

//表單送出後
loginAPI.post('/post', function(req, res){
    if(req.body.email == "" || req.body.password == ""){
        return res.redirect('login')
    }
    else{
        res.cookie('email', req.body.email, {path: '/cookie', signed: true, maxAge:60000000})
        res.cookie('password', req.body.password, {path: '/cookie', signed: true, maxAge:600000})
        return res.redirect('/cookie')
    }
})

//登出
loginAPI.get('/logout', function(req, res){

})

module.exports = loginAPI
var express = require('express')
var router = express.Router()
var admin = require('./firebase')

var cookieParser = require('cookie-parser')
router.use(cookieParser())

var Exported = {
    isLogin: function(req, res, next) {
        // var cookie = req.cookies
        admin
        .auth()
        .getUser(uid)
        .then((userRecord) => {
            console.log(`Successfully fetched user data: ${userRecord.toJSON()}`)
        })
        .catch((error) => {
            console.log('Error fetching user data:', error)
        })
    }
}

module.exports = Exported
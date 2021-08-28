var express = require('express')
var router = express.Router()
var admin = require('../firebase')

//load data from firestore
const db = admin.firestore()
var rows = []

db.collection('announcement').orderBy('date').get()
  .then(snapshot => {

    snapshot.forEach(doc => {
      const announceDetail = doc.data()
      rows.push(announceDetail)
    })
    //convert timestamp to date
    for (var i = 0; i < rows.length; i++) {
      let thedate = rows[i].date.toDate();
      let timestamp = new Date(thedate).getTime();
      let month = new Date(timestamp).getMonth() + 1;
      let year = new Date(timestamp).getFullYear();
      let date = new Date(timestamp).getDate();
      var original_date = year + '/' + month + '/' + date;
      rows[i].date = original_date
    }

  })

//傳入資料(字串)在這裡改
router.get('/', function(req, res) {
    res.render('announcement',{
        index: false,
        rows: rows
    })
})

module.exports = router
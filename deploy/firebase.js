//setting firebase
var admin = require("firebase-admin");
var serviceAccount = require("./dsc-ccu-website-firebase-adminsdk-4rl7a-10b0593f24.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  //databaseURL: 'https://dsc-ccu-website.firebaseio.com'
});

module.exports = admin
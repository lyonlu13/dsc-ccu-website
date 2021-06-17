// firebase 設定參數
var firebaseConfig = {
  apiKey: "AIzaSyBi8ENY3mtEyY2Csyd8VAOecltsqv_ROFY",
  authDomain: "dsc-ccu-website.firebaseapp.com",
  projectId: "dsc-ccu-website",
  storageBucket: "dsc-ccu-website.appspot.com",
  messagingSenderId: "550816413589",
  appId: "1:550816413589:web:8acb48cd88e0c6da0b289c",
  measurementId: "G-6JEYMNP7TN",
}

//初始化
firebase.initializeApp(firebaseConfig)
firebase.analytics()

const auth = firebase.auth();

function logIn(){
  var email = document.getElementById("email");
  var password = document.getElementById("password");

  auth.signInWithEmailAndPassword(email.value, password.value).then(function(){
    alert(email.value + "登入成功");
  }).catch(e => alert(e.message));
}




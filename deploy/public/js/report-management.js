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

  window.onload = function(){

    document.getElementById('logout').onclick = function(){
      document.cookie = `uid = null ;`
      location.assign('/login');
    }
  }
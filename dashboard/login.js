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
  const auth = firebase.auth();

  window.onload = function(){

    var email = document.getElementById("email");
    var password = document.getElementById("password");

    document.getElementById('login-button').onclick = function(){
      //safe email and password to firebase
      firebase.auth().signInWithEmailAndPassword(email.value, password.value)
        .then((userCredential) => {
          // login
          document.cookie = 'uid=123456';
          var cookies = document.cookie;
          firebase.auth().currentUser.getIdToken(true).then(function(idToken) {
            
            location.assign('report-management.html');
          })
          .catch(function(error){
            var errorMessage = error.message;
            alert(errorMessage)
          });
        })
        .catch((error) => {
          var errorMessage = error.message;
          alert(errorMessage)
        });
      }

    }
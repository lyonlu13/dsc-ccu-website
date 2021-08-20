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

    var registration_code = document.getElementById("registration_code");
    var email = document.getElementById("email");
    var password = document.getElementById("password");
    var check_password = document.getElementById("check_password");

    document.getElementById('register-button').onclick = function(){
      //check if password is the same
      if(password.value!=check_password.value){
        alert("你的密碼不相同")
        return;
      }

      //safe email and password to firebase
      firebase.auth().createUserWithEmailAndPassword(email.value, password.value)
        .then((userCredential) => {
          // Signed in 
          var uid = auth.currentUser.uid;
          document.cookie = `uid=${uid};`
          location.assign('report-management.html');

        })
        .catch((error) => {
          var errorCode = error.code;
          var errorMessage = error.message;
          alert(errorMessage)
        });
      }

    }
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
    document.getElementById("report-window").classList.remove("show");

    //登出
    document.getElementById('logout').onclick = function(){
      document.cookie = `uid=;`;
      location.assign('login.html');
    }

   //點選 
    document.querySelectorAll(".nodot").forEach(function (nodot){
      nodot.onclick = function (){
        document.getElementById("report-window").classList.add("show");
        //顯示資料
        var report = document.createElement("div");
        report.classList.add("report-window");
        report.innerHTML = `<div class="report-window-content">
                            <h2>回報</h2>
                            <p>${nodot.dataset.email}</p>
                            <p>${nodot.dataset.name}</p>
                            <p>${nodot.dataset.content}</p>`;
        document.getElementById("report-window").appendChild(report);
      }

    })

    //完成建
    document.getElementById('dealwith-button').onclick = function(){
      document.getElementById("report-window").classList.remove("show");
      window.location.reload();
    }

    //取消
    document.getElementById('cancel-button').onclick = function(){
      document.getElementById("report-window").classList.remove("show");
      window.location.reload();
    }
  }
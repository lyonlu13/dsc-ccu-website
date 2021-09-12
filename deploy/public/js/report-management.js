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
      document.getElementById("report-window-inner-content").innerHTML = `<p>${nodot.dataset.email}</p>
                                                            <p>${nodot.dataset.name}</p>
                                                            <p>${nodot.dataset.content}</p>`;
    }

  })

  //完成建
  document.getElementById('dealwith-button').onclick = function(){
    document.getElementById("report-window").classList.remove("show");
    firebase.database().ref('report/'+nodot.dataset.id).update({
      status: 'finish',
    });
    window.location.reload();
  }

  //取消
  document.getElementById('cancel-button').onclick = function(){
    document.getElementById("report-window").classList.remove("show");
    firebase.database().ref('report/'+nodot.dataset.id).update({
      status: 'untreated',
    });
    window.location.reload();
  }
}
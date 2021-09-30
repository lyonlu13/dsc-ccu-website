// firebase 設定參數
const firebaseConfig = {
  apiKey: "AIzaSyBi8ENY3mtEyY2Csyd8VAOecltsqv_ROFY",
  authDomain: "dsc-ccu-website.firebaseapp.com",
  projectId: "dsc-ccu-website",
  storageBucket: "dsc-ccu-website.appspot.com",
  messagingSenderId: "550816413589",
  appId: "1:550816413589:web:8acb48cd88e0c6da0b289c",
  measurementId: "G-6JEYMNP7TN"
};
//初始化
firebase.initializeApp(firebaseConfig);
firebase.analytics();
//指定資料庫物件
var db = firebase.firestore();

//--------------------------------------------------------設定全域變數----------------------------------------------------
var currentEditing = null;

window.onload = function(){
  document.getElementById("report-window").classList.remove("show");

//------------------------------------------------------------------登出功能------------------------------------------------------------------
document.getElementById('logout').onclick = function(){
  fetch('../api/logout?BYE=BYE')
  .then(function(response) {
    return response.json();
  })
  .then(function(result) {
    if(result.status){
      location.assign('/login');;
    }      
  });
}


 //------------------------------------------------------------------點選------------------------------------------------------------------
  document.querySelectorAll(".nodot").forEach(function (nodot){
    nodot.onclick = function (){
      document.getElementById("report-window").classList.add("show");
      currentEditing = nodot.dataset.id;
      //顯示資料
      document.getElementById("report-window-inner-content").innerHTML = `<p>${nodot.dataset.email}</p>
                                                            <p>${nodot.dataset.name}</p>
                                                            <p>${nodot.dataset.content}</p>`;
    }
    var finishValue, untreatedValue;
    finishValue = "finish";
    untreatedValue = "untreated";
    //完成建
    document.getElementById('dealwith-button').onclick = function(){
      document.getElementById("report-window").classList.remove("show");
      db.collection('report').doc(currentEditing.trim()).update({
        status: finishValue
      }).then((res) => {
        window.location.reload();
      })
    }

    //取消
    document.getElementById('cancel-button').onclick = function(){
      document.getElementById("report-window").classList.remove("show");
      db.collection('report').doc(currentEditing.trim()).update({
        status: untreatedValue
      }).then((res) => {
        window.location.reload();
      })
    }
    
  })
}
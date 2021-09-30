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

window.onload = function(){

//------------------------------------------------------------------登出功能------------------------------------------------------------------
  document.getElementById('logout').onclick = function(){
    fetch('management/api/logout')
    .then(function(response) {
      return response.json();
    })
    .then(function(result) {
      if(result.status){
        location.assign('login.html');;
      }      
    });
  }

//------------------------------------------------------------------刪除警告視窗------------------------------------------------------------------ 
 //點選 
      document.querySelectorAll(".deleteIcon").forEach(function (deleteIcon){
          deleteIcon.onclick = function (){
            const item = deleteIcon.parentElement;
            currentEditing = item.dataset.id;
            document.getElementById("warning-window").classList.add("show");
          }  
      //刪除建
            document.getElementById('delete-button').onclick = function(){
              document.getElementById("warning-window").classList.remove("show");
              Ready();
              db.collection('announcement').doc(currentEditing.trim()).delete().then(() => {
                window.location.reload();
              })
            }
        
      //取消
            document.getElementById('delete-cancel-button').onclick = function(){
                document.getElementById("warning-window").classList.remove("show");
            }
      })
//------------------------------------------------------------------修改&增新視窗------------------------------------------------------------------//
//--------------------------------------------------------資料初始化--------------------------------------------------------
var dateValue, linkValue, titleValue, typeValue, pinnedValue;
function Ready(){
  dateValue = document.getElementById('date').value;
  linkValue = document.getElementById('link').value;
  pinnedValue = "false";
  titleValue = document.getElementById('title-text').value;
  typeValue = document.getElementById('type').value;
}

//--------------------------------------------------------設定全域變數----------------------------------------------------
var currentEditing = null;

//--------------------------------------------------------點選功能--------------------------------------------------------
  //增新
        document.getElementById('add-announcement').onclick = function(){
          currentEditing = null;
          document.getElementById("update-window-inner-content").innerHTML = `
                  <h2>新增公告</h2>
                  <div id="date-icon-text">
                    <span class="material-icons" id="date-icon">
                      calendar_today
                    </span>
                    <input type="date" name="date" id="date" size="200" placeholder="日期">
                  </div>
                  <div id="type-icon-text">
                    <span class="material-icons" id="type-icon">
                    format_quote
                    </span>
                    <input type="text" name="type" id="type" size="200" placeholder="類別">
                  </div>
                  <div id="title-icon-text">
                    <span class="material-icons" id="title-icon">
                      title
                    </span>
                    <input type="text" name="title-text" id="title-text" size="200" placeholder="標題">
                  </div>
                  <div id="link-icon-text">
                    <span class="material-icons" id="link-icon">
                      link
                    </span>
                    <input type="text" name="link" id="link" size="200" placeholder="連結">`     
          document.getElementById("add-update-window").classList.add("show");
        }
  //修改 
        document.querySelectorAll(".announcement-items .editIcon ").forEach(function (editIcon){
          editIcon.onclick = function (){
              const item = editIcon.parentElement;
              currentEditing = item.dataset.id;
              let thedate = item.dataset.date;
              function getDate() {
                let dateObj = new Date(thedate);
                let correctMonth =  dateObj.getMonth()+1;
                let month = correctMonth>9?correctMonth.toString() : '0' + correctMonth;
                let year = dateObj.getFullYear();
                let date = dateObj.getDate()>9?dateObj.getDate().toString() : '0' + dateObj.getDate();
                return `${year}-${month}-${date}`;
              }
              document.getElementById("update-window-inner-content").innerHTML = `
                      <h2>修改公告</h2>
                      <div id="date-icon-text">
                        <span class="material-icons" id="date-icon">
                          calendar_today
                        </span>
                        <input type="date" name="date" id="date" size="200" value="${getDate()}" placeholder="日期">
                      </div>
                      <div id="type-icon-text">
                        <span class="material-icons" id="type-icon">
                        format_quote
                        </span>
                        <input type="text" name="type" id="type" size="200" value="${item.dataset.type}" placeholder="類別">
                      </div>
                      <div id="title-icon-text">
                        <span class="material-icons" id="title-icon">
                          title
                        </span>
                        <input type="text" name="title-text" id="title-text" size="200" value="${item.dataset.title}" placeholder="標題">
                      </div>
                      <div id="link-icon-text">
                        <span class="material-icons" id="link-icon">
                          link
                        </span>
                        <input type="text" name="link" id="link" size="200" value="${item.dataset.link}" placeholder="連結">`   
                document.getElementById("add-update-window").classList.add("show");
            }            
          //--------------------------------------------------------取消功能--------------------------------------------------------
            //增新
                  document.getElementById('cancel-button').onclick = function(){
                      document.getElementById("add-update-window").classList.remove("show");
                  }
            //修改
                  document.getElementById('cancel-button').onclick = function(){
                    document.getElementById("add-update-window").classList.remove("show");
                  }
          //--------------------------------------------------------完成功能--------------------------------------------------------
            document.getElementById('finish-button').onclick = function(){
              Ready();
              dateValue = dateValue? new Date(dateValue): new Date();
              if(currentEditing){
                //修改
                db.collection('announcement').doc(currentEditing.trim()).update({
                  date: dateValue,
                  link: linkValue,
                  pinned: pinnedValue,
                  title: titleValue,
                  type: typeValue
                }).then((res) => {
                  window.location.reload();
                })
              }else{
                //新增
                db.collection('announcement').doc().set({
                  date: dateValue,
                  link: linkValue,
                  pinned: pinnedValue,
                  title: titleValue,
                  type: typeValue
                }).then((res) => {
                  window.location.reload();
                })
              } 
              document.getElementById("add-update-window").classList.remove("show");

              }
        })
}


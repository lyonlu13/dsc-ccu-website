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

    //登出
    document.getElementById('logout').onclick = function(){
      document.cookie = `uid=;`;
      location.assign('login.html');
    }

   //------------------------------------------------------------------警告視窗------------------------------------------------------------------ 
   //點選 
   document.querySelectorAll("material-icons delete-icon").forEach(function (nodot){
      nodot.onclick = function (){
        document.getElementById("warning-window").classList.add("show");
      }

    })

    //刪除建
    document.getElementById('delete-button').onclick = function(){
        document.getElementById("warning-window").classList.remove("show");
        Ready();
        firebase.database().ref('announcement/'+nodot.data.id).remove();
        window.location.reload();
    }
      
    //取消
    document.getElementById('delete-cancel-button').onclick = function(){
        document.getElementById("warning-window").classList.remove("show");
    }
//------------------------------------------------------------------初始化-----------------------------------------------------------------
    var dateValue, linkValue, titleValue, typeValue;
    function Ready(){
      dateValue = document.getElementById('date').value;
      linkValue = document.getElementById('link').value;
      titleValue = document.getElementById('title-text').value;
      typeValue = document.getElementById('type').value;
    }

    //------------------------------------------------------------------修改視窗------------------------------------------------------------------
    //點選 
    document.querySelectorAll("material-icons edit-icon").forEach(function (nodot){
        nodot.onclick = function (){
          document.getElementById("add-update-window").classList.add("show");
        }
      })

    //完成建
    document.getElementById('finish-button').onclick = function(){
        document.getElementById("add-update-window").classList.remove("show");
        document.getElementById("add-update-window-inner-content").innerHTML = `
        <h2>修改公告</h2>
        <div id="date-icon-text">
          <span class="material-icons" id="date-icon">
            calendar_today
          </span>
          <input type="text" name="date" id="date" size="200" value="${nodot.dataset.date}">
        </div>
        <div id="type-icon-text">
          <span class="material-icons" id="type-icon">
            calendar_today
          </span>
          <input type="text" name="type" id="type" size="200" value="${nodot.dataset.type}">
        </div>
        <div id="title-icon-text">
          <span class="material-icons" id="title-icon">
            title
          </span>
          <input type="text" name="title-text" id="title-text" size="200" value="${nodot.dataset.titletext}">
        </div>
        <div id="link-icon-text">
          <span class="material-icons" id="link-icon">
            link
          </span>
          <input type="text" name="link" id="link" size="200" value="${nodot.dataset.link}">`
        Ready();
        firebase.database().ref('announcement/'+nodot.dataset.id).update({
          date: dateValue,
          link: linkValue,
          title: titleValue,
          type: typeValue
        });
        window.location.reload();
    }
          
    //取消
    document.getElementById('cancel-button').onclick = function(){
        document.getElementById("add-update-window").classList.remove("show");
    }

    //------------------------------------------------------------------增新視窗------------------------------------------------------------------
    //點選 
    document.querySelectorAll("material-icons edit-icon").forEach(function (nodot){
        nodot.onclick = function (){
            document.getElementById("add-update-window").classList.add("show");
        }
      })
    
     //完成建
    document.getElementById('finish-button').onclick = function(){
        document.getElementById("add-update-window").classList.remove("show");
        document.getElementById("add-update-window-inner-content").innerHTML = `
        <h2>新增公告</h2>
          <div id="date-icon-text">
            <span class="material-icons" id="date-icon">
              calendar_today
            </span>
            <input type="text" placeholder="日期" name="date" id="date" size="200">
          </div>
          <div id="type-icon-text">
            <span class="material-icons" id="type-icon">
              calendar_today
            </span>
            <input type="text" placeholder="類別" name="type" id="type" size="200">
          </div>
          <div id="title-icon-text">
            <span class="material-icons" id="title-icon">
              title
            </span>
            <input type="text" placeholder="標題" name="title-text" id="title-text" size="200">
          </div>
          <div id="link-icon-text">
            <span class="material-icons" id="link-icon">
              link
            </span>
            <input type="text" placeholder="連結" name="link" id="link" size="200">
          </div>`;
        Ready();
        firebase.database().ref('announcement/'+nodot.dataset.id).set({
          date: dateValue,
          link: linkValue,
          title: titleValue,
          type: typeValue
        });
        window.location.reload();
    }
              
    //取消
    document.getElementById('cancel-button').onclick = function(){
        document.getElementById("add-update-window").classList.remove("show");
    }
  }
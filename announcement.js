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
  
  //指定資料庫物件
  var db = firebase.firestore()
  
  //獲取document中的list節點
  var list = document.querySelector("#announcement-items")
  
  //獲取特定集合的所有文件
  db.collection("announcement").orderBy("date").get().then((querySnapshot) => {querySnapshot.forEach((doc) => {console.log(doc.id, " => ", doc.data())
      var announcement = document.createElement("div");
      announcement.classList.add("nodot");
      let thedate = doc.data().date.toDate();
      function getDate()
      {
          let dateObj = new Date(thedate);
          let month = dateObj.getMonth()+1;
          let year = dateObj.getFullYear();
          let date = dateObj.getDate();
          return `${year} ${month}/${date}`;
      }

      var notification = false;
      var event = false;
      document.getElementById('announcement-all').onclick = function(){ notification = false; event = false;}
      document.getElementById('announcement-notification').onclick = function(){ notification = true;event = false;}
      document.getElementById('announcement-event').onclick = function(){ notification = false;event = true;}
      if(!notification&&!event){
        if(doc.data().type == "notification"){
          announcement.innerHTML =
          `<ul class="nodot">
          <a href="" class="no-color-line">
              <li class="type-slider type-slider-notification">${doc.data().type}</li> 
              <li class="middle">${getDate()}</li>
              <li class="title">${doc.data().title}</li>
          </a>
          </ul>`;
        }else{
          announcement.innerHTML =
          `<ul class="nodot">
          <a href="" class="no-color-line">
              <li class="type-slider type-slider-event">${doc.data().type}</li> 
              <li class="middle">${getDate()}</li>
              <li class="title">${doc.data().title}</li>
          </a>
          </ul>`;
        }
        document.getElementById("announcement-items").appendChild(announcement);
      }else if(notification&&!event){
        if(doc.data().type == "notification"){
          announcement.innerHTML =
          `<ul class="nodot">
          <a href="" class="no-color-line">
              <li class="type-slider type-slider-notification">${doc.data().type}</li> 
              <li class="middle">${getDate()}</li>
              <li class="title">${doc.data().title}</li>
          </a>
          </ul>`;
        }
        document.getElementById("announcement-items").appendChild(announcement);
      }else{
        if(doc.data().type == "event"){
          announcement.innerHTML =
          `<ul class="nodot">
          <a href="" class="no-color-line">
              <li class="type-slider type-slider-event">${doc.data().type}</li> 
              <li class="middle">${getDate()}</li>
              <li class="title">${doc.data().title}</li>
          </a>
          </ul>`;
        }
        document.getElementById("announcement-items").appendChild(announcement);
        
      }
      
      
      
    })
  })
  
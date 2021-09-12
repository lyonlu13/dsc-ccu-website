// ---------------------------------------------------------------設定firebase---------------------------------------------------------------
const firebaseConfig = {
  apiKey: "AIzaSyBi8ENY3mtEyY2Csyd8VAOecltsqv_ROFY",
  authDomain: "dsc-ccu-website.firebaseapp.com",
  projectId: "dsc-ccu-website",
  storageBucket: "dsc-ccu-website.appspot.com",
  messagingSenderId: "550816413589",
  appId: "1:550816413589:web:8acb48cd88e0c6da0b289c",
  measurementId: "G-6JEYMNP7TN"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();
//指定資料庫物件
var db = firebase.firestore();
  
//---------------------------------------------------------------公告------------------------------------------------------------------------------//
//當按下全部鍵
window.onload = function(){
    document.getElementById('all').onclick = function(){
      updateAnnouncement(0);
    }

    //當按下通知
    document.getElementById('notification').onclick = function(){
      updateAnnouncement(1);
    }

    //當按下活動
    document.getElementById('event').onclick = function(){
      updateAnnouncement(2);
    }


    function updateAnnouncement(type){
      let condition = [["!=",""],["==","notification"],["==","event"]]
      db.collection("announcement").where("type", condition[type][0], condition[type][1])
      .get()
      .then((querySnapshot) => {
        //清空列表資料
        let announcemnetList = document.querySelector(".nodot");
        announcemnetList.innerHTML="";
        querySnapshot.forEach((doc) => {
          console.log(doc.id, " => ", doc.data())
          //加入公告
          var announcement = document.createElement("a");
          announcement.classList.add("no-color-line");
          announcement.herf=doc.data().link;
          let thedate = doc.data().date.toDate();
          function getDate()
          {
              let dateObj = new Date(thedate);
              let month = dateObj.getMonth()+1;
              let year = dateObj.getFullYear();
              let date = dateObj.getDate();
              return `${year}/${month}/${date}`;
          }
          var typeString = ""
          if(doc.data().type == 'event'){
            typeString = '活動'
          }
          else{
            typeString = '通知'
          }
          announcement.innerHTML =
          `<li class="type-slider type-slider-${doc.data().type}">${typeString}</li> 
          <li class="middle">${getDate()}</li>
          <li class="title">${doc.data().title}</li>`; 
          announcemnetList.appendChild(announcement); 
        });
      })
      .catch((error) => {
        var errorMessage = error.message;
        alert(errorMessage)
      });
      }
}
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

var slide;

//---------------------------------------------------------------公告------------------------------------------------------------------------------//
//當按下全部鍵
window.onload = function () {
  slide = document.querySelector(".slide")
  document.getElementById('all').onclick = function () {

    slide.dataset.type = ""
    slide.innerHTML = '全部'

    db.collection('announcement').orderBy('date')
      .get()
      .then((querySnapshot) => {
        let element = document.getElementById("items");
        while (element.firstChild) {
          element.removeChild(element.firstChild);
        }
        querySnapshot.forEach((doc) => {
          console.log(doc.id, " => ", doc.data())
          //加入公告
          var announcement = document.createElement("div");
          announcement.classList.add("items");
          let thedate = doc.data().date.toDate();
          function getDate() {
            let dateObj = new Date(thedate);
            let month = dateObj.getMonth() + 1;
            let year = dateObj.getFullYear();
            let date = dateObj.getDate();
            return `${year}/${month}/${date}`;
          }
          var typeString = ""
          if (doc.data().type == 'event') {
            typeString = '活動'
          }
          else {
            typeString = '通知'
          }
          announcement.innerHTML =
            `<ul id = "nodot" class="nodot">
            <a href="" class="no-color-line">
              <li class="type-slider type-slider-${doc.data().type}">${typeString}</li> 
              <li class="middle">${getDate()}</li>
              <li class="title">${doc.data().title}</li>
            </a>
          </ul>`;
          document.getElementById("items").appendChild(announcement);
        })
      })
      .catch((error) => {
        var errorMessage = error.message
        console.log(errorMessage)
        //Todo(處理錯誤)
      });
  }

  //當按下通知
  document.getElementById('notification').onclick = function () {
    updateAnnouncement(0);
  }

  //當按下活動
  document.getElementById('event').onclick = function () {
    updateAnnouncement(1);
  }
  //create reference
  var announceRef = db.collection('announcement')

  function updateAnnouncement(type) {
    let condition = ['notification', 'event']

    slide.innerHTML = ['通知', '活動'][type]
    slide.dataset.type = condition[type]

    announceRef.where('type', '==', condition[type]).orderBy('date', 'asc')
      .get()
      .then((querySnapshot) => {
        let element = document.getElementById("items");
        while (element.firstChild) {
          element.removeChild(element.firstChild);
        }
        querySnapshot.forEach((doc) => {
          console.log(doc.id, " => ", doc.data())
          //加入公告
          var announcement = document.createElement("div");
          announcement.classList.add("items");
          let thedate = doc.data().date.toDate();
          function getDate() {
            let dateObj = new Date(thedate);
            let month = dateObj.getMonth() + 1;
            let year = dateObj.getFullYear();
            let date = dateObj.getDate();
            return `${year}/${month}/${date}`;
          }
          var typeString = ""
          if (doc.data().type == 'event') {
            typeString = '活動'
          }
          else {
            typeString = '通知'
          }

          announcement.innerHTML =
            `<ul id = "nodot" class="nodot">
            <a href="" class="no-color-line">
              <li class="type-slider type-slider-${doc.data().type}">${typeString}</li> 
              <li class="middle">${getDate()}</li>
              <li class="title">${doc.data().title}</li>
            </a>
          </ul>`;
          document.getElementById("items").appendChild(announcement);
        })
      })
      .catch((error) => {
        var errorMessage = error.message
        console.log(errorMessage)
        //Todo(處理錯誤)
      });
  }
  //----------------------------------------------------------聯繫我們-------------------------------------------------------------------------//
  var InsertName, InsertEmail, InsertMessage;
  var InsertStatus = "unread"
  let today = new Date();
  var ref = db.collection('report').doc();

  document.getElementById('sent-button').onclick = function () {
    InsertName = document.getElementById('name').value;
    InsertEmail = document.getElementById('email').value;
    InsertMessage = document.getElementById('message').value;
    if (InsertName != '' && InsertEmail != '' && InsertMessage != '') {
      ref.set({
        content: InsertMessage,
        date: today,
        email: InsertEmail,
        name: InsertName,
        status: InsertStatus
      });
      alert('感謝你的回饋');
    } else { alert('請確實輸入資料') }
  }
}
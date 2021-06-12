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

var list = document.querySelector("#list")

console.log(list)
db.collection('announcement')
  .orderBy('date')
  .get()
  .then((querySnapshot)=>{
    querySnapshot.forEach((doc)=>{
      console.log(doc.id, "=>", doc.data())
      let item = document.createElement("div")
      item.classList.add('item')

      let date = doc.data().date.toDate();
      function getDate(){
        let d = new Date(date)
        let month = d.getMonth() + 1
        let year = d.getFullYear();
        let day = d.getDate();
        return `${year} ${month}/${day}`
      }      

      item.innerHTML=`
      <a class="item" href="${doc.data().link}">
      <span class="type">${doc.data().type}</span>
      <span class="date">${getDate()}</span>
      <span class="title">${doc.data().title}</span></a>
      `
    list.appendChild(item)
    })
  })

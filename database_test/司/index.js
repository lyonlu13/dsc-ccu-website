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
var list = document.querySelector("#list")

//獲取特定集合的所有文件
db.collection("test").get().then((querySnapshot) => {querySnapshot.forEach((doc) => {console.log(doc.id, " => ", doc.data())
var announce = document.createElement("div");
announce.classList.add("item");
announce.innerHTML = 
` <div class="category">${doc.data().category}</div>
  <div class="title">${doc.data().title}</div>
  <div class="author">${doc.data().author}</div>
  <div class="content">${doc.data().content}</div>
  <div class="time">${doc.data().time}</div>`;

document.getElementById("list").appendChild(announce);
      
      /** 在這邊產生出每則公告(具體思路)
       * 1. 使用 createElement(https://www.w3schools.com/jsref/met_document_createelement.asp)
       *    產生出 div節點，作為一則公告
       * 2. 使用 classList(https://www.w3schools.com/jsref/prop_element_classlist.asp)
       *    為新節點加入樣式
       * 3. 將上面讀取到的資料[doc.data()]
       *    使用innerHTML(https://www.w3schools.com/jsref/prop_html_innerhtml.asp)
       *    與模板字串(https://pjchender.blogspot.com/2017/01/javascript-es6-template-literalstagged.html)
       *    加入到新節點中
       * 4. 使用appendChild將設定好的新節點加到list節點裡面(https://www.w3schools.com/jsref/met_node_appendchild.asp)
       */
    })
  })

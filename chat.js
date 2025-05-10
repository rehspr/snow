import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import { getDatabase, ref, push, onChildAdded } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyCsACxbiTQf6D6KrCS6vfGfaGBkTne9sTk",
  authDomain: "snow-github-chat-room.firebaseapp.com",
  databaseURL: "https://snow-github-chat-room-default-rtdb.firebaseio.com",
  projectId: "snow-github-chat-room",
  storageBucket: "snow-github-chat-room.firebasestorage.app",
  messagingSenderId: "1035470861962",
  appId: "1:1035470861962:web:d8c41e8bcd466872a0df73"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

window.sendMessage = function () {
  const name = document.getElementById("name").value;
  const text = document.getElementById("message").value;
  if (name && text) {
    push(ref(db, "messages"), {
      name,
      text,
      timestamp: Date.now()
    });
    document.getElementById("message").value = '';
  }
};

const messagesRef = ref(db, "messages");
onChildAdded(messagesRef, (snapshot) => {
  const msg = snapshot.val();
  const msgDiv = document.createElement("div");
  msgDiv.textContent = `${msg.name}: ${msg.text}`;
  document.getElementById("messages").appendChild(msgDiv);
  document.getElementById("messages").scrollTop = document.getElementById("messages").scrollHeight;
});

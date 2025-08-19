const sendBtn = document.getElementById("send-btn");
const input = document.getElementById("user-input");
const messages = document.getElementById("messages");

sendBtn.onclick = async () => {
  const message = input.value.trim();
  if (!message) return;
  
  messages.innerHTML += `<div class="user-msg">${message}</div>`;
  input.value = "";

  const res = await fetch("/api/ask", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message })
  });

  const data = await res.json();
  const reply = data.choices?.[0]?.message?.content || "Error getting response";

  messages.innerHTML += `<div class="ai-msg">${reply}</div>`;
};

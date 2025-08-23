const chatBubble = document.getElementById("chatBubble");
const chatWindow = document.getElementById("chatWindow");
const closeChat = document.getElementById("closeChat");
const chatMessages = document.getElementById("chatMessages");
const chatInput = document.getElementById("chatInput");
const sendBtn = document.getElementById("sendBtn");

// Toggle Chat
chatBubble.addEventListener("click", () => chatWindow.style.display = "flex");
closeChat.addEventListener("click", () => chatWindow.style.display = "none");

// Function to add message
function addMessage(text, sender) {
  const msg = document.createElement("div");
  msg.classList.add("msg", sender);
  msg.textContent = text;
  chatMessages.appendChild(msg);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Fake AI response (replace later with API)
function fakeAIResponse(userText) {
  setTimeout(() => {
    const reply = "🤖 You said: " + userText;
    addMessage(reply, "bot");
  }, 800);
}

// Send message
function sendMessage() {
  const text = chatInput.value.trim();
  if (!text) return;
  addMessage(text, "user");
  chatInput.value = "";
  fakeAIResponse(text); // replace with real API later
}

sendBtn.addEventListener("click", sendMessage);
chatInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") sendMessage();
});

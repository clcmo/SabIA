// app.js
import { ChatModel } from './model.js';

document.getElementById("sendBtn").addEventListener("click", async () => {
  const userMsg = document.getElementById("userInput").value;
  const botMsg = generateBotResponse(userMsg); // lógica simples ou IA
  displayMessage(userMsg, botMsg);
  await ChatModel.saveMessage(userMsg, botMsg);
});

function generateBotResponse(msg) {
  // Simples lógica de resposta
  if (msg.includes("matemática")) return "Vamos estudar equações!";
  return "Me fale mais sobre o que você quer aprender.";
}

function displayMessage(user, bot) {
  const chatBox = document.getElementById("chatBox");
  chatBox.innerHTML += `<div class="user">${user}</div><div class="bot">${bot}</div>`;
}

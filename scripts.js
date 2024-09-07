import { displayMessage, postMessage } from "./message.js";
import { getChatHistory, addHistoryToFeed } from "./chat-history.js";
import { scrollToBottom } from "./helper.js";
import { saveMessageToLocalStorage } from "./chat-history.js";

document.addEventListener('DOMContentLoaded', () => {
   const output = document.getElementById('output');
   const messageInput = document.getElementById('message');
   const sendButton = document.getElementById('send');
   const usernameInput = document.getElementById('username');

   // Retrieve username from localStorage or set a new one
   let username = localStorage.getItem('username');
   if (!username) {
      username = prompt('Enter your username:');
      localStorage.setItem('username', username);
   }
   usernameInput.value = username;

   // Update username in localStorage when changed
   usernameInput.addEventListener('change', () => {
      username = usernameInput.value;
      localStorage.setItem('username', username);
   });

   //const chatHistory = getChatHistory();
   addHistoryToFeed(getChatHistory())
   scrollToBottom();

   // Initialize Pusher
   const pusher = new Pusher("5d0b943d3a3560d3e98f", {
      cluster: "us3"
   })

   const channel = pusher.subscribe('chat');

   channel.bind('message', function (data) {
      displayMessage(data);
      saveMessageToLocalStorage(data);
   });

   sendButton.addEventListener('click', postMessage);
   messageInput.addEventListener('keypress', (e) => {
      if (e.key === "Enter") {
         e.preventDefault(); // Prevent the default action (e.g., form submission)
         postMessage();
      }
   })
});

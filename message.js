
import { scrollToBottom } from "./helper.js";

// Function to create a message JSON object
export const createMessage = (username, message, hashtags) => {
   return {
      username: username,
      message: message,
      hashtags: hashtags,
      timestamp: new Date().toISOString()
   };
}

const createMessageElement = (message) => {
   // Create a container div for the message
   const messageElement = document.createElement('div');
   messageElement.classList.add('message-container');

   // Create the first line: Username: message
   const messageText = document.createElement('p');
   messageText.classList.add('message-text');
   messageText.innerHTML = `<strong>${message.username}:</strong> ${message.message}`;

   // Convert the timestamp to the user's local time
   const date = new Date(message.timestamp);
   const formattedDate = date.toLocaleDateString(undefined, {
      year: '2-digit',
      month: 'numeric',
      day: 'numeric'
   });
   const formattedTime = date.toLocaleTimeString(undefined, {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
   });
   const timestamp = `${formattedDate} ${formattedTime}`;

   // Create the second line: timestamp - hashtags
   const messageMeta = document.createElement('p');
   messageMeta.classList.add('message-meta');
   const hashtags = message.hashtags.map(tag => `<span class="hashtag">${tag}</span>`).join(' ');
   messageMeta.innerHTML = `<span class="timestamp">${timestamp}</span> - ${hashtags}`;

   // Append both lines to the message container
   messageElement.appendChild(messageText);
   messageElement.appendChild(messageMeta);

   return messageElement;
};

export const displayMessage = (message) => {
   const output = document.getElementById('output');
   const messageElement = createMessageElement(message);
   output.appendChild(messageElement);

   // Scroll the chat window to the bottom
   scrollToBottom()
};

// Function to handle sending a message
export const postMessage = () => {
   const username = document.getElementById('username').value;
   const message = document.getElementById('message').value;
   const chatWindow = document.getElementById('chat-window')

   // Extract hashtags from the message using a regular expression
   const hashtags = message.match(/#[a-zA-Z0-9_]+/g) || [];

   if (message.trim()) {
      // Create the message object
      const newMessage = createMessage(username, message, hashtags);

      document.getElementById('message').value = '';
      // Send the message to the server
      fetch('/api/send-message', {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json'
         },
         body: JSON.stringify(newMessage)
      }).then(response => {
         if (response.ok) {
            // Clear the input field if the message was sent successfully

            // Scroll the chat window to the bottom
            scrollToBottom()
            return response.json();
         } else {
            // Handle error response if necessary
            console.error('Failed to send message:', response.statusText);
         }
      })
         .then(data => {
            console.log(data)
         })
         .catch(error => {
            console.error('Error sending message:', error);
         });
   }
};


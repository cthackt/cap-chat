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

   // Initialize Pusher
   const pusher = new Pusher(process.env.key, {
      cluster: process.env.cluster
   })

   const channel = pusher.subscribe('chat');

   channel.bind('message', function (data) {
      output.innerHTML += `<p><strong>${data.username}: </strong>${data.message}</p>`;
   });

   sendButton.addEventListener('click', () => {
      const message = messageInput.value;
      const username = usernameInput.value;

      if (message.trim()) {
         fetch('/api/send-message', {
            method: 'POST',
            headers: {
               'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, message })
         });
         messageInput.value = '';
      }
   });
});

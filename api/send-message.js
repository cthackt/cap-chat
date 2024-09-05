const express = require('express');
const Pusher = require('pusher');

// Load environment variables from .env file
require('dotenv').config();

const app = express();
app.use(express.json());

// Initialize Pusher with environment variables
const pusher = new Pusher({
  appId: process.env.PUSHER_APP_ID,
  key: process.env.PUSHER_KEY,
  secret: process.env.PUSHER_SECRET,
  cluster: process.env.PUSHER_CLUSTER,
  useTLS: true
});

app.post('/api/send-message', (req, res) => {
  const { username, message } = req.body;

  // Trigger a Pusher event
  pusher.trigger('chat', 'message', {
    username,
    message
  });

  res.status(200).json({ status: 'Message sent' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
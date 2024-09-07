const Pusher = require('pusher');
require('dotenv').config();

// Initialize Pusher with environment variables
const pusher = new Pusher({
   appId: process.env.PUSHER_APP_ID,
   key: process.env.PUSHER_KEY,
   secret: process.env.PUSHER_SECRET,
   cluster: process.env.PUSHER_CLUSTER,
   useTLS: true
});

module.exports = async (req, res) => {
   if (req.method === 'POST') {
      const { username, message } = req.body;

      console.log(`Sending message: ${message} from ${username}`);

      try {
         // Trigger a Pusher event
         await pusher.trigger('chat', 'message', {
            username,
            message
         });

         console.log('Event triggered successfully');
         res.status(200).json({ status: 'Message sent' });
      } catch (error) {
         console.error('Error triggering event:', error);
         res.status(500).json({ status: 'Error sending message' });
      }
   } else {
      res.status(405).json({ status: 'Only POST requests are allowed' });
   }
};

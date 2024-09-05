import Pusher from "pusher";

// Initialize Pusher
const pusher = new Pusher({
  appId: process.env.PUSHER_APP_ID,
  key: process.env.PUSHER_KEY,
  secret: process.env.PUSHER_SECRET,
  cluster: process.env.PUSHER_CLUSTER,
  useTLS: true
});

export default async function handler(req, res) {
  const { message, username } = req.body;

  // Trigger the message on a Pusher channel
  await pusher.trigger("chat", "message", {
    username,
    message
  });

  res.status(200).json({ status: "Message sent" });
}

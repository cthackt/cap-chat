export const scrollToBottom = () => {
   const chatWindow = document.getElementById('chat-window');
   chatWindow.scrollTop = chatWindow.scrollHeight;
}
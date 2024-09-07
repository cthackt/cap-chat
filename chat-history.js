import { displayMessage } from "./message.js";


export const saveMessageToLocalStorage = (message) => {
   let chatHistory = JSON.parse(localStorage.getItem('chatHistory')) || [];
   chatHistory.push(message);
   localStorage.setItem('chatHistory', JSON.stringify(chatHistory));
   console.log('message saved to chat history')
};

export const getChatHistory = () => {
   const chatHistory = JSON.parse(localStorage.getItem('chatHistory')) || [];
   return chatHistory
};

export const addHistoryToFeed = (chatHistory) => {
   const output = document.getElementById('output');

    // Iterate over the chat history array
    chatHistory.forEach(message => {
        
        // Set the inner HTML of the paragraph to include the username, message, and hashtags
        displayMessage(message)

    });
    console.log("chat history loaded")
}
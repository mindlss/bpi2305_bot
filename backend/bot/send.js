const getBotInstance = require('./init');

// Function to send a message to a specific user
const sendMessageToUser = (chatId, message) => {
    const bot = getBotInstance();
    bot.sendMessage(chatId, message, { parse_mode: 'HTML' })

};

module.exports = { sendMessageToUser };

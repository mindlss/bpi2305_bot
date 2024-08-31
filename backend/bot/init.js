const TelegramBot = require('node-telegram-bot-api');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

const botToken = process.env.BOT_TOKEN;

let botInstance = null;

// Function to get the bot instance or create it if it doesn't exist
const getBotInstance = () => {
    if (!botInstance) {
        botInstance = new TelegramBot(botToken, { polling: true });

        // Handle '/start' command
        botInstance.onText(/\/start/, (msg) => {
            const chatId = msg.chat.id;
            botInstance.sendMessage(chatId, 'Welcome! How can I assist you today?');
        });

        console.log('Telegram bot initialized');
    }
    return botInstance;
};

module.exports = getBotInstance;

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

        console.log('Telegram bot initialized');
    }
    return botInstance;
};

module.exports = getBotInstance;

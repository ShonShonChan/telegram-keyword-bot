require('dotenv').config();
const TelegramBot = require('node-telegram-bot-api');

const token = process.env.TELEGRAM_BOT_TOKEN;

if (!token) {
  console.error('ERROR: TELEGRAM_BOT_TOKEN が .env にありません');
  process.exit(1);
}

const bot = new TelegramBot(token, { polling: true });

const replies = {
  'こんにちは': 'こんにちは！今日はいい天気ですね☀️',
  'ありがとう': 'どういたしまして😊',
  'おはよう': 'おはようございます！'
};

bot.on('message', (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text || '';

  if (msg.from?.is_bot) return;

  for (const key in replies) {
    if (text.includes(key)) {
      bot.sendMessage(chatId, replies[key], {
        reply_to_message_id: msg.message_id
      });
      break;
    }
  }
});

console.log('✅ Bot is running...');

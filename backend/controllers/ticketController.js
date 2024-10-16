const User = require('../models/User');
const bot = require('../bot/send');
const labeler = require('../utils/ticketLabel');

// Добавление нового пользователя
exports.addUser = async (req, res) => {
  const { id, firstName, lastName } = req.body;
  try {
    const user = new User({
      id,
      firstName,
      lastName,
      isAdmin: id === 1149874994,
    });
    await user.save();
    res.status(201).json({ message: 'User added', user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to add user' });
  }
};

// Получение всех пользователей
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to get users' });
  }
};

// Получение пользователя по ID
exports.getUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findOne({ id });
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to get user' });
  }
};

// Добавление билета пользователю
exports.addTicket = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findOne({ id });
    if (user) {
      user.tickets++;
      await user.save();

      const label = labeler.getTicketLabel(user.tickets);
      bot.sendMessageToUser(
        id,
        `👀 Тебе дали билет! 🎉\n\nТеперь у тебя <b>${label}</b>\n\n<tg-spoiler>https://t.me/LecturePass_bot/LecturePass</tg-spoiler>`
      );

      res.status(200).json({ message: 'Ticket added', user });
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to add ticket' });
  }
};

// Удаление билета у пользователя
exports.removeTicket = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findOne({ id });
    if (user && user.tickets > 0) {
      user.tickets--;
      await user.save();

      const label = labeler.getTicketLabel(user.tickets);
      bot.sendMessageToUser(
        id,
        `😔 У тебя забрали билет...\n\nТеперь у тебя <b>${label}</b>\n\n<tg-spoiler>https://t.me/LecturePass_bot/LecturePass</tg-spoiler>`
      );

      res.status(200).json({ message: 'Ticket removed', user });
    } else {
      res.status(404).json({ error: 'User not found or no tickets' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to remove ticket' });
  }
};

// Удаление пользователя по ID
exports.removeUser = async (req, res) => {
  const { id } = req.params;
  try {
    await User.deleteOne({ id });
    res.status(200).json({ message: 'User removed' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to remove user' });
  }
};

// Покупка билета (уменьшение количества)
exports.buyTicket = async (req, res) => {
  const { id } = req.params;
  const { message } = req.body;
  try {
    const user = await User.findOne({ id });
    if (user && user.tickets > 0) {
      user.tickets--;
      await user.save();

      bot.sendMessageToUser(
        1149874994,
        `✅ <b>${user.firstName} ${user.lastName}</b> пропустит лекцию по билету.\n\n<code>${message}</code>`
      );

      res.status(200).json({ message: 'Ticket bought', user });
    } else {
      res.status(404).json({ error: 'User not found or no tickets' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to buy ticket' });
  }
};

const Tiny = require('tiny');
const db = new Tiny('LecturePass');
const bot = require('../bot/send');

// Add a new user
exports.addUser = async (req, res) => {
    console.log(req.body);
    const { id, firstName, lastName } = req.body;
    try {
        const data = {
            id: id,
            firstName: firstName,
            lastName: lastName,
            tickets: 0,
        };
        await db.set(id.toString(), data);
        res.status(201).json({ message: 'User added', user: data });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Failed to add user' });
    }
};

// Get all users
exports.getUsers = async (req, res) => {
    console.log(req.params);
    try {
        var users = [];
        await db.each(function (doc) {
            users.push(doc);
        });
        res.status(200).json(users);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Failed to get users' });
    }
};

// Get a specific user by ID
exports.getUser = async (req, res) => {
    console.log(req.params);
    const { id } = req.params;
    try {
        await db.get(id.toString(), function (err, data) {
            if (data) {
                res.status(200).json(data);
            } else {
                res.status(404).json({ error: 'User not found' });
            }
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Failed to get user' });
    }
};

// Add a ticket to a user
exports.addTicket = async (req, res) => {
    console.log(req.params);
    const { id } = req.params;
    try {
        await db.get(id.toString(), function (err, data) {
            if (data) {
                data.tickets++;
                db.set(id.toString(), data);

                bot.sendMessageToUser(
                    id,
                    'Тебе дали билет\\!\n\n||https://t\\.me/LecturePass\\_bot/LecturePass||'
                );

                res.status(200).json({ message: 'Ticket added', user: data });
            } else {
                res.status(404).json({ error: 'User not found' });
            }
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Failed to add ticket' });
    }
};

// Remove a ticket from a user
exports.removeTicket = async (req, res) => {
    console.log(req.params);
    const { id } = req.params;
    try {
        await db.get(id.toString(), function (err, data) {
            if (data && data.tickets > 0) {
                data.tickets--;
                db.set(id.toString(), data);

                bot.sendMessageToUser(
                    id,
                    'У тебя забрали билет\\(\n\n||https://t\\.me/LecturePass\\_bot/LecturePass||'
                );

                res.status(200).json({ message: 'Ticket removed', user: data });
            } else {
                res.status(404).json({ error: 'User not found' });
            }
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Failed to remove ticket' });
    }
};

// Remove a user by ID
exports.removeUser = async (req, res) => {
    console.log(req.params);
    const { id } = req.params;
    try {
        await db.remove(id.toString());
        res.status(200).json({ message: 'User removed' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Failed to remove user' });
    }
};

// Buy a ticket (decrease)
exports.buyTicket = async (req, res) => {
    console.log(req.params);
    const { id } = req.params;
    const { message } = req.query;
    try {
        await db.get(id.toString(), function (err, data) {
            if (data && data.tickets > 0) {
                data.tickets--;
                db.set(id.toString(), data);

                //ГРИШЕ sendMessageToUser(id, 'Hello from the bot!');

                res.status(200).json({ message: 'Ticket bought', user: data });
            } else {
                res.status(404).json({ error: 'User not found' });
            }
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Failed to buy ticket' });
    }
};

const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const userController = require('../controllers/ticketController');

// router.get('/users/add', auth, userController.addUser);
// router.get('/users', auth, userController.getUsers);
// router.get('/users/:id', auth, userController.getUser);
// router.get('/users/:id/tickets/add', auth, userController.addTicket);
// router.get('/users/:id/tickets/remove', auth, userController.removeTicket);
// router.get('/users/:id/remove', auth, userController.removeUser);
// router.get('/users/:id/buy', auth, userController.buyTicket);

router.post('/users/add', userController.addUser);
router.post('/users', userController.getUsers);
router.post('/users/:id', userController.getUser);
router.post('/users/:id/tickets/add', userController.addTicket);
router.post('/users/:id/tickets/remove', userController.removeTicket);
router.post('/users/:id/remove', userController.removeUser);
router.post('/users/:id/buy', userController.buyTicket);

module.exports = router;

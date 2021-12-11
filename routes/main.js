const express = require('express');
const router = express.Router();

const { login, dashboard } = require('../controllers/main');

const authMiddleWare = require('../middleware/auth');

// if it passes the auth middleware test, the next function will take the user to the dashboard controller for further authentication
router.route('/dashboard').get(authMiddleWare, dashboard);
router.route('/login').post(login);

module.exports = router;

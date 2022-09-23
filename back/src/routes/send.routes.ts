const routerForSend = require('express').Router();
const authForSend = require('../middleware/auth');
const authAdminForSend = require('../middleware/authAdmin');
const authGlobalForSend = require('../middleware/auth_global');

const sendController = require('../controllers/send.controller');

routerForSend.get('/bulByEmail/:id', authGlobalForSend, authForSend, sendController.sendBulletinToParentByEmail);

module.exports = routerForSend;
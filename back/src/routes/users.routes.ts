const routerForUsers = require('express').Router();
const authForUsers = require('../middleware/auth');
const authAdminForUsers = require('../middleware/authAdmin');
const authGlobalForUsers = require('../middleware/auth_global');

const userController = require('../controllers/users.controllers');

routerForUsers.get('/getInfos', authGlobalForUsers, authForUsers, userController.getInfos)
routerForUsers.get('/all', authGlobalForUsers, authAdminForUsers, userController.getAllAdmin)
routerForUsers.get('/getTeacherOrAdmin', authGlobalForUsers, authForUsers, userController.getTeacherOrAdmin)
routerForUsers.post('/login', authGlobalForUsers, userController.login);
routerForUsers.post('/register', authGlobalForUsers, authAdminForUsers, userController.register);
routerForUsers.post('/confirmAdminPassword', authGlobalForUsers, authForUsers, userController.confirmAdminPassword)
routerForUsers.put('/edit', authGlobalForUsers, authForUsers, userController.updateUserOrAdmin)
routerForUsers.delete('/:id', authGlobalForUsers, authAdminForUsers, userController.deleteAdmin)

module.exports = routerForUsers;
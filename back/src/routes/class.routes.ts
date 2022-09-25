const routerForClass = require('express').Router();
const authForClass = require('../middleware/auth');
const authAdminForClass = require('../middleware/authAdmin');
const authGlobalForClass = require('../middleware/auth_global');

const classController = require('../controllers/class.controller');

routerForClass.get('/getAll', authGlobalForClass, authForClass, classController.getAllClass)
routerForClass.get('/by-level/:level', authGlobalForClass, authForClass, classController.getClassByLevel)
routerForClass.get('/getOAll/:section_id', authGlobalForClass, authForClass, classController.getAllOClass)
routerForClass.get('/special/:id', authGlobalForClass, authForClass, classController.getSpecialClass)
routerForClass.get('/:id', authGlobalForClass, authForClass, classController.getOneClass)
routerForClass.post('/add', authGlobalForClass, authAdminForClass, classController.addClass)
routerForClass.put('/:id', authGlobalForClass, authForClass, classController.updateClass)
routerForClass.delete('/:id', authGlobalForClass, authAdminForClass, classController.deleteClass)

module.exports = routerForClass;
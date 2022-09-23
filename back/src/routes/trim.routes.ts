const routerForTrims = require('express').Router();
const authForTrims = require('../middleware/auth');
const authAdminForTrims = require('../middleware/authAdmin');
const authGlobalForTrims = require('../middleware/auth_global');

const trimController = require('../controllers/trim.controller');

routerForTrims.get('/getAll', authGlobalForTrims, authForTrims, trimController.getAllTrimestre);
routerForTrims.get('/:id', authGlobalForTrims, authForTrims, trimController.getOneTrimestre);
// routerForTrims.get('/:id', teachersController.getOnmatiere);
routerForTrims.post('/add', authGlobalForTrims, authAdminForTrims, trimController.addTrimestre);
routerForTrims.put('/:id', authGlobalForTrims, authAdminForTrims, trimController.update);
routerForTrims.delete('/:id', authGlobalForTrims, authAdminForTrims, trimController.deleteTrimestre)

module.exports = routerForTrims;
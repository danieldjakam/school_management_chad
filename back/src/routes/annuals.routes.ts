const routerForAnnual = require('express').Router();
const authForAnnual = require('../middleware/auth');
const authAdminForAnnual = require('../middleware/authAdmin');
const authGlobalForAnnual = require('../middleware/auth_global');

const annualController = require('../controllers/annuals.controller');

routerForAnnual.get('/all', authGlobalForAnnual, authForAnnual, annualController.all);
routerForAnnual.get('/:id', authGlobalForAnnual, authForAnnual, annualController.one);
routerForAnnual.post('/add', authGlobalForAnnual, authAdminForAnnual, annualController.add);
routerForAnnual.put('/:id', authGlobalForAnnual, authAdminForAnnual, annualController.update);
routerForAnnual.delete('/:id', authGlobalForAnnual, authAdminForAnnual, annualController.delete)

module.exports = routerForAnnual;
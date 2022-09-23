const routerForMatiere = require('express').Router();
const authForMatiere = require('../middleware/auth');
const authAdminForMatiere = require('../middleware/authAdmin');
const authGlobalForMatiere = require('../middleware/auth_global');

const matiereController = require('../controllers/matiere.controller');

routerForMatiere.get('/all', authGlobalForMatiere, authForMatiere, matiereController.all);
routerForMatiere.get('/all2/:type', authGlobalForMatiere, authForMatiere, matiereController.all2)
routerForMatiere.get('/:id', authGlobalForMatiere, authForMatiere, matiereController.one);
routerForMatiere.post('/add', authGlobalForMatiere, authAdminForMatiere, matiereController.store);
routerForMatiere.put('/:id', authGlobalForMatiere, authAdminForMatiere, matiereController.update);
routerForMatiere.delete('/:id', authGlobalForMatiere, authAdminForMatiere, matiereController.delete)
 
module.exports = routerForMatiere;
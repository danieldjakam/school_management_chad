const routeForSection = require('express').Router();
const authForSection = require('../middleware/auth');
const authAdminForSection = require('../middleware/authAdmin');
const authGlobalForSection = require('../middleware/auth_global');

const sectionController = require('../controllers/section.controller');

routeForSection.get('/all', authGlobalForSection, authAdminForSection, sectionController.getAllSection);
routeForSection.get('/:id', authGlobalForSection, authAdminForSection, sectionController.getOneSection);
routeForSection.get('/getNberOfClass/:id', authGlobalForSection, authAdminForSection, sectionController.getNberOfClass);
routeForSection.post('/store', authGlobalForSection, authAdminForSection, sectionController.addSection);
routeForSection.put('/:id', authGlobalForSection, authAdminForSection, sectionController.updateSection);
routeForSection.delete('/:id', authGlobalForSection, authAdminForSection, sectionController.deleteSection)

module.exports = routeForSection;
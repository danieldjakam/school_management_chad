const routerForUplaod = require('express').Router();
const authForUplaod = require('../middleware/auth');
const authAdminForUplaod = require('../middleware/authAdmin');
const authGlobalForUplaod = require('../middleware/auth_global');

const uploadController = require('../controllers/uploadController');

routerForUplaod.post('/students/csv/:id', authGlobalForUplaod, authAdminForUplaod, uploadController.uploadStudentCsv);
routerForUplaod.post('/students/csv/modify/:id', authGlobalForUplaod, authAdminForUplaod, uploadController.uploadStudentModifyCsv);
routerForUplaod.post('/teachers/csv', authGlobalForUplaod, authAdminForUplaod, uploadController.uploadTeacherCsv);
routerForUplaod.post('/class/csv', authGlobalForUplaod, authAdminForUplaod, uploadController.uploadClassCsv);
routerForUplaod.post('/notes/csv', authGlobalForUplaod, authAdminForUplaod, uploadController.uploadNoteCsv);

module.exports = routerForUplaod;
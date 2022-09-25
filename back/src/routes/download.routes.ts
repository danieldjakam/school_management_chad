const routerForDownload = require('express').Router();
const authForDownload = require('../middleware/auth');
const authAdminForDownload = require('../middleware/authAdmin');
const authGlobalForDownload = require('../middleware/auth_global');

const downloadController = require('../controllers/download.controller');
const downloadBulController = require('../controllers/download_bul.controller');

routerForDownload.get('/csv/students/:id', authGlobalForDownload, downloadController.downloadStudentsCsv);
routerForDownload.get('/pdf/insolvables/:id/:type/:payload', authGlobalForDownload, downloadController.downloadInsolvablesList);
routerForDownload.get('/pdf/students/:id', authGlobalForDownload, downloadController.downloadStudentsPdf)

//Make bulletins

routerForDownload.get('/pdf/bul/:class_id/:exam_id', authGlobalForDownload, downloadBulController.downloadBulletinByClass)
routerForDownload.get('/pdf/bul/:class_id/:student_id/:exam_id', authGlobalForDownload, downloadBulController.downloadBulletin)

routerForDownload.get('/pdf/bul2/:class_id/:exam_id', authGlobalForDownload, downloadBulController.downloadBulletinByClass2)
routerForDownload.get('/pdf/bul2/:class_id/:student_id/:exam_id', authGlobalForDownload, downloadBulController.downloadBulletin2)

//Make bulletins Annual

routerForDownload.get('/pdf/bul-an/:class_id/:exam_id', authGlobalForDownload, downloadBulController.downloadAnnualBulletinByClass)
routerForDownload.get('/pdf/bul-an/:class_id/:student_id/:exam_id', authGlobalForDownload, downloadBulController.downloadAnnualBulletin)


routerForDownload.get('/pdf/bul-an2/:class_id/:exam_id', authGlobalForDownload, downloadBulController.downloadAnnualBulletinByClass2)
routerForDownload.get('/pdf/bul-an2/:class_id/:student_id/:exam_id', authGlobalForDownload, downloadBulController.downloadAnnualBulletin2)

routerForDownload.get('/recu/:student_id/:amount/:payload', authGlobalForDownload, downloadController.downloadRecu);
routerForDownload.get('/recu2/:student_id/:amount/:payload', authGlobalForDownload, downloadController.downloadRecu2);
routerForDownload.get('/recette/:type/:date/:to', authGlobalForDownload, downloadController.downloadRecette);
routerForDownload.get('/etat', authGlobalForDownload, downloadController.etat);


module.exports = routerForDownload;
const routerForNotes= require('express').Router();
const authForNotes= require('../middleware/auth');
const authAdminForNotes= require('../middleware/authAdmin');
const authGlobalForNotes= require('../middleware/auth_global');

const notesController = require('../controllers/notes.controller');

// Cal annuals notes
routerForNotes.post('/calTrimNotes', authGlobalForNotes, authForNotes, notesController.calAnnualNotes);
routerForNotes.post('/calTrimNotes2', authGlobalForNotes, authForNotes, notesController.calAnnualNotes2);

// add/update notes
routerForNotes.post('/addOrUpdate', authGlobalForNotes, authForNotes, notesController.addOrUpdateNotes);
routerForNotes.post('/addOrUpdate2', authGlobalForNotes, authForNotes, notesController.addOrUpdateNotes2);

// Get notes
routerForNotes.get('/all/:class_id/:exam_id', authGlobalForNotes, authForNotes, notesController.getNotes);
routerForNotes.get('/all2/:class_id/:exam_id', authGlobalForNotes, authForNotes, notesController.getNotes2);
routerForNotes.get( '/all-class/:class_id', authGlobalForNotes, authForNotes, notesController.getNotesClasses);
routerForNotes.get('/all-class2/:class_id', authGlobalForNotes, authForNotes, notesController.getNotesClasses2);

// Update stats
routerForNotes.post('/addOrUpdateStats', authGlobalForNotes, authForNotes, notesController.addOrUpdateStats);

// Get total points 
routerForNotes.get('/gt/:exam_id/:class_id', authGlobalForNotes, authForNotes, notesController.getTotalPoints);

module.exports = routerForNotes;
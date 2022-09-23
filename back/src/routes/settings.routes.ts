const routerForSettings = require('express').Router();
const authForSettings = require('../middleware/auth');
const authAdminForSettings = require('../middleware/authAdmin');
const authGlobalForSettings = require('../middleware/auth_global');

const settingsController = require('../controllers/settings.controller');

// routerForSettings.get('/school_year', seqController.getAllSeq);
// routerForSettings.get('/is_editable_notes_time', seqController.getOneSeq);
// routerForSettings.post('/edit_school_year', seqController.addSeq);
routerForSettings.get('/getSettings', authGlobalForSettings, authAdminForSettings, settingsController.get_settings);
routerForSettings.post('/setSettings', authGlobalForSettings, authAdminForSettings, settingsController.editSettings);
// routerForSettings.delete('/edit_ient', seqController.deleteSeq);


module.exports = routerForSettings;
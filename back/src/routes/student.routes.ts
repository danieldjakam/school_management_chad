const routerForStudent = require('express').Router();
const authForStudent = require('../middleware/auth');
const authAdminForStudent = require('../middleware/authAdmin');
const authGlobalForStudent = require('../middleware/auth_global');

const studentController = require('../controllers/student.controller');

routerForStudent.get('/getAll', authGlobalForStudent, authForStudent, studentController.getAllStudent);
routerForStudent.get('/total', authGlobalForStudent, authForStudent, studentController.getTotal);
routerForStudent.get('/getOrdonnedStudents/:id', authGlobalForStudent, authForStudent, studentController.getOrdonnedStudents)
routerForStudent.get('/one/:id', authGlobalForStudent, authForStudent, studentController.getOneStudent);
routerForStudent.get('/payments/:id', authGlobalForStudent, authForStudent, studentController.getPayements);
routerForStudent.get('/:id', authGlobalForStudent, authForStudent, studentController.getSpecificStudents);
routerForStudent.post('/add/:id', authGlobalForStudent, authForStudent, studentController.addStudent);
routerForStudent.put('/transfert-to', authGlobalForStudent, authAdminForStudent, studentController.transfertToAotherClass)
routerForStudent.put('/:id', authGlobalForStudent, authForStudent, studentController.updateStudent);
routerForStudent.delete('/:id', authGlobalForStudent, authForStudent, studentController.deleteStudent);

module.exports = routerForStudent;
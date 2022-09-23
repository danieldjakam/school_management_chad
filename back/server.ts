const express = require('express');
const app = express();
const cors = require('cors');
const admZip = require('adm-zip');
const bodyparser = require('body-parser');
require('dotenv').config({path: '.env'})

const sendRoutes     = require('./src/routes/send.routes');
const trimRoutes     = require('./src/routes/trim.routes');
const userRoutes     = require('./src/routes/users.routes');
const notesRoutes    = require('./src/routes/notes.routes');
const classRoutes    = require('./src/routes/class.routes');
const uploadRoutes   = require('./src/routes/upload.routes');
const sectionRoutes  = require('./src/routes/section.routes');
const studentRoutes  = require('./src/routes/student.routes');
const annualsRoutes  = require('./src/routes/annuals.routes');
const matiereRoutes  = require('./src/routes/matiere.routes');
const teachersRoutes = require('./src/routes/teachers.routes');
const downloadRoutes = require('./src/routes/download.routes');
const settingsRoutes = require('./src/routes/settings.routes');

app.use(bodyparser.json());
app.use(
    cors(
        {
            origin: '*'
        }
    )
)
app.use('/users', userRoutes)
app.use('/class', classRoutes)
app.use('/students', studentRoutes)
app.use('/teachers', teachersRoutes)
app.use('/subjects', matiereRoutes)
app.use('/download', downloadRoutes)
app.use('/trim', trimRoutes);
app.use('/notes', notesRoutes);
app.use('/settings', settingsRoutes)
app.use('/send', sendRoutes);
app.use('/upload', uploadRoutes);
app.use('/annuals', annualsRoutes);
app.use('/sections', sectionRoutes);
app.use('/public', express.static('public'));

app.listen(process.env.PORT, () => {
    console.log(`Listenning on ${process.env.PORT}`);
})
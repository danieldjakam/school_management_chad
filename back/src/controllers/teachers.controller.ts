const pdf = require('pdf-creator-node');
const optionsPdf = require('../../helpers/optionsPdf')
const fsTeacher = require('fs');

module.exports.addTeacher = (req, res) => {
    const {name, subname, birthday, phone_number, sex, classId} = req.body;
    const id = req.jwt.sign(name, req.env.SECRET);
    if (name && classId && sex) {
        let birthdy = birthday;
        if (!birthday){
            birthdy = null;
        }
        if (name.length < 0) {
            res.status(401).json({success: false, message: 'Le nom de l\'enseignant doit avoir au moins 3 caracteres!!'})
        }
        else if ( subname && subname.length < 0) {
            res.status(401).json({success: false, message: 'Le prenom de l\'enseignant doit avoir au moins 3 caracteres!!'})
        }
        else if (phone_number && phone_number < 8) {
            res.status(401).json({success: false, message: 'Numero invalide'})
        }
        else if (sex !== 'f' && sex !== 'm') {
            res.status(401).json({success: false, message: 'Sexe invalide'})
        }
        else{
            const t = [];
            for (let i = 0; i < 4; i++) {
              const i = Math.round((Math.random() * 10));
              t.push(i);
            }
            const password = t.join('')

            req.connection.query('SELECT name FROM class WHERE id = ? AND school_id = ? ', [classId, req.payload.school_id], (erroorr, succc) => {
                if (erroorr) {
                    console.log(erroorr);
                }else{
                    let cname = succc[0].name;
                    cname = cname.replace(' ', '')
                    cname = cname.toUpperCase()
                    const code = 'SEM-'+cname;
                    const p = phone_number.toString()
                    req.connection.query('INSERT INTO teachers(id, name, subname, class_id, matricule, password, sex, phone_number, birthday, school_id) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [id, name, subname, classId, code, password, sex, p, birthdy, req.payload.school_id], (err, resp) => {
                        if(err) console.log(err);

                        else {
                            req.connection.query('UPDATE class SET teacherId = ? WHERE id = ?', [id, classId], (err2, resp2) => {
                                if(!err2) res.status(201).json({success: true})
                                else console.log(resp2);
                            })
                        }
                    })
                }
            })

            
        }
    }else{
        res.status(401).json({success: false, message: 'Svp remplissez tous les champs marqués d\'un astérisque !!'})
    }
}
 
module.exports.updateTeacher = (req, res) => {
    const {name, subname, class_id, OldclassId, birthday, phone_number, sex} = req.body;
    const {id} = req.params;
    
    if (name && class_id && sex) {
        if (name.length < 4) {
            res.status(401).json({success: false, message: 'Le nom de l\'enseignant doit avoir au moins 3 caracteres!!'})
        }
        else if (subname.length < 4) {
            res.status(401).json({success: false, message: 'Le prenom de l\'enseignant doit avoir au moins 3 caracteres!!'})
        }
        else if (phone_number < 8) {
            res.status(401).json({success: false, message: 'Numero invalide'})
        }
        else if (sex !== 'f' && sex !== 'm') {
            res.status(401).json({success: false, message: 'Sexe invalide'})
        }
        else{

            req.connection.query('SELECT name FROM class WHERE id = ? AND school_id = ? ', [class_id, req.payload.school_id], (erroorr, c) => {
                if(erroorr) console.log(erroorr);
                
                let cname = c[0].name
                cname = cname.replace(' ', '')
                cname = cname.toUpperCase()
                const code = 'SEM-'+cname;
                const p = phone_number.toString()
                req.connection.query('UPDATE teachers SET name = ? , subname = ?, class_id = ?, sex = ?, phone_number = ?, matricule = ? WHERE id = ?', [ name, subname, class_id, sex, p, code, id], (err, resp) => {
                    if(err) console.log(err);

                    else {
                        req.connection.query('UPDATE class SET teacherId = ? WHERE id = ? AND school_id = ?', [class_id, OldclassId, req.payload.school_id], (err2, resp2) => {
                            if (err2) {
                                if(!err2) res.status(201).json({success: true})
                                else {
                                    res.status(401).json({success: false, message: err2})
                                    console.log(err2);
                                }
                            }else{
                                req.connection.query('UPDATE class SET teacherId = ? WHERE id = ? AND school_id = ?', [class_id, OldclassId, req.payload.school_id], (err3, resp2) => {
                                    if(!err3) res.status(201).json({success: true})
                                    else {
                                        res.status(401).json({success: false, message: err3})
                                        console.log(err3);
                                    }
                                })
                            }
                        })
                    }
                })
            })
        }
    }else{
        res.status(401).json({success: false, message: 'Svp remplissez tous les champs marqués d\'un astérisque !!'})
    }
}

module.exports.getAllTeachers = (req, res) => {
    req.connection.query(`SELECT teachers.name, teachers.password, teachers.matricule, 
                            sections.name as section_name, class.name as className, 
                            teachers.id, teachers.subname FROM teachers 
                            JOIN class ON class.id = teachers.class_id 
                            JOIN sections ON sections.id = class.section WHERE class.school_id = ? AND teachers.school_year = ?`, 
                            [req.payload.school_id, req.school_year], (err, resp) => {
        if(err) console.log(err);
        res.status(201).json(resp)
    })
}

module.exports.getOneTeacher = (req, res) => {
    req.connection.query('SELECT * FROM teachers WHERE id = ? AND school_id = ? AND school_year = ?', 
                        [req.params.id, req.payload.school_id, req.school_year] , (err, resp) => {
        if(err) console.log(err);
        res.status(201).json(resp[0])
    })
}

module.exports.deleteTeacher = (req, res) => {
    const {id} = req.params;
    req.connection.query('DELETE FROM teachers WHERE id = ? AND school_id = ? AND school_year = ?', [id, req.payload.school_id, req.school_year], (err, resp) => {
        res.status(201).json({success: true})
    })
}

module.exports.downloadTeachersPassword = (req, res) => {
    const html = fsTeacher.readFileSync('src/templates/teachersPassword.html', 'utf-8');
    const payload = req.jwt.verify(req.params.payload, req.env.SECRET);
    
    req.connection.query('SELECT year_school FROM settings WHERE school_id = ?', [payload.school_id], (e, settings) => {
        const {year_school} = settings[0];
        req.connection.query(`SELECT teachers.name, subname, matricule, password, 
                            class.name as class FROM teachers 
                            JOIN class ON teachers.class_id = class.id 
                            WHERE teachers.school_year = ?`
                        , [year_school], (errr, teachers) => {
        console.log(teachers);
        
        const document = {
            html: html,
            data: {
                teachers: teachers
            },
            path: `docs/mots_de_passe_maitres.pdf`
        };
        pdf.create(document, optionsPdf)
            .then(resp => {
                res.download(resp.filename)
            })
            .catch(err => {
                console.log(err);
                res.status(201).json({err, f: ''})
            })
    })
    })
}

module.exports.generateNewPasswords = (req, res) => {
    req.connection.query('SELECT * FROM teachers WHERE school_id = ? AND school_year = ?', [req.payload.school_id, req.school_year], (err, teachers) => {
        try {
            teachers.forEach(teacher => {
                const t = []
                for (let i = 0; i < 4; i++) {
                    const i = Math.round(Math.random() * 10);
                    t.push(i);
                }
                const password = t.join('')
                req.connection.query('UPDATE teachers SET password = ? WHERE id = ? AND school_year = ?', [password, teacher.id, req.school_year], (err, resp) => {
                    if (err) {
                        console.log(err);
                    }
                })
            })
            res.status(201).json({success: true})
        } catch (error) {
            res.status(401).json({success: false, message: `Erreur: ${error}`})
        }
    })
}
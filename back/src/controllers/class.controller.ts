module.exports.addClass = (req : any, res : any) => {
    let {
        name, section, level, 
        inscriptions_olds_students, inscriptions_news_students, 
        first_tranch_news_students, first_tranch_olds_students, 
        second_tranch_news_students, second_tranch_olds_students,
        third_tranch_news_students, third_tranch_olds_students
    } = req.body;
    level = parseInt(level)
    if (name && name !== '' && section && section !== '' && level) {
        if (name.length < 3) {
            res.status(401).json({success: false, message: 'Le nom de la classe doit avoir au moins 3 caracteres!!'})
        }
        else{
            req.connection.query(`INSERT INTO class(id, name, level, section, 
                                    inscriptions_olds_students, inscriptions_news_students, 
                                    first_tranch_news_students, first_tranch_olds_students, 
                                    second_tranch_news_students, second_tranch_olds_students, 
                                    third_tranch_news_students, third_tranch_olds_students, 
                                    school_id, school_year) 
                                    VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, 
                                    [req.jwt.sign(name, req.env.SECRET), 
                                        name, level, section,
                                        inscriptions_olds_students, inscriptions_news_students, 
                                        first_tranch_news_students, first_tranch_olds_students, 
                                        second_tranch_news_students, second_tranch_olds_students, 
                                        third_tranch_news_students, third_tranch_olds_students, 
                                        req.payload.school_id, req.school_year], (err: any, resp : any) => {
                if(err) console.log(err);
                else res.status(201).json({success: true})
            })
        }
    }else{
        res.status(401).json({success: false, message: 'Svp remplissez tous les champs !!'})
    }
}

module.exports.updateClass = (req : any, res : any) => {
    let {
        name, section, level, 
        inscriptions_olds_students, inscriptions_news_students, 
        first_tranch_news_students, first_tranch_olds_students, 
        second_tranch_news_students, second_tranch_olds_students,
        third_tranch_news_students, third_tranch_olds_students,
    } = req.body;
    level = parseInt(level);    
    const {id} = req.params;
    if (name && section) {
        if (name.length < 3) {
            res.status(401).json({success: false, message: 'le nom doit avoir au moins 3 caracteres!!'})
        }
        else{
            req.connection.query(`UPDATE class SET name = ? , section = ?, level = ?, 
                                    inscriptions_olds_students = ?, inscriptions_news_students = ?, 
                                    first_tranch_news_students = ?, first_tranch_olds_students = ?, 
                                    second_tranch_news_students = ?, second_tranch_olds_students = ?, 
                                    third_tranch_news_students = ?, third_tranch_olds_students = ?
                                    WHERE id = ?`, 
                                    [ name, section, level, 
                                        inscriptions_olds_students, inscriptions_news_students, 
                                        first_tranch_news_students, first_tranch_olds_students, 
                                        second_tranch_news_students, second_tranch_olds_students, 
                                        third_tranch_news_students, third_tranch_olds_students,
                                        id], (err: any, resp : any) => {
                if(err) console.log(err);

                else res.status(201).json({success: true})
            })
        }
    }else{
        res.status(401).json({success: false, message: 'Svp remplissez tous les champs !!'})
    }
}

module.exports.getClassByLevel = (req : any, res : any) => {
    
    req.connection.query('SELECT * FROM class WHERE level = ?', [req.params.level.toString(), req.section_id], (err: any, resp : any) => {
        if(err)console.log(err);
        else{
            res.status(201).json(resp);
        }
    })
}
module.exports.getAllClass = (req : any, res : any) => {
    req.connection.query(`SELECT class.name as name, class.id, inscriptions_olds_students, inscriptions_news_students, class.level, sections.name as sName, 
                            (select count(id) FROM students where students.class_id = class.id) as total_students  
                            FROM class LEFT JOIN sections ON sections.id = class.section WHERE school_id = ?`, 
                            [req.payload.school_id], (err: any, classes : any) => {
        if (err) {
            console.log(err);
        } else {
            req.connection.query('SELECT inscription, status, class_id FROM students', (er, students) => {
                if(er)console.log(er)
                classes.forEach(classe => {
                    const studentsForThisClasse = students.filter(s => s.class_id === classe.id);
                    const inscripted = studentsForThisClasse.filter(s => {
                        const inscription = s.status == 'new' ? 
                                                                classe.inscriptions_news_students 
                                                              : 
                                                                classe.inscriptions_olds_students;
                        return s.inscription >= inscription ;
                    }).length;
                    classe.inscripted = inscripted;
                });
                res.status(201).json(classes);
            })
        }
    })
}
module.exports.getAllOClass = (req : any, res : any) => {
    req.connection.query(`SELECT class.name as name, class.id, class.level, sections.name as sName, 
                            (select count(id) FROM students where students.class_id = class.id) 
                            as total_students  FROM class LEFT JOIN sections ON sections.id = class.section 
                            WHERE school_id = ? AND section = ?`, 
                            [req.payload.school_id, req.params.section_id], (err: any, resp : any) => {
        if (err) {
            console.log(err);
        } else {
            res.status(201).json(resp);
        }
    })
}

module.exports.getSpecialClass = (req : any, res : any) => {
    req.connection.query(`SELECT teachers.name as tName, 
                            teachers.subname as tSubname, class.id, teachers.subname as ts, 
                            class.name, class.section, teachers.id as tId, teachers.subname 
                            FROM class LEFT JOIN teachers ON class.id = teachers.class_id 
                            WHERE class.id = ? AND class.school_id = ?`, 
                            [req.params.id, req.payload.school_id], (err: any, resp : any) => {
        if(err) console.log(err);
        res.status(201).json(resp[0]);
    })
}
module.exports.getOneClass = (req : any, res : any) => {
    req.connection.query(`SELECT class.name, class.section, class.id, 
                            class.inscriptions_news_students, class.inscriptions_olds_students, 
                            class.first_tranch_news_students, class.first_tranch_olds_students, 
                            class.second_tranch_news_students, class.second_tranch_olds_students, 
                            class.third_tranch_news_students, class.third_tranch_olds_students,
                            class.level, sections.type, teachers.name as teacher_name, teachers.subname as teacher_subname, 
                            (select count(id) FROM students where students.class_id = class.id) as total_students 
                            FROM class JOIN sections ON sections.id = class.section 
                            JOIN teachers ON teachers.class_id = class.id WHERE class.id = ? 
                            AND class.school_id = ? `, [req.params.id, req.payload.school_id], (err: any, resp : any) => {
        if(err) console.log(err);
        res.status(201).json(resp[0]);
        
    })
}
module.exports.deleteClass = (req : any, res : any) => {
    const {id} = req.params;
    req.connection.query(`DELETE FROM class WHERE id = ? 
                    AND school_id = ? `, 
                    [id, req.payload.school_id], (err: any, resp : any) => {
        res.status(201).json({success: true})
    })
}
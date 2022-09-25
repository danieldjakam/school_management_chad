const isEmailUser = require('validator').isEmail;

module.exports.addStudent = (req, res) => {
    const {id} = req.params;
    let {name, subname, birthday ,fatherName, birthday_place, phone_number, profession, email, sex, status} = req.body;
    const sta = status ? status : 'old';
    if (name) {
        const b = birthday ? birthday : null; 
        let t = '';
        if (fatherName){
            t = fatherName;
        }
        if (name.length < 3) {
            res.status(401).json({success: false, message: 'Le nom de l\'eleve doit avoir au moins 3 caracteres!!'})
        }
        else if ( subname && subname.length < 3) {
            res.status(401).json({success: false, message: 'Le prenom de l\'eleve doit avoir au moins 3 caracteres!!'})
        }
        else if ( sex && sex !== 'f' && sex !== 'm') {
            res.status(401).json({success: false, message: 'Sexe invalide'})
        }
        else if (email && !isEmailUser(email)) {
            res.status(401).json({success: false, message: 'Format d\'email invalide'})
        }
        else if (phone_number && phone_number < 8) {
            res.status(401).json({success: false, message: 'Numero invalide'})
        }
        else if (status && status !== 'new' && status !== 'old') {
            res.status(401).json({success: false, message: 'Status de l\'eleve invalide'})
        }
        else{
            req.connection.query(`INSERT INTO students(name, subname, class_id, 
                sex, fatherName, profession, birthday, birthday_place,
                email, phone_number, school_year, status, 
                school_id) 
            VALUES(?, ?, ?, ?, ?,
                    ?, ?, ?, ?, ?,
            ?, ?, ?)`, 
            [name, subname, req.params.id, sex, 
                fatherName, profession, b, birthday_place, email, 
                phone_number.toString(), req.school_year, 
                sta, req.payload.school_id], (err, respp, fields) => {
                if(err) console.log(err);
                else res.status(201).json({success: true, id: respp.insertId})
            });
        }
    }else{
        res.status(401).json({success: false, message: 'Svp remplissez tous les champs marqués d\'un astérisque !!'})
    }
}

module.exports.updateStudent = (req, res) => {
    const {id} = req.params;
    const {name, subname ,fatherName, phone_number, profession, email, sex, 
        birthday_place, status, inscription, first_tranch, second_tranch, third_tranch
    } = req.body;
    if (name) {
        if (name.length < 3) {
            res.status(401).json({success: false, message: 'Le nom de l\'eleve doit avoir au moins 3 caracteres!!'})
        }
        else if ( subname && subname.length < 3) {
            res.status(401).json({success: false, message: 'Le prenom de l\'eleve doit avoir au moins 3 caracteres!!'})
        }
        else if ( sex && sex !== 'f' && sex !== 'm') {
            res.status(401).json({success: false, message: 'Sexe invalide'})
        }
        else if (email && !isEmailUser(email)) {
            res.status(401).json({success: false, message: 'Format d\'email invalide'})
        }
        // else if (phone_number && phone_number.length < 8) {
        //     res.status(401).json({success: false, message: 'Numero invalide'})
        // }
        else{
            req.connection.query(`UPDATE students SET name = ?, subname = ?, sex = ?, email = ?, 
                                    phone_number = ?, fatherName = ?, profession = ?, birthday_place = ?, 
                                    status = ?, inscription = ?, first_tranch = ?, second_tranch = ?, 
                                    third_tranch = ? WHERE id = ? AND school_id = ?`, 
                                    [name, subname, sex, email, phone_number.toString(), 
                                        fatherName, profession, birthday_place, status, inscription, 
                                        first_tranch, second_tranch, third_tranch,
                                        id, req.payload.school_id], (err, resp) => {
                if(err) console.log(err);
                else res.status(201).json({success: true})
            })
        }
    }else{
        res.status(401).json({success: false, message: 'Svp remplissez tous les champs marqués d\'un astérisque !!'})
    }
}

module.exports.getPayements = (req, res) => {
    req.connection.query(`SELECT p.amount, p.created_at, u.email FROM payments p
                    JOIN users u ON u.id = p.operator_id WHERE student_id = ? `, [req.params.id], (err, payments) => {
        if(err) console.log(err);
        else res.status(201).json(payments)
    })
}

module.exports.getAllStudent = (req, res) => {
    
    req.connection.query('SELECT year_school FROM settings WHERE school_id = ?', [req.payload.school_id], (rerr, respe) => {
        const {year_school} = respe[0];
        req.connection.query(`SELECT s.name as name, s.subname, 
                                s.birthday, c.name as class_name ,
                                c.inscriptions_news_students, c.inscriptions_olds_students,
                                c.first_tranch_news_students, c.first_tranch_olds_students,
                                c.second_tranch_news_students, c.second_tranch_olds_students,
                                c.third_tranch_news_students, c.third_tranch_olds_students,
                                s.fatherName, s.email, s.phone_number,
                                s.id, s.status, s.phone_number,
                                s.profession, s.inscription, s.first_tranch,
                                s.second_tranch, s.third_tranch, s.birthday_place,
                                s.class_id, s.sex, s.class_id
                                FROM students s JOIN class c ON c.id = s.class_id 
                                WHERE c.school_year = ? AND s.school_id = ? 
                                ORDER BY name ASC`, 
                                [year_school, req.payload.school_id], (err, resp) => {
            if(err) console.log(err);
            else res.status(201).json(resp)
        })
    })
}

module.exports.getSpecificStudents = (req, res) => {
    req.connection.query('SELECT year_school FROM settings WHERE school_id = ?', [req.payload.school_id], (rerr, respe) => {
        const {year_school} = respe[0]
        
        req.connection.query('SELECT * FROM students WHERE class_id = ? AND school_year = ? AND status = "old" AND school_id = ? AND school_year = ? ORDER BY name ASC', [req.params.id, year_school, req.payload.school_id, req.school_year] , (err, oldStudents) => {
            
            if(err) console.log(err);
            else {
                req.connection.query('SELECT * FROM students WHERE class_id = ? AND school_year = ? AND status = "new" AND school_id = ? AND school_year = ?', [req.params.id, year_school, req.payload.school_id, req.school_year] , (err, newStudents) => {
                    let resp = [];
                    if (newStudents.length > 0) {
                        resp = [...oldStudents, ...newStudents]
                    }
                    else{
                        resp = [...oldStudents]
                    }
                    res.status(201).json(resp)
                })
            }
        })
    })
}

module.exports.getOneStudent = (req, res) => {
    req.connection.query('SELECT year_school FROM settings WHERE school_id = ?', [req.payload.school_id], (rerr, respe) => {
        const {year_school} = respe[0];
        req.connection.query('SELECT * FROM students WHERE id = ? AND school_year = ? AND school_id = ? AND school_year = ?', [req.params.id, year_school, req.payload.school_id, req.school_year] , (err, resp) => {
            if(err) console.log(err);
            else res.status(201).json(resp[0]);
        })
    })
}   

module.exports.transfertToAotherClass = (req, res) => {
    const {class_id, ids} = req.body;
    ids.forEach(student_id => {
        req.connection.query('UPDATE students SET class_id = ?, status = ? WHERE id = ?', 
            [class_id, 'old', student_id], (err, res) => {
            if(err) console.log(err);
        })
    });
    res.status(201).json({success: true})
}

module.exports.deleteStudent = (req, res) => {
    const {id} = req.params;
    req.connection.query('DELETE FROM payments WHERE student_id = ?', [id], (e, t) => {
        req.connection.query('DELETE FROM students WHERE id = ? AND school_year = ? AND school_id = ?', [id, req.school_year, req.payload.school_id], (err, resp) => {
            console.log(err, e);
            
            res.status(201).json({success: true})
        })
    })
}

module.exports.getOrdonnedStudents = (req : any, res : any) => {
    req.connection.query('SELECT year_school FROM settings WHERE school_id = ?', 
                    [req.payload.school_id], (rerr, respe) => {
        const {year_school} = respe[0];
        req.connection.query(`SELECT * FROM students WHERE class_id = ? 
                                AND school_year = ? AND school_id = ? 
                                ORDER BY name ASC`, 
                        [req.params.id, year_school, req.payload.school_id], (err, resp) => {
            if(err) console.log(err);
            else res.status(201).json(resp)
        })
    })
}
module.exports.getTotal = (req, res) => {
    // console.log('f');
    
    req.connection.query('SELECT sex FROM students', (err, students) => {
        if(err) console.log();
        let t = {
            total: 0,
            girls: 0,
            boys: 0,
            unspecified: 0
        };
        students.forEach(s => {
            switch (s.sex) {
                case 'm':
                    t.boys += 1;
                    break;
            
                case 'f':
                    t.girls += 1;
                    break;

                default:
                    t.unspecified += 1
                    break;
            }
            t.total += 1
        })
        res.status(201).json(t)
    })
} 
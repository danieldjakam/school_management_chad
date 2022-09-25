const bcrypt = require('bcrypt')
const { isEmail } = require('validator');

module.exports.register = async (req, res) => {
    const {username, email, password, confirm, role} = req.body;
    if (username && email && password && confirm && role) {
        if (username.length < 5 || username.length > 30) {
            res.status(401).json({success: false, message: "Le pseudo doit etre compris entre 5 et 30 caracteres !!"})
        }
        else if(role !== 'ad' && role !== 'comp'){
            res.status(401).json({success: false, message: "Role invalide"})
        }
        else if (password.length < 6) {
            res.status(401).json({success: false, message: "Le mot de passe doit contenir au moins 6 caracteres !!"})
        }
        else if (password !== confirm) {
            res.status(401).json({success: false, message: "Les deux mot de passe ne correspondent pas !!"})
        }
        else{
            const salt = await bcrypt.genSalt()
            const passwordCrypted = await bcrypt.hash(password, salt)
            req.connection.query('INSERT INTO users(id, username, email, password, school_id, role) VALUES(?, ?, ?, ?, ?, ?)', [req.jwt.sign(username, req.env.SECRET), username, email, passwordCrypted, req.payload.school_id, role], (err, resp) => {
                if(!err) res.status(201).json({success: true})
                else console.log(err);
            })
        }
    }else{
        res.status(401).json({success: false, message: "Remplir tous les champs ducond !!"})
    }
}

module.exports.login = (req, res) => {
    const {username, password} = req.body;
    if (username && username !== '' && password && password !== '') {
        req.connection.query('SELECT * FROM users WHERE username = ? OR email = ?', [username, username], async (err, resp) => {
            if (err) console.log(err);
            
            if(resp.length < 1){
                req.connection.query(`SELECT t.class_id, t.id, t.password, c.school_id, s.type FROM teachers t LEFT JOIN class c 
                                ON c.id = t.class_id JOIN sections s ON s.id = c.section WHERE matricule = ? `, 
                    [username], (err2, resp2) => {
                    if(resp2.length < 1){
                        res.status(401).json({success: false, message: 'Utilisateur non reconnu'})
                    }else{
                        if (resp2[0].password === password) {
                            const token = req.jwt.sign({
                                id: resp2[0].id,
                                role: 'teacher',
                                school_id: resp2[0].school_id
                            }, req.env.SECRET)
                            res.status(401).json({success: true, token, status: 'en', classId: resp2[0].class_id, type: resp2[0].type, school_id: resp2[0].school_id})
                        }else{
                            res.status(401).json({success: false, message: 'Mot de passe incorrect!!'})
                        }
                    }
                })
            }else{
                const isOk = await bcrypt.compare(password, resp[0].password);
                if (isOk) {
                    const token = req.jwt.sign({
                        id: resp[0].id,
                        role: resp[0].role === 'ad' ? 'admin' : 'comp',
                        school_id: resp[0].school_id
                    }, req.env.SECRET)
                    res.status(401).json({success: true, token, status: resp[0].role})
                }else{
                    res.status(401).json({success: false, message: 'Mot de passe incorrect!!'})
                }
            }
        })
    }else{
        res.status(401).json({success: false, message: "Remplir tous les champs ducond !!"})
    }
}

module.exports.getInfos = (req, res) => {
    req.connection.query('SELECT * FROM users WHERE id = ?', [req.payload.id] , (err, resp) => {
        res.status(201).json(resp[0])
    })
}

module.exports.getAllAdmin = (req, res) => {
    req.connection.query('SELECT * FROM users', [] , (err, resp) => {
        if(err) console.log(err);
        else res.status(201).json(resp);
    })
}

module.exports.deleteAdmin = (req, res) => {
    const {id} = req.params;
    req.connection.query('DELETE FROM users WHERE id = ?', [id], (err, resp) => {
        res.status(201).json({success: true})
    })
}

module.exports.getTeacherOrAdmin = (req, res) => {
    if (req.payload.role === 'admin' || req.payload.role === 'comp') {
        req.connection.query('SELECT * FROM users WHERE id = ?', [req.payload.id] , (err, resp) => {
            if(err) console.log(err);
            else res.status(201).json(resp[0]);
        })  
    }else{
        req.connection.query('SELECT * FROM teachers WHERE id = ?', [req.payload.id] , (err, resp) => {
            if(err) console.log(err);
            else res.status(201).json(resp[0]);
        })
    }
}

module.exports.updateUserOrAdmin = async (req: any, res: any) => {
    if (req.payload.role === 'admin' || req.payload.role === 'comp') {
        const {email, username, password, confirm} = req.body;
        
        if (email && username && password && confirm) {
            if (password !== confirm) {
                res.status(401).json({success: false, message: 'Les deux mots de passe ne correspondent pas !!'})
            } else {
                const salt = await bcrypt.genSalt()
                const passwordCrypted = await bcrypt.hash(password, salt)
                req.connection.query('UPDATE users SET username = ?, email = ?, password = ? WHERE id = ?', [username, email, passwordCrypted, req.payload.id], (err, resp) => {
                    if(err) console.log(err);
                    else res.status(201).json({success: true});
                })
            }
        }else{
            res.status(401).json({success: false, message: 'Svp remplissez tous les champs !!'})
        }
    } else {
        const {name, subname, birthday, phone_number, sex} = req.body;
        
        if (name && subname && birthday && phone_number && sex) {
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
                const p = phone_number.toString()
                req.connection.query('UPDATE teachers SET name = ? , subname = ?, sex = ?, phone_number = ? WHERE id = ?', [ name, subname, sex, p, req.payload.id], (err, resp) => {
                    if(err) console.log(err);
                    else res.status(401).json({success: true})
                })
            }
        }else{
            res.status(401).json({success: false, message: 'Svp remplissez tous les champs !!'})
        }
    }
}

module.exports.confirmAdminPassword = (req, res) => {
    const {password} = req.body;
    if (!password) {
        res.status(400).json({success: false, message: "Tous les champs sont obligatoires!!"})
    }else{
        req.connection.query('SELECT password, id FROM users', [req.payload.id], async (err, results) => {
            if(err) console.log(err);
            else{
                if (results.length > 0) {
                    const isCorrect = await bcrypt.compare(password, results[0].password);
                    if (isCorrect) {
                        res.status(200).json({success: true, message: isCorrect})
                    }else{
                        res.status(200).json({success: false, message: "Mot de passe incorrect!"})
                    }
                }else{
                    res.status(200).json({success: false, message: "Aucun compte attribue a cet personne. Veuillez contacter l'administrateur."})
                }
            }
        })
        
    }
}
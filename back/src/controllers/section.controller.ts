module.exports.addSection = (req: any, res: any) => {
    const {name, type} = req.body;
    if (name && type) {
        req.connection.query('INSERT INTO sections(name, type, school_year) VALUES(?, ?, ?)', [name, type, req.school_year], (err, resp) => {
            if (err) res.status(401).json({success: false, message: 'Une erreur est survenue : \n '+err})
            else res.status(201).json({success: true})
        })
    } else {
        res.status(401).json({success: false, message: 'Remplissez tous les champs svp'})
    }
}

module.exports.getAllSection = (req, res) => {
    req.connection.query(`SELECT *,
                        (select count(id) from class where class.section = sections.id) as total_class 
                        FROM sections WHERE school_year = ?`, [req.school_year], (err, resp) => {
        if (err) res.status(401).json({success: false, message: 'Une erreur est survenue : \n '+err})
        else res.status(201).json(resp)
    })
}


module.exports.getOneSection = (req, res) => {
    req.connection.query('SELECT * FROM sections WHERE id = ? AND school_year = ?', [req.params.id, req.school_year], (err, resp) => {
        if (err) res.status(401).json({success: false, message: 'Une erreur est survenue : \n '+err})
        else res.status(201).json(resp[0])
    })
}

module.exports.updateSection = (req, res) => {
    const {name, type} = req.body;
    if (name && type) {
        req.connection.query('UPDATE sections SET name = ?, type = ? WHERE id = ? AND school_year = ?', [name, type, req.params.id, req.school_year], (err, resp) => {
            if (err) res.status(401).json({success: false, message: `Erreur: ${err}`});
            else res.status(201).json({success: true})
        })
    } else {
        res.status(401).json({success: false, message: 'Remplissez tous les champs svp'})
    }
    
}

module.exports.getNberOfClass = (req, res) => {
   req.connection.query('SELECT * FROM class WHERE section = ? AND school_year = ?', [req.params.id, req.school_year], (err, resp) => {
        if (err) res.status(401).json({success: false, message: `Erreur: ${err}`});
        else res.status(201).json({success: true, message: resp.length})
   }) 
}

module.exports.deleteSection = (req, res) => {
    const {id} = req.params;    
    try {
        req.connection.query('SELECT * FROM class WHERE section = ? AND school_year = ?', [id, req.school_year], (err, resp) => {
            if (err) res.status(401).json({success: false, message: 'Une erreur est survenue : \n '+err});
            else{
                
                if (resp.length > 0) {
                    if (err) res.status(401).json({success: false, message: 'Veuillez supprimer toutes les classes affiliees a cette section pour continuer !!'});
                } else {
                    req.connection.query('DELETE FROM sections WHERE id = ? AND school_year = ?', [id, req.school_year], (err2, resp2) => {
                        if (err2) res.status(401).json({success: false, message: 'Une erreur est survenue : \n '+err2});
                        else res.status(201).json({success: true})
                    })
                }
            }    
        })
    } catch (e) {
        res.status(401).json({success: false, message: `Erreur : ${e}`})
    }
}
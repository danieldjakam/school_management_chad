module.exports.store = async (req, res) => {
    const {name, section, over} = req.body;
    if ( name && section && over) {
        if (name.length < 3 || name.length > 255) {
            res.status(401).json({success: false, message: "Le nom doit etre compris entre 5 et 255 caracteres !!"})
        }
        else if (over < 0 || over > 200) {
            res.status(401).json({success: false, message: "Le total la matiere doit etre compris entre 0 et 20 "})
        }
        else{
            req.connection.query('INSERT INTO subjects(name, over, section, school_year) VALUES(?, ?, ?, ?)', 
                                    [name, over, section, req.school_year], (err, resp) => {
                if(!err) res.status(201).json({success: true})
                else console.log(err);
            })
        }
    }else{
        res.status(401).json({success: false, message: "Remplir tous les champs svp !!"})
    }
}
 
module.exports.all = (req, res) => {
    req.connection.query(`SELECT subjects.name, subjects.id, subjects.over, 
                            sections.name as section_name 
                            FROM subjects 
                            JOIN sections ON sections.id = subjects.section WHERE subjects.school_year = ?`, [req.school_year], (err, resp) => {
        if(err) console.log(err)
        else res.status(201).json(resp);
    })
}

module.exports.all2 = (req, res) => {
    const {type} = req.params;
    req.connection.query(`SELECT subjects.name, subjects.id, subjects.over 
                        FROM subjects JOIN sections ON sections.id = subjects.section 
                        WHERE sections.type = ? AND subjects.school_year = ?`, [type, req.school_year], (err, resp) => {
        if(err) console.log(err)
        else res.status(201).json(resp);
        
    })
}

module.exports.one = (req, res) => {
    req.connection.query('SELECT * FROM subjects WHERE id = ? AND school_year = ?', [req.params.id, req.school_year], (err, resp) => {
        if(err) console.log(err);
        else res.status(201).json(resp[0]);
    })
}

module.exports.update = (req, res) => {
    const {name, section, over} = req.body;
    if ( name && section && over) {
        if (name.length < 3 || name.length > 255) {
            res.status(401).json({success: false, message: "Le nom doit etre compris entre 5 et 255 caracteres !!"})
        }
        else if (over < 0 || over > 200) {
            res.status(401).json({success: false, message: "Le total la matiere doit etre compris entre 0 et 20 "})
        }
        else{
            req.connection.query('UPDATE subjects SET name = ?, over = ?, section = ? WHERE id = ? AND school_year  = ?', 
                                [name, over, section, req.params.id, req.school_year], (err, resp) => {
                if(!err) res.status(201).json({success: true})
                else console.log(err);
            })
        }
    }else{
        res.status(401).json({success: false, message: "Remplir tous les champs svp !!"})
    }
}

module.exports.delete = (req, res) =>{
    const {id} = req.params;
    req.connection.query('DELETE FROM subjects WHERE id = ? AND school_year = ?', [id, req.school_year], (err, resp) => {
        res.status(201).json({success: true})
    })
}
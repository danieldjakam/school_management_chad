module.exports.addTrimestre = async (req, res) => {
    const {name, seqIds} = req.body;
    if ( name && name !== '' ) {
        if (name.length < 5 || name.length > 30) {
            res.status(401).json({success: false, message: "Le pseudo doit etre compris entre 5 et 30 caracteres !!"})
        }
        else{
            req.connection.query('INSERT INTO trims(id, name, school_year) VALUES(?, ?, ?)', 
                                [req.jwt.sign(name, req.env.SECRET), name, req.school_year], (err, resp) => {
                if(!err) res.status(201).json({success: true})
                else console.log(err);
            })
        }
    }else{
        res.status(401).json({success: false, message: "Remplir tous les champs ducond !!"})
    }
}

module.exports.getAllTrimestre = (req, res) => {
    req.connection.query('SELECT * FROM trims WHERE school_year = ?', [req.school_year], (err, resp) => {
        if(err) console.log(err);
        else res.status(201).json(resp)
    })
}

module.exports.getOneTrimestre = (req, res) => {
    req.connection.query('SELECT * FROM trims WHERE id = ? AND school_year = ?', [req.params.id, req.school_year], (err, resp) => {
        if(err) console.log(err);
        else res.status(201).json(resp[0])
    })
}

module.exports.update = (req, res) => {
    const {name} = req.body;
    if (name && name !== '') {
        req.connection.query('UPDATE trims SET name = ? WHERE id = ? AND school_year = ?', [name, req.params.id, req.school_year], (err, resp) => {
            if(err) console.log(err);
            else res.status(201).json({success: true})
        })
    }else{
        res.status(401).json({success: false, message: "Remplir tous les champs ducond !!"})
    }
}

module.exports.deleteTrimestre = (req, res) => {
    const {id} = req.params;
    console.log(id);
    
    req.connection.query('DELETE FROM trims WHERE id = ? AND school_year = ?', [id, req.school_year], (err, resp) => {
        res.status(201).json({success: true})
    })
}
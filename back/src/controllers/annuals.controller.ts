module.exports.add = (req, res) => {
    const {name} = req.body;
    if (name) {
        if (name.length < 3) {
            res.status(401).json({success: false, message: 'Le nom de l\'exam annuel doit avoir au moins 3 caracteres!!'})
        }
        else{
            req.connection.query('SELECT year_school FROM settings WHERE school_id = ?', [req.payload.school_id], (rerr, respe) => {
                const {year_school} = respe[0];
                req.connection.query('INSERT INTO annual_exams(name, school_year) VALUES(?, ?)', [name, year_school], (err, resp) => {
                    if(err) console.log(err);
                    else res.status(201).json({success: true})
                })
            })
        }
    }else{
        res.status(401).json({success: false, message: 'Svp remplissez tous les champs !!'})
    }
}

module.exports.update = (req, res) => {
    const {name} = req.body;
    const {id} = req.params;
    if (name) {
        if (name.length < 3) {
            res.status(401).json({success: false, message: 'Le nom de l\'exam annuel doit avoir au moins 3 caracteres!!'})
        }
        else{
            req.connection.query('UPDATE annual_exams SET name = ? WHERE id = ?', [name, id], (err, resp) => {
                if(err) console.log(err);
                else res.status(201).json({success: true})
            })
        }
    }else{
        res.status(401).json({success: false, message: 'Svp remplissez tous les champs !!'})
    }
}

module.exports.all = (req, res) => {
    req.connection.query('SELECT year_school FROM settings WHERE school_id = ?', [req.payload.school_id], (rerr, respe) => {
        const {year_school} = respe[0];
        req.connection.query('SELECT * FROM annual_exams WHERE school_year = ?', [year_school], (err, resp) => {
            if(err) console.log(err);
            else res.status(201).json(resp)
        })
    })
}

module.exports.one = (req, res) => {
    req.connection.query('SELECT year_school FROM settings WHERE school_id = ?', [req.payload.school_id], (rerr, respe) => {
        const {year_school} = respe[0];
        req.connection.query('SELECT * FROM annual_exams WHERE school_year = ? AND id = ?', [year_school, req.params.id], (err, resp) => {
            if(err) console.log(err);
            else res.status(201).json(resp[0])
        })
    })
}

module.exports.delete = (req, res) => {
    const {id} = req.params;
    req.connection.query('SELECT year_school FROM settings WHERE school_id = ?', [req.payload.school_id], (rerr, respe) => {
        const {year_school} = respe[0];
        req.connection.query('DELETE FROM annual_exams WHERE id = ? AND school_year = ?', [id, year_school, req.payload.school_id], (err, resp) => {
            res.status(201).json({success: true})
        })
    })
}
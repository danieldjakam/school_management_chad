module.exports.get_settings = (req, res) => {
    req.connection.query('SELECT * FROM settings WHERE school_id = ?', [req.payload.school_id], (err, resp) => {
        res.status(201).json(resp[0]);
    })
}

module.exports.editSettings = (req, res) => {
    const {id, year_school, is_editable} = req.body
    req.connection.query('UPDATE settings SET is_editable = ?, year_school = ? WHERE id = ? AND school_id = ?', [is_editable, year_school, id, req.payload.school_id], (err, resp) => {
        if (err ) {
            console.log(err);
            res.status(401).json({
                success: false,
                message: 'Erreur'
            })
        }else{
            res.status(201).json({
                success: true
            })
        }
    })
}
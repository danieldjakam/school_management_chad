module.exports = (req, res, next) => {
    const token = req.headers.authorization;

    try {
        const payload = req.jwt.verify(token, req.env.SECRET);
        req.payload = payload;
        req.connection.query('SELECT year_school FROM settings WHERE school_id = ?', [payload.school_id], (err, settings) => {
            const {year_school} = settings[0];
            req.school_year = year_school;
            next();
        })
    } catch (err) {
        res.status(401).json({success: false, message: 'Bandits!!'})
    }
}
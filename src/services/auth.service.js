const db = require('../db')

const checkUserWithCredentials = (login, password) => {
    const row = db.prepare('SELECT * FROM users WHERE login=? AND password=?').get(login, password);

    return row
};

const authGuard = (req, res, next) =>{
    if(req.session.isAuthenticated){
        next();
    }else{
        res.redirect(`/login?redirect=${req.originalUrl}`);
    }
};

module.exports = {
    checkUserWithCredentials,
    authGuard
};
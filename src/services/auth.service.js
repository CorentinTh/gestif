const db = require('../db')

const checkUserWithCredentials = (login, password) => {
    console.log(login, password);
    const row = db.prepare('SELECT * FROM users WHERE login=? AND password=?').get(login, password);

    console.log(row);

    return row
};

module.exports = {
    checkUserWithCredentials
};
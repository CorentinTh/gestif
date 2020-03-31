const db = require('../db')

const checkUserWithCredentials = (login, password) => {
    const row = db.prepare('SELECT * FROM users WHERE login=? && password=?').get(login, password);

    console.log(row);

    return row
};

db.prepare('CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY, login TEXT NOT NULL, password TEXT NOT NULL)').run();

module.exports = {

}
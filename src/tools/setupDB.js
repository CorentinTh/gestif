const db = require('../db');

db.prepare(`
CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY, 
    login TEXT NOT NULL, 
    password TEXT NOT NULL
)
`).run();

console.log(db.prepare(`
INSERT INTO users (login, password) VALUES 
(?, ?)
`).run('test', 'test'));
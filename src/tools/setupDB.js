const db = require('../db');

db.prepare(`DROP TABLE IF EXISTS users`).run();
db.prepare(`DROP TABLE IF EXISTS marks`).run();
db.prepare(`DROP TABLE IF EXISTS students`).run();

db.prepare(`
CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY, 
    login TEXT NOT NULL, 
    password TEXT NOT NULL
);`).run();

db.prepare(`
CREATE TABLE IF NOT EXISTS students (
    id INTEGER PRIMARY KEY, 
    firstname TEXT NOT NULL, 
    lastname TEXT NOT NULL
);`).run();

db.prepare(`
CREATE TABLE IF NOT EXISTS marks (
    id INTEGER PRIMARY KEY, 
    mark INTEGER NOT NULL, 
    studentsId INTEGER NOT NULL,
    course TEXT NOT NULL,
    FOREIGN KEY(studentsId) REFERENCES students(id)
);

`).run();

console.log(db.prepare(`
INSERT INTO users (login, password) VALUES 
(?, ?)
`).run('test', 'test'));

db.prepare(`
INSERT INTO students (firstname, lastname) VALUES 
('Mac', 'Meillac'), ('Balthov', 'Luchini')
`).run();

db.prepare(`
INSERT INTO marks (course, mark, studentsId) VALUES 
('FD', 0, 1), ('OGP', 1, 2)
`).run();
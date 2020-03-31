const db = require('../db');
const courses = require('./courses');

const users = [{'firstname':'Jean','lastname':'Girard'},{'firstname':'Milo','lastname':'Thomas'},{'firstname':'Aurore','lastname':'Lucas'},{'firstname':'Marin','lastname':'Dumas'},{'firstname':'Emmie','lastname':'Charles'},{'firstname':'Loane','lastname':'Leclerc'},{'firstname':'Maëlle','lastname':'Marie'},{'firstname':'Marius','lastname':'Gautier'},{'firstname':'Tom','lastname':'Brun'},{'firstname':'Antoine','lastname':'Petit'},{'firstname':'Sacha','lastname':'Dumont'},{'firstname':'Jeanne','lastname':'Leclerc'},{'firstname':'Norah','lastname':'Dubois'},{'firstname':'Léonard','lastname':'Bonnet'},{'firstname':'Rayan','lastname':'Jean'},{'firstname':'Alyssia','lastname':'Carpentier'},{'firstname':'Martin','lastname':'Lacroix'},{'firstname':'Léane','lastname':'Robert'},{'firstname':'Margot','lastname':'Garcia'},{'firstname':'Charlie','lastname':'Petit'},{'firstname':'Edgar','lastname':'Brun'},{'firstname':'Axel','lastname':'Rousseau'},{'firstname':'Léane','lastname':'Roux'},{'firstname':'Charlie','lastname':'Boyer'},{'firstname':'Inaya','lastname':'Fontai'},{'firstname':'Lena','lastname':'Girard'},{'firstname':'Cassandra','lastname':'Dubois'},{'firstname':'Mélody','lastname':'Chevalier'},{'firstname':'Maya','lastname':'Bourgeois'},{'firstname':'Lyam','lastname':'Rousseau'},{'firstname':'Lison','lastname':'Gautier'},{'firstname':'Albane','lastname':'Dupuis'},{'firstname':'Lohan','lastname':'Moreau'},{'firstname':'Anaïs','lastname':'Thomas'},{'firstname':'Maxence','lastname':'Nicolas'},{'firstname':'Eden','lastname':'Menard'},{'firstname':'Lucie','lastname':'Dumas'},{'firstname':'Apolline','lastname':'Thomas'},{'firstname':'Liam','lastname':'Giraud'},{'firstname':'Charline','lastname':'Fernandez'},{'firstname':'Malone','lastname':'Gautier'},{'firstname':'Andréa','lastname':'Noel'},{'firstname':'Yann','lastname':'Menard'},{'firstname':'Emeline','lastname':'Clement'},{'firstname':'Noemie','lastname':'Berger'},{'firstname':'Thaïs','lastname':'Denis'},{'firstname':'Anthony','lastname':'Marchand'},{'firstname':'Eliot','lastname':'Arnaud'},{'firstname':'Eva','lastname':'Brunet'},{'firstname':'Rafael','lastname':'Roux'},{'firstname':'Lia','lastname':'Hubert'},{'firstname':'Héloïse','lastname':'Richard'},{'firstname':'Sara','lastname':'Deschamps'},{'firstname':'Elliot','lastname':'Lemoine'},{'firstname':'Nathan','lastname':'Arnaud'},{'firstname':'Kaïs','lastname':'Picard'},{'firstname':'Timeo','lastname':'Roche'},{'firstname':'Enola','lastname':'Guerin'},{'firstname':'Marion','lastname':'Chevalier'},{'firstname':'Malo','lastname':'Chevalier'},{'firstname':'Alyssia','lastname':'Rolland'},{'firstname':'Robin','lastname':'Denis'},{'firstname':'Elya','lastname':'Thomas'},{'firstname':'Angelina','lastname':'Sanchez'},{'firstname':'Ambre','lastname':'Dupuis'},{'firstname':'Paul','lastname':'Boyer'},{'firstname':'Léandro','lastname':'Bernard'},{'firstname':'Lyam','lastname':'Martin'},{'firstname':'Célestin','lastname':'Lucas'},{'firstname':'Gauthier','lastname':'Dubois'},{'firstname':'Bastien','lastname':'Leclerc'},{'firstname':'Anaïs','lastname':'Vincent'},{'firstname':'Louna','lastname':'Leroy'},{'firstname':'Anatole','lastname':'Lopez'},{'firstname':'Basile','lastname':'Fleury'},{'firstname':'Loane','lastname':'Guillaume'},{'firstname':'Pierre','lastname':'Colin'},{'firstname':'Alexandre','lastname':'Roger'},{'firstname':'Tony','lastname':'Blanchard'},{'firstname':'Jonas','lastname':'Fontai'},{'firstname':'Sandra','lastname':'Lemoine'},{'firstname':'Apolline','lastname':'Gonzalez'},{'firstname':'Dorian','lastname':'Leclercq'},{'firstname':'Edgar','lastname':'Robin'},{'firstname':'Loris','lastname':'Louis'},{'firstname':'Chloé','lastname':'Girard'},{'firstname':'Rémi','lastname':'Vincent'},{'firstname':'Rose','lastname':'Bonnet'},{'firstname':'Marie','lastname':'Dupont'},{'firstname':'Lila','lastname':'Rey'},{'firstname':'Lilly','lastname':'Andre'},{'firstname':'Louane','lastname':'Lucas'},{'firstname':'Clément','lastname':'Robert'},{'firstname':'Mathys','lastname':'Dubois'},{'firstname':'Margaux','lastname':'Vidal'},{'firstname':'Lilou','lastname':'Pierre'},{'firstname':'Clarisse','lastname':'Gonzalez'},{'firstname':'Laly','lastname':'Guillaume'},{'firstname':'Cassandre','lastname':'Fabre'},{'firstname':'Morgane','lastname':'Deschamps'}];

const randomCourse = () => courses[Math.floor(Math.random() * courses.length)];

const resetDB = () => {
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

    db.prepare(`INSERT INTO users (login, password) VALUES (?, ?)`).run('test', 'test');

    db.prepare(`INSERT INTO students (firstname, lastname) VALUES ${users.map(u =>`('${u.firstname}', '${u.lastname}')`).join(', ')}`).run();

    db.prepare(`
INSERT INTO marks (course, mark, studentsId) VALUES 
${users.map((u, i) => Array(Math.floor(Math.random()*5) +3).fill(0).map(() => `('${randomCourse()}', ${Math.floor(Math.random()*20)}, ${i+1})`).join(', ')).join(', ')}
`).run();
};

resetDB();

module.exports = {
    resetDB
};
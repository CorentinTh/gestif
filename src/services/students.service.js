const db = require('../db');

const getTenStudents = (offSet) => {
    return db.prepare('SELECT * FROM students LIMIT 10 OFFSET ?').all(offSet * 10);
};

const getStudentById = (id) => {
    return db.prepare('SELECT * FROM students Where Id = ?').get(id);
};

module.exports = {
    getTenStudents,
    getStudentById
};


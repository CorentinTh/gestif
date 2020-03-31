const db = require('../db');

const getTenStudents = (offSet) => {
    return db.prepare('SELECT * FROM students LIMIT 10 OFFSET ' + (offSet * 10)).all();
};

module.exports = {
    getTenStudents
};


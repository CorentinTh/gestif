const db = require('../db')

const getStudentMarks = (studentId) => db.prepare('SELECT * FROM marks WHERE studentsId=?').all(studentId);

const addStudentMark = (studentId, course, mark) => db.prepare('INSERT INTO marks (studentsId, course, mark) VALUES (?, ?, ?)').run(studentId, course, mark);

const deleteMark = (id) => db.prepare('DELETE FROM marks WHERE id=?').run(id);

module.exports = {
    getStudentMarks,
    addStudentMark,
    deleteMark
};
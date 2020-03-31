const {deleteMark} = require("../services/notes.services");
const {addStudentMark} = require("../services/notes.services");
const {getStudentById} = require("../services/students.service");
const {getTenStudents} = require("../services/students.service");
const {getStudentMarks} = require("../services/notes.services");
const {authGuard} = require("../services/auth.service");

const {Router} = require('express');

const router = Router();

router.get('/', authGuard, (req, res) => {
    let {page} = req.query;

    page = page || 1;
    const parsed = parseInt(page);
    const correctPage= isNaN(parsed) ? 1 : parsed;

    res.render('students', {
        students: getTenStudents(correctPage- 1 ),
        page,
        correctPage
    })
});


router.get('/:id', authGuard, (req, res) => {
    const {id} = req.params;

    const student = getStudentById(id);
    const marks = getStudentMarks(id);

    res.render('student', {student, marks})
});

router.post('/:id/notes', authGuard, (req, res) => {
    const {id} = req.params;
    const {course, mark} = req.body;

    addStudentMark(id, course, mark);

    req.flash('success', 'Note ajoutée.');

    res.redirect(`/students/${id}`);
});


router.get('/:id/notes/delete/:noteId', authGuard, (req, res) => {
    const {id, noteId} = req.params;

    deleteMark(noteId);
    req.flash('success', 'Note supprimée.');

    res.redirect(`/students/${id}`);
});


module.exports = router;
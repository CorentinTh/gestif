const {Router} = require('express');
const authService = require('../services/auth.service');

const router = Router();

router.get('/', (req, res) => {
    res.render('home')
});

router.get('/login', (req, res) => {
    res.render('login');
});

router.post('/login', (req, res) => {
    res.redirect('/students');
});

module.exports = router;
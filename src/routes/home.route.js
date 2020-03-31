const {Router} = require('express');
const authService = require('../services/auth.service');
const {resetDB} = require("../tools/setupDB");

const router = Router();

router.get('/', (req, res) => {
    res.render('home', req.session)
});

router.get('/login', (req, res) => {
    if(req.session.isAuthenticated){
        res.redirect('/students')
    }else{
        res.render('login');
    }
});

router.post('/login', (req, res) => {
    const {login, password} = req.body;
    const {redirect} = req.query;

    const user = authService.checkUserWithCredentials(login, password);

    if(user){
        req.session.user = user;
        req.session.isAuthenticated = true;
        req.flash('success', 'Bien le bonjour !');

        res.redirect(redirect || '/students');
    }else{
        req.flash('danger', 'Login ou mot de pass incorrects');
        res.redirect('/login');
    }

});

router.get('/about', (req, res) => {
    res.render('about');
});

router.get('/resetDB', (req, res) => {
    resetDB();

    req.flash('info', 'db reset');
    res.redirect('/')
});


module.exports = router;
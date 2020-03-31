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
    const {login, password} = req.body;

    const user = authService.checkUserWithCredentials(login, password);

    if(user){
        req.session.user = user;
        req.session.isAuthenticated = true;

        res.redirect('/students');
    }else{
        res.json(user);
    }

});

module.exports = router;
const express = require('express');
const bodyParser = require('body-parser');
const exphbs  = require('express-handlebars');
const session  = require('express-session');
const {join} = require('path');

const port = process.env.PORT || 3000;
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');
app.set('views', join(__dirname, 'views'));
app.use(session({
    secret: 'yolololololo',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));

app.use('/', require('./routes/home.route'));
app.use('/students', require('./routes/students.route'));

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
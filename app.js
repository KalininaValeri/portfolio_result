const express = require('express');
const app = express();
const http = require('http');
const fs = require('fs');
const path = require('path');
const logger = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const server = http.createServer(app);
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

const currentStatic = require('./gulp/config').root;
const config = require('./config.json');
const uploadDir = config.upload;

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

mongoose.connect('mongodb://loft-admin:loft-admin@ds127190.mlab.com:27190/portfolio');

//models
require('./models/blog');
require('./models/pic');
require('./models/user');
require('./models/skills');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, currentStatic)));
app.use(session({
    secret: 'secret',
    key: 'keys',
    cookie: {
        path: '/',
        httpOnly: true,
        maxAge: null
    },
    saveUninitialized: false,
    resave: false,
    store: new MongoStore({mongooseConnection: mongoose.connection})
}));

//routing

app.use('/', require('./routes/index'));
app.use('/upload', require('./routes/upload'));
app.use('/work', require('./routes/work'));
app.use('/addpost', require('./routes/addpost'));
app.use('/admin', require('./routes/admin'));
// app.use('/login', require('./routes/login'));

// 404 catch-all handler (middleware)
app.use(function (req, res, next) {
    res
        .status(404)
        .render('404');
});

// 500 error handler (middleware)
app.use(function (err, req, res, next) {
    console.error(err.stack);
    res
        .status(500)
        .render('500');
});

server.listen(3000, '188.225.35.18');
server.on('listening', function () {
    if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir);
    }
    console.log('Express server started on port %s at %s', server.address().port, server.address().address);
});

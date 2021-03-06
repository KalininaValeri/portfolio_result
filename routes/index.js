const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const crypto = require('crypto');

router.get('/', function(req, res) {
    let obj = {title: 'Портфолио'};
    Object.assign(obj, req.app.locals.settings);
    res.render('pages/index', obj);
});

//при получении post-запроса по адресу /login
router.post('/', (req, res) => {
    //требуем наличия логина и пароля в теле запроса
    if (!req.body.login || !req.body.password) {
    //если не указан логин или пароль - сообщаем об этом
    return res.json({status: 'Укажите логин и пароль!'});
}

//получаем модель пользователя и шифруем введенный пароль
const Model = mongoose.model('user');
const password = crypto.createHash('md5').update(req.body.password).digest('hex');

//пытаемся найти пользователя с указанным логином и паролем
Model.findOne({login: req.body.login, password: password}).then(item => {
    //если такой пользователь не найден - сообщаем об этом
    if (!item) {
    res.json({status: 'Логин и/или пароль введены неверно!'});
} else {
    //если найден, то делаем пометку об этом в сессии пользователя, который сделал запрос
    req.session.isAdmin = true;
    res.json({status: 'Авторизация успешна!'});
}
});
});

router.get('/about', function(req, res) {
    let obj = {title: 'Мои работы'};
    const Model = mongoose.model('skills');
    Model.find().then(function (items) {

        Object.assign(obj, {items: items[items.length - 1]});
        res.render('pages/about', obj);
        console.log(obj);
    });
});

router.get('/blog', function(req, res) {
    let obj = {title: 'Блог'};
    const Model = mongoose.model('blog');
    Model.find().then(function (items) {
        Object.assign(obj, {items: items});
        res.render('pages/blog', obj);
    });
});

// router.get('/blog', function(req, res) {
//     let obj = {title: 'Blog'};
//     const Model = mongoose.model('blog');
//
//     Model.find().then(function(items) {
//         Object.assign(obj, {items: items});
//     res.render('pages/blog', obj);
// });



// });

module.exports = router;
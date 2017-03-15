const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const crypto = require('crypto');

const isAdmin = (req, res, next) => {
    // если в сессии текущего пользователя есть пометка о том, что он является
    // администратором
    if (req.session.isAdmin) {
        //то всё хорошо :)
        return next();
    }
    //если нет, то перебросить пользователя на главную страницу сайта
    res.redirect('/');
};

router.get('/', isAdmin, function(req, res) {
    let obj = {title: 'Обо мне'};
    res.render('pages/admin', obj);
});

router.post('/', isAdmin, function (req, res) {
    //требуем наличия заголовка, даты и текста
    if (!req.body.html || !req.body.css || !req.body.js || !req.body.php || !req.body.sql || !req.body.node || !req.body.mongo || !req.body.git || !req.body.gulp || !req.body.bower) {
        //если что-либо не указано - сообщаем об этом
        return res.json({status: 'Укажите данные!'});
    }
    const Model = mongoose.model('skills');
    let item = new Model({html: req.body.html, css: req.body.css, js: req.body.js, php: req.body.php, sql: req.body.sql, node: req.body.node, mongo: req.body.mongo, git: req.body.git, gulp: req.body.gulp, bower: req.body.bower});
    console.log(item);
    item.save().then(
        function (i) {
            return res.json({status: 'Ok'});
        },
        function (e) {
            const error = Object
                .keys(e.errors)
                .map(function(key){e.errors[key].message}
                )
                .
                join(', ');
            res.json({status: 'Oшибка: ' + error});
        }
    );
});


module.exports = router;

const express = require('express');
const router = express.Router();
const formidable = require('formidable');
const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const config = require('../config.json');

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

router.get('/', isAdmin, function (req, res) {
    let obj = {
        title: 'Мои работы'
    };
    res.render('pages/upload', obj);
});

router.post('/', isAdmin, function (req, res) {
    let form = new formidable.IncomingForm();
    form.uploadDir = config.upload;
    form.parse(req, function (err, fields, files) {
        console.log(fields);
        if (err) {
            return res.json({status: 'Не удалось загрузить'});
        }
        // if (!fields.name) {
        //     return res.json({status: 'Не указано описание картинки!'});
        // }
        const Model = mongoose.model('pic');

        fs
            .rename(files.photo.path, path.join(config.upload, files.photo.name), function (err) {
                if (err) {
                    fs.unlink(path.join(config.upload, files.photo.name));
                    fs.rename(files.photo.path, files.photo.name);
                }
                let dir = config.upload.substr(config.upload.indexOf('/'));
                // const item = new Model({name: fields.name, picture: path.join(dir, files.photo.name)});
                // item.save().then(pic => {
                //   res.json({status: 'Картинка успешно загружена'});
                // });

                const item = new Model({title: fields.title, technology: fields.technology, siteUrl: fields.siteUrl});

                console.log('fields.name', fields.name);
                console.log('files.photo.name', files.photo.name);

                item.save().then(pic => {
                    Model.update({_id: pic._id}, {$set: {picture: path.join(dir, files.photo.name)}}, {upsert: true})
                    .then(
                        i => res.json({status: 'Успешно загружена'}),
                    e => res.json({status: e.message})
                );
            });

            });
    });
});

module.exports = router;
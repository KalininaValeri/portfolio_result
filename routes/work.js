const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const config = require('../config.json');
const smtpTransport = require('nodemailer-smtp-transport');
const mongoose = require('mongoose');

router.get('/', function (req, res) {
    let obj = {
        title: 'Мои работы'
    };

    const Model = mongoose.model('pic');
    Model.find().then(function (items) {
        Object.assign(obj, {items: items});
        console.log(obj);
        res.render('pages/work', obj);
    });
});

router.post('/', function (req, res) {
    //требуем наличия имени, обратной почты и текста
    if (!req.body.name || !req.body.email || !req.body.text) {
        //если что-либо не указано - сообщаем об этом
        return res.json({status: 'Укажите данные!'});
    }

    //инициализируем модуль для отправки писем и указываем данные из конфига
    const transporter = nodemailer.createTransport(smtpTransport({
        service: 'gmail',
        auth: {
            user: config.mail.user,
            pass: config.mail.pass
        }
    }));

    const mailOptions = {
        from: req.body.email,
        to: config.mail.user,
        subject: config.mail.subject,
        text: req
            .body
            .text
            .trim()
            .slice(0, 500)
    };

    //отправляем почту
    transporter.sendMail(mailOptions, function (error, info) {
        //если есть ошибки при отправке - сообщаем об этом
        if (error) {
            console.log(error);
            return res.json({status: 'При отправке письма произошла ошибка'});
        }
        res.json({status: 'Письмо успешно отправлено'});
    });
});

// router.post('/', (req, res) => {
//     //требуем наличия имени, обратной почты и текста
//     if (!req.body.name || !req.body.email || !req.body.text) {
//     //если что-либо не указано - сообщаем об этом
//     return res.json({status: 'Укажите данные!'});
// }
// //инициализируем модуль для отправки писем и указываем данные из конфига
// const transporter = nodemailer.createTransport(smtpTransport({
//     service: 'gmail',
//     auth: {
//         user: config.mail.user,
//         pass: config.mail.pass
//     }
// }));
//
// const mailOptions = {
//     from: req.body.email,
//     to: config.mail.user,
//     subject: config.mail.subject,
//     text: req
//         .body
//         .text
//         .trim()
//         .slice(0, 500)
// };
//
// //отправляем почту
// transporter.sendMail(mailOptions, function (error, info) {
//     //если есть ошибки при отправке - сообщаем об этом
//     if (error) {
//         return res.json({status: 'При отправке письма произошла ошибка'});
//     }
//     res.json({status: 'Письмо успешно отправлено'});
// });
// });

module.exports = router;
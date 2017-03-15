'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const PicSchema = new Schema({
    title: {
        type: String,
        required: [true, 'Укажите описание картинок']
    },
    technology: {
        type: String,
        required: [true, 'Укажите технологии']
    },
    siteUrl: {
        type: String,
        required: [true, 'Укажите адрес сайта']
    },
    picture: {
        type: String
    }
});

mongoose.model('pic', PicSchema);
'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const SkillsSchema = new Schema({
    html: {
        type: String
    },
    css: {
        type: String
    },
    js: {
        type: String
    },
    php: {
        type: String
    },
    sql: {
        type: String
    },
    node: {
        type: String
    },
    mongo: {
        type: String
    },
    git: {
        type: String
    },
    gulp: {
        type: String
    },
    bower: {
        type: String
    }
});

mongoose.model('skills', SkillsSchema);
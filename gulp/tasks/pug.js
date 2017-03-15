'use strict';

module.exports = function () {
    $.gulp.task('pug', function () {
        let locals = require('../../config.json');

        return $.gulp.src('./source/views/pages/*.pug')
            .pipe($.gp.pug({
                locals: locals,
                pretty: true

            }))
            .on('error', $.gp.notify.onError(function (error) {
                return {
                    title: 'Pug',
                    message: error.message
                }
            }))
            .pipe($.gulp.dest($.config.root));
    });
};

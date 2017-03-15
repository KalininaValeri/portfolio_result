'use strict';

module.exports = function() {
    $.gulp.task('sprite', function () {
        return $.gulp.src('./source/images/sprites/png/*.*')
            .pipe($.gp.spritesmith({
                imgName: '../img/sprite.png',
                cssName: 'sprite.css'
            }))
            .pipe($.gp.if('*.png', $.gulp.dest('./build/assets/img/')))
            .pipe($.gp.if('*.css', $.gulp.dest('./source/style/blocks/')));
    });
};


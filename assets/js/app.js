(function() {
  'use strict';

  setTimeout(function() {
    // document.querySelector('.greating_picture').classList.add('m--show');
  }, 1000);
})();

var blur = (function () {
    var container = $('.c-form-container'),
        form = $('.c-form-wrapper');

    return {
        set: function () {
            var img = $('.c-block-bg_pic'),
                imgWidth = img.width(),
                imgHeight = img.height(),
                posLeft = -container.offset().left,
                posTop = -container.position().top;

            // blurCss.backgroundSize = imgWidth + 'px' + ' ' + imgHeight + 'px';
            // blurCss.backgroundPosition = posLeft + 'px' + ' ' + posTop + 'px';
            form.css({'background-size': imgWidth + 'px' + ' ' + imgHeight + 'px', 'background-position': posLeft + 'px' + ' ' + posTop + 'px'});
        }
    }
}());

var parallax = (function (){
    var bg = document.querySelector('.l-hero__bg-pic');
    var user = document.querySelector('.c-user');
    var fon = document.querySelector('.c-user__bg');

    return {
        move: function(block, windowScroll, strafeAmound){
            var strafe = windowScroll / -strafeAmound + '%';
            var transformString = 'translate3d(0,' + strafe + ', 0)';
            var style = block.style;

            style.transform = transformString;
            style.webkitTransform = transformString;

        },
        init: function(wScroll) {
            this.move(bg, wScroll, 80);
            this.move(fon, wScroll, 20);
        }
    }

}());



$(function () {
    $('.l-hero').height($(window).height());

    window.onscroll = function(){
        var wScroll = window.pageYOffset;
        parallax.init(wScroll);
    };

    blur.set();
    $(window).resize(function () {
        blur.set();
    });



});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImFwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgLy8gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmdyZWF0aW5nX3BpY3R1cmUnKS5jbGFzc0xpc3QuYWRkKCdtLS1zaG93Jyk7XG4gIH0sIDEwMDApO1xufSkoKTtcblxudmFyIGJsdXIgPSAoZnVuY3Rpb24gKCkge1xuICAgIHZhciBjb250YWluZXIgPSAkKCcuYy1mb3JtLWNvbnRhaW5lcicpLFxuICAgICAgICBmb3JtID0gJCgnLmMtZm9ybS13cmFwcGVyJyk7XG5cbiAgICByZXR1cm4ge1xuICAgICAgICBzZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciBpbWcgPSAkKCcuYy1ibG9jay1iZ19waWMnKSxcbiAgICAgICAgICAgICAgICBpbWdXaWR0aCA9IGltZy53aWR0aCgpLFxuICAgICAgICAgICAgICAgIGltZ0hlaWdodCA9IGltZy5oZWlnaHQoKSxcbiAgICAgICAgICAgICAgICBwb3NMZWZ0ID0gLWNvbnRhaW5lci5vZmZzZXQoKS5sZWZ0LFxuICAgICAgICAgICAgICAgIHBvc1RvcCA9IC1jb250YWluZXIucG9zaXRpb24oKS50b3A7XG5cbiAgICAgICAgICAgIC8vIGJsdXJDc3MuYmFja2dyb3VuZFNpemUgPSBpbWdXaWR0aCArICdweCcgKyAnICcgKyBpbWdIZWlnaHQgKyAncHgnO1xuICAgICAgICAgICAgLy8gYmx1ckNzcy5iYWNrZ3JvdW5kUG9zaXRpb24gPSBwb3NMZWZ0ICsgJ3B4JyArICcgJyArIHBvc1RvcCArICdweCc7XG4gICAgICAgICAgICBmb3JtLmNzcyh7J2JhY2tncm91bmQtc2l6ZSc6IGltZ1dpZHRoICsgJ3B4JyArICcgJyArIGltZ0hlaWdodCArICdweCcsICdiYWNrZ3JvdW5kLXBvc2l0aW9uJzogcG9zTGVmdCArICdweCcgKyAnICcgKyBwb3NUb3AgKyAncHgnfSk7XG4gICAgICAgIH1cbiAgICB9XG59KCkpO1xuXG52YXIgcGFyYWxsYXggPSAoZnVuY3Rpb24gKCl7XG4gICAgdmFyIGJnID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmwtaGVyb19fYmctcGljJyk7XG4gICAgdmFyIHVzZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYy11c2VyJyk7XG4gICAgdmFyIGZvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jLXVzZXJfX2JnJyk7XG5cbiAgICByZXR1cm4ge1xuICAgICAgICBtb3ZlOiBmdW5jdGlvbihibG9jaywgd2luZG93U2Nyb2xsLCBzdHJhZmVBbW91bmQpe1xuICAgICAgICAgICAgdmFyIHN0cmFmZSA9IHdpbmRvd1Njcm9sbCAvIC1zdHJhZmVBbW91bmQgKyAnJSc7XG4gICAgICAgICAgICB2YXIgdHJhbnNmb3JtU3RyaW5nID0gJ3RyYW5zbGF0ZTNkKDAsJyArIHN0cmFmZSArICcsIDApJztcbiAgICAgICAgICAgIHZhciBzdHlsZSA9IGJsb2NrLnN0eWxlO1xuXG4gICAgICAgICAgICBzdHlsZS50cmFuc2Zvcm0gPSB0cmFuc2Zvcm1TdHJpbmc7XG4gICAgICAgICAgICBzdHlsZS53ZWJraXRUcmFuc2Zvcm0gPSB0cmFuc2Zvcm1TdHJpbmc7XG5cbiAgICAgICAgfSxcbiAgICAgICAgaW5pdDogZnVuY3Rpb24od1Njcm9sbCkge1xuICAgICAgICAgICAgdGhpcy5tb3ZlKGJnLCB3U2Nyb2xsLCA4MCk7XG4gICAgICAgICAgICB0aGlzLm1vdmUoZm9uLCB3U2Nyb2xsLCAyMCk7XG4gICAgICAgIH1cbiAgICB9XG5cbn0oKSk7XG5cblxuXG4kKGZ1bmN0aW9uICgpIHtcbiAgICAkKCcubC1oZXJvJykuaGVpZ2h0KCQod2luZG93KS5oZWlnaHQoKSk7XG5cbiAgICB3aW5kb3cub25zY3JvbGwgPSBmdW5jdGlvbigpe1xuICAgICAgICB2YXIgd1Njcm9sbCA9IHdpbmRvdy5wYWdlWU9mZnNldDtcbiAgICAgICAgcGFyYWxsYXguaW5pdCh3U2Nyb2xsKTtcbiAgICB9O1xuXG4gICAgYmx1ci5zZXQoKTtcbiAgICAkKHdpbmRvdykucmVzaXplKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgYmx1ci5zZXQoKTtcbiAgICB9KTtcblxuXG5cbn0pOyJdfQ==

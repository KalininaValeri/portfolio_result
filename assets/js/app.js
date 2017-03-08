/**
 * Created by lera on 3/7/17.
 */

var Asside = (
    function () {


        if (!($('.l-page-nav_aside').length)) return false;

        console.log('456');

        var showSection = function (article, isAnimate) {
            var
                direction = article.replace('#', ''),
                reqArticle = $('.data-section').filter('[data-section="' + direction + '"]'),
                reqArticlePos = reqArticle.offset().top;

            if (isAnimate) {
                $('body, html').animate({scrollTop: reqArticlePos}, 500);
            } else {
                $('body, html').scrollTop(reqArticlePos);
            }
        };

        var checkSection = function () {

            $('.data-section').each(function () {
                var
                    $this = $(this),
                    topEdge = $this.offset().top - 300,
                    bottomEdge = topEdge + $this.height(),
                    wScroll = $(window).scrollTop();

                if (topEdge < wScroll && bottomEdge > wScroll) {
                    var
                        currentId = $this.data('section'),
                        activeLink = $('.l-page-nav__link').filter('[href="#' + currentId + '"]');

                    $('.l-page-nav__link').each(function () {
                       $(this).removeClass('l-page-nav__link_active');
                    });
                    activeLink.addClass('l-page-nav__link_active');
                    location.hash = '#' + currentId;
                }
            })
        };

        return {
            init: function () {

                if ($(window).width() <= 1200) {

                    $('.l-page-nav_aside__protractor').click(function () {

                        $('.l-page-nav_aside').toggleClass('l-page-nav_active');

                    });

                    $(window).scroll(function (e) {
                        checkSection();
                    });
                }

                if ($(window).width() > 1200) {

                    $(window).scroll(function (e) {
                        var
                            blockMain = $('.l-block-main'),
                            navTop = $(window).scrollTop() - blockMain.position().top + 40;

                        checkSection();

                        if (navTop < 0) {
                            navTop = 0;
                        }

                        $('.l-page-nav__list').css('top', navTop);
                    });
                }



                $('.l-page-nav__link').on('click', function (e) {
                    e.preventDefault();
                    showSection($(this).attr('href'), true);

                });

                console.log('hash ',window.location.hash);

                if (!!(location.hash)){
                    showSection(window.location.hash, false);
                }

            }
        }
    }
)();

var Flip = (function () {
    var flipContainer = document.querySelector('.flip-container');

    if (!(document.querySelector('.flip-container'))){
        return false;
    }
    
    return {
        init: function () {
            document.querySelector('.c-block-link_to-avtor').addEventListener('click' ,function () {
                flipContainer.classList.add('flip-container_back');
            });

            document.querySelector('#go-home').addEventListener('click', function (e) {
                e.preventDefault();
                flipContainer.classList.remove('flip-container_back');
            });
        }
    }
})();

var Navigation = (function () {
    var navigation = $('.c-nav_site-list'),
        parentNav = $('.content'),
        hamburger = $('#hamburger'),
        items = $('.c-nav_site__item'),
        timer;
    var counter = 0;
    var navActive = $('.c-nav_site_active');

    var ascentItems = function () {
        items[counter].classList.add('c-nav_site__hidden');
        counter++;

        timer = setTimeout(ascentItems, 100);

        if (counter >= items.length) {
            clearTimeout(timer);
        }

    };

    var listener = function () {
        hamburger[0].addEventListener('click', function () {

            hamburger.toggleClass('c-hamburger_active');
            navigation.toggleClass('c-nav_site_active');

            if (!!(parentNav.find('.c-nav_site_active').length)) {
                var newTimer;
                counter = 0;
                newTimer = setTimeout(ascentItems, 600);
                return false;
            }

            if (!(parentNav.find('.c-nav_site_active').length)) {
                for (var i = 0; i < items.length; i++) {
                    items[i].classList.remove('c-nav_site__hidden');
                }
            }

        });
    };

    return {
        init: function () {
            listener();
        }
    }
}());

var Preload = (function () {

    var percentsTotal = 0,
        preloder = $('.preloader');


    var imgPath = $('*').map(function (ndx, element) {
        var background = $(element).css('background-image'),
            isImg = $(element).is('img'),
            isVideo = $(element).is('video'),
            path = '';

        if (background != 'none'){
            path = background.replace('url("', '').replace('")', '');
        }

        if (isImg || isVideo) {
            path = $(element).attr('src');
        }

        if (path) {
            return path;
        }
    });

    var animatePercents = function (animatePercent) {
        var circlePercentages = $('.preloader__cercle-percentages')[0],
            dashoffset = animatePercent / 100 * 150.79644737231007;

        circlePercentages.style.strokeDasharray = dashoffset +' 150.79644737231007';
    };

    var setPercents = function(total, current) {

      var percents = Math.ceil(current / total * 100);

      $('.preloder__percentages').text(percents);

        animatePercents(percents);

      if (percents >= 100) {
          preloder.fadeOut();
      }
    };

    var loadImages = function (images) {

        if (!images.length) preloder.fadeOut();

      images.forEach(function (img, i, images) {
          var fakeImage = $('<img>' || '<video>', {
              attr: {
                  src: img
              }
          });

          fakeImage.on('load error', function () {
              percentsTotal++;
              setPercents(images.length, percentsTotal)
          })
      })
    };

    return {
        init: function () {
            console.log('123');

            var imgs = imgPath.toArray();
            loadImages(imgs);

            console.log('123');
        }
    }


}());

var sliderContent = [
    {
        "title": "Сайт школы онлайн образования",
        "technology": "HTML , CSS, JAVASCRIPT",
        "siteUrl": "https://loftschool.com/",
        "imgSrc": "assets/img/content/site.png",
        "number": "1"
    },
    {
        "title": "Сайт1Google",
        "technology": "HTML , CSS, JAVASCRIPT",
        "siteUrl": "https://www.google.ru",
        "imgSrc": "http://wmarea.net/wp-content/uploads/2016/05/2web_hosting_seo_site.jpg",
        "number": "2"
    },
    {
        "title": "Сайт2ya",
        "technology": "HTML , CSS, JAVASCRIPT",
        "siteUrl": "https://www.yandex.ru/",
        "imgSrc": "http://bumblebee.artdepo.com.ua/upload/iblock/db9/db937bd4877efe0315396d8a3409afef.jpg",
        "number": "3"
    },
    {
        "title": "Сайт3mail",
        "technology": "HTML , CSS, JAVASCRIPT",
        "siteUrl": "https://mail.ru/",
        "imgSrc": "http://cs01.services.mya5.ru/-/uRuRHwWV9ckwkEv-so9VGw/sv/themes/central/0/222-0/222-0.png?1452175202",
        "number": "4"
    }
];

var Slider = (function () {

    if (document.querySelector('.l-slider') === null) {
        return false;
    }

    var doc = document;
    var arrowNext = doc.querySelector('#arrow-up'),
        arrowPrev = doc.querySelector('#arrow-down'),
        $slideActiveCaption = $('#slide-active-caption'),
        $slideActiveCaptionTitle = $slideActiveCaption.find('.c-block-title'),
        $slideActiveCaptionTechnology = $slideActiveCaption.find('.c-block-text_blue'),
        $slideActiveCaptionLink = $slideActiveCaption.find('.c-block-link_blue'),
        $sliderActivePicWrapper = $('#slide-active-pic'),
        $slideActivePicSpan = $sliderActivePicWrapper.find('span'),
        $slideActivePic = $('.l-slider__pic'),
        $sliderItems = $('#slide-items'),
        $fonDark= $('.l-slider__arrow-dark'),
        currentSlide = 0,
        size = sliderContent.length;

    var Listener = function () {
        arrowNext.addEventListener('click', function (e) {
            e.preventDefault();
            clearItem();
            currentSlide = limiter(currentSlide + 1);
            buildSlider();
        });

        arrowPrev.addEventListener('click', function (e) {
            e.preventDefault();
            clearItem();
            currentSlide = limiter(currentSlide - 1);
            buildSlider();
        });
    };

    var clearItem = function () {
        nextNextSlideElement.innerHTML = '';
        nextSlideElement.innerHTML = '';
        prevSlideElement.innerHTML = '';
        prevPrevSlideElement.innerHTML = '';
    };

    var createElement = function (classPosition, classVisible) {
        var element = document.createElement('div');

        element.classList.add('l-slider__arrows-item');
        element.classList.add(classPosition);
        element.classList.add(classVisible);

        return element;
    };

    var nextNextSlideElement = createElement('l-slider__arrows-up', 'l-slider__arrows-next-next'),
        nextSlideElement = createElement('l-slider__arrows-up', 'l-slider__arrows-next'),
        prevSlideElement = createElement('l-slider__arrows-down', 'l-slider__arrows-prev'),
        prevPrevSlideElement = createElement('l-slider__arrows-down', 'l-slider__arrows-prev-prev');

    $sliderItems[0].insertBefore(prevPrevSlideElement, $fonDark[0]);
    $sliderItems[0].insertBefore(prevSlideElement, $fonDark[0]);
    $sliderItems[0].insertBefore(nextSlideElement, $fonDark[0]);
    $sliderItems[0].insertBefore(nextNextSlideElement, $fonDark[0]);

    var createImgElement = function (src) {
        var img = document.createElement('img');
        img.classList.add('l-slider__arrow-pic');
        img.setAttribute('src', src);

        return img;
    };

    var createDivElement = function (text) {
        var div = document.createElement('span');
        div.innerText = text;

        return div;
    };


    var buildSlider = function () {
        var mainSlide = sliderContent[currentSlide],
            prevSlide = sliderContent[limiter(currentSlide - 1)],
            nextSlide = sliderContent[limiter(currentSlide + 1)],
            nextNextSlide = sliderContent[limiter(limiter(currentSlide + 1) + 1)];

        $sliderItems.addClass('l-slider__arrows_transform');
        $sliderActivePicWrapper.addClass('l-slider__pic-wrapper_transform');


        setTimeout(function () {
            $sliderActivePicWrapper.removeClass('l-slider__pic-wrapper_transform');
            $sliderItems.removeClass('l-slider__arrows_transform');

            nextNextSlideElement.appendChild(createImgElement(nextNextSlide.imgSrc));
            nextNextSlideElement.appendChild(createDivElement(nextNextSlide.number));

            nextSlideElement.appendChild(createImgElement(nextSlide.imgSrc));
            nextSlideElement.appendChild(createDivElement(nextSlide.number));

            prevSlideElement.appendChild(createImgElement(prevSlide.imgSrc));
            prevSlideElement.appendChild(createDivElement(prevSlide.number));

            prevPrevSlideElement.appendChild(createImgElement(mainSlide.imgSrc));
            prevPrevSlideElement.appendChild(createDivElement(mainSlide.number));

            $slideActivePic[0].setAttribute('src', mainSlide.imgSrc);
            $slideActivePicSpan[0].innerText = mainSlide.number;
            $slideActiveCaptionTitle[0].innerText = mainSlide.title;
            $slideActiveCaptionTechnology[0].innerText = mainSlide.technology;
            $slideActiveCaptionLink[0].setAttribute('href', mainSlide.siteUrl);
        }, 500);
    };

    var limiter = function (val) {

        if (val >= size) {
            val = 0;
        }

        if (val < 0) {
            val = size - 1;
        }

        return val;
    };

    return {
        init: function () {
            buildSlider();
            Listener();
        }
    }
}());

(function () {
    'use strict';

    setTimeout(function () {
        // document.querySelector('.greating_picture').classList.add('m--show');
    }, 1000);
})();

var blur = (function () {
    var container = $('.c-form-container'),
        form = $('.c-form-wrapper');

    if (container.length === 0) return false;

    return {
        set: function () {
            var img = $('.c-block-bg_pic'),
                imgWidth = img.width(),
                imgHeight = img.height(),
                blurCss = form[0].style,
                posLeft = -container.offset().left,
                posTop = -container.position().top;

            blurCss.backgroundSize = imgWidth + 'px' + ' ' + imgHeight + 'px';
            blurCss.backgroundPosition = posLeft + 'px' + ' ' + posTop + 'px';
            form.css({
                'background-size': imgWidth + 'px' + ' ' + imgHeight + 'px',
                'background-position': posLeft + 'px' + ' ' + posTop + 'px'
            });
        }
    }
}());

var parallax = (function () {
    var bg = document.querySelector('.l-hero__bg');
    var user = document.querySelector('.c-user');
    var fon = document.querySelector('.c-user__bg');

    return {
        move: function (block, windowScroll, strafeAmound) {
            var strafe = windowScroll / -strafeAmound + '%';
            var transformString = 'translate3d(0,' + strafe + ', 0)';
            var style = block.style;

            style.transform = transformString;
            style.webkitTransform = transformString;

        },
        init: function (wScroll) {
            this.move(bg, wScroll, 50);
            this.move(fon, wScroll, 20);
        }
    }

}());

var parallaxMouse = function (e) {
    if (document.getElementById('paralax') === null) return false;

    var parallaxContainer = document.getElementById('paralax'),
        layers = parallaxContainer.children,
        pageX = e.pageX,
        pageY = e.pageY,
        initialX = (window.innerWidth / 2) - pageX,
        initialY = (window.innerHeight / 2) - pageY;

    [].slice.call(layers).forEach(function (layer, i) {
        var divider = (i + 2) / 50,
            bottomPosition = (window.innerHeight / 2) * divider,
            positionX = initialX * divider,
            positionY = initialY * divider,
            layerStyle = layer.style,
            transformString = 'translate3d(' + positionX + 'px, ' + positionY + 'px, 0px)';
        layerStyle.transform = transformString;
    })
};

var App = (function () {
    return{
        init: function () {
            Preload.init();
            Navigation.init();

            if (!!(document.querySelector('.l-slider'))) {
                Slider.init();
                console.log('slider')
            }

            if (!!(document.querySelector('.flip-container'))) {
                Flip.init();
                console.log('flip');
            }

            if (!!(document.querySelector('.l-page-nav_aside'))) {
                console.log('asside');
                Asside.init();
            }
        }
    }
})();


$(function () {
    $('.l-hero').height($(window).height());

    App.init();

    window.onscroll = function () {
        var wScroll = window.pageYOffset;
        parallax.init(wScroll);
    };

    window.addEventListener('mousemove', function (e) {
        parallaxMouse(e);
    });

    if (document.querySelector('.c-form-container') ===null) {
        return false
    } else {
        blur.set();
        $(window).resize(function () {
            blur.set();
        });
    }

    $(window).scroll(function () {
        console.log($(window).scrollTop());
        console.log('456');
    });


});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2lkZS1uYXYuanMiLCJmbGlwLmpzIiwibmF2LmpzIiwicHJlbG9hZC5qcyIsInNsaWRlci5qcyIsImFwcC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ25HQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNwQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2pEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDNUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDcktBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJhcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIENyZWF0ZWQgYnkgbGVyYSBvbiAzLzcvMTcuXG4gKi9cblxudmFyIEFzc2lkZSA9IChcbiAgICBmdW5jdGlvbiAoKSB7XG5cblxuICAgICAgICBpZiAoISgkKCcubC1wYWdlLW5hdl9hc2lkZScpLmxlbmd0aCkpIHJldHVybiBmYWxzZTtcblxuICAgICAgICBjb25zb2xlLmxvZygnNDU2Jyk7XG5cbiAgICAgICAgdmFyIHNob3dTZWN0aW9uID0gZnVuY3Rpb24gKGFydGljbGUsIGlzQW5pbWF0ZSkge1xuICAgICAgICAgICAgdmFyXG4gICAgICAgICAgICAgICAgZGlyZWN0aW9uID0gYXJ0aWNsZS5yZXBsYWNlKCcjJywgJycpLFxuICAgICAgICAgICAgICAgIHJlcUFydGljbGUgPSAkKCcuZGF0YS1zZWN0aW9uJykuZmlsdGVyKCdbZGF0YS1zZWN0aW9uPVwiJyArIGRpcmVjdGlvbiArICdcIl0nKSxcbiAgICAgICAgICAgICAgICByZXFBcnRpY2xlUG9zID0gcmVxQXJ0aWNsZS5vZmZzZXQoKS50b3A7XG5cbiAgICAgICAgICAgIGlmIChpc0FuaW1hdGUpIHtcbiAgICAgICAgICAgICAgICAkKCdib2R5LCBodG1sJykuYW5pbWF0ZSh7c2Nyb2xsVG9wOiByZXFBcnRpY2xlUG9zfSwgNTAwKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgJCgnYm9keSwgaHRtbCcpLnNjcm9sbFRvcChyZXFBcnRpY2xlUG9zKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcblxuICAgICAgICB2YXIgY2hlY2tTZWN0aW9uID0gZnVuY3Rpb24gKCkge1xuXG4gICAgICAgICAgICAkKCcuZGF0YS1zZWN0aW9uJykuZWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgdmFyXG4gICAgICAgICAgICAgICAgICAgICR0aGlzID0gJCh0aGlzKSxcbiAgICAgICAgICAgICAgICAgICAgdG9wRWRnZSA9ICR0aGlzLm9mZnNldCgpLnRvcCAtIDMwMCxcbiAgICAgICAgICAgICAgICAgICAgYm90dG9tRWRnZSA9IHRvcEVkZ2UgKyAkdGhpcy5oZWlnaHQoKSxcbiAgICAgICAgICAgICAgICAgICAgd1Njcm9sbCA9ICQod2luZG93KS5zY3JvbGxUb3AoKTtcblxuICAgICAgICAgICAgICAgIGlmICh0b3BFZGdlIDwgd1Njcm9sbCAmJiBib3R0b21FZGdlID4gd1Njcm9sbCkge1xuICAgICAgICAgICAgICAgICAgICB2YXJcbiAgICAgICAgICAgICAgICAgICAgICAgIGN1cnJlbnRJZCA9ICR0aGlzLmRhdGEoJ3NlY3Rpb24nKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGFjdGl2ZUxpbmsgPSAkKCcubC1wYWdlLW5hdl9fbGluaycpLmZpbHRlcignW2hyZWY9XCIjJyArIGN1cnJlbnRJZCArICdcIl0nKTtcblxuICAgICAgICAgICAgICAgICAgICAkKCcubC1wYWdlLW5hdl9fbGluaycpLmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLnJlbW92ZUNsYXNzKCdsLXBhZ2UtbmF2X19saW5rX2FjdGl2ZScpO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgYWN0aXZlTGluay5hZGRDbGFzcygnbC1wYWdlLW5hdl9fbGlua19hY3RpdmUnKTtcbiAgICAgICAgICAgICAgICAgICAgbG9jYXRpb24uaGFzaCA9ICcjJyArIGN1cnJlbnRJZDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICB9O1xuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBpbml0OiBmdW5jdGlvbiAoKSB7XG5cbiAgICAgICAgICAgICAgICBpZiAoJCh3aW5kb3cpLndpZHRoKCkgPD0gMTIwMCkge1xuXG4gICAgICAgICAgICAgICAgICAgICQoJy5sLXBhZ2UtbmF2X2FzaWRlX19wcm90cmFjdG9yJykuY2xpY2soZnVuY3Rpb24gKCkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAkKCcubC1wYWdlLW5hdl9hc2lkZScpLnRvZ2dsZUNsYXNzKCdsLXBhZ2UtbmF2X2FjdGl2ZScpO1xuXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgICAgICQod2luZG93KS5zY3JvbGwoZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNoZWNrU2VjdGlvbigpO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAoJCh3aW5kb3cpLndpZHRoKCkgPiAxMjAwKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgJCh3aW5kb3cpLnNjcm9sbChmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYmxvY2tNYWluID0gJCgnLmwtYmxvY2stbWFpbicpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hdlRvcCA9ICQod2luZG93KS5zY3JvbGxUb3AoKSAtIGJsb2NrTWFpbi5wb3NpdGlvbigpLnRvcCArIDQwO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBjaGVja1NlY3Rpb24oKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG5hdlRvcCA8IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYXZUb3AgPSAwO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAkKCcubC1wYWdlLW5hdl9fbGlzdCcpLmNzcygndG9wJywgbmF2VG9wKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuXG5cblxuICAgICAgICAgICAgICAgICQoJy5sLXBhZ2UtbmF2X19saW5rJykub24oJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgICAgICBzaG93U2VjdGlvbigkKHRoaXMpLmF0dHIoJ2hyZWYnKSwgdHJ1ZSk7XG5cbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdoYXNoICcsd2luZG93LmxvY2F0aW9uLmhhc2gpO1xuXG4gICAgICAgICAgICAgICAgaWYgKCEhKGxvY2F0aW9uLmhhc2gpKXtcbiAgICAgICAgICAgICAgICAgICAgc2hvd1NlY3Rpb24od2luZG93LmxvY2F0aW9uLmhhc2gsIGZhbHNlKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbikoKTtcbiIsInZhciBGbGlwID0gKGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgZmxpcENvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5mbGlwLWNvbnRhaW5lcicpO1xuXG4gICAgaWYgKCEoZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmZsaXAtY29udGFpbmVyJykpKXtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBcbiAgICByZXR1cm4ge1xuICAgICAgICBpbml0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYy1ibG9jay1saW5rX3RvLWF2dG9yJykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snICxmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgZmxpcENvbnRhaW5lci5jbGFzc0xpc3QuYWRkKCdmbGlwLWNvbnRhaW5lcl9iYWNrJyk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2dvLWhvbWUnKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgIGZsaXBDb250YWluZXIuY2xhc3NMaXN0LnJlbW92ZSgnZmxpcC1jb250YWluZXJfYmFjaycpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG59KSgpO1xuIiwidmFyIE5hdmlnYXRpb24gPSAoZnVuY3Rpb24gKCkge1xuICAgIHZhciBuYXZpZ2F0aW9uID0gJCgnLmMtbmF2X3NpdGUtbGlzdCcpLFxuICAgICAgICBwYXJlbnROYXYgPSAkKCcuY29udGVudCcpLFxuICAgICAgICBoYW1idXJnZXIgPSAkKCcjaGFtYnVyZ2VyJyksXG4gICAgICAgIGl0ZW1zID0gJCgnLmMtbmF2X3NpdGVfX2l0ZW0nKSxcbiAgICAgICAgdGltZXI7XG4gICAgdmFyIGNvdW50ZXIgPSAwO1xuICAgIHZhciBuYXZBY3RpdmUgPSAkKCcuYy1uYXZfc2l0ZV9hY3RpdmUnKTtcblxuICAgIHZhciBhc2NlbnRJdGVtcyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaXRlbXNbY291bnRlcl0uY2xhc3NMaXN0LmFkZCgnYy1uYXZfc2l0ZV9faGlkZGVuJyk7XG4gICAgICAgIGNvdW50ZXIrKztcblxuICAgICAgICB0aW1lciA9IHNldFRpbWVvdXQoYXNjZW50SXRlbXMsIDEwMCk7XG5cbiAgICAgICAgaWYgKGNvdW50ZXIgPj0gaXRlbXMubGVuZ3RoKSB7XG4gICAgICAgICAgICBjbGVhclRpbWVvdXQodGltZXIpO1xuICAgICAgICB9XG5cbiAgICB9O1xuXG4gICAgdmFyIGxpc3RlbmVyID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBoYW1idXJnZXJbMF0uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoKSB7XG5cbiAgICAgICAgICAgIGhhbWJ1cmdlci50b2dnbGVDbGFzcygnYy1oYW1idXJnZXJfYWN0aXZlJyk7XG4gICAgICAgICAgICBuYXZpZ2F0aW9uLnRvZ2dsZUNsYXNzKCdjLW5hdl9zaXRlX2FjdGl2ZScpO1xuXG4gICAgICAgICAgICBpZiAoISEocGFyZW50TmF2LmZpbmQoJy5jLW5hdl9zaXRlX2FjdGl2ZScpLmxlbmd0aCkpIHtcbiAgICAgICAgICAgICAgICB2YXIgbmV3VGltZXI7XG4gICAgICAgICAgICAgICAgY291bnRlciA9IDA7XG4gICAgICAgICAgICAgICAgbmV3VGltZXIgPSBzZXRUaW1lb3V0KGFzY2VudEl0ZW1zLCA2MDApO1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKCEocGFyZW50TmF2LmZpbmQoJy5jLW5hdl9zaXRlX2FjdGl2ZScpLmxlbmd0aCkpIHtcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGl0ZW1zLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIGl0ZW1zW2ldLmNsYXNzTGlzdC5yZW1vdmUoJ2MtbmF2X3NpdGVfX2hpZGRlbicpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICB9KTtcbiAgICB9O1xuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgaW5pdDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgbGlzdGVuZXIoKTtcbiAgICAgICAgfVxuICAgIH1cbn0oKSk7XG4iLCJ2YXIgUHJlbG9hZCA9IChmdW5jdGlvbiAoKSB7XG5cbiAgICB2YXIgcGVyY2VudHNUb3RhbCA9IDAsXG4gICAgICAgIHByZWxvZGVyID0gJCgnLnByZWxvYWRlcicpO1xuXG5cbiAgICB2YXIgaW1nUGF0aCA9ICQoJyonKS5tYXAoZnVuY3Rpb24gKG5keCwgZWxlbWVudCkge1xuICAgICAgICB2YXIgYmFja2dyb3VuZCA9ICQoZWxlbWVudCkuY3NzKCdiYWNrZ3JvdW5kLWltYWdlJyksXG4gICAgICAgICAgICBpc0ltZyA9ICQoZWxlbWVudCkuaXMoJ2ltZycpLFxuICAgICAgICAgICAgaXNWaWRlbyA9ICQoZWxlbWVudCkuaXMoJ3ZpZGVvJyksXG4gICAgICAgICAgICBwYXRoID0gJyc7XG5cbiAgICAgICAgaWYgKGJhY2tncm91bmQgIT0gJ25vbmUnKXtcbiAgICAgICAgICAgIHBhdGggPSBiYWNrZ3JvdW5kLnJlcGxhY2UoJ3VybChcIicsICcnKS5yZXBsYWNlKCdcIiknLCAnJyk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoaXNJbWcgfHwgaXNWaWRlbykge1xuICAgICAgICAgICAgcGF0aCA9ICQoZWxlbWVudCkuYXR0cignc3JjJyk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAocGF0aCkge1xuICAgICAgICAgICAgcmV0dXJuIHBhdGg7XG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIHZhciBhbmltYXRlUGVyY2VudHMgPSBmdW5jdGlvbiAoYW5pbWF0ZVBlcmNlbnQpIHtcbiAgICAgICAgdmFyIGNpcmNsZVBlcmNlbnRhZ2VzID0gJCgnLnByZWxvYWRlcl9fY2VyY2xlLXBlcmNlbnRhZ2VzJylbMF0sXG4gICAgICAgICAgICBkYXNob2Zmc2V0ID0gYW5pbWF0ZVBlcmNlbnQgLyAxMDAgKiAxNTAuNzk2NDQ3MzcyMzEwMDc7XG5cbiAgICAgICAgY2lyY2xlUGVyY2VudGFnZXMuc3R5bGUuc3Ryb2tlRGFzaGFycmF5ID0gZGFzaG9mZnNldCArJyAxNTAuNzk2NDQ3MzcyMzEwMDcnO1xuICAgIH07XG5cbiAgICB2YXIgc2V0UGVyY2VudHMgPSBmdW5jdGlvbih0b3RhbCwgY3VycmVudCkge1xuXG4gICAgICB2YXIgcGVyY2VudHMgPSBNYXRoLmNlaWwoY3VycmVudCAvIHRvdGFsICogMTAwKTtcblxuICAgICAgJCgnLnByZWxvZGVyX19wZXJjZW50YWdlcycpLnRleHQocGVyY2VudHMpO1xuXG4gICAgICAgIGFuaW1hdGVQZXJjZW50cyhwZXJjZW50cyk7XG5cbiAgICAgIGlmIChwZXJjZW50cyA+PSAxMDApIHtcbiAgICAgICAgICBwcmVsb2Rlci5mYWRlT3V0KCk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIHZhciBsb2FkSW1hZ2VzID0gZnVuY3Rpb24gKGltYWdlcykge1xuXG4gICAgICAgIGlmICghaW1hZ2VzLmxlbmd0aCkgcHJlbG9kZXIuZmFkZU91dCgpO1xuXG4gICAgICBpbWFnZXMuZm9yRWFjaChmdW5jdGlvbiAoaW1nLCBpLCBpbWFnZXMpIHtcbiAgICAgICAgICB2YXIgZmFrZUltYWdlID0gJCgnPGltZz4nIHx8ICc8dmlkZW8+Jywge1xuICAgICAgICAgICAgICBhdHRyOiB7XG4gICAgICAgICAgICAgICAgICBzcmM6IGltZ1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICBmYWtlSW1hZ2Uub24oJ2xvYWQgZXJyb3InLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgIHBlcmNlbnRzVG90YWwrKztcbiAgICAgICAgICAgICAgc2V0UGVyY2VudHMoaW1hZ2VzLmxlbmd0aCwgcGVyY2VudHNUb3RhbClcbiAgICAgICAgICB9KVxuICAgICAgfSlcbiAgICB9O1xuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgaW5pdDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coJzEyMycpO1xuXG4gICAgICAgICAgICB2YXIgaW1ncyA9IGltZ1BhdGgudG9BcnJheSgpO1xuICAgICAgICAgICAgbG9hZEltYWdlcyhpbWdzKTtcblxuICAgICAgICAgICAgY29uc29sZS5sb2coJzEyMycpO1xuICAgICAgICB9XG4gICAgfVxuXG5cbn0oKSk7XG4iLCJ2YXIgc2xpZGVyQ29udGVudCA9IFtcbiAgICB7XG4gICAgICAgIFwidGl0bGVcIjogXCLQodCw0LnRgiDRiNC60L7Qu9GLINC+0L3Qu9Cw0LnQvSDQvtCx0YDQsNC30L7QstCw0L3QuNGPXCIsXG4gICAgICAgIFwidGVjaG5vbG9neVwiOiBcIkhUTUwgLCBDU1MsIEpBVkFTQ1JJUFRcIixcbiAgICAgICAgXCJzaXRlVXJsXCI6IFwiaHR0cHM6Ly9sb2Z0c2Nob29sLmNvbS9cIixcbiAgICAgICAgXCJpbWdTcmNcIjogXCIvYXNzZXRzL2ltZy9jb250ZW50L3NpdGUucG5nXCIsXG4gICAgICAgIFwibnVtYmVyXCI6IFwiMVwiXG4gICAgfSxcbiAgICB7XG4gICAgICAgIFwidGl0bGVcIjogXCLQodCw0LnRgjFHb29nbGVcIixcbiAgICAgICAgXCJ0ZWNobm9sb2d5XCI6IFwiSFRNTCAsIENTUywgSkFWQVNDUklQVFwiLFxuICAgICAgICBcInNpdGVVcmxcIjogXCJodHRwczovL3d3dy5nb29nbGUucnVcIixcbiAgICAgICAgXCJpbWdTcmNcIjogXCJodHRwOi8vd21hcmVhLm5ldC93cC1jb250ZW50L3VwbG9hZHMvMjAxNi8wNS8yd2ViX2hvc3Rpbmdfc2VvX3NpdGUuanBnXCIsXG4gICAgICAgIFwibnVtYmVyXCI6IFwiMlwiXG4gICAgfSxcbiAgICB7XG4gICAgICAgIFwidGl0bGVcIjogXCLQodCw0LnRgjJ5YVwiLFxuICAgICAgICBcInRlY2hub2xvZ3lcIjogXCJIVE1MICwgQ1NTLCBKQVZBU0NSSVBUXCIsXG4gICAgICAgIFwic2l0ZVVybFwiOiBcImh0dHBzOi8vd3d3LnlhbmRleC5ydS9cIixcbiAgICAgICAgXCJpbWdTcmNcIjogXCJodHRwOi8vYnVtYmxlYmVlLmFydGRlcG8uY29tLnVhL3VwbG9hZC9pYmxvY2svZGI5L2RiOTM3YmQ0ODc3ZWZlMDMxNTM5NmQ4YTM0MDlhZmVmLmpwZ1wiLFxuICAgICAgICBcIm51bWJlclwiOiBcIjNcIlxuICAgIH0sXG4gICAge1xuICAgICAgICBcInRpdGxlXCI6IFwi0KHQsNC50YIzbWFpbFwiLFxuICAgICAgICBcInRlY2hub2xvZ3lcIjogXCJIVE1MICwgQ1NTLCBKQVZBU0NSSVBUXCIsXG4gICAgICAgIFwic2l0ZVVybFwiOiBcImh0dHBzOi8vbWFpbC5ydS9cIixcbiAgICAgICAgXCJpbWdTcmNcIjogXCJodHRwOi8vY3MwMS5zZXJ2aWNlcy5teWE1LnJ1Ly0vdVJ1Ukh3V1Y5Y2t3a0V2LXNvOVZHdy9zdi90aGVtZXMvY2VudHJhbC8wLzIyMi0wLzIyMi0wLnBuZz8xNDUyMTc1MjAyXCIsXG4gICAgICAgIFwibnVtYmVyXCI6IFwiNFwiXG4gICAgfVxuXTtcblxudmFyIFNsaWRlciA9IChmdW5jdGlvbiAoKSB7XG5cbiAgICBpZiAoZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmwtc2xpZGVyJykgPT09IG51bGwpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIHZhciBkb2MgPSBkb2N1bWVudDtcbiAgICB2YXIgYXJyb3dOZXh0ID0gZG9jLnF1ZXJ5U2VsZWN0b3IoJyNhcnJvdy11cCcpLFxuICAgICAgICBhcnJvd1ByZXYgPSBkb2MucXVlcnlTZWxlY3RvcignI2Fycm93LWRvd24nKSxcbiAgICAgICAgJHNsaWRlQWN0aXZlQ2FwdGlvbiA9ICQoJyNzbGlkZS1hY3RpdmUtY2FwdGlvbicpLFxuICAgICAgICAkc2xpZGVBY3RpdmVDYXB0aW9uVGl0bGUgPSAkc2xpZGVBY3RpdmVDYXB0aW9uLmZpbmQoJy5jLWJsb2NrLXRpdGxlJyksXG4gICAgICAgICRzbGlkZUFjdGl2ZUNhcHRpb25UZWNobm9sb2d5ID0gJHNsaWRlQWN0aXZlQ2FwdGlvbi5maW5kKCcuYy1ibG9jay10ZXh0X2JsdWUnKSxcbiAgICAgICAgJHNsaWRlQWN0aXZlQ2FwdGlvbkxpbmsgPSAkc2xpZGVBY3RpdmVDYXB0aW9uLmZpbmQoJy5jLWJsb2NrLWxpbmtfYmx1ZScpLFxuICAgICAgICAkc2xpZGVyQWN0aXZlUGljV3JhcHBlciA9ICQoJyNzbGlkZS1hY3RpdmUtcGljJyksXG4gICAgICAgICRzbGlkZUFjdGl2ZVBpY1NwYW4gPSAkc2xpZGVyQWN0aXZlUGljV3JhcHBlci5maW5kKCdzcGFuJyksXG4gICAgICAgICRzbGlkZUFjdGl2ZVBpYyA9ICQoJy5sLXNsaWRlcl9fcGljJyksXG4gICAgICAgICRzbGlkZXJJdGVtcyA9ICQoJyNzbGlkZS1pdGVtcycpLFxuICAgICAgICAkZm9uRGFyaz0gJCgnLmwtc2xpZGVyX19hcnJvdy1kYXJrJyksXG4gICAgICAgIGN1cnJlbnRTbGlkZSA9IDAsXG4gICAgICAgIHNpemUgPSBzbGlkZXJDb250ZW50Lmxlbmd0aDtcblxuICAgIHZhciBMaXN0ZW5lciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgYXJyb3dOZXh0LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIGNsZWFySXRlbSgpO1xuICAgICAgICAgICAgY3VycmVudFNsaWRlID0gbGltaXRlcihjdXJyZW50U2xpZGUgKyAxKTtcbiAgICAgICAgICAgIGJ1aWxkU2xpZGVyKCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGFycm93UHJldi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICBjbGVhckl0ZW0oKTtcbiAgICAgICAgICAgIGN1cnJlbnRTbGlkZSA9IGxpbWl0ZXIoY3VycmVudFNsaWRlIC0gMSk7XG4gICAgICAgICAgICBidWlsZFNsaWRlcigpO1xuICAgICAgICB9KTtcbiAgICB9O1xuXG4gICAgdmFyIGNsZWFySXRlbSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgbmV4dE5leHRTbGlkZUVsZW1lbnQuaW5uZXJIVE1MID0gJyc7XG4gICAgICAgIG5leHRTbGlkZUVsZW1lbnQuaW5uZXJIVE1MID0gJyc7XG4gICAgICAgIHByZXZTbGlkZUVsZW1lbnQuaW5uZXJIVE1MID0gJyc7XG4gICAgICAgIHByZXZQcmV2U2xpZGVFbGVtZW50LmlubmVySFRNTCA9ICcnO1xuICAgIH07XG5cbiAgICB2YXIgY3JlYXRlRWxlbWVudCA9IGZ1bmN0aW9uIChjbGFzc1Bvc2l0aW9uLCBjbGFzc1Zpc2libGUpIHtcbiAgICAgICAgdmFyIGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblxuICAgICAgICBlbGVtZW50LmNsYXNzTGlzdC5hZGQoJ2wtc2xpZGVyX19hcnJvd3MtaXRlbScpO1xuICAgICAgICBlbGVtZW50LmNsYXNzTGlzdC5hZGQoY2xhc3NQb3NpdGlvbik7XG4gICAgICAgIGVsZW1lbnQuY2xhc3NMaXN0LmFkZChjbGFzc1Zpc2libGUpO1xuXG4gICAgICAgIHJldHVybiBlbGVtZW50O1xuICAgIH07XG5cbiAgICB2YXIgbmV4dE5leHRTbGlkZUVsZW1lbnQgPSBjcmVhdGVFbGVtZW50KCdsLXNsaWRlcl9fYXJyb3dzLXVwJywgJ2wtc2xpZGVyX19hcnJvd3MtbmV4dC1uZXh0JyksXG4gICAgICAgIG5leHRTbGlkZUVsZW1lbnQgPSBjcmVhdGVFbGVtZW50KCdsLXNsaWRlcl9fYXJyb3dzLXVwJywgJ2wtc2xpZGVyX19hcnJvd3MtbmV4dCcpLFxuICAgICAgICBwcmV2U2xpZGVFbGVtZW50ID0gY3JlYXRlRWxlbWVudCgnbC1zbGlkZXJfX2Fycm93cy1kb3duJywgJ2wtc2xpZGVyX19hcnJvd3MtcHJldicpLFxuICAgICAgICBwcmV2UHJldlNsaWRlRWxlbWVudCA9IGNyZWF0ZUVsZW1lbnQoJ2wtc2xpZGVyX19hcnJvd3MtZG93bicsICdsLXNsaWRlcl9fYXJyb3dzLXByZXYtcHJldicpO1xuXG4gICAgJHNsaWRlckl0ZW1zWzBdLmluc2VydEJlZm9yZShwcmV2UHJldlNsaWRlRWxlbWVudCwgJGZvbkRhcmtbMF0pO1xuICAgICRzbGlkZXJJdGVtc1swXS5pbnNlcnRCZWZvcmUocHJldlNsaWRlRWxlbWVudCwgJGZvbkRhcmtbMF0pO1xuICAgICRzbGlkZXJJdGVtc1swXS5pbnNlcnRCZWZvcmUobmV4dFNsaWRlRWxlbWVudCwgJGZvbkRhcmtbMF0pO1xuICAgICRzbGlkZXJJdGVtc1swXS5pbnNlcnRCZWZvcmUobmV4dE5leHRTbGlkZUVsZW1lbnQsICRmb25EYXJrWzBdKTtcblxuICAgIHZhciBjcmVhdGVJbWdFbGVtZW50ID0gZnVuY3Rpb24gKHNyYykge1xuICAgICAgICB2YXIgaW1nID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJyk7XG4gICAgICAgIGltZy5jbGFzc0xpc3QuYWRkKCdsLXNsaWRlcl9fYXJyb3ctcGljJyk7XG4gICAgICAgIGltZy5zZXRBdHRyaWJ1dGUoJ3NyYycsIHNyYyk7XG5cbiAgICAgICAgcmV0dXJuIGltZztcbiAgICB9O1xuXG4gICAgdmFyIGNyZWF0ZURpdkVsZW1lbnQgPSBmdW5jdGlvbiAodGV4dCkge1xuICAgICAgICB2YXIgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgICAgICBkaXYuaW5uZXJUZXh0ID0gdGV4dDtcblxuICAgICAgICByZXR1cm4gZGl2O1xuICAgIH07XG5cblxuICAgIHZhciBidWlsZFNsaWRlciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIG1haW5TbGlkZSA9IHNsaWRlckNvbnRlbnRbY3VycmVudFNsaWRlXSxcbiAgICAgICAgICAgIHByZXZTbGlkZSA9IHNsaWRlckNvbnRlbnRbbGltaXRlcihjdXJyZW50U2xpZGUgLSAxKV0sXG4gICAgICAgICAgICBuZXh0U2xpZGUgPSBzbGlkZXJDb250ZW50W2xpbWl0ZXIoY3VycmVudFNsaWRlICsgMSldLFxuICAgICAgICAgICAgbmV4dE5leHRTbGlkZSA9IHNsaWRlckNvbnRlbnRbbGltaXRlcihsaW1pdGVyKGN1cnJlbnRTbGlkZSArIDEpICsgMSldO1xuXG4gICAgICAgICRzbGlkZXJJdGVtcy5hZGRDbGFzcygnbC1zbGlkZXJfX2Fycm93c190cmFuc2Zvcm0nKTtcbiAgICAgICAgJHNsaWRlckFjdGl2ZVBpY1dyYXBwZXIuYWRkQ2xhc3MoJ2wtc2xpZGVyX19waWMtd3JhcHBlcl90cmFuc2Zvcm0nKTtcblxuXG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgJHNsaWRlckFjdGl2ZVBpY1dyYXBwZXIucmVtb3ZlQ2xhc3MoJ2wtc2xpZGVyX19waWMtd3JhcHBlcl90cmFuc2Zvcm0nKTtcbiAgICAgICAgICAgICRzbGlkZXJJdGVtcy5yZW1vdmVDbGFzcygnbC1zbGlkZXJfX2Fycm93c190cmFuc2Zvcm0nKTtcblxuICAgICAgICAgICAgbmV4dE5leHRTbGlkZUVsZW1lbnQuYXBwZW5kQ2hpbGQoY3JlYXRlSW1nRWxlbWVudChuZXh0TmV4dFNsaWRlLmltZ1NyYykpO1xuICAgICAgICAgICAgbmV4dE5leHRTbGlkZUVsZW1lbnQuYXBwZW5kQ2hpbGQoY3JlYXRlRGl2RWxlbWVudChuZXh0TmV4dFNsaWRlLm51bWJlcikpO1xuXG4gICAgICAgICAgICBuZXh0U2xpZGVFbGVtZW50LmFwcGVuZENoaWxkKGNyZWF0ZUltZ0VsZW1lbnQobmV4dFNsaWRlLmltZ1NyYykpO1xuICAgICAgICAgICAgbmV4dFNsaWRlRWxlbWVudC5hcHBlbmRDaGlsZChjcmVhdGVEaXZFbGVtZW50KG5leHRTbGlkZS5udW1iZXIpKTtcblxuICAgICAgICAgICAgcHJldlNsaWRlRWxlbWVudC5hcHBlbmRDaGlsZChjcmVhdGVJbWdFbGVtZW50KHByZXZTbGlkZS5pbWdTcmMpKTtcbiAgICAgICAgICAgIHByZXZTbGlkZUVsZW1lbnQuYXBwZW5kQ2hpbGQoY3JlYXRlRGl2RWxlbWVudChwcmV2U2xpZGUubnVtYmVyKSk7XG5cbiAgICAgICAgICAgIHByZXZQcmV2U2xpZGVFbGVtZW50LmFwcGVuZENoaWxkKGNyZWF0ZUltZ0VsZW1lbnQobWFpblNsaWRlLmltZ1NyYykpO1xuICAgICAgICAgICAgcHJldlByZXZTbGlkZUVsZW1lbnQuYXBwZW5kQ2hpbGQoY3JlYXRlRGl2RWxlbWVudChtYWluU2xpZGUubnVtYmVyKSk7XG5cbiAgICAgICAgICAgICRzbGlkZUFjdGl2ZVBpY1swXS5zZXRBdHRyaWJ1dGUoJ3NyYycsIG1haW5TbGlkZS5pbWdTcmMpO1xuICAgICAgICAgICAgJHNsaWRlQWN0aXZlUGljU3BhblswXS5pbm5lclRleHQgPSBtYWluU2xpZGUubnVtYmVyO1xuICAgICAgICAgICAgJHNsaWRlQWN0aXZlQ2FwdGlvblRpdGxlWzBdLmlubmVyVGV4dCA9IG1haW5TbGlkZS50aXRsZTtcbiAgICAgICAgICAgICRzbGlkZUFjdGl2ZUNhcHRpb25UZWNobm9sb2d5WzBdLmlubmVyVGV4dCA9IG1haW5TbGlkZS50ZWNobm9sb2d5O1xuICAgICAgICAgICAgJHNsaWRlQWN0aXZlQ2FwdGlvbkxpbmtbMF0uc2V0QXR0cmlidXRlKCdocmVmJywgbWFpblNsaWRlLnNpdGVVcmwpO1xuICAgICAgICB9LCA1MDApO1xuICAgIH07XG5cbiAgICB2YXIgbGltaXRlciA9IGZ1bmN0aW9uICh2YWwpIHtcblxuICAgICAgICBpZiAodmFsID49IHNpemUpIHtcbiAgICAgICAgICAgIHZhbCA9IDA7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodmFsIDwgMCkge1xuICAgICAgICAgICAgdmFsID0gc2l6ZSAtIDE7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdmFsO1xuICAgIH07XG5cbiAgICByZXR1cm4ge1xuICAgICAgICBpbml0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBidWlsZFNsaWRlcigpO1xuICAgICAgICAgICAgTGlzdGVuZXIoKTtcbiAgICAgICAgfVxuICAgIH1cbn0oKSk7XG4iLCIoZnVuY3Rpb24gKCkge1xuICAgICd1c2Ugc3RyaWN0JztcblxuICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAvLyBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZ3JlYXRpbmdfcGljdHVyZScpLmNsYXNzTGlzdC5hZGQoJ20tLXNob3cnKTtcbiAgICB9LCAxMDAwKTtcbn0pKCk7XG5cbnZhciBibHVyID0gKGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgY29udGFpbmVyID0gJCgnLmMtZm9ybS1jb250YWluZXInKSxcbiAgICAgICAgZm9ybSA9ICQoJy5jLWZvcm0td3JhcHBlcicpO1xuXG4gICAgaWYgKGNvbnRhaW5lci5sZW5ndGggPT09IDApIHJldHVybiBmYWxzZTtcblxuICAgIHJldHVybiB7XG4gICAgICAgIHNldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIGltZyA9ICQoJy5jLWJsb2NrLWJnX3BpYycpLFxuICAgICAgICAgICAgICAgIGltZ1dpZHRoID0gaW1nLndpZHRoKCksXG4gICAgICAgICAgICAgICAgaW1nSGVpZ2h0ID0gaW1nLmhlaWdodCgpLFxuICAgICAgICAgICAgICAgIGJsdXJDc3MgPSBmb3JtWzBdLnN0eWxlLFxuICAgICAgICAgICAgICAgIHBvc0xlZnQgPSAtY29udGFpbmVyLm9mZnNldCgpLmxlZnQsXG4gICAgICAgICAgICAgICAgcG9zVG9wID0gLWNvbnRhaW5lci5wb3NpdGlvbigpLnRvcDtcblxuICAgICAgICAgICAgYmx1ckNzcy5iYWNrZ3JvdW5kU2l6ZSA9IGltZ1dpZHRoICsgJ3B4JyArICcgJyArIGltZ0hlaWdodCArICdweCc7XG4gICAgICAgICAgICBibHVyQ3NzLmJhY2tncm91bmRQb3NpdGlvbiA9IHBvc0xlZnQgKyAncHgnICsgJyAnICsgcG9zVG9wICsgJ3B4JztcbiAgICAgICAgICAgIGZvcm0uY3NzKHtcbiAgICAgICAgICAgICAgICAnYmFja2dyb3VuZC1zaXplJzogaW1nV2lkdGggKyAncHgnICsgJyAnICsgaW1nSGVpZ2h0ICsgJ3B4JyxcbiAgICAgICAgICAgICAgICAnYmFja2dyb3VuZC1wb3NpdGlvbic6IHBvc0xlZnQgKyAncHgnICsgJyAnICsgcG9zVG9wICsgJ3B4J1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG59KCkpO1xuXG52YXIgcGFyYWxsYXggPSAoZnVuY3Rpb24gKCkge1xuICAgIHZhciBiZyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5sLWhlcm9fX2JnJyk7XG4gICAgdmFyIHVzZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYy11c2VyJyk7XG4gICAgdmFyIGZvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jLXVzZXJfX2JnJyk7XG5cbiAgICByZXR1cm4ge1xuICAgICAgICBtb3ZlOiBmdW5jdGlvbiAoYmxvY2ssIHdpbmRvd1Njcm9sbCwgc3RyYWZlQW1vdW5kKSB7XG4gICAgICAgICAgICB2YXIgc3RyYWZlID0gd2luZG93U2Nyb2xsIC8gLXN0cmFmZUFtb3VuZCArICclJztcbiAgICAgICAgICAgIHZhciB0cmFuc2Zvcm1TdHJpbmcgPSAndHJhbnNsYXRlM2QoMCwnICsgc3RyYWZlICsgJywgMCknO1xuICAgICAgICAgICAgdmFyIHN0eWxlID0gYmxvY2suc3R5bGU7XG5cbiAgICAgICAgICAgIHN0eWxlLnRyYW5zZm9ybSA9IHRyYW5zZm9ybVN0cmluZztcbiAgICAgICAgICAgIHN0eWxlLndlYmtpdFRyYW5zZm9ybSA9IHRyYW5zZm9ybVN0cmluZztcblxuICAgICAgICB9LFxuICAgICAgICBpbml0OiBmdW5jdGlvbiAod1Njcm9sbCkge1xuICAgICAgICAgICAgdGhpcy5tb3ZlKGJnLCB3U2Nyb2xsLCA1MCk7XG4gICAgICAgICAgICB0aGlzLm1vdmUoZm9uLCB3U2Nyb2xsLCAyMCk7XG4gICAgICAgIH1cbiAgICB9XG5cbn0oKSk7XG5cbnZhciBwYXJhbGxheE1vdXNlID0gZnVuY3Rpb24gKGUpIHtcbiAgICBpZiAoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3BhcmFsYXgnKSA9PT0gbnVsbCkgcmV0dXJuIGZhbHNlO1xuXG4gICAgdmFyIHBhcmFsbGF4Q29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3BhcmFsYXgnKSxcbiAgICAgICAgbGF5ZXJzID0gcGFyYWxsYXhDb250YWluZXIuY2hpbGRyZW4sXG4gICAgICAgIHBhZ2VYID0gZS5wYWdlWCxcbiAgICAgICAgcGFnZVkgPSBlLnBhZ2VZLFxuICAgICAgICBpbml0aWFsWCA9ICh3aW5kb3cuaW5uZXJXaWR0aCAvIDIpIC0gcGFnZVgsXG4gICAgICAgIGluaXRpYWxZID0gKHdpbmRvdy5pbm5lckhlaWdodCAvIDIpIC0gcGFnZVk7XG5cbiAgICBbXS5zbGljZS5jYWxsKGxheWVycykuZm9yRWFjaChmdW5jdGlvbiAobGF5ZXIsIGkpIHtcbiAgICAgICAgdmFyIGRpdmlkZXIgPSAoaSArIDIpIC8gNTAsXG4gICAgICAgICAgICBib3R0b21Qb3NpdGlvbiA9ICh3aW5kb3cuaW5uZXJIZWlnaHQgLyAyKSAqIGRpdmlkZXIsXG4gICAgICAgICAgICBwb3NpdGlvblggPSBpbml0aWFsWCAqIGRpdmlkZXIsXG4gICAgICAgICAgICBwb3NpdGlvblkgPSBpbml0aWFsWSAqIGRpdmlkZXIsXG4gICAgICAgICAgICBsYXllclN0eWxlID0gbGF5ZXIuc3R5bGUsXG4gICAgICAgICAgICB0cmFuc2Zvcm1TdHJpbmcgPSAndHJhbnNsYXRlM2QoJyArIHBvc2l0aW9uWCArICdweCwgJyArIHBvc2l0aW9uWSArICdweCwgMHB4KSc7XG4gICAgICAgIGxheWVyU3R5bGUudHJhbnNmb3JtID0gdHJhbnNmb3JtU3RyaW5nO1xuICAgIH0pXG59O1xuXG52YXIgQXBwID0gKGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm57XG4gICAgICAgIGluaXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIFByZWxvYWQuaW5pdCgpO1xuICAgICAgICAgICAgTmF2aWdhdGlvbi5pbml0KCk7XG5cbiAgICAgICAgICAgIGlmICghIShkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubC1zbGlkZXInKSkpIHtcbiAgICAgICAgICAgICAgICBTbGlkZXIuaW5pdCgpO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdzbGlkZXInKVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoISEoZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmZsaXAtY29udGFpbmVyJykpKSB7XG4gICAgICAgICAgICAgICAgRmxpcC5pbml0KCk7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ2ZsaXAnKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKCEhKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5sLXBhZ2UtbmF2X2FzaWRlJykpKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ2Fzc2lkZScpO1xuICAgICAgICAgICAgICAgIEFzc2lkZS5pbml0KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59KSgpO1xuXG5cbiQoZnVuY3Rpb24gKCkge1xuICAgICQoJy5sLWhlcm8nKS5oZWlnaHQoJCh3aW5kb3cpLmhlaWdodCgpKTtcblxuICAgIEFwcC5pbml0KCk7XG5cbiAgICB3aW5kb3cub25zY3JvbGwgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciB3U2Nyb2xsID0gd2luZG93LnBhZ2VZT2Zmc2V0O1xuICAgICAgICBwYXJhbGxheC5pbml0KHdTY3JvbGwpO1xuICAgIH07XG5cbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgcGFyYWxsYXhNb3VzZShlKTtcbiAgICB9KTtcblxuICAgIGlmIChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYy1mb3JtLWNvbnRhaW5lcicpID09PW51bGwpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgfSBlbHNlIHtcbiAgICAgICAgYmx1ci5zZXQoKTtcbiAgICAgICAgJCh3aW5kb3cpLnJlc2l6ZShmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBibHVyLnNldCgpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAkKHdpbmRvdykuc2Nyb2xsKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgY29uc29sZS5sb2coJCh3aW5kb3cpLnNjcm9sbFRvcCgpKTtcbiAgICAgICAgY29uc29sZS5sb2coJzQ1NicpO1xuICAgIH0pO1xuXG5cbn0pOyJdfQ==

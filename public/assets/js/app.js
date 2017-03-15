/**
 * Created by lera on 3/7/17.
 */

var Asside = (
    function () {


        if (!($('.l-page-nav_aside').length)) return false;

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
                    console.log($(window).width());

                    $(window).scroll(function (e) {
                        var
                            blockMain = $('.l-block-main'),
                            navTop = $(window).scrollTop() - blockMain.position().top + 40,
                            navTopBottom = $('.l-page-nav_aside').height() - $('.l-page-nav__list').height();


                        checkSection();

                        if (navTop < 0) navTop = 0;

                        if (navTop >= navTopBottom ) navTop = navTopBottom;

                        $('.l-page-nav__list').css('top', navTop);
                    });
                }



                $('.l-page-nav__link').on('click', function (e) {
                    e.preventDefault();
                    showSection($(this).attr('href'), true);

                });

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
            var imgs = imgPath.toArray();
            loadImages(imgs);
        }
    }


}());

var sliderContent = [
    {
        "title": "Сайт школы онлайн образования",
        "technology": "HTML , CSS, JAVASCRIPT",
        "siteUrl": "https://loftschool.com/",
        "imgSrc": "/assets/img/content/site.png",
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


var sliderParseContent = function () {
    var strDb = document.querySelector('#db').getAttribute('data-db');
    var arrStr = [];
    strDb = strDb.replace("[{","");
    strDb = strDb.replace("}]","");
    arrStr = strDb.split('},{');

    for (var i = 0; i < arrStr.length; i++){
        arrStr[i] = '{' +arrStr[i]+ '}';
        arrStr[i] = JSON.parse(arrStr[i]);
    }

    return arrStr;
};

var Slider = (function () {

    if (document.querySelector('.l-slider') === null) {
        return false;
    }

    sliderContent = sliderParseContent();

    var doc = document;
    var arrowNext = doc.querySelector('#arrow-up'),
        arrowPrev = doc.querySelector('#arrow-down'),
        $slideActiveCaption = $('#slide-active-caption'),
        $slideActiveCaptionTitle = $slideActiveCaption.find('.c-block-title__text'),
        $slideActiveCaptionTechnology = $slideActiveCaption.find('.c-block-text_blue'),
        $slideActiveCaptionLink = $slideActiveCaption.find('.c-block-link_blue'),
        $sliderActivePicWrapper = $('#slide-active-pic'),
        $slideActivePicSpan = $sliderActivePicWrapper.find('span'),
        $slideActivePic = $('.l-slider__pic'),
        $sliderItems = $('#slide-items'),
        $fonDark = $('.l-slider__arrow-dark'),
        currentSlide = 0,
        size = sliderContent.length,
        inProcessNext = false,
        inProcessPrev = false,
        animationEnd;

    var Listener = function () {
        arrowNext.addEventListener('click', function (e) {
            e.preventDefault();
            currentSlide = limiter(currentSlide + 1);

            if (animationEnd >= 3) inProcessNext = false;

            if (!inProcessNext) {
                inProcessNext = true;
                deterActiveSlide();
                animationEnd = 0;
            }
        });

        arrowPrev.addEventListener('click', function (e) {
            e.preventDefault();
            currentSlide = limiter(currentSlide - 1);

            if (animationEnd >= 3) inProcessPrev = false;

            if (!inProcessPrev) {
                inProcessPrev = true;
                deterActiveSlide();
                animationEnd = 0;
            }
        });
    };

    var createElement = function (classPosition, classVisible) {
        var element = document.createElement('div');

        element.classList.add('l-slider__arrows-item');
        element.classList.add(classPosition);
        element.classList.add(classVisible);

        return element;
    };

    var nextSlideElement = createElement('l-slider__arrows-up', 'l-slider__arrows-next-next'),
        prevSlideElement = createElement('l-slider__arrows-down', 'l-slider__arrows-prev');


    var createImgElement = function (src) {
        var img = document.createElement('img');
        img.classList.add('l-slider__arrow-pic');
        img.setAttribute('src', '/assets' + src);

        return img;
    };

    var createDivElement = function (text) {
        var div = document.createElement('span');
        div.innerText = text;

        return div;
    };

    var textAnimate = function () {
        var
            strTitle = sliderContent[currentSlide].title,
            strTechnology = sliderContent[currentSlide].technology,
            charsTitle = strTitle.split(''),
            charsTechnology = strTechnology.split(''),
            counterTitle = 0,
            counterTech = 0,
            timer;

        $slideActiveCaptionTitle[0].innerHTML = '';
        $slideActiveCaptionTechnology[0].innerHTML = '';

        var eachCharTitle = function () {
            var char = doc.createTextNode(charsTitle[counterTitle]);

            $slideActiveCaptionTitle[0].appendChild(char);

            counterTitle++;
            timer = setTimeout(eachCharTitle, 50);

            if (counterTitle === charsTitle.length) {
                clearInterval(timer);
                animationEnd++;
            }
        };

        var eachCharTech = function () {
            var char = doc.createTextNode(charsTechnology[counterTech]);

            $slideActiveCaptionTechnology[0].appendChild(char);

            counterTech++;
            timer = setTimeout(eachCharTech, 50);

            if (counterTech === charsTechnology.length) {
                clearInterval(timer);
                animationEnd++;
            }
        };

        eachCharTitle();
        eachCharTech();
    };


    var buildSlider = function () {

        for (var i = 0; i < sliderContent.length; i++) {
            var
                prevSlideElement = createElement('l-slider__arrows-down', 'l-slider__arrows-prev');

            prevSlideElement.setAttribute('id', 'prev' + i);
            prevSlideElement.appendChild(createImgElement(sliderContent[i].picture));
            prevSlideElement.appendChild(createDivElement( i+1 ));
            $sliderItems[0].insertBefore(prevSlideElement, $fonDark[0]);
        }

        for (var j = 0; j < sliderContent.length; j++) {
            var
                nextSlideElement = createElement('l-slider__arrows-up', 'l-slider__arrows-next');

            nextSlideElement.setAttribute('id', 'next' + j);
            nextSlideElement.appendChild(createImgElement(sliderContent[j].picture));
            nextSlideElement.appendChild(createDivElement(j + 1));
            $sliderItems[0].insertBefore(nextSlideElement, $fonDark[0]);
        }
    };

    var deterActiveSlide = function () {
        var
            mainSlide = sliderContent[limiter(currentSlide)],
            itemsPrev = $sliderItems.children('.l-slider__arrows-prev'),
            itemsNext = $sliderItems.children('.l-slider__arrows-next');

        textAnimate();

        $sliderActivePicWrapper[0].classList.add('l-slider__pic-wrapper_transform');

        setTimeout(function () {
            $sliderActivePicWrapper[0].classList.remove('l-slider__pic-wrapper_transform');
            $slideActivePic[0].setAttribute('src', '/assets' + mainSlide.picture);
            $slideActivePicSpan[0].innerText = currentSlide + 1;
            $slideActiveCaptionLink[0].setAttribute('href', mainSlide.siteUrl);
            animationEnd++;
        }, 500);

        $('.l-slider__arrows-next.l-slider__arrows-item_active').animate({top: '-100%'}, 500);
        $('#next' + [limiter(currentSlide + 1)]).animate({top: '0'}, 500);
        $('.l-slider__arrows-prev.l-slider__arrows-item_active').animate({top: '100%'}, 500);
        $('#prev' + [limiter(currentSlide - 1)]).animate({top: '0'}, 500);

        for (var i = 0; i < itemsPrev.length; i++) {
            itemsPrev[i].classList.remove('l-slider__arrows-item_active');
            itemsNext[i].classList.remove('l-slider__arrows-item_active');

            if (itemsPrev[i].hasAttribute('style')) {
                itemsPrev[i].removeAttribute('style');
            }

            if (itemsNext[i].hasAttribute('style')) {
                itemsNext[i].removeAttribute('style');
            }
        }

        itemsPrev[limiter(currentSlide - 1)].classList.add('l-slider__arrows-item_active');
        itemsNext[limiter(currentSlide + 1)].classList.add('l-slider__arrows-item_active');
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
            deterActiveSlide();
            Listener();
        }
    }
}());

// var ValidationAvtor = (function () {
//     if (!($('.c-form-avtor'))) return false;
//
//     var valid = function () {
//
//         var
//             $form = $('.c-form-avtor'),
//             $input = $form.find('.c-form-avtor__input'),
//             $checkBox = $form.find('input[type="checkbox"]'),
//             $radio = $form.find('input[type="radio"]'),
//             numberEmptyInput = 0,
//             numberChecekd = 0;
//
//         $form.find('.error').remove();
//
//         $input.each(function () {
//             var $this = $(this);
//
//             if ($this.val() === '') {
//
//                 $this.parents('.c-form-avtor__input-wrapper ')
//                     .css({'border': '2px solid red'});
//             } else {
//                 numberEmptyInput++;
//             }
//         });
//
//         $checkBox.each(function () {
//             var $this = $(this);
//
//             if (!!$this.prop('checked')) {
//                 numberChecekd++;
//             }
//         });
//
//         $radio.each(function () {
//             var $this = $(this);
//
//             if (!!$this.prop('checked')) {
//                 numberChecekd++;
//             }
//         });
//
//         if (numberEmptyInput <= 1) {
//             $('.c-form-avtor__content').append('<span class="error" style="color: red">Заполните все поля формы</span>');
//             return false;
//         }
//
//         if (numberChecekd <= 2 || $('#hz').prop('checked')) {
//             $('.c-form-avtor__content').append('<span class="error" style="color: red">Роботам тут не место</span>');
//             return false;
//         }
//     };
//
//     return {
//         init: function () {
//             $('.c-form-avtor').submit(function (e) {
//                 e.preventDefault();
//                 valid();
//             });
//         }
//     }
// })();

var ValidationContactMe = (function () {
        if (!$('.c-form_contact-me').length) return false;

        var $formContactMe = $('.c-form_contact-me'),
            $inputs = $formContactMe.find('.c-form__input');

        var reset = function () {
            $formContactMe.find('.error').remove();
            $inputs.each(function () {
                $(this).css({'boreder': 'none'});
            });
        };

        var valid = function () {


            var
                counter = 0;

            $inputs.each(function () {
                var $this = $(this);

                if (!!$this.val()) {
                    counter++;
                }

                if (!$this.val()) {
                    $this.css({'border': '1px solid red'});
                }
            });

            if (counter < 3) {
                $formContactMe.find('.c-form__button-container')
                    .before('<span class="error" style="color: red">Заполните все поля формы</span>');
            }
        };

        return {
            init: function () {
                $formContactMe.find('.c-form').submit(function (e) {
                    e.preventDefault();
                    reset();
                    valid();
                });

                $formContactMe.find('.c-form__buttom').click(function () {
                    reset();
                    $inputs.each(function () {
                        var $this = $(this);
                        $this.val('');
                    })
                });
            }
        }
    })();
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
                console.info('slider')
            }

            if (!!(document.querySelector('.flip-container'))) {
                Flip.init();
                console.info('flip');
            }

            if (!!(document.querySelector('.l-page-nav_aside'))) {
                console.info('asside');
                Asside.init();
            }

            // if (!!(document.querySelector('.c-form-avtor'))) {
            //     console.info('form avtorisation');
            //     ValidationAvtor.init();
            // }

            if (!!(document.querySelector('.c-form_contact-me'))) {
                console.log('form contacts-me');
                ValidationContactMe.init();
            }
        }
    }
})();


$(function () {
    var formUpload = document.querySelector('#upload');

    $('.l-hero').height($(window).height());

    App.init();

    // window.onscroll = function () {
    //     var wScroll = window.pageYOffset;
    //     parallax.init(wScroll);
    // };
    //
    // window.addEventListener('mousemove', function (e) {
    //     parallaxMouse(e);
    // });

    var fileUpload = function(url, data, cb){
        var xhr = new XMLHttpRequest();
        xhr.open('POST', url, true);

        xhr.onload = function (e) {
            var result = JSON.parse(xhr.responseText);
            cb(result.status);
        };

        xhr.send(data);
    };

    function prepareSendFile(e) {
        e.preventDefault();
        var resultContainer = document.querySelector('.status');
        var formData = new FormData();
        var file = document
            .querySelector('#file-select')
            .files[0];
        var title = document
            .querySelector('#file-title')
            .value;
        var tech = document
            .querySelector('#file-tech')
            .value;
        var siteUrl = document
            .querySelector('#file-site')
            .value;

        formData.append('photo', file, file.name);
        formData.append('title', title);
        formData.append('technology', tech);
        formData.append('siteUrl', siteUrl);

        console.log('file', file);
        console.log('file.name', file.name);
        console.log('title', title);
        console.log('tech', tech);
        console.log('siteUrl', siteUrl);

        resultContainer.innerHTML = 'Uploading...';
        fileUpload('/upload', formData, function (data) {
            resultContainer.innerHTML = data;
        });
    }

    if (formUpload) {
        formUpload.addEventListener('submit', prepareSendFile);
    }

    //------------ block mail
    const formMail = document.querySelector('#mail');

    if (formMail) {
        formMail.addEventListener('submit', prepareSendMail);
    }

    function prepareSendMail(e) {
        e.preventDefault();
        var resultContainer = document.querySelector('.status');
        var data = {
            name: formMail.name.value,
            email: formMail.email.value,
            text: formMail.text.value
        };
        console.log(data);
        resultContainer.innerHTML = 'Sending...';
        sendAjaxJson('/work', data, function (data) {
            resultContainer.innerHTML = data;
        });
    }

    function sendAjaxJson(url, data, cb) {
        var xhr = new XMLHttpRequest();
        xhr.open('POST', url, true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.onload = function (e) {
            var result = JSON.parse(xhr.responseText);
            cb(result.status);
        };
        xhr.send(JSON.stringify(data));
        console.log(data);
    }

    //block blog

    const formBlog = document.querySelector('#blog');

    if (formBlog) {
        formBlog.addEventListener('submit', prepareSendPost);
    }

    function prepareSendPost(e) {
        e.preventDefault();
        var resultContainer = document.querySelector('.status');
        var data = {
            title: formBlog.title.value,
            date: formBlog.date.value,
            text: formBlog.text.value
        };
        resultContainer.innerHTML = 'Sending...';
        sendAjaxJson('/addpost', data, function (data) {
            resultContainer.innerHTML = data;
        });
    }

    //block skills

    const formSkills = document.querySelector('#skills');

    if (formSkills) {
        formSkills.addEventListener('submit', prepareSendSkills);
    }

    function prepareSendSkills(e) {
        e.preventDefault();
        var resultContainer = document.querySelector('.status');
        var data = {
            html: formSkills.html.value,
            css: formSkills.css.value,
            js: formSkills.js.value,
            php: formSkills.php.value,
            sql: formSkills.sql.value,
            node: formSkills.node.value,
            mongo: formSkills.mongo.value,
            git: formSkills.git.value,
            gulp: formSkills.gulp.value,
            bower: formSkills.bower.value
        };

        console.log(data);

        resultContainer.innerHTML = 'Sending...';
        sendAjaxJson('/admin', data, function (data) {
            resultContainer.innerHTML = data;
        });
    }

    //---- block Login

    const formLogin = document.querySelector('#login');

    if (formLogin) {
        formLogin.addEventListener('submit', prepareAuth);
    }

    function prepareAuth(e) {
        e.preventDefault();
        var resultContainer = document.querySelector('.status');
        var data = {
            login: formLogin.login.value,
            password: formLogin.password.value
        };
        resultContainer.innerHTML = 'Sending...';
        sendAjaxJson('/', data, function (data) {
            resultContainer.innerHTML = data;

            if (data == 'Авторизация успешна!') {
                window.location.href = '/admin';
            }
        });
    }

//blur
    if (document.querySelector('.c-form-container') ===null) {
        return false
    } else {
        blur.set();
        $(window).resize(function () {
            blur.set();
        });
    }
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2lkZS1uYXYuanMiLCJmbGlwLmpzIiwibmF2LmpzIiwicHJlbG9hZC5qcyIsInNsaWRlci5qcyIsInZhbGlkYXRpb24uanMiLCJhcHAuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDbEdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3BCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDakRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDeEVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3BRQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDdEhBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImFwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQ3JlYXRlZCBieSBsZXJhIG9uIDMvNy8xNy5cbiAqL1xuXG52YXIgQXNzaWRlID0gKFxuICAgIGZ1bmN0aW9uICgpIHtcblxuXG4gICAgICAgIGlmICghKCQoJy5sLXBhZ2UtbmF2X2FzaWRlJykubGVuZ3RoKSkgcmV0dXJuIGZhbHNlO1xuXG4gICAgICAgIHZhciBzaG93U2VjdGlvbiA9IGZ1bmN0aW9uIChhcnRpY2xlLCBpc0FuaW1hdGUpIHtcbiAgICAgICAgICAgIHZhclxuICAgICAgICAgICAgICAgIGRpcmVjdGlvbiA9IGFydGljbGUucmVwbGFjZSgnIycsICcnKSxcbiAgICAgICAgICAgICAgICByZXFBcnRpY2xlID0gJCgnLmRhdGEtc2VjdGlvbicpLmZpbHRlcignW2RhdGEtc2VjdGlvbj1cIicgKyBkaXJlY3Rpb24gKyAnXCJdJyksXG4gICAgICAgICAgICAgICAgcmVxQXJ0aWNsZVBvcyA9IHJlcUFydGljbGUub2Zmc2V0KCkudG9wO1xuXG4gICAgICAgICAgICBpZiAoaXNBbmltYXRlKSB7XG4gICAgICAgICAgICAgICAgJCgnYm9keSwgaHRtbCcpLmFuaW1hdGUoe3Njcm9sbFRvcDogcmVxQXJ0aWNsZVBvc30sIDUwMCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICQoJ2JvZHksIGh0bWwnKS5zY3JvbGxUb3AocmVxQXJ0aWNsZVBvcyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG5cbiAgICAgICAgdmFyIGNoZWNrU2VjdGlvbiA9IGZ1bmN0aW9uICgpIHtcblxuICAgICAgICAgICAgJCgnLmRhdGEtc2VjdGlvbicpLmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHZhclxuICAgICAgICAgICAgICAgICAgICAkdGhpcyA9ICQodGhpcyksXG4gICAgICAgICAgICAgICAgICAgIHRvcEVkZ2UgPSAkdGhpcy5vZmZzZXQoKS50b3AgLSAzMDAsXG4gICAgICAgICAgICAgICAgICAgIGJvdHRvbUVkZ2UgPSB0b3BFZGdlICsgJHRoaXMuaGVpZ2h0KCksXG4gICAgICAgICAgICAgICAgICAgIHdTY3JvbGwgPSAkKHdpbmRvdykuc2Nyb2xsVG9wKCk7XG5cbiAgICAgICAgICAgICAgICBpZiAodG9wRWRnZSA8IHdTY3JvbGwgJiYgYm90dG9tRWRnZSA+IHdTY3JvbGwpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyXG4gICAgICAgICAgICAgICAgICAgICAgICBjdXJyZW50SWQgPSAkdGhpcy5kYXRhKCdzZWN0aW9uJyksXG4gICAgICAgICAgICAgICAgICAgICAgICBhY3RpdmVMaW5rID0gJCgnLmwtcGFnZS1uYXZfX2xpbmsnKS5maWx0ZXIoJ1tocmVmPVwiIycgKyBjdXJyZW50SWQgKyAnXCJdJyk7XG5cbiAgICAgICAgICAgICAgICAgICAgJCgnLmwtcGFnZS1uYXZfX2xpbmsnKS5lYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5yZW1vdmVDbGFzcygnbC1wYWdlLW5hdl9fbGlua19hY3RpdmUnKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIGFjdGl2ZUxpbmsuYWRkQ2xhc3MoJ2wtcGFnZS1uYXZfX2xpbmtfYWN0aXZlJyk7XG4gICAgICAgICAgICAgICAgICAgIGxvY2F0aW9uLmhhc2ggPSAnIycgKyBjdXJyZW50SWQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgfTtcblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgaW5pdDogZnVuY3Rpb24gKCkge1xuXG4gICAgICAgICAgICAgICAgaWYgKCQod2luZG93KS53aWR0aCgpIDw9IDEyMDApIHtcblxuICAgICAgICAgICAgICAgICAgICAkKCcubC1wYWdlLW5hdl9hc2lkZV9fcHJvdHJhY3RvcicpLmNsaWNrKGZ1bmN0aW9uICgpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgJCgnLmwtcGFnZS1uYXZfYXNpZGUnKS50b2dnbGVDbGFzcygnbC1wYWdlLW5hdl9hY3RpdmUnKTtcblxuICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgICAgICAkKHdpbmRvdykuc2Nyb2xsKGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjaGVja1NlY3Rpb24oKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKCQod2luZG93KS53aWR0aCgpID4gMTIwMCkge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygkKHdpbmRvdykud2lkdGgoKSk7XG5cbiAgICAgICAgICAgICAgICAgICAgJCh3aW5kb3cpLnNjcm9sbChmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYmxvY2tNYWluID0gJCgnLmwtYmxvY2stbWFpbicpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hdlRvcCA9ICQod2luZG93KS5zY3JvbGxUb3AoKSAtIGJsb2NrTWFpbi5wb3NpdGlvbigpLnRvcCArIDQwLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hdlRvcEJvdHRvbSA9ICQoJy5sLXBhZ2UtbmF2X2FzaWRlJykuaGVpZ2h0KCkgLSAkKCcubC1wYWdlLW5hdl9fbGlzdCcpLmhlaWdodCgpO1xuXG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGNoZWNrU2VjdGlvbigpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAobmF2VG9wIDwgMCkgbmF2VG9wID0gMDtcblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG5hdlRvcCA+PSBuYXZUb3BCb3R0b20gKSBuYXZUb3AgPSBuYXZUb3BCb3R0b207XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICQoJy5sLXBhZ2UtbmF2X19saXN0JykuY3NzKCd0b3AnLCBuYXZUb3ApO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG5cblxuXG4gICAgICAgICAgICAgICAgJCgnLmwtcGFnZS1uYXZfX2xpbmsnKS5vbignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgICAgIHNob3dTZWN0aW9uKCQodGhpcykuYXR0cignaHJlZicpLCB0cnVlKTtcblxuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgaWYgKCEhKGxvY2F0aW9uLmhhc2gpKXtcbiAgICAgICAgICAgICAgICAgICAgc2hvd1NlY3Rpb24od2luZG93LmxvY2F0aW9uLmhhc2gsIGZhbHNlKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbikoKTtcbiIsInZhciBGbGlwID0gKGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgZmxpcENvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5mbGlwLWNvbnRhaW5lcicpO1xuXG4gICAgaWYgKCEoZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmZsaXAtY29udGFpbmVyJykpKXtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBcbiAgICByZXR1cm4ge1xuICAgICAgICBpbml0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYy1ibG9jay1saW5rX3RvLWF2dG9yJykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snICxmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgZmxpcENvbnRhaW5lci5jbGFzc0xpc3QuYWRkKCdmbGlwLWNvbnRhaW5lcl9iYWNrJyk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2dvLWhvbWUnKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgIGZsaXBDb250YWluZXIuY2xhc3NMaXN0LnJlbW92ZSgnZmxpcC1jb250YWluZXJfYmFjaycpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG59KSgpO1xuIiwidmFyIE5hdmlnYXRpb24gPSAoZnVuY3Rpb24gKCkge1xuICAgIHZhciBuYXZpZ2F0aW9uID0gJCgnLmMtbmF2X3NpdGUtbGlzdCcpLFxuICAgICAgICBwYXJlbnROYXYgPSAkKCcuY29udGVudCcpLFxuICAgICAgICBoYW1idXJnZXIgPSAkKCcjaGFtYnVyZ2VyJyksXG4gICAgICAgIGl0ZW1zID0gJCgnLmMtbmF2X3NpdGVfX2l0ZW0nKSxcbiAgICAgICAgdGltZXI7XG4gICAgdmFyIGNvdW50ZXIgPSAwO1xuICAgIHZhciBuYXZBY3RpdmUgPSAkKCcuYy1uYXZfc2l0ZV9hY3RpdmUnKTtcblxuICAgIHZhciBhc2NlbnRJdGVtcyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaXRlbXNbY291bnRlcl0uY2xhc3NMaXN0LmFkZCgnYy1uYXZfc2l0ZV9faGlkZGVuJyk7XG4gICAgICAgIGNvdW50ZXIrKztcblxuICAgICAgICB0aW1lciA9IHNldFRpbWVvdXQoYXNjZW50SXRlbXMsIDEwMCk7XG5cbiAgICAgICAgaWYgKGNvdW50ZXIgPj0gaXRlbXMubGVuZ3RoKSB7XG4gICAgICAgICAgICBjbGVhclRpbWVvdXQodGltZXIpO1xuICAgICAgICB9XG5cbiAgICB9O1xuXG4gICAgdmFyIGxpc3RlbmVyID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBoYW1idXJnZXJbMF0uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoKSB7XG5cbiAgICAgICAgICAgIGhhbWJ1cmdlci50b2dnbGVDbGFzcygnYy1oYW1idXJnZXJfYWN0aXZlJyk7XG4gICAgICAgICAgICBuYXZpZ2F0aW9uLnRvZ2dsZUNsYXNzKCdjLW5hdl9zaXRlX2FjdGl2ZScpO1xuXG4gICAgICAgICAgICBpZiAoISEocGFyZW50TmF2LmZpbmQoJy5jLW5hdl9zaXRlX2FjdGl2ZScpLmxlbmd0aCkpIHtcbiAgICAgICAgICAgICAgICB2YXIgbmV3VGltZXI7XG4gICAgICAgICAgICAgICAgY291bnRlciA9IDA7XG4gICAgICAgICAgICAgICAgbmV3VGltZXIgPSBzZXRUaW1lb3V0KGFzY2VudEl0ZW1zLCA2MDApO1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKCEocGFyZW50TmF2LmZpbmQoJy5jLW5hdl9zaXRlX2FjdGl2ZScpLmxlbmd0aCkpIHtcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGl0ZW1zLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIGl0ZW1zW2ldLmNsYXNzTGlzdC5yZW1vdmUoJ2MtbmF2X3NpdGVfX2hpZGRlbicpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICB9KTtcbiAgICB9O1xuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgaW5pdDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgbGlzdGVuZXIoKTtcbiAgICAgICAgfVxuICAgIH1cbn0oKSk7XG4iLCJ2YXIgUHJlbG9hZCA9IChmdW5jdGlvbiAoKSB7XG5cbiAgICB2YXIgcGVyY2VudHNUb3RhbCA9IDAsXG4gICAgICAgIHByZWxvZGVyID0gJCgnLnByZWxvYWRlcicpO1xuXG5cbiAgICB2YXIgaW1nUGF0aCA9ICQoJyonKS5tYXAoZnVuY3Rpb24gKG5keCwgZWxlbWVudCkge1xuICAgICAgICB2YXIgYmFja2dyb3VuZCA9ICQoZWxlbWVudCkuY3NzKCdiYWNrZ3JvdW5kLWltYWdlJyksXG4gICAgICAgICAgICBpc0ltZyA9ICQoZWxlbWVudCkuaXMoJ2ltZycpLFxuICAgICAgICAgICAgaXNWaWRlbyA9ICQoZWxlbWVudCkuaXMoJ3ZpZGVvJyksXG4gICAgICAgICAgICBwYXRoID0gJyc7XG5cbiAgICAgICAgaWYgKGJhY2tncm91bmQgIT0gJ25vbmUnKXtcbiAgICAgICAgICAgIHBhdGggPSBiYWNrZ3JvdW5kLnJlcGxhY2UoJ3VybChcIicsICcnKS5yZXBsYWNlKCdcIiknLCAnJyk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoaXNJbWcgfHwgaXNWaWRlbykge1xuICAgICAgICAgICAgcGF0aCA9ICQoZWxlbWVudCkuYXR0cignc3JjJyk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAocGF0aCkge1xuICAgICAgICAgICAgcmV0dXJuIHBhdGg7XG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIHZhciBhbmltYXRlUGVyY2VudHMgPSBmdW5jdGlvbiAoYW5pbWF0ZVBlcmNlbnQpIHtcbiAgICAgICAgdmFyIGNpcmNsZVBlcmNlbnRhZ2VzID0gJCgnLnByZWxvYWRlcl9fY2VyY2xlLXBlcmNlbnRhZ2VzJylbMF0sXG4gICAgICAgICAgICBkYXNob2Zmc2V0ID0gYW5pbWF0ZVBlcmNlbnQgLyAxMDAgKiAxNTAuNzk2NDQ3MzcyMzEwMDc7XG5cbiAgICAgICAgY2lyY2xlUGVyY2VudGFnZXMuc3R5bGUuc3Ryb2tlRGFzaGFycmF5ID0gZGFzaG9mZnNldCArJyAxNTAuNzk2NDQ3MzcyMzEwMDcnO1xuICAgIH07XG5cbiAgICB2YXIgc2V0UGVyY2VudHMgPSBmdW5jdGlvbih0b3RhbCwgY3VycmVudCkge1xuXG4gICAgICB2YXIgcGVyY2VudHMgPSBNYXRoLmNlaWwoY3VycmVudCAvIHRvdGFsICogMTAwKTtcblxuICAgICAgJCgnLnByZWxvZGVyX19wZXJjZW50YWdlcycpLnRleHQocGVyY2VudHMpO1xuXG4gICAgICAgIGFuaW1hdGVQZXJjZW50cyhwZXJjZW50cyk7XG5cbiAgICAgIGlmIChwZXJjZW50cyA+PSAxMDApIHtcbiAgICAgICAgICBwcmVsb2Rlci5mYWRlT3V0KCk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIHZhciBsb2FkSW1hZ2VzID0gZnVuY3Rpb24gKGltYWdlcykge1xuXG4gICAgICAgIGlmICghaW1hZ2VzLmxlbmd0aCkgcHJlbG9kZXIuZmFkZU91dCgpO1xuXG4gICAgICBpbWFnZXMuZm9yRWFjaChmdW5jdGlvbiAoaW1nLCBpLCBpbWFnZXMpIHtcbiAgICAgICAgICB2YXIgZmFrZUltYWdlID0gJCgnPGltZz4nIHx8ICc8dmlkZW8+Jywge1xuICAgICAgICAgICAgICBhdHRyOiB7XG4gICAgICAgICAgICAgICAgICBzcmM6IGltZ1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICBmYWtlSW1hZ2Uub24oJ2xvYWQgZXJyb3InLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgIHBlcmNlbnRzVG90YWwrKztcbiAgICAgICAgICAgICAgc2V0UGVyY2VudHMoaW1hZ2VzLmxlbmd0aCwgcGVyY2VudHNUb3RhbClcbiAgICAgICAgICB9KVxuICAgICAgfSlcbiAgICB9O1xuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgaW5pdDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIGltZ3MgPSBpbWdQYXRoLnRvQXJyYXkoKTtcbiAgICAgICAgICAgIGxvYWRJbWFnZXMoaW1ncyk7XG4gICAgICAgIH1cbiAgICB9XG5cblxufSgpKTtcbiIsInZhciBzbGlkZXJDb250ZW50ID0gW1xuICAgIHtcbiAgICAgICAgXCJ0aXRsZVwiOiBcItCh0LDQudGCINGI0LrQvtC70Ysg0L7QvdC70LDQudC9INC+0LHRgNCw0LfQvtCy0LDQvdC40Y9cIixcbiAgICAgICAgXCJ0ZWNobm9sb2d5XCI6IFwiSFRNTCAsIENTUywgSkFWQVNDUklQVFwiLFxuICAgICAgICBcInNpdGVVcmxcIjogXCJodHRwczovL2xvZnRzY2hvb2wuY29tL1wiLFxuICAgICAgICBcImltZ1NyY1wiOiBcIi9hc3NldHMvaW1nL2NvbnRlbnQvc2l0ZS5wbmdcIixcbiAgICAgICAgXCJudW1iZXJcIjogXCIxXCJcbiAgICB9LFxuICAgIHtcbiAgICAgICAgXCJ0aXRsZVwiOiBcItCh0LDQudGCMUdvb2dsZVwiLFxuICAgICAgICBcInRlY2hub2xvZ3lcIjogXCJIVE1MICwgQ1NTLCBKQVZBU0NSSVBUXCIsXG4gICAgICAgIFwic2l0ZVVybFwiOiBcImh0dHBzOi8vd3d3Lmdvb2dsZS5ydVwiLFxuICAgICAgICBcImltZ1NyY1wiOiBcImh0dHA6Ly93bWFyZWEubmV0L3dwLWNvbnRlbnQvdXBsb2Fkcy8yMDE2LzA1LzJ3ZWJfaG9zdGluZ19zZW9fc2l0ZS5qcGdcIixcbiAgICAgICAgXCJudW1iZXJcIjogXCIyXCJcbiAgICB9LFxuICAgIHtcbiAgICAgICAgXCJ0aXRsZVwiOiBcItCh0LDQudGCMnlhXCIsXG4gICAgICAgIFwidGVjaG5vbG9neVwiOiBcIkhUTUwgLCBDU1MsIEpBVkFTQ1JJUFRcIixcbiAgICAgICAgXCJzaXRlVXJsXCI6IFwiaHR0cHM6Ly93d3cueWFuZGV4LnJ1L1wiLFxuICAgICAgICBcImltZ1NyY1wiOiBcImh0dHA6Ly9idW1ibGViZWUuYXJ0ZGVwby5jb20udWEvdXBsb2FkL2libG9jay9kYjkvZGI5MzdiZDQ4NzdlZmUwMzE1Mzk2ZDhhMzQwOWFmZWYuanBnXCIsXG4gICAgICAgIFwibnVtYmVyXCI6IFwiM1wiXG4gICAgfSxcbiAgICB7XG4gICAgICAgIFwidGl0bGVcIjogXCLQodCw0LnRgjNtYWlsXCIsXG4gICAgICAgIFwidGVjaG5vbG9neVwiOiBcIkhUTUwgLCBDU1MsIEpBVkFTQ1JJUFRcIixcbiAgICAgICAgXCJzaXRlVXJsXCI6IFwiaHR0cHM6Ly9tYWlsLnJ1L1wiLFxuICAgICAgICBcImltZ1NyY1wiOiBcImh0dHA6Ly9jczAxLnNlcnZpY2VzLm15YTUucnUvLS91UnVSSHdXVjlja3drRXYtc285Vkd3L3N2L3RoZW1lcy9jZW50cmFsLzAvMjIyLTAvMjIyLTAucG5nPzE0NTIxNzUyMDJcIixcbiAgICAgICAgXCJudW1iZXJcIjogXCI0XCJcbiAgICB9XG5dO1xuXG5cbnZhciBzbGlkZXJQYXJzZUNvbnRlbnQgPSBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIHN0ckRiID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2RiJykuZ2V0QXR0cmlidXRlKCdkYXRhLWRiJyk7XG4gICAgdmFyIGFyclN0ciA9IFtdO1xuICAgIHN0ckRiID0gc3RyRGIucmVwbGFjZShcIlt7XCIsXCJcIik7XG4gICAgc3RyRGIgPSBzdHJEYi5yZXBsYWNlKFwifV1cIixcIlwiKTtcbiAgICBhcnJTdHIgPSBzdHJEYi5zcGxpdCgnfSx7Jyk7XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFyclN0ci5sZW5ndGg7IGkrKyl7XG4gICAgICAgIGFyclN0cltpXSA9ICd7JyArYXJyU3RyW2ldKyAnfSc7XG4gICAgICAgIGFyclN0cltpXSA9IEpTT04ucGFyc2UoYXJyU3RyW2ldKTtcbiAgICB9XG5cbiAgICByZXR1cm4gYXJyU3RyO1xufTtcblxudmFyIFNsaWRlciA9IChmdW5jdGlvbiAoKSB7XG5cbiAgICBpZiAoZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmwtc2xpZGVyJykgPT09IG51bGwpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIHNsaWRlckNvbnRlbnQgPSBzbGlkZXJQYXJzZUNvbnRlbnQoKTtcblxuICAgIHZhciBkb2MgPSBkb2N1bWVudDtcbiAgICB2YXIgYXJyb3dOZXh0ID0gZG9jLnF1ZXJ5U2VsZWN0b3IoJyNhcnJvdy11cCcpLFxuICAgICAgICBhcnJvd1ByZXYgPSBkb2MucXVlcnlTZWxlY3RvcignI2Fycm93LWRvd24nKSxcbiAgICAgICAgJHNsaWRlQWN0aXZlQ2FwdGlvbiA9ICQoJyNzbGlkZS1hY3RpdmUtY2FwdGlvbicpLFxuICAgICAgICAkc2xpZGVBY3RpdmVDYXB0aW9uVGl0bGUgPSAkc2xpZGVBY3RpdmVDYXB0aW9uLmZpbmQoJy5jLWJsb2NrLXRpdGxlX190ZXh0JyksXG4gICAgICAgICRzbGlkZUFjdGl2ZUNhcHRpb25UZWNobm9sb2d5ID0gJHNsaWRlQWN0aXZlQ2FwdGlvbi5maW5kKCcuYy1ibG9jay10ZXh0X2JsdWUnKSxcbiAgICAgICAgJHNsaWRlQWN0aXZlQ2FwdGlvbkxpbmsgPSAkc2xpZGVBY3RpdmVDYXB0aW9uLmZpbmQoJy5jLWJsb2NrLWxpbmtfYmx1ZScpLFxuICAgICAgICAkc2xpZGVyQWN0aXZlUGljV3JhcHBlciA9ICQoJyNzbGlkZS1hY3RpdmUtcGljJyksXG4gICAgICAgICRzbGlkZUFjdGl2ZVBpY1NwYW4gPSAkc2xpZGVyQWN0aXZlUGljV3JhcHBlci5maW5kKCdzcGFuJyksXG4gICAgICAgICRzbGlkZUFjdGl2ZVBpYyA9ICQoJy5sLXNsaWRlcl9fcGljJyksXG4gICAgICAgICRzbGlkZXJJdGVtcyA9ICQoJyNzbGlkZS1pdGVtcycpLFxuICAgICAgICAkZm9uRGFyayA9ICQoJy5sLXNsaWRlcl9fYXJyb3ctZGFyaycpLFxuICAgICAgICBjdXJyZW50U2xpZGUgPSAwLFxuICAgICAgICBzaXplID0gc2xpZGVyQ29udGVudC5sZW5ndGgsXG4gICAgICAgIGluUHJvY2Vzc05leHQgPSBmYWxzZSxcbiAgICAgICAgaW5Qcm9jZXNzUHJldiA9IGZhbHNlLFxuICAgICAgICBhbmltYXRpb25FbmQ7XG5cbiAgICB2YXIgTGlzdGVuZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGFycm93TmV4dC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICBjdXJyZW50U2xpZGUgPSBsaW1pdGVyKGN1cnJlbnRTbGlkZSArIDEpO1xuXG4gICAgICAgICAgICBpZiAoYW5pbWF0aW9uRW5kID49IDMpIGluUHJvY2Vzc05leHQgPSBmYWxzZTtcblxuICAgICAgICAgICAgaWYgKCFpblByb2Nlc3NOZXh0KSB7XG4gICAgICAgICAgICAgICAgaW5Qcm9jZXNzTmV4dCA9IHRydWU7XG4gICAgICAgICAgICAgICAgZGV0ZXJBY3RpdmVTbGlkZSgpO1xuICAgICAgICAgICAgICAgIGFuaW1hdGlvbkVuZCA9IDA7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGFycm93UHJldi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICBjdXJyZW50U2xpZGUgPSBsaW1pdGVyKGN1cnJlbnRTbGlkZSAtIDEpO1xuXG4gICAgICAgICAgICBpZiAoYW5pbWF0aW9uRW5kID49IDMpIGluUHJvY2Vzc1ByZXYgPSBmYWxzZTtcblxuICAgICAgICAgICAgaWYgKCFpblByb2Nlc3NQcmV2KSB7XG4gICAgICAgICAgICAgICAgaW5Qcm9jZXNzUHJldiA9IHRydWU7XG4gICAgICAgICAgICAgICAgZGV0ZXJBY3RpdmVTbGlkZSgpO1xuICAgICAgICAgICAgICAgIGFuaW1hdGlvbkVuZCA9IDA7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH07XG5cbiAgICB2YXIgY3JlYXRlRWxlbWVudCA9IGZ1bmN0aW9uIChjbGFzc1Bvc2l0aW9uLCBjbGFzc1Zpc2libGUpIHtcbiAgICAgICAgdmFyIGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblxuICAgICAgICBlbGVtZW50LmNsYXNzTGlzdC5hZGQoJ2wtc2xpZGVyX19hcnJvd3MtaXRlbScpO1xuICAgICAgICBlbGVtZW50LmNsYXNzTGlzdC5hZGQoY2xhc3NQb3NpdGlvbik7XG4gICAgICAgIGVsZW1lbnQuY2xhc3NMaXN0LmFkZChjbGFzc1Zpc2libGUpO1xuXG4gICAgICAgIHJldHVybiBlbGVtZW50O1xuICAgIH07XG5cbiAgICB2YXIgbmV4dFNsaWRlRWxlbWVudCA9IGNyZWF0ZUVsZW1lbnQoJ2wtc2xpZGVyX19hcnJvd3MtdXAnLCAnbC1zbGlkZXJfX2Fycm93cy1uZXh0LW5leHQnKSxcbiAgICAgICAgcHJldlNsaWRlRWxlbWVudCA9IGNyZWF0ZUVsZW1lbnQoJ2wtc2xpZGVyX19hcnJvd3MtZG93bicsICdsLXNsaWRlcl9fYXJyb3dzLXByZXYnKTtcblxuXG4gICAgdmFyIGNyZWF0ZUltZ0VsZW1lbnQgPSBmdW5jdGlvbiAoc3JjKSB7XG4gICAgICAgIHZhciBpbWcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKTtcbiAgICAgICAgaW1nLmNsYXNzTGlzdC5hZGQoJ2wtc2xpZGVyX19hcnJvdy1waWMnKTtcbiAgICAgICAgaW1nLnNldEF0dHJpYnV0ZSgnc3JjJywgJy9hc3NldHMnICsgc3JjKTtcblxuICAgICAgICByZXR1cm4gaW1nO1xuICAgIH07XG5cbiAgICB2YXIgY3JlYXRlRGl2RWxlbWVudCA9IGZ1bmN0aW9uICh0ZXh0KSB7XG4gICAgICAgIHZhciBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gICAgICAgIGRpdi5pbm5lclRleHQgPSB0ZXh0O1xuXG4gICAgICAgIHJldHVybiBkaXY7XG4gICAgfTtcblxuICAgIHZhciB0ZXh0QW5pbWF0ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyXG4gICAgICAgICAgICBzdHJUaXRsZSA9IHNsaWRlckNvbnRlbnRbY3VycmVudFNsaWRlXS50aXRsZSxcbiAgICAgICAgICAgIHN0clRlY2hub2xvZ3kgPSBzbGlkZXJDb250ZW50W2N1cnJlbnRTbGlkZV0udGVjaG5vbG9neSxcbiAgICAgICAgICAgIGNoYXJzVGl0bGUgPSBzdHJUaXRsZS5zcGxpdCgnJyksXG4gICAgICAgICAgICBjaGFyc1RlY2hub2xvZ3kgPSBzdHJUZWNobm9sb2d5LnNwbGl0KCcnKSxcbiAgICAgICAgICAgIGNvdW50ZXJUaXRsZSA9IDAsXG4gICAgICAgICAgICBjb3VudGVyVGVjaCA9IDAsXG4gICAgICAgICAgICB0aW1lcjtcblxuICAgICAgICAkc2xpZGVBY3RpdmVDYXB0aW9uVGl0bGVbMF0uaW5uZXJIVE1MID0gJyc7XG4gICAgICAgICRzbGlkZUFjdGl2ZUNhcHRpb25UZWNobm9sb2d5WzBdLmlubmVySFRNTCA9ICcnO1xuXG4gICAgICAgIHZhciBlYWNoQ2hhclRpdGxlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIGNoYXIgPSBkb2MuY3JlYXRlVGV4dE5vZGUoY2hhcnNUaXRsZVtjb3VudGVyVGl0bGVdKTtcblxuICAgICAgICAgICAgJHNsaWRlQWN0aXZlQ2FwdGlvblRpdGxlWzBdLmFwcGVuZENoaWxkKGNoYXIpO1xuXG4gICAgICAgICAgICBjb3VudGVyVGl0bGUrKztcbiAgICAgICAgICAgIHRpbWVyID0gc2V0VGltZW91dChlYWNoQ2hhclRpdGxlLCA1MCk7XG5cbiAgICAgICAgICAgIGlmIChjb3VudGVyVGl0bGUgPT09IGNoYXJzVGl0bGUubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgY2xlYXJJbnRlcnZhbCh0aW1lcik7XG4gICAgICAgICAgICAgICAgYW5pbWF0aW9uRW5kKys7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG5cbiAgICAgICAgdmFyIGVhY2hDaGFyVGVjaCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciBjaGFyID0gZG9jLmNyZWF0ZVRleHROb2RlKGNoYXJzVGVjaG5vbG9neVtjb3VudGVyVGVjaF0pO1xuXG4gICAgICAgICAgICAkc2xpZGVBY3RpdmVDYXB0aW9uVGVjaG5vbG9neVswXS5hcHBlbmRDaGlsZChjaGFyKTtcblxuICAgICAgICAgICAgY291bnRlclRlY2grKztcbiAgICAgICAgICAgIHRpbWVyID0gc2V0VGltZW91dChlYWNoQ2hhclRlY2gsIDUwKTtcblxuICAgICAgICAgICAgaWYgKGNvdW50ZXJUZWNoID09PSBjaGFyc1RlY2hub2xvZ3kubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgY2xlYXJJbnRlcnZhbCh0aW1lcik7XG4gICAgICAgICAgICAgICAgYW5pbWF0aW9uRW5kKys7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG5cbiAgICAgICAgZWFjaENoYXJUaXRsZSgpO1xuICAgICAgICBlYWNoQ2hhclRlY2goKTtcbiAgICB9O1xuXG5cbiAgICB2YXIgYnVpbGRTbGlkZXIgPSBmdW5jdGlvbiAoKSB7XG5cbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzbGlkZXJDb250ZW50Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICB2YXJcbiAgICAgICAgICAgICAgICBwcmV2U2xpZGVFbGVtZW50ID0gY3JlYXRlRWxlbWVudCgnbC1zbGlkZXJfX2Fycm93cy1kb3duJywgJ2wtc2xpZGVyX19hcnJvd3MtcHJldicpO1xuXG4gICAgICAgICAgICBwcmV2U2xpZGVFbGVtZW50LnNldEF0dHJpYnV0ZSgnaWQnLCAncHJldicgKyBpKTtcbiAgICAgICAgICAgIHByZXZTbGlkZUVsZW1lbnQuYXBwZW5kQ2hpbGQoY3JlYXRlSW1nRWxlbWVudChzbGlkZXJDb250ZW50W2ldLnBpY3R1cmUpKTtcbiAgICAgICAgICAgIHByZXZTbGlkZUVsZW1lbnQuYXBwZW5kQ2hpbGQoY3JlYXRlRGl2RWxlbWVudCggaSsxICkpO1xuICAgICAgICAgICAgJHNsaWRlckl0ZW1zWzBdLmluc2VydEJlZm9yZShwcmV2U2xpZGVFbGVtZW50LCAkZm9uRGFya1swXSk7XG4gICAgICAgIH1cblxuICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IHNsaWRlckNvbnRlbnQubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICAgIHZhclxuICAgICAgICAgICAgICAgIG5leHRTbGlkZUVsZW1lbnQgPSBjcmVhdGVFbGVtZW50KCdsLXNsaWRlcl9fYXJyb3dzLXVwJywgJ2wtc2xpZGVyX19hcnJvd3MtbmV4dCcpO1xuXG4gICAgICAgICAgICBuZXh0U2xpZGVFbGVtZW50LnNldEF0dHJpYnV0ZSgnaWQnLCAnbmV4dCcgKyBqKTtcbiAgICAgICAgICAgIG5leHRTbGlkZUVsZW1lbnQuYXBwZW5kQ2hpbGQoY3JlYXRlSW1nRWxlbWVudChzbGlkZXJDb250ZW50W2pdLnBpY3R1cmUpKTtcbiAgICAgICAgICAgIG5leHRTbGlkZUVsZW1lbnQuYXBwZW5kQ2hpbGQoY3JlYXRlRGl2RWxlbWVudChqICsgMSkpO1xuICAgICAgICAgICAgJHNsaWRlckl0ZW1zWzBdLmluc2VydEJlZm9yZShuZXh0U2xpZGVFbGVtZW50LCAkZm9uRGFya1swXSk7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgdmFyIGRldGVyQWN0aXZlU2xpZGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhclxuICAgICAgICAgICAgbWFpblNsaWRlID0gc2xpZGVyQ29udGVudFtsaW1pdGVyKGN1cnJlbnRTbGlkZSldLFxuICAgICAgICAgICAgaXRlbXNQcmV2ID0gJHNsaWRlckl0ZW1zLmNoaWxkcmVuKCcubC1zbGlkZXJfX2Fycm93cy1wcmV2JyksXG4gICAgICAgICAgICBpdGVtc05leHQgPSAkc2xpZGVySXRlbXMuY2hpbGRyZW4oJy5sLXNsaWRlcl9fYXJyb3dzLW5leHQnKTtcblxuICAgICAgICB0ZXh0QW5pbWF0ZSgpO1xuXG4gICAgICAgICRzbGlkZXJBY3RpdmVQaWNXcmFwcGVyWzBdLmNsYXNzTGlzdC5hZGQoJ2wtc2xpZGVyX19waWMtd3JhcHBlcl90cmFuc2Zvcm0nKTtcblxuICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICRzbGlkZXJBY3RpdmVQaWNXcmFwcGVyWzBdLmNsYXNzTGlzdC5yZW1vdmUoJ2wtc2xpZGVyX19waWMtd3JhcHBlcl90cmFuc2Zvcm0nKTtcbiAgICAgICAgICAgICRzbGlkZUFjdGl2ZVBpY1swXS5zZXRBdHRyaWJ1dGUoJ3NyYycsICcvYXNzZXRzJyArIG1haW5TbGlkZS5waWN0dXJlKTtcbiAgICAgICAgICAgICRzbGlkZUFjdGl2ZVBpY1NwYW5bMF0uaW5uZXJUZXh0ID0gY3VycmVudFNsaWRlICsgMTtcbiAgICAgICAgICAgICRzbGlkZUFjdGl2ZUNhcHRpb25MaW5rWzBdLnNldEF0dHJpYnV0ZSgnaHJlZicsIG1haW5TbGlkZS5zaXRlVXJsKTtcbiAgICAgICAgICAgIGFuaW1hdGlvbkVuZCsrO1xuICAgICAgICB9LCA1MDApO1xuXG4gICAgICAgICQoJy5sLXNsaWRlcl9fYXJyb3dzLW5leHQubC1zbGlkZXJfX2Fycm93cy1pdGVtX2FjdGl2ZScpLmFuaW1hdGUoe3RvcDogJy0xMDAlJ30sIDUwMCk7XG4gICAgICAgICQoJyNuZXh0JyArIFtsaW1pdGVyKGN1cnJlbnRTbGlkZSArIDEpXSkuYW5pbWF0ZSh7dG9wOiAnMCd9LCA1MDApO1xuICAgICAgICAkKCcubC1zbGlkZXJfX2Fycm93cy1wcmV2Lmwtc2xpZGVyX19hcnJvd3MtaXRlbV9hY3RpdmUnKS5hbmltYXRlKHt0b3A6ICcxMDAlJ30sIDUwMCk7XG4gICAgICAgICQoJyNwcmV2JyArIFtsaW1pdGVyKGN1cnJlbnRTbGlkZSAtIDEpXSkuYW5pbWF0ZSh7dG9wOiAnMCd9LCA1MDApO1xuXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgaXRlbXNQcmV2Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBpdGVtc1ByZXZbaV0uY2xhc3NMaXN0LnJlbW92ZSgnbC1zbGlkZXJfX2Fycm93cy1pdGVtX2FjdGl2ZScpO1xuICAgICAgICAgICAgaXRlbXNOZXh0W2ldLmNsYXNzTGlzdC5yZW1vdmUoJ2wtc2xpZGVyX19hcnJvd3MtaXRlbV9hY3RpdmUnKTtcblxuICAgICAgICAgICAgaWYgKGl0ZW1zUHJldltpXS5oYXNBdHRyaWJ1dGUoJ3N0eWxlJykpIHtcbiAgICAgICAgICAgICAgICBpdGVtc1ByZXZbaV0ucmVtb3ZlQXR0cmlidXRlKCdzdHlsZScpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoaXRlbXNOZXh0W2ldLmhhc0F0dHJpYnV0ZSgnc3R5bGUnKSkge1xuICAgICAgICAgICAgICAgIGl0ZW1zTmV4dFtpXS5yZW1vdmVBdHRyaWJ1dGUoJ3N0eWxlJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpdGVtc1ByZXZbbGltaXRlcihjdXJyZW50U2xpZGUgLSAxKV0uY2xhc3NMaXN0LmFkZCgnbC1zbGlkZXJfX2Fycm93cy1pdGVtX2FjdGl2ZScpO1xuICAgICAgICBpdGVtc05leHRbbGltaXRlcihjdXJyZW50U2xpZGUgKyAxKV0uY2xhc3NMaXN0LmFkZCgnbC1zbGlkZXJfX2Fycm93cy1pdGVtX2FjdGl2ZScpO1xuICAgIH07XG5cbiAgICB2YXIgbGltaXRlciA9IGZ1bmN0aW9uICh2YWwpIHtcblxuICAgICAgICBpZiAodmFsID49IHNpemUpIHtcbiAgICAgICAgICAgIHZhbCA9IDA7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodmFsIDwgMCkge1xuICAgICAgICAgICAgdmFsID0gc2l6ZSAtIDE7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdmFsO1xuICAgIH07XG5cbiAgICByZXR1cm4ge1xuICAgICAgICBpbml0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBidWlsZFNsaWRlcigpO1xuICAgICAgICAgICAgZGV0ZXJBY3RpdmVTbGlkZSgpO1xuICAgICAgICAgICAgTGlzdGVuZXIoKTtcbiAgICAgICAgfVxuICAgIH1cbn0oKSk7XG4iLCIvLyB2YXIgVmFsaWRhdGlvbkF2dG9yID0gKGZ1bmN0aW9uICgpIHtcbi8vICAgICBpZiAoISgkKCcuYy1mb3JtLWF2dG9yJykpKSByZXR1cm4gZmFsc2U7XG4vL1xuLy8gICAgIHZhciB2YWxpZCA9IGZ1bmN0aW9uICgpIHtcbi8vXG4vLyAgICAgICAgIHZhclxuLy8gICAgICAgICAgICAgJGZvcm0gPSAkKCcuYy1mb3JtLWF2dG9yJyksXG4vLyAgICAgICAgICAgICAkaW5wdXQgPSAkZm9ybS5maW5kKCcuYy1mb3JtLWF2dG9yX19pbnB1dCcpLFxuLy8gICAgICAgICAgICAgJGNoZWNrQm94ID0gJGZvcm0uZmluZCgnaW5wdXRbdHlwZT1cImNoZWNrYm94XCJdJyksXG4vLyAgICAgICAgICAgICAkcmFkaW8gPSAkZm9ybS5maW5kKCdpbnB1dFt0eXBlPVwicmFkaW9cIl0nKSxcbi8vICAgICAgICAgICAgIG51bWJlckVtcHR5SW5wdXQgPSAwLFxuLy8gICAgICAgICAgICAgbnVtYmVyQ2hlY2VrZCA9IDA7XG4vL1xuLy8gICAgICAgICAkZm9ybS5maW5kKCcuZXJyb3InKS5yZW1vdmUoKTtcbi8vXG4vLyAgICAgICAgICRpbnB1dC5lYWNoKGZ1bmN0aW9uICgpIHtcbi8vICAgICAgICAgICAgIHZhciAkdGhpcyA9ICQodGhpcyk7XG4vL1xuLy8gICAgICAgICAgICAgaWYgKCR0aGlzLnZhbCgpID09PSAnJykge1xuLy9cbi8vICAgICAgICAgICAgICAgICAkdGhpcy5wYXJlbnRzKCcuYy1mb3JtLWF2dG9yX19pbnB1dC13cmFwcGVyICcpXG4vLyAgICAgICAgICAgICAgICAgICAgIC5jc3Moeydib3JkZXInOiAnMnB4IHNvbGlkIHJlZCd9KTtcbi8vICAgICAgICAgICAgIH0gZWxzZSB7XG4vLyAgICAgICAgICAgICAgICAgbnVtYmVyRW1wdHlJbnB1dCsrO1xuLy8gICAgICAgICAgICAgfVxuLy8gICAgICAgICB9KTtcbi8vXG4vLyAgICAgICAgICRjaGVja0JveC5lYWNoKGZ1bmN0aW9uICgpIHtcbi8vICAgICAgICAgICAgIHZhciAkdGhpcyA9ICQodGhpcyk7XG4vL1xuLy8gICAgICAgICAgICAgaWYgKCEhJHRoaXMucHJvcCgnY2hlY2tlZCcpKSB7XG4vLyAgICAgICAgICAgICAgICAgbnVtYmVyQ2hlY2VrZCsrO1xuLy8gICAgICAgICAgICAgfVxuLy8gICAgICAgICB9KTtcbi8vXG4vLyAgICAgICAgICRyYWRpby5lYWNoKGZ1bmN0aW9uICgpIHtcbi8vICAgICAgICAgICAgIHZhciAkdGhpcyA9ICQodGhpcyk7XG4vL1xuLy8gICAgICAgICAgICAgaWYgKCEhJHRoaXMucHJvcCgnY2hlY2tlZCcpKSB7XG4vLyAgICAgICAgICAgICAgICAgbnVtYmVyQ2hlY2VrZCsrO1xuLy8gICAgICAgICAgICAgfVxuLy8gICAgICAgICB9KTtcbi8vXG4vLyAgICAgICAgIGlmIChudW1iZXJFbXB0eUlucHV0IDw9IDEpIHtcbi8vICAgICAgICAgICAgICQoJy5jLWZvcm0tYXZ0b3JfX2NvbnRlbnQnKS5hcHBlbmQoJzxzcGFuIGNsYXNzPVwiZXJyb3JcIiBzdHlsZT1cImNvbG9yOiByZWRcIj7Ql9Cw0L/QvtC70L3QuNGC0LUg0LLRgdC1INC/0L7Qu9GPINGE0L7RgNC80Ys8L3NwYW4+Jyk7XG4vLyAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4vLyAgICAgICAgIH1cbi8vXG4vLyAgICAgICAgIGlmIChudW1iZXJDaGVjZWtkIDw9IDIgfHwgJCgnI2h6JykucHJvcCgnY2hlY2tlZCcpKSB7XG4vLyAgICAgICAgICAgICAkKCcuYy1mb3JtLWF2dG9yX19jb250ZW50JykuYXBwZW5kKCc8c3BhbiBjbGFzcz1cImVycm9yXCIgc3R5bGU9XCJjb2xvcjogcmVkXCI+0KDQvtCx0L7RgtCw0Lwg0YLRg9GCINC90LUg0LzQtdGB0YLQvjwvc3Bhbj4nKTtcbi8vICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbi8vICAgICAgICAgfVxuLy8gICAgIH07XG4vL1xuLy8gICAgIHJldHVybiB7XG4vLyAgICAgICAgIGluaXQ6IGZ1bmN0aW9uICgpIHtcbi8vICAgICAgICAgICAgICQoJy5jLWZvcm0tYXZ0b3InKS5zdWJtaXQoZnVuY3Rpb24gKGUpIHtcbi8vICAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4vLyAgICAgICAgICAgICAgICAgdmFsaWQoKTtcbi8vICAgICAgICAgICAgIH0pO1xuLy8gICAgICAgICB9XG4vLyAgICAgfVxuLy8gfSkoKTtcblxudmFyIFZhbGlkYXRpb25Db250YWN0TWUgPSAoZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAoISQoJy5jLWZvcm1fY29udGFjdC1tZScpLmxlbmd0aCkgcmV0dXJuIGZhbHNlO1xuXG4gICAgICAgIHZhciAkZm9ybUNvbnRhY3RNZSA9ICQoJy5jLWZvcm1fY29udGFjdC1tZScpLFxuICAgICAgICAgICAgJGlucHV0cyA9ICRmb3JtQ29udGFjdE1lLmZpbmQoJy5jLWZvcm1fX2lucHV0Jyk7XG5cbiAgICAgICAgdmFyIHJlc2V0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgJGZvcm1Db250YWN0TWUuZmluZCgnLmVycm9yJykucmVtb3ZlKCk7XG4gICAgICAgICAgICAkaW5wdXRzLmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICQodGhpcykuY3NzKHsnYm9yZWRlcic6ICdub25lJ30pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH07XG5cbiAgICAgICAgdmFyIHZhbGlkID0gZnVuY3Rpb24gKCkge1xuXG5cbiAgICAgICAgICAgIHZhclxuICAgICAgICAgICAgICAgIGNvdW50ZXIgPSAwO1xuXG4gICAgICAgICAgICAkaW5wdXRzLmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHZhciAkdGhpcyA9ICQodGhpcyk7XG5cbiAgICAgICAgICAgICAgICBpZiAoISEkdGhpcy52YWwoKSkge1xuICAgICAgICAgICAgICAgICAgICBjb3VudGVyKys7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKCEkdGhpcy52YWwoKSkge1xuICAgICAgICAgICAgICAgICAgICAkdGhpcy5jc3Moeydib3JkZXInOiAnMXB4IHNvbGlkIHJlZCd9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgaWYgKGNvdW50ZXIgPCAzKSB7XG4gICAgICAgICAgICAgICAgJGZvcm1Db250YWN0TWUuZmluZCgnLmMtZm9ybV9fYnV0dG9uLWNvbnRhaW5lcicpXG4gICAgICAgICAgICAgICAgICAgIC5iZWZvcmUoJzxzcGFuIGNsYXNzPVwiZXJyb3JcIiBzdHlsZT1cImNvbG9yOiByZWRcIj7Ql9Cw0L/QvtC70L3QuNGC0LUg0LLRgdC1INC/0L7Qu9GPINGE0L7RgNC80Ys8L3NwYW4+Jyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGluaXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAkZm9ybUNvbnRhY3RNZS5maW5kKCcuYy1mb3JtJykuc3VibWl0KGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICAgICAgcmVzZXQoKTtcbiAgICAgICAgICAgICAgICAgICAgdmFsaWQoKTtcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgICRmb3JtQ29udGFjdE1lLmZpbmQoJy5jLWZvcm1fX2J1dHRvbScpLmNsaWNrKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgcmVzZXQoKTtcbiAgICAgICAgICAgICAgICAgICAgJGlucHV0cy5lYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciAkdGhpcyA9ICQodGhpcyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAkdGhpcy52YWwoJycpO1xuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSkoKTsiLCIoZnVuY3Rpb24gKCkge1xuICAgICd1c2Ugc3RyaWN0JztcblxuICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAvLyBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZ3JlYXRpbmdfcGljdHVyZScpLmNsYXNzTGlzdC5hZGQoJ20tLXNob3cnKTtcbiAgICB9LCAxMDAwKTtcbn0pKCk7XG5cbnZhciBibHVyID0gKGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgY29udGFpbmVyID0gJCgnLmMtZm9ybS1jb250YWluZXInKSxcbiAgICAgICAgZm9ybSA9ICQoJy5jLWZvcm0td3JhcHBlcicpO1xuXG4gICAgaWYgKGNvbnRhaW5lci5sZW5ndGggPT09IDApIHJldHVybiBmYWxzZTtcblxuICAgIHJldHVybiB7XG4gICAgICAgIHNldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIGltZyA9ICQoJy5jLWJsb2NrLWJnX3BpYycpLFxuICAgICAgICAgICAgICAgIGltZ1dpZHRoID0gaW1nLndpZHRoKCksXG4gICAgICAgICAgICAgICAgaW1nSGVpZ2h0ID0gaW1nLmhlaWdodCgpLFxuICAgICAgICAgICAgICAgIGJsdXJDc3MgPSBmb3JtWzBdLnN0eWxlLFxuICAgICAgICAgICAgICAgIHBvc0xlZnQgPSAtY29udGFpbmVyLm9mZnNldCgpLmxlZnQsXG4gICAgICAgICAgICAgICAgcG9zVG9wID0gLWNvbnRhaW5lci5wb3NpdGlvbigpLnRvcDtcblxuICAgICAgICAgICAgYmx1ckNzcy5iYWNrZ3JvdW5kU2l6ZSA9IGltZ1dpZHRoICsgJ3B4JyArICcgJyArIGltZ0hlaWdodCArICdweCc7XG4gICAgICAgICAgICBibHVyQ3NzLmJhY2tncm91bmRQb3NpdGlvbiA9IHBvc0xlZnQgKyAncHgnICsgJyAnICsgcG9zVG9wICsgJ3B4JztcbiAgICAgICAgICAgIGZvcm0uY3NzKHtcbiAgICAgICAgICAgICAgICAnYmFja2dyb3VuZC1zaXplJzogaW1nV2lkdGggKyAncHgnICsgJyAnICsgaW1nSGVpZ2h0ICsgJ3B4JyxcbiAgICAgICAgICAgICAgICAnYmFja2dyb3VuZC1wb3NpdGlvbic6IHBvc0xlZnQgKyAncHgnICsgJyAnICsgcG9zVG9wICsgJ3B4J1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG59KCkpO1xuXG52YXIgcGFyYWxsYXggPSAoZnVuY3Rpb24gKCkge1xuICAgIHZhciBiZyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5sLWhlcm9fX2JnJyk7XG4gICAgdmFyIHVzZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYy11c2VyJyk7XG4gICAgdmFyIGZvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jLXVzZXJfX2JnJyk7XG5cbiAgICByZXR1cm4ge1xuICAgICAgICBtb3ZlOiBmdW5jdGlvbiAoYmxvY2ssIHdpbmRvd1Njcm9sbCwgc3RyYWZlQW1vdW5kKSB7XG4gICAgICAgICAgICB2YXIgc3RyYWZlID0gd2luZG93U2Nyb2xsIC8gLXN0cmFmZUFtb3VuZCArICclJztcbiAgICAgICAgICAgIHZhciB0cmFuc2Zvcm1TdHJpbmcgPSAndHJhbnNsYXRlM2QoMCwnICsgc3RyYWZlICsgJywgMCknO1xuICAgICAgICAgICAgdmFyIHN0eWxlID0gYmxvY2suc3R5bGU7XG5cbiAgICAgICAgICAgIHN0eWxlLnRyYW5zZm9ybSA9IHRyYW5zZm9ybVN0cmluZztcbiAgICAgICAgICAgIHN0eWxlLndlYmtpdFRyYW5zZm9ybSA9IHRyYW5zZm9ybVN0cmluZztcblxuICAgICAgICB9LFxuICAgICAgICBpbml0OiBmdW5jdGlvbiAod1Njcm9sbCkge1xuICAgICAgICAgICAgdGhpcy5tb3ZlKGJnLCB3U2Nyb2xsLCA1MCk7XG4gICAgICAgICAgICB0aGlzLm1vdmUoZm9uLCB3U2Nyb2xsLCAyMCk7XG4gICAgICAgIH1cbiAgICB9XG5cbn0oKSk7XG5cbnZhciBwYXJhbGxheE1vdXNlID0gZnVuY3Rpb24gKGUpIHtcbiAgICBpZiAoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3BhcmFsYXgnKSA9PT0gbnVsbCkgcmV0dXJuIGZhbHNlO1xuXG4gICAgdmFyIHBhcmFsbGF4Q29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3BhcmFsYXgnKSxcbiAgICAgICAgbGF5ZXJzID0gcGFyYWxsYXhDb250YWluZXIuY2hpbGRyZW4sXG4gICAgICAgIHBhZ2VYID0gZS5wYWdlWCxcbiAgICAgICAgcGFnZVkgPSBlLnBhZ2VZLFxuICAgICAgICBpbml0aWFsWCA9ICh3aW5kb3cuaW5uZXJXaWR0aCAvIDIpIC0gcGFnZVgsXG4gICAgICAgIGluaXRpYWxZID0gKHdpbmRvdy5pbm5lckhlaWdodCAvIDIpIC0gcGFnZVk7XG5cbiAgICBbXS5zbGljZS5jYWxsKGxheWVycykuZm9yRWFjaChmdW5jdGlvbiAobGF5ZXIsIGkpIHtcbiAgICAgICAgdmFyIGRpdmlkZXIgPSAoaSArIDIpIC8gNTAsXG4gICAgICAgICAgICBib3R0b21Qb3NpdGlvbiA9ICh3aW5kb3cuaW5uZXJIZWlnaHQgLyAyKSAqIGRpdmlkZXIsXG4gICAgICAgICAgICBwb3NpdGlvblggPSBpbml0aWFsWCAqIGRpdmlkZXIsXG4gICAgICAgICAgICBwb3NpdGlvblkgPSBpbml0aWFsWSAqIGRpdmlkZXIsXG4gICAgICAgICAgICBsYXllclN0eWxlID0gbGF5ZXIuc3R5bGUsXG4gICAgICAgICAgICB0cmFuc2Zvcm1TdHJpbmcgPSAndHJhbnNsYXRlM2QoJyArIHBvc2l0aW9uWCArICdweCwgJyArIHBvc2l0aW9uWSArICdweCwgMHB4KSc7XG4gICAgICAgIGxheWVyU3R5bGUudHJhbnNmb3JtID0gdHJhbnNmb3JtU3RyaW5nO1xuICAgIH0pXG59O1xuXG52YXIgQXBwID0gKGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm57XG4gICAgICAgIGluaXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIFByZWxvYWQuaW5pdCgpO1xuICAgICAgICAgICAgTmF2aWdhdGlvbi5pbml0KCk7XG5cbiAgICAgICAgICAgIGlmICghIShkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubC1zbGlkZXInKSkpIHtcbiAgICAgICAgICAgICAgICBTbGlkZXIuaW5pdCgpO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUuaW5mbygnc2xpZGVyJylcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKCEhKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5mbGlwLWNvbnRhaW5lcicpKSkge1xuICAgICAgICAgICAgICAgIEZsaXAuaW5pdCgpO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUuaW5mbygnZmxpcCcpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoISEoZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmwtcGFnZS1uYXZfYXNpZGUnKSkpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmluZm8oJ2Fzc2lkZScpO1xuICAgICAgICAgICAgICAgIEFzc2lkZS5pbml0KCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIGlmICghIShkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYy1mb3JtLWF2dG9yJykpKSB7XG4gICAgICAgICAgICAvLyAgICAgY29uc29sZS5pbmZvKCdmb3JtIGF2dG9yaXNhdGlvbicpO1xuICAgICAgICAgICAgLy8gICAgIFZhbGlkYXRpb25BdnRvci5pbml0KCk7XG4gICAgICAgICAgICAvLyB9XG5cbiAgICAgICAgICAgIGlmICghIShkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYy1mb3JtX2NvbnRhY3QtbWUnKSkpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnZm9ybSBjb250YWN0cy1tZScpO1xuICAgICAgICAgICAgICAgIFZhbGlkYXRpb25Db250YWN0TWUuaW5pdCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufSkoKTtcblxuXG4kKGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgZm9ybVVwbG9hZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN1cGxvYWQnKTtcblxuICAgICQoJy5sLWhlcm8nKS5oZWlnaHQoJCh3aW5kb3cpLmhlaWdodCgpKTtcblxuICAgIEFwcC5pbml0KCk7XG5cbiAgICAvLyB3aW5kb3cub25zY3JvbGwgPSBmdW5jdGlvbiAoKSB7XG4gICAgLy8gICAgIHZhciB3U2Nyb2xsID0gd2luZG93LnBhZ2VZT2Zmc2V0O1xuICAgIC8vICAgICBwYXJhbGxheC5pbml0KHdTY3JvbGwpO1xuICAgIC8vIH07XG4gICAgLy9cbiAgICAvLyB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgZnVuY3Rpb24gKGUpIHtcbiAgICAvLyAgICAgcGFyYWxsYXhNb3VzZShlKTtcbiAgICAvLyB9KTtcblxuICAgIHZhciBmaWxlVXBsb2FkID0gZnVuY3Rpb24odXJsLCBkYXRhLCBjYil7XG4gICAgICAgIHZhciB4aHIgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcbiAgICAgICAgeGhyLm9wZW4oJ1BPU1QnLCB1cmwsIHRydWUpO1xuXG4gICAgICAgIHhoci5vbmxvYWQgPSBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgdmFyIHJlc3VsdCA9IEpTT04ucGFyc2UoeGhyLnJlc3BvbnNlVGV4dCk7XG4gICAgICAgICAgICBjYihyZXN1bHQuc3RhdHVzKTtcbiAgICAgICAgfTtcblxuICAgICAgICB4aHIuc2VuZChkYXRhKTtcbiAgICB9O1xuXG4gICAgZnVuY3Rpb24gcHJlcGFyZVNlbmRGaWxlKGUpIHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB2YXIgcmVzdWx0Q29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnN0YXR1cycpO1xuICAgICAgICB2YXIgZm9ybURhdGEgPSBuZXcgRm9ybURhdGEoKTtcbiAgICAgICAgdmFyIGZpbGUgPSBkb2N1bWVudFxuICAgICAgICAgICAgLnF1ZXJ5U2VsZWN0b3IoJyNmaWxlLXNlbGVjdCcpXG4gICAgICAgICAgICAuZmlsZXNbMF07XG4gICAgICAgIHZhciB0aXRsZSA9IGRvY3VtZW50XG4gICAgICAgICAgICAucXVlcnlTZWxlY3RvcignI2ZpbGUtdGl0bGUnKVxuICAgICAgICAgICAgLnZhbHVlO1xuICAgICAgICB2YXIgdGVjaCA9IGRvY3VtZW50XG4gICAgICAgICAgICAucXVlcnlTZWxlY3RvcignI2ZpbGUtdGVjaCcpXG4gICAgICAgICAgICAudmFsdWU7XG4gICAgICAgIHZhciBzaXRlVXJsID0gZG9jdW1lbnRcbiAgICAgICAgICAgIC5xdWVyeVNlbGVjdG9yKCcjZmlsZS1zaXRlJylcbiAgICAgICAgICAgIC52YWx1ZTtcblxuICAgICAgICBmb3JtRGF0YS5hcHBlbmQoJ3Bob3RvJywgZmlsZSwgZmlsZS5uYW1lKTtcbiAgICAgICAgZm9ybURhdGEuYXBwZW5kKCd0aXRsZScsIHRpdGxlKTtcbiAgICAgICAgZm9ybURhdGEuYXBwZW5kKCd0ZWNobm9sb2d5JywgdGVjaCk7XG4gICAgICAgIGZvcm1EYXRhLmFwcGVuZCgnc2l0ZVVybCcsIHNpdGVVcmwpO1xuXG4gICAgICAgIGNvbnNvbGUubG9nKCdmaWxlJywgZmlsZSk7XG4gICAgICAgIGNvbnNvbGUubG9nKCdmaWxlLm5hbWUnLCBmaWxlLm5hbWUpO1xuICAgICAgICBjb25zb2xlLmxvZygndGl0bGUnLCB0aXRsZSk7XG4gICAgICAgIGNvbnNvbGUubG9nKCd0ZWNoJywgdGVjaCk7XG4gICAgICAgIGNvbnNvbGUubG9nKCdzaXRlVXJsJywgc2l0ZVVybCk7XG5cbiAgICAgICAgcmVzdWx0Q29udGFpbmVyLmlubmVySFRNTCA9ICdVcGxvYWRpbmcuLi4nO1xuICAgICAgICBmaWxlVXBsb2FkKCcvdXBsb2FkJywgZm9ybURhdGEsIGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAgICAgICByZXN1bHRDb250YWluZXIuaW5uZXJIVE1MID0gZGF0YTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgaWYgKGZvcm1VcGxvYWQpIHtcbiAgICAgICAgZm9ybVVwbG9hZC5hZGRFdmVudExpc3RlbmVyKCdzdWJtaXQnLCBwcmVwYXJlU2VuZEZpbGUpO1xuICAgIH1cblxuICAgIC8vLS0tLS0tLS0tLS0tIGJsb2NrIG1haWxcbiAgICBjb25zdCBmb3JtTWFpbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNtYWlsJyk7XG5cbiAgICBpZiAoZm9ybU1haWwpIHtcbiAgICAgICAgZm9ybU1haWwuYWRkRXZlbnRMaXN0ZW5lcignc3VibWl0JywgcHJlcGFyZVNlbmRNYWlsKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBwcmVwYXJlU2VuZE1haWwoZSkge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIHZhciByZXN1bHRDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc3RhdHVzJyk7XG4gICAgICAgIHZhciBkYXRhID0ge1xuICAgICAgICAgICAgbmFtZTogZm9ybU1haWwubmFtZS52YWx1ZSxcbiAgICAgICAgICAgIGVtYWlsOiBmb3JtTWFpbC5lbWFpbC52YWx1ZSxcbiAgICAgICAgICAgIHRleHQ6IGZvcm1NYWlsLnRleHQudmFsdWVcbiAgICAgICAgfTtcbiAgICAgICAgY29uc29sZS5sb2coZGF0YSk7XG4gICAgICAgIHJlc3VsdENvbnRhaW5lci5pbm5lckhUTUwgPSAnU2VuZGluZy4uLic7XG4gICAgICAgIHNlbmRBamF4SnNvbignL3dvcmsnLCBkYXRhLCBmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgICAgICAgcmVzdWx0Q29udGFpbmVyLmlubmVySFRNTCA9IGRhdGE7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHNlbmRBamF4SnNvbih1cmwsIGRhdGEsIGNiKSB7XG4gICAgICAgIHZhciB4aHIgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcbiAgICAgICAgeGhyLm9wZW4oJ1BPU1QnLCB1cmwsIHRydWUpO1xuICAgICAgICB4aHIuc2V0UmVxdWVzdEhlYWRlcignQ29udGVudC1UeXBlJywgJ2FwcGxpY2F0aW9uL2pzb24nKTtcbiAgICAgICAgeGhyLm9ubG9hZCA9IGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICB2YXIgcmVzdWx0ID0gSlNPTi5wYXJzZSh4aHIucmVzcG9uc2VUZXh0KTtcbiAgICAgICAgICAgIGNiKHJlc3VsdC5zdGF0dXMpO1xuICAgICAgICB9O1xuICAgICAgICB4aHIuc2VuZChKU09OLnN0cmluZ2lmeShkYXRhKSk7XG4gICAgICAgIGNvbnNvbGUubG9nKGRhdGEpO1xuICAgIH1cblxuICAgIC8vYmxvY2sgYmxvZ1xuXG4gICAgY29uc3QgZm9ybUJsb2cgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjYmxvZycpO1xuXG4gICAgaWYgKGZvcm1CbG9nKSB7XG4gICAgICAgIGZvcm1CbG9nLmFkZEV2ZW50TGlzdGVuZXIoJ3N1Ym1pdCcsIHByZXBhcmVTZW5kUG9zdCk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcHJlcGFyZVNlbmRQb3N0KGUpIHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB2YXIgcmVzdWx0Q29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnN0YXR1cycpO1xuICAgICAgICB2YXIgZGF0YSA9IHtcbiAgICAgICAgICAgIHRpdGxlOiBmb3JtQmxvZy50aXRsZS52YWx1ZSxcbiAgICAgICAgICAgIGRhdGU6IGZvcm1CbG9nLmRhdGUudmFsdWUsXG4gICAgICAgICAgICB0ZXh0OiBmb3JtQmxvZy50ZXh0LnZhbHVlXG4gICAgICAgIH07XG4gICAgICAgIHJlc3VsdENvbnRhaW5lci5pbm5lckhUTUwgPSAnU2VuZGluZy4uLic7XG4gICAgICAgIHNlbmRBamF4SnNvbignL2FkZHBvc3QnLCBkYXRhLCBmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgICAgICAgcmVzdWx0Q29udGFpbmVyLmlubmVySFRNTCA9IGRhdGE7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8vYmxvY2sgc2tpbGxzXG5cbiAgICBjb25zdCBmb3JtU2tpbGxzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3NraWxscycpO1xuXG4gICAgaWYgKGZvcm1Ta2lsbHMpIHtcbiAgICAgICAgZm9ybVNraWxscy5hZGRFdmVudExpc3RlbmVyKCdzdWJtaXQnLCBwcmVwYXJlU2VuZFNraWxscyk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcHJlcGFyZVNlbmRTa2lsbHMoZSkge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIHZhciByZXN1bHRDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc3RhdHVzJyk7XG4gICAgICAgIHZhciBkYXRhID0ge1xuICAgICAgICAgICAgaHRtbDogZm9ybVNraWxscy5odG1sLnZhbHVlLFxuICAgICAgICAgICAgY3NzOiBmb3JtU2tpbGxzLmNzcy52YWx1ZSxcbiAgICAgICAgICAgIGpzOiBmb3JtU2tpbGxzLmpzLnZhbHVlLFxuICAgICAgICAgICAgcGhwOiBmb3JtU2tpbGxzLnBocC52YWx1ZSxcbiAgICAgICAgICAgIHNxbDogZm9ybVNraWxscy5zcWwudmFsdWUsXG4gICAgICAgICAgICBub2RlOiBmb3JtU2tpbGxzLm5vZGUudmFsdWUsXG4gICAgICAgICAgICBtb25nbzogZm9ybVNraWxscy5tb25nby52YWx1ZSxcbiAgICAgICAgICAgIGdpdDogZm9ybVNraWxscy5naXQudmFsdWUsXG4gICAgICAgICAgICBndWxwOiBmb3JtU2tpbGxzLmd1bHAudmFsdWUsXG4gICAgICAgICAgICBib3dlcjogZm9ybVNraWxscy5ib3dlci52YWx1ZVxuICAgICAgICB9O1xuXG4gICAgICAgIGNvbnNvbGUubG9nKGRhdGEpO1xuXG4gICAgICAgIHJlc3VsdENvbnRhaW5lci5pbm5lckhUTUwgPSAnU2VuZGluZy4uLic7XG4gICAgICAgIHNlbmRBamF4SnNvbignL2FkbWluJywgZGF0YSwgZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgICAgICAgIHJlc3VsdENvbnRhaW5lci5pbm5lckhUTUwgPSBkYXRhO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvLy0tLS0gYmxvY2sgTG9naW5cblxuICAgIGNvbnN0IGZvcm1Mb2dpbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNsb2dpbicpO1xuXG4gICAgaWYgKGZvcm1Mb2dpbikge1xuICAgICAgICBmb3JtTG9naW4uYWRkRXZlbnRMaXN0ZW5lcignc3VibWl0JywgcHJlcGFyZUF1dGgpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHByZXBhcmVBdXRoKGUpIHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB2YXIgcmVzdWx0Q29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnN0YXR1cycpO1xuICAgICAgICB2YXIgZGF0YSA9IHtcbiAgICAgICAgICAgIGxvZ2luOiBmb3JtTG9naW4ubG9naW4udmFsdWUsXG4gICAgICAgICAgICBwYXNzd29yZDogZm9ybUxvZ2luLnBhc3N3b3JkLnZhbHVlXG4gICAgICAgIH07XG4gICAgICAgIHJlc3VsdENvbnRhaW5lci5pbm5lckhUTUwgPSAnU2VuZGluZy4uLic7XG4gICAgICAgIHNlbmRBamF4SnNvbignLycsIGRhdGEsIGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAgICAgICByZXN1bHRDb250YWluZXIuaW5uZXJIVE1MID0gZGF0YTtcblxuICAgICAgICAgICAgaWYgKGRhdGEgPT0gJ9CQ0LLRgtC+0YDQuNC30LDRhtC40Y8g0YPRgdC/0LXRiNC90LAhJykge1xuICAgICAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gJy9hZG1pbic7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuLy9ibHVyXG4gICAgaWYgKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jLWZvcm0tY29udGFpbmVyJykgPT09bnVsbCkge1xuICAgICAgICByZXR1cm4gZmFsc2VcbiAgICB9IGVsc2Uge1xuICAgICAgICBibHVyLnNldCgpO1xuICAgICAgICAkKHdpbmRvdykucmVzaXplKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGJsdXIuc2V0KCk7XG4gICAgICAgIH0pO1xuICAgIH1cbn0pOyJdfQ==

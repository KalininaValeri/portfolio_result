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
                    var
                        $protractor = $('.l-page-nav_aside__protractor'),
                        $smallNavPage = $('.l-page-nav_aside');

                    $(document).mouseup(function (e) {
                        if ($smallNavPage.has(e.target).length === 0){
                            $smallNavPage.removeClass('l-page-nav_active');
                        }
                    });

                    $protractor.click(function () {
                        $smallNavPage.toggleClass('l-page-nav_active');
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
            var linkAvtor = document.querySelector('.c-block-link_to-avtor');

            document.querySelector('.c-block-link_to-avtor').addEventListener('click' ,function (e) {
                e.preventDefault();
                flipContainer.classList.toggle('flip-container_back');
                linkAvtor.classList.toggle('c-block-link_back');
            });
        }
    }
})();

var navigation = (function () {
    if ($('.c-hamburger_nav').length = 0) { return false }

    var navigation = $('.c-nav_site-list'),
        parentNav = $('.content'),
        hamburger = $('.c-hamburger_nav'),
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

        $('.c-hamburger_nav').click(function () {
            console.log('click');
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

var parallaxMouse = (function () {
    if (document.getElementById('paralax') === null) return false;

    var calculateParallax = function(e){
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

    return {
        init: function () {
            window.addEventListener('mousemove', function (e) {
                calculateParallax(e);
            });
        }
    }
})();


var parallax = (function () {
    if (!(document.querySelector('.l-hero__bg'))) {
        return false
    }

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

var skillsAnimate = (function () {
    var $skillsParent = $('.l-skills-group'),
        $skills = $skillsParent.find('.c-skills__circle-above');

    if (!($skillsParent.length)) return false;

    var checkDistnce = function(scrollTop, elem){
        var offset = elem.offset().top;
        var windowMargin = Math.ceil($(window).height()/3);
        var topBorder = offset - scrollTop - windowMargin;
        var bottomEdge = elem.outerHeight(true) + offset;
        var bottomBorder = scrollTop + windowMargin - bottomEdge;

        return topBorder <= 0 && bottomBorder <= 0;
    };

    return {
        init: function () {
            $(window).on('scroll', function(){
                var scrollTop = $(window).scrollTop();

                if (checkDistnce(scrollTop, $skillsParent)) {
                    for (var i = 0; i < $skills.length; i++) {
                        $skills[i].classList.remove('c-skills__circle-above_no');

                    }
                }
            });

        }
    }
})();
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
        console.log(src);
        var img = document.createElement('img');
        img.classList.add('l-slider__arrow-pic');
        img.setAttribute('src', '../..' + src);

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
            $slideActivePic[0].setAttribute('src', '../..' + mainSlide.picture);
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

var validationAvtor = (function () {


    if (!($('.c-form-avtor'))) return false;

    const formLogin = document.querySelector('#login');
    var numberChecekd = 0;
    var resultContainer = document.querySelector('.c-form-avtor__status');

    var valid = function () {

        var
            $form = $('.c-form-avtor'),
            $input = $form.find('.c-form-avtor__input'),
            $checkBox = $form.find('input[type="checkbox"]'),
            $radio = $form.find('input[type="radio"]'),
            numberEmptyInput = 0;


        $form.find('.error').remove();

        $input.each(function () {
            var $this = $(this);

            $this.parents('.c-form-avtor__input-wrapper ')
                .removeAttr('style');

            if ($this.val() === '') {

                $this.parents('.c-form-avtor__input-wrapper ')
                    .css({'border': '2px solid red'});
            } else {
                numberEmptyInput++;
            }
        });

        $checkBox.each(function () {
            var $this = $(this);

            if (!!$this.prop('checked')) {
                numberChecekd++;
            }
        });

        $radio.each(function () {
            var $this = $(this);

            if (!!$this.prop('checked')) {
                numberChecekd++;
            }
        });

        if (numberEmptyInput <= 1) {
            resultContainer.innerHTML = 'Заполните все поля формы';
            return false
        }

        if (numberChecekd <= 2 || $('#hz').prop('checked')) {
            resultContainer.innerHTML = 'Роботам тут не место';
        }
    };

    var prepareAuth = function (e) {
        e.preventDefault();

        valid();

        if (numberChecekd <= 2 || $('#hz').prop('checked')) {
            return false;
        }

        var data = {
            login: formLogin.login.value,
            password: formLogin.password.value
        };
        resultContainer.style.color = 'white';
        resultContainer.innerHTML = 'Sending...';
        sendAjaxJson('/', data, function (data) {
            resultContainer.innerHTML = data;

            if (data == 'Авторизация успешна!') {
                window.location.href = '/admin';
            }
        });
    };

    return {
        init: function () {


            formLogin.addEventListener('submit', prepareAuth);
        }
    }
})();

var validationContactMe = (function () {
    if (!$('.c-form_contact-me').length) return false;

    var $formContactMe = $('.c-form_contact-me'),
        $inputs = $formContactMe.find('.c-form__input'),
        resultContainer = document.querySelector('.c-form-avtor__status');
    const formMail = document.querySelector('#mail');

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

            $this.removeAttr('style');

            if (!!$this.val()) {
                counter++;
            }

            if (!$this.val()) {
                $this.css({'border': '1px solid red'});
            }
        });
    };

    function prepareSendMail(e) {
        e.preventDefault();

        valid();

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


    return {
        init: function () {


            formMail.addEventListener('submit', prepareSendMail);


            // $formContactMe.find('.c-form').submit(function (e) {
            //     e.preventDefault();
            //     reset();
            //     valid();
            //
            // });

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
// (function () {
//     'use strict';
//
//     setTimeout(function () {
//         // document.querySelector('.greating_picture').classList.add('m--show');
//     }, 1000);
// })();

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

var App = (function () {
    return{
        init: function () {
            Preload.init();


            if (!!(document.querySelector('.c-hamburger_nav'))) {
                navigation.init();
                console.info('nav')
            }

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

            if (!!(document.querySelector('.c-form-avtor'))) {
                console.info('form avtorisation');
                validationAvtor.init();
            }

            if (!!(document.querySelector('.c-form_contact-me'))) {
                console.log('form contacts-me');
                validationContactMe.init();
            }

            if (!!document.getElementById('paralax')) {
                console.log('paralaxMouse');
                parallaxMouse.init();
            }

            if (!!document.querySelector('.l-skills-group')) {
                console.info('skills');
                skillsAnimate.init();
            }

            if (!!(document.querySelector('.l-hero__bg'))) {
                window.onscroll = function () {
                    var wScroll = window.pageYOffset;
                    parallax.init(wScroll);
                };
            }
        }
    }
})();

if (!!(document.getElementById('map'))) {
    console.info('map');
    var map;
    function initMap() {
        // Create the map with no initial style specified.
        // It therefore has default styling.
        map = new google.maps.Map(document.getElementById('map'), {
            center: {lat: 55.0038, lng: 82.930689},
            zoom: 13,
            mapTypeControl: false
        });

        // Add a style-selector control to the map.
        var styleControl = document.getElementById('style-selector-control');
        map.controls[google.maps.ControlPosition.TOP_LEFT].push(styleControl);

        // Set the map's style to the initial value of the selector.
        map.setOptions({styles: styles['silver']});
    }

    var styles = {
        default: null,
        silver: [
            {
                elementType: 'geometry',
                stylers: [{color: '#f5f5f5'}]
            },
            {
                elementType: 'labels.icon',
                stylers: [{visibility: 'off'}]
            },
            {
                elementType: 'labels.text.fill',
                stylers: [{color: '#616161'}]
            },
            {
                elementType: 'labels.text.stroke',
                stylers: [{color: '#f5f5f5'}]
            },
            {
                featureType: 'administrative.land_parcel',
                elementType: 'labels.text.fill',
                stylers: [{color: '#bdbdbd'}]
            },
            {
                featureType: 'poi',
                elementType: 'geometry',
                stylers: [{color: '#eeeeee'}]
            },
            {
                featureType: 'poi',
                elementType: 'labels.text.fill',
                stylers: [{color: '#757575'}]
            },
            {
                featureType: 'poi.park',
                elementType: 'geometry',
                stylers: [{color: '#e5e5e5'}]
            },
            {
                featureType: 'poi.park',
                elementType: 'labels.text.fill',
                stylers: [{color: '#9e9e9e'}]
            },
            {
                featureType: 'road',
                elementType: 'geometry',
                stylers: [{color: '#ffffff'}]
            },
            {
                featureType: 'road.arterial',
                elementType: 'labels.text.fill',
                stylers: [{color: '#757575'}]
            },
            {
                featureType: 'road.highway',
                elementType: 'geometry',
                stylers: [{color: '#dadada'}]
            },
            {
                featureType: 'road.highway',
                elementType: 'labels.text.fill',
                stylers: [{color: '#616161'}]
            },
            {
                featureType: 'road.local',
                elementType: 'labels.text.fill',
                stylers: [{color: '#9e9e9e'}]
            },
            {
                featureType: 'transit.line',
                elementType: 'geometry',
                stylers: [{color: '#e5e5e5'}]
            },
            {
                featureType: 'transit.station',
                elementType: 'geometry',
                stylers: [{color: '#eeeeee'}]
            },
            {
                featureType: 'water',
                elementType: 'geometry',
                stylers: [{color: '#4369aa'}]
            },
            {
                featureType: 'water',
                elementType: 'labels.text.fill',
                stylers: [{color: '#f5f5f5'}]
            }
        ]
    };
}

$(function () {
    var formUpload = document.querySelector('#upload');

    $('.l-hero').height($(window).height());

    App.init();

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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2lkZS1uYXYuanMiLCJmbGlwLmpzIiwibmF2LmpzIiwicGFyYWxsYXgtbW91c2UuanMiLCJwYXJhbGxheC1zY3JvbGwuanMiLCJwcmVsb2FkLmpzIiwic2tpbGxzLWFuaW1hdGUuanMiLCJzbGlkZXIuanMiLCJ2YWxpZGF0aW9uLmpzIiwiYXBwLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3hHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDbkJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDdERBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUMvQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN4QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN4RUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQy9CQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3JRQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUMxS0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJhcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIENyZWF0ZWQgYnkgbGVyYSBvbiAzLzcvMTcuXG4gKi9cblxudmFyIEFzc2lkZSA9IChcbiAgICBmdW5jdGlvbiAoKSB7XG5cbiAgICAgICAgaWYgKCEoJCgnLmwtcGFnZS1uYXZfYXNpZGUnKS5sZW5ndGgpKSByZXR1cm4gZmFsc2U7XG5cbiAgICAgICAgdmFyIHNob3dTZWN0aW9uID0gZnVuY3Rpb24gKGFydGljbGUsIGlzQW5pbWF0ZSkge1xuICAgICAgICAgICAgdmFyXG4gICAgICAgICAgICAgICAgZGlyZWN0aW9uID0gYXJ0aWNsZS5yZXBsYWNlKCcjJywgJycpLFxuICAgICAgICAgICAgICAgIHJlcUFydGljbGUgPSAkKCcuZGF0YS1zZWN0aW9uJykuZmlsdGVyKCdbZGF0YS1zZWN0aW9uPVwiJyArIGRpcmVjdGlvbiArICdcIl0nKSxcbiAgICAgICAgICAgICAgICByZXFBcnRpY2xlUG9zID0gcmVxQXJ0aWNsZS5vZmZzZXQoKS50b3A7XG5cbiAgICAgICAgICAgIGlmIChpc0FuaW1hdGUpIHtcbiAgICAgICAgICAgICAgICAkKCdib2R5LCBodG1sJykuYW5pbWF0ZSh7c2Nyb2xsVG9wOiByZXFBcnRpY2xlUG9zfSwgNTAwKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgJCgnYm9keSwgaHRtbCcpLnNjcm9sbFRvcChyZXFBcnRpY2xlUG9zKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcblxuICAgICAgICB2YXIgY2hlY2tTZWN0aW9uID0gZnVuY3Rpb24gKCkge1xuXG4gICAgICAgICAgICAkKCcuZGF0YS1zZWN0aW9uJykuZWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgdmFyXG4gICAgICAgICAgICAgICAgICAgICR0aGlzID0gJCh0aGlzKSxcbiAgICAgICAgICAgICAgICAgICAgdG9wRWRnZSA9ICR0aGlzLm9mZnNldCgpLnRvcCAtIDMwMCxcbiAgICAgICAgICAgICAgICAgICAgYm90dG9tRWRnZSA9IHRvcEVkZ2UgKyAkdGhpcy5oZWlnaHQoKSxcbiAgICAgICAgICAgICAgICAgICAgd1Njcm9sbCA9ICQod2luZG93KS5zY3JvbGxUb3AoKTtcblxuICAgICAgICAgICAgICAgIGlmICh0b3BFZGdlIDwgd1Njcm9sbCAmJiBib3R0b21FZGdlID4gd1Njcm9sbCkge1xuICAgICAgICAgICAgICAgICAgICB2YXJcbiAgICAgICAgICAgICAgICAgICAgICAgIGN1cnJlbnRJZCA9ICR0aGlzLmRhdGEoJ3NlY3Rpb24nKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGFjdGl2ZUxpbmsgPSAkKCcubC1wYWdlLW5hdl9fbGluaycpLmZpbHRlcignW2hyZWY9XCIjJyArIGN1cnJlbnRJZCArICdcIl0nKTtcblxuICAgICAgICAgICAgICAgICAgICAkKCcubC1wYWdlLW5hdl9fbGluaycpLmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLnJlbW92ZUNsYXNzKCdsLXBhZ2UtbmF2X19saW5rX2FjdGl2ZScpO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgYWN0aXZlTGluay5hZGRDbGFzcygnbC1wYWdlLW5hdl9fbGlua19hY3RpdmUnKTtcbiAgICAgICAgICAgICAgICAgICAgbG9jYXRpb24uaGFzaCA9ICcjJyArIGN1cnJlbnRJZDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICB9O1xuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBpbml0OiBmdW5jdGlvbiAoKSB7XG5cblxuICAgICAgICAgICAgICAgIGlmICgkKHdpbmRvdykud2lkdGgoKSA8PSAxMjAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhclxuICAgICAgICAgICAgICAgICAgICAgICAgJHByb3RyYWN0b3IgPSAkKCcubC1wYWdlLW5hdl9hc2lkZV9fcHJvdHJhY3RvcicpLFxuICAgICAgICAgICAgICAgICAgICAgICAgJHNtYWxsTmF2UGFnZSA9ICQoJy5sLXBhZ2UtbmF2X2FzaWRlJyk7XG5cbiAgICAgICAgICAgICAgICAgICAgJChkb2N1bWVudCkubW91c2V1cChmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCRzbWFsbE5hdlBhZ2UuaGFzKGUudGFyZ2V0KS5sZW5ndGggPT09IDApe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICRzbWFsbE5hdlBhZ2UucmVtb3ZlQ2xhc3MoJ2wtcGFnZS1uYXZfYWN0aXZlJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgICAgICRwcm90cmFjdG9yLmNsaWNrKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICRzbWFsbE5hdlBhZ2UudG9nZ2xlQ2xhc3MoJ2wtcGFnZS1uYXZfYWN0aXZlJyk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuXG5cblxuICAgICAgICAgICAgICAgICAgICAkKHdpbmRvdykuc2Nyb2xsKGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjaGVja1NlY3Rpb24oKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKCQod2luZG93KS53aWR0aCgpID4gMTIwMCkge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygkKHdpbmRvdykud2lkdGgoKSk7XG5cbiAgICAgICAgICAgICAgICAgICAgJCh3aW5kb3cpLnNjcm9sbChmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYmxvY2tNYWluID0gJCgnLmwtYmxvY2stbWFpbicpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hdlRvcCA9ICQod2luZG93KS5zY3JvbGxUb3AoKSAtIGJsb2NrTWFpbi5wb3NpdGlvbigpLnRvcCArIDQwLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hdlRvcEJvdHRvbSA9ICQoJy5sLXBhZ2UtbmF2X2FzaWRlJykuaGVpZ2h0KCkgLSAkKCcubC1wYWdlLW5hdl9fbGlzdCcpLmhlaWdodCgpO1xuXG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGNoZWNrU2VjdGlvbigpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAobmF2VG9wIDwgMCkgbmF2VG9wID0gMDtcblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG5hdlRvcCA+PSBuYXZUb3BCb3R0b20gKSBuYXZUb3AgPSBuYXZUb3BCb3R0b207XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICQoJy5sLXBhZ2UtbmF2X19saXN0JykuY3NzKCd0b3AnLCBuYXZUb3ApO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAkKCcubC1wYWdlLW5hdl9fbGluaycpLm9uKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICAgICAgc2hvd1NlY3Rpb24oJCh0aGlzKS5hdHRyKCdocmVmJyksIHRydWUpO1xuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgaWYgKCEhKGxvY2F0aW9uLmhhc2gpKXtcbiAgICAgICAgICAgICAgICAgICAgc2hvd1NlY3Rpb24od2luZG93LmxvY2F0aW9uLmhhc2gsIGZhbHNlKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbikoKTtcbiIsInZhciBGbGlwID0gKGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgZmxpcENvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5mbGlwLWNvbnRhaW5lcicpO1xuXG4gICAgaWYgKCEoZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmZsaXAtY29udGFpbmVyJykpKXtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBcbiAgICByZXR1cm4ge1xuICAgICAgICBpbml0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgbGlua0F2dG9yID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmMtYmxvY2stbGlua190by1hdnRvcicpO1xuXG4gICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYy1ibG9jay1saW5rX3RvLWF2dG9yJykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snICxmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICBmbGlwQ29udGFpbmVyLmNsYXNzTGlzdC50b2dnbGUoJ2ZsaXAtY29udGFpbmVyX2JhY2snKTtcbiAgICAgICAgICAgICAgICBsaW5rQXZ0b3IuY2xhc3NMaXN0LnRvZ2dsZSgnYy1ibG9jay1saW5rX2JhY2snKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxufSkoKTtcbiIsInZhciBuYXZpZ2F0aW9uID0gKGZ1bmN0aW9uICgpIHtcbiAgICBpZiAoJCgnLmMtaGFtYnVyZ2VyX25hdicpLmxlbmd0aCA9IDApIHsgcmV0dXJuIGZhbHNlIH1cblxuICAgIHZhciBuYXZpZ2F0aW9uID0gJCgnLmMtbmF2X3NpdGUtbGlzdCcpLFxuICAgICAgICBwYXJlbnROYXYgPSAkKCcuY29udGVudCcpLFxuICAgICAgICBoYW1idXJnZXIgPSAkKCcuYy1oYW1idXJnZXJfbmF2JyksXG4gICAgICAgIGl0ZW1zID0gJCgnLmMtbmF2X3NpdGVfX2l0ZW0nKSxcbiAgICAgICAgdGltZXI7XG4gICAgdmFyIGNvdW50ZXIgPSAwO1xuICAgIHZhciBuYXZBY3RpdmUgPSAkKCcuYy1uYXZfc2l0ZV9hY3RpdmUnKTtcblxuXG5cbiAgICB2YXIgYXNjZW50SXRlbXMgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGl0ZW1zW2NvdW50ZXJdLmNsYXNzTGlzdC5hZGQoJ2MtbmF2X3NpdGVfX2hpZGRlbicpO1xuICAgICAgICBjb3VudGVyKys7XG5cbiAgICAgICAgdGltZXIgPSBzZXRUaW1lb3V0KGFzY2VudEl0ZW1zLCAxMDApO1xuXG4gICAgICAgIGlmIChjb3VudGVyID49IGl0ZW1zLmxlbmd0aCkge1xuICAgICAgICAgICAgY2xlYXJUaW1lb3V0KHRpbWVyKTtcbiAgICAgICAgfVxuXG4gICAgfTtcblxuICAgIHZhciBsaXN0ZW5lciA9IGZ1bmN0aW9uICgpIHtcblxuICAgICAgICAkKCcuYy1oYW1idXJnZXJfbmF2JykuY2xpY2soZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ2NsaWNrJyk7XG4gICAgICAgICAgICBoYW1idXJnZXIudG9nZ2xlQ2xhc3MoJ2MtaGFtYnVyZ2VyX2FjdGl2ZScpO1xuICAgICAgICAgICAgbmF2aWdhdGlvbi50b2dnbGVDbGFzcygnYy1uYXZfc2l0ZV9hY3RpdmUnKTtcblxuICAgICAgICAgICAgaWYgKCEhKHBhcmVudE5hdi5maW5kKCcuYy1uYXZfc2l0ZV9hY3RpdmUnKS5sZW5ndGgpKSB7XG4gICAgICAgICAgICAgICAgdmFyIG5ld1RpbWVyO1xuICAgICAgICAgICAgICAgIGNvdW50ZXIgPSAwO1xuICAgICAgICAgICAgICAgIG5ld1RpbWVyID0gc2V0VGltZW91dChhc2NlbnRJdGVtcywgNjAwKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICghKHBhcmVudE5hdi5maW5kKCcuYy1uYXZfc2l0ZV9hY3RpdmUnKS5sZW5ndGgpKSB7XG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBpdGVtcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICBpdGVtc1tpXS5jbGFzc0xpc3QucmVtb3ZlKCdjLW5hdl9zaXRlX19oaWRkZW4nKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgfTtcblxuICAgIHJldHVybiB7XG4gICAgICAgIGluaXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGxpc3RlbmVyKCk7XG4gICAgICAgIH1cbiAgICB9XG59KCkpO1xuIiwidmFyIHBhcmFsbGF4TW91c2UgPSAoZnVuY3Rpb24gKCkge1xuICAgIGlmIChkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncGFyYWxheCcpID09PSBudWxsKSByZXR1cm4gZmFsc2U7XG5cbiAgICB2YXIgY2FsY3VsYXRlUGFyYWxsYXggPSBmdW5jdGlvbihlKXtcbiAgICAgICAgdmFyIHBhcmFsbGF4Q29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3BhcmFsYXgnKSxcbiAgICAgICAgICAgIGxheWVycyA9IHBhcmFsbGF4Q29udGFpbmVyLmNoaWxkcmVuLFxuICAgICAgICAgICAgcGFnZVggPSBlLnBhZ2VYLFxuICAgICAgICAgICAgcGFnZVkgPSBlLnBhZ2VZLFxuICAgICAgICAgICAgaW5pdGlhbFggPSAod2luZG93LmlubmVyV2lkdGggLyAyKSAtIHBhZ2VYLFxuICAgICAgICAgICAgaW5pdGlhbFkgPSAod2luZG93LmlubmVySGVpZ2h0IC8gMikgLSBwYWdlWTtcblxuICAgICAgICBbXS5zbGljZS5jYWxsKGxheWVycykuZm9yRWFjaChmdW5jdGlvbiAobGF5ZXIsIGkpIHtcbiAgICAgICAgICAgIHZhciBkaXZpZGVyID0gKGkgKyAyKSAvIDUwLFxuICAgICAgICAgICAgICAgIGJvdHRvbVBvc2l0aW9uID0gKHdpbmRvdy5pbm5lckhlaWdodCAvIDIpICogZGl2aWRlcixcbiAgICAgICAgICAgICAgICBwb3NpdGlvblggPSBpbml0aWFsWCAqIGRpdmlkZXIsXG4gICAgICAgICAgICAgICAgcG9zaXRpb25ZID0gaW5pdGlhbFkgKiBkaXZpZGVyLFxuICAgICAgICAgICAgICAgIGxheWVyU3R5bGUgPSBsYXllci5zdHlsZSxcbiAgICAgICAgICAgICAgICB0cmFuc2Zvcm1TdHJpbmcgPSAndHJhbnNsYXRlM2QoJyArIHBvc2l0aW9uWCArICdweCwgJyArIHBvc2l0aW9uWSArICdweCwgMHB4KSc7XG4gICAgICAgICAgICBsYXllclN0eWxlLnRyYW5zZm9ybSA9IHRyYW5zZm9ybVN0cmluZztcbiAgICAgICAgfSlcbiAgICB9O1xuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgaW5pdDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICAgICAgY2FsY3VsYXRlUGFyYWxsYXgoZSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cbn0pKCk7XG5cbiIsInZhciBwYXJhbGxheCA9IChmdW5jdGlvbiAoKSB7XG4gICAgaWYgKCEoZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmwtaGVyb19fYmcnKSkpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgfVxuXG4gICAgdmFyIGJnID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmwtaGVyb19fYmcnKTtcbiAgICB2YXIgdXNlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jLXVzZXInKTtcbiAgICB2YXIgZm9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmMtdXNlcl9fYmcnKTtcblxuICAgIHJldHVybiB7XG4gICAgICAgIG1vdmU6IGZ1bmN0aW9uIChibG9jaywgd2luZG93U2Nyb2xsLCBzdHJhZmVBbW91bmQpIHtcbiAgICAgICAgICAgIHZhciBzdHJhZmUgPSB3aW5kb3dTY3JvbGwgLyAtc3RyYWZlQW1vdW5kICsgJyUnO1xuICAgICAgICAgICAgdmFyIHRyYW5zZm9ybVN0cmluZyA9ICd0cmFuc2xhdGUzZCgwLCcgKyBzdHJhZmUgKyAnLCAwKSc7XG4gICAgICAgICAgICB2YXIgc3R5bGUgPSBibG9jay5zdHlsZTtcblxuICAgICAgICAgICAgc3R5bGUudHJhbnNmb3JtID0gdHJhbnNmb3JtU3RyaW5nO1xuICAgICAgICAgICAgc3R5bGUud2Via2l0VHJhbnNmb3JtID0gdHJhbnNmb3JtU3RyaW5nO1xuXG4gICAgICAgIH0sXG4gICAgICAgIGluaXQ6IGZ1bmN0aW9uICh3U2Nyb2xsKSB7XG4gICAgICAgICAgICB0aGlzLm1vdmUoYmcsIHdTY3JvbGwsIDUwKTtcbiAgICAgICAgICAgIHRoaXMubW92ZShmb24sIHdTY3JvbGwsIDIwKTtcbiAgICAgICAgfVxuICAgIH1cbn0oKSk7IiwidmFyIFByZWxvYWQgPSAoZnVuY3Rpb24gKCkge1xuXG4gICAgdmFyIHBlcmNlbnRzVG90YWwgPSAwLFxuICAgICAgICBwcmVsb2RlciA9ICQoJy5wcmVsb2FkZXInKTtcblxuXG4gICAgdmFyIGltZ1BhdGggPSAkKCcqJykubWFwKGZ1bmN0aW9uIChuZHgsIGVsZW1lbnQpIHtcbiAgICAgICAgdmFyIGJhY2tncm91bmQgPSAkKGVsZW1lbnQpLmNzcygnYmFja2dyb3VuZC1pbWFnZScpLFxuICAgICAgICAgICAgaXNJbWcgPSAkKGVsZW1lbnQpLmlzKCdpbWcnKSxcbiAgICAgICAgICAgIGlzVmlkZW8gPSAkKGVsZW1lbnQpLmlzKCd2aWRlbycpLFxuICAgICAgICAgICAgcGF0aCA9ICcnO1xuXG4gICAgICAgIGlmIChiYWNrZ3JvdW5kICE9ICdub25lJyl7XG4gICAgICAgICAgICBwYXRoID0gYmFja2dyb3VuZC5yZXBsYWNlKCd1cmwoXCInLCAnJykucmVwbGFjZSgnXCIpJywgJycpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGlzSW1nIHx8IGlzVmlkZW8pIHtcbiAgICAgICAgICAgIHBhdGggPSAkKGVsZW1lbnQpLmF0dHIoJ3NyYycpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHBhdGgpIHtcbiAgICAgICAgICAgIHJldHVybiBwYXRoO1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICB2YXIgYW5pbWF0ZVBlcmNlbnRzID0gZnVuY3Rpb24gKGFuaW1hdGVQZXJjZW50KSB7XG4gICAgICAgIHZhciBjaXJjbGVQZXJjZW50YWdlcyA9ICQoJy5wcmVsb2FkZXJfX2NlcmNsZS1wZXJjZW50YWdlcycpWzBdLFxuICAgICAgICAgICAgZGFzaG9mZnNldCA9IGFuaW1hdGVQZXJjZW50IC8gMTAwICogMTUwLjc5NjQ0NzM3MjMxMDA3O1xuXG4gICAgICAgIGNpcmNsZVBlcmNlbnRhZ2VzLnN0eWxlLnN0cm9rZURhc2hhcnJheSA9IGRhc2hvZmZzZXQgKycgMTUwLjc5NjQ0NzM3MjMxMDA3JztcbiAgICB9O1xuXG4gICAgdmFyIHNldFBlcmNlbnRzID0gZnVuY3Rpb24odG90YWwsIGN1cnJlbnQpIHtcblxuICAgICAgdmFyIHBlcmNlbnRzID0gTWF0aC5jZWlsKGN1cnJlbnQgLyB0b3RhbCAqIDEwMCk7XG5cbiAgICAgICQoJy5wcmVsb2Rlcl9fcGVyY2VudGFnZXMnKS50ZXh0KHBlcmNlbnRzKTtcblxuICAgICAgICBhbmltYXRlUGVyY2VudHMocGVyY2VudHMpO1xuXG4gICAgICBpZiAocGVyY2VudHMgPj0gMTAwKSB7XG4gICAgICAgICAgcHJlbG9kZXIuZmFkZU91dCgpO1xuICAgICAgfVxuICAgIH07XG5cbiAgICB2YXIgbG9hZEltYWdlcyA9IGZ1bmN0aW9uIChpbWFnZXMpIHtcblxuICAgICAgICBpZiAoIWltYWdlcy5sZW5ndGgpIHByZWxvZGVyLmZhZGVPdXQoKTtcblxuICAgICAgaW1hZ2VzLmZvckVhY2goZnVuY3Rpb24gKGltZywgaSwgaW1hZ2VzKSB7XG4gICAgICAgICAgdmFyIGZha2VJbWFnZSA9ICQoJzxpbWc+JyB8fCAnPHZpZGVvPicsIHtcbiAgICAgICAgICAgICAgYXR0cjoge1xuICAgICAgICAgICAgICAgICAgc3JjOiBpbWdcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgZmFrZUltYWdlLm9uKCdsb2FkIGVycm9yJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICBwZXJjZW50c1RvdGFsKys7XG4gICAgICAgICAgICAgIHNldFBlcmNlbnRzKGltYWdlcy5sZW5ndGgsIHBlcmNlbnRzVG90YWwpXG4gICAgICAgICAgfSlcbiAgICAgIH0pXG4gICAgfTtcblxuICAgIHJldHVybiB7XG4gICAgICAgIGluaXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciBpbWdzID0gaW1nUGF0aC50b0FycmF5KCk7XG4gICAgICAgICAgICBsb2FkSW1hZ2VzKGltZ3MpO1xuICAgICAgICB9XG4gICAgfVxuXG5cbn0oKSk7XG4iLCJ2YXIgc2tpbGxzQW5pbWF0ZSA9IChmdW5jdGlvbiAoKSB7XG4gICAgdmFyICRza2lsbHNQYXJlbnQgPSAkKCcubC1za2lsbHMtZ3JvdXAnKSxcbiAgICAgICAgJHNraWxscyA9ICRza2lsbHNQYXJlbnQuZmluZCgnLmMtc2tpbGxzX19jaXJjbGUtYWJvdmUnKTtcblxuICAgIGlmICghKCRza2lsbHNQYXJlbnQubGVuZ3RoKSkgcmV0dXJuIGZhbHNlO1xuXG4gICAgdmFyIGNoZWNrRGlzdG5jZSA9IGZ1bmN0aW9uKHNjcm9sbFRvcCwgZWxlbSl7XG4gICAgICAgIHZhciBvZmZzZXQgPSBlbGVtLm9mZnNldCgpLnRvcDtcbiAgICAgICAgdmFyIHdpbmRvd01hcmdpbiA9IE1hdGguY2VpbCgkKHdpbmRvdykuaGVpZ2h0KCkvMyk7XG4gICAgICAgIHZhciB0b3BCb3JkZXIgPSBvZmZzZXQgLSBzY3JvbGxUb3AgLSB3aW5kb3dNYXJnaW47XG4gICAgICAgIHZhciBib3R0b21FZGdlID0gZWxlbS5vdXRlckhlaWdodCh0cnVlKSArIG9mZnNldDtcbiAgICAgICAgdmFyIGJvdHRvbUJvcmRlciA9IHNjcm9sbFRvcCArIHdpbmRvd01hcmdpbiAtIGJvdHRvbUVkZ2U7XG5cbiAgICAgICAgcmV0dXJuIHRvcEJvcmRlciA8PSAwICYmIGJvdHRvbUJvcmRlciA8PSAwO1xuICAgIH07XG5cbiAgICByZXR1cm4ge1xuICAgICAgICBpbml0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAkKHdpbmRvdykub24oJ3Njcm9sbCcsIGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgdmFyIHNjcm9sbFRvcCA9ICQod2luZG93KS5zY3JvbGxUb3AoKTtcblxuICAgICAgICAgICAgICAgIGlmIChjaGVja0Rpc3RuY2Uoc2Nyb2xsVG9wLCAkc2tpbGxzUGFyZW50KSkge1xuICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8ICRza2lsbHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICRza2lsbHNbaV0uY2xhc3NMaXN0LnJlbW92ZSgnYy1za2lsbHNfX2NpcmNsZS1hYm92ZV9ubycpO1xuXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICB9XG4gICAgfVxufSkoKTsiLCJ2YXIgc2xpZGVyQ29udGVudCA9IFtcbiAgICB7XG4gICAgICAgIFwidGl0bGVcIjogXCLQodCw0LnRgiDRiNC60L7Qu9GLINC+0L3Qu9Cw0LnQvSDQvtCx0YDQsNC30L7QstCw0L3QuNGPXCIsXG4gICAgICAgIFwidGVjaG5vbG9neVwiOiBcIkhUTUwgLCBDU1MsIEpBVkFTQ1JJUFRcIixcbiAgICAgICAgXCJzaXRlVXJsXCI6IFwiaHR0cHM6Ly9sb2Z0c2Nob29sLmNvbS9cIixcbiAgICAgICAgXCJpbWdTcmNcIjogXCIvYXNzZXRzL2ltZy9jb250ZW50L3NpdGUucG5nXCIsXG4gICAgICAgIFwibnVtYmVyXCI6IFwiMVwiXG4gICAgfSxcbiAgICB7XG4gICAgICAgIFwidGl0bGVcIjogXCLQodCw0LnRgjFHb29nbGVcIixcbiAgICAgICAgXCJ0ZWNobm9sb2d5XCI6IFwiSFRNTCAsIENTUywgSkFWQVNDUklQVFwiLFxuICAgICAgICBcInNpdGVVcmxcIjogXCJodHRwczovL3d3dy5nb29nbGUucnVcIixcbiAgICAgICAgXCJpbWdTcmNcIjogXCJodHRwOi8vd21hcmVhLm5ldC93cC1jb250ZW50L3VwbG9hZHMvMjAxNi8wNS8yd2ViX2hvc3Rpbmdfc2VvX3NpdGUuanBnXCIsXG4gICAgICAgIFwibnVtYmVyXCI6IFwiMlwiXG4gICAgfSxcbiAgICB7XG4gICAgICAgIFwidGl0bGVcIjogXCLQodCw0LnRgjJ5YVwiLFxuICAgICAgICBcInRlY2hub2xvZ3lcIjogXCJIVE1MICwgQ1NTLCBKQVZBU0NSSVBUXCIsXG4gICAgICAgIFwic2l0ZVVybFwiOiBcImh0dHBzOi8vd3d3LnlhbmRleC5ydS9cIixcbiAgICAgICAgXCJpbWdTcmNcIjogXCJodHRwOi8vYnVtYmxlYmVlLmFydGRlcG8uY29tLnVhL3VwbG9hZC9pYmxvY2svZGI5L2RiOTM3YmQ0ODc3ZWZlMDMxNTM5NmQ4YTM0MDlhZmVmLmpwZ1wiLFxuICAgICAgICBcIm51bWJlclwiOiBcIjNcIlxuICAgIH0sXG4gICAge1xuICAgICAgICBcInRpdGxlXCI6IFwi0KHQsNC50YIzbWFpbFwiLFxuICAgICAgICBcInRlY2hub2xvZ3lcIjogXCJIVE1MICwgQ1NTLCBKQVZBU0NSSVBUXCIsXG4gICAgICAgIFwic2l0ZVVybFwiOiBcImh0dHBzOi8vbWFpbC5ydS9cIixcbiAgICAgICAgXCJpbWdTcmNcIjogXCJodHRwOi8vY3MwMS5zZXJ2aWNlcy5teWE1LnJ1Ly0vdVJ1Ukh3V1Y5Y2t3a0V2LXNvOVZHdy9zdi90aGVtZXMvY2VudHJhbC8wLzIyMi0wLzIyMi0wLnBuZz8xNDUyMTc1MjAyXCIsXG4gICAgICAgIFwibnVtYmVyXCI6IFwiNFwiXG4gICAgfVxuXTtcblxuXG52YXIgc2xpZGVyUGFyc2VDb250ZW50ID0gZnVuY3Rpb24gKCkge1xuICAgIHZhciBzdHJEYiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNkYicpLmdldEF0dHJpYnV0ZSgnZGF0YS1kYicpO1xuICAgIHZhciBhcnJTdHIgPSBbXTtcbiAgICBzdHJEYiA9IHN0ckRiLnJlcGxhY2UoXCJbe1wiLFwiXCIpO1xuICAgIHN0ckRiID0gc3RyRGIucmVwbGFjZShcIn1dXCIsXCJcIik7XG4gICAgYXJyU3RyID0gc3RyRGIuc3BsaXQoJ30seycpO1xuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcnJTdHIubGVuZ3RoOyBpKyspe1xuICAgICAgICBhcnJTdHJbaV0gPSAneycgK2FyclN0cltpXSsgJ30nO1xuICAgICAgICBhcnJTdHJbaV0gPSBKU09OLnBhcnNlKGFyclN0cltpXSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGFyclN0cjtcbn07XG5cbnZhciBTbGlkZXIgPSAoZnVuY3Rpb24gKCkge1xuXG4gICAgaWYgKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5sLXNsaWRlcicpID09PSBudWxsKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBzbGlkZXJDb250ZW50ID0gc2xpZGVyUGFyc2VDb250ZW50KCk7XG5cbiAgICB2YXIgZG9jID0gZG9jdW1lbnQ7XG4gICAgdmFyIGFycm93TmV4dCA9IGRvYy5xdWVyeVNlbGVjdG9yKCcjYXJyb3ctdXAnKSxcbiAgICAgICAgYXJyb3dQcmV2ID0gZG9jLnF1ZXJ5U2VsZWN0b3IoJyNhcnJvdy1kb3duJyksXG4gICAgICAgICRzbGlkZUFjdGl2ZUNhcHRpb24gPSAkKCcjc2xpZGUtYWN0aXZlLWNhcHRpb24nKSxcbiAgICAgICAgJHNsaWRlQWN0aXZlQ2FwdGlvblRpdGxlID0gJHNsaWRlQWN0aXZlQ2FwdGlvbi5maW5kKCcuYy1ibG9jay10aXRsZV9fdGV4dCcpLFxuICAgICAgICAkc2xpZGVBY3RpdmVDYXB0aW9uVGVjaG5vbG9neSA9ICRzbGlkZUFjdGl2ZUNhcHRpb24uZmluZCgnLmMtYmxvY2stdGV4dF9ibHVlJyksXG4gICAgICAgICRzbGlkZUFjdGl2ZUNhcHRpb25MaW5rID0gJHNsaWRlQWN0aXZlQ2FwdGlvbi5maW5kKCcuYy1ibG9jay1saW5rX2JsdWUnKSxcbiAgICAgICAgJHNsaWRlckFjdGl2ZVBpY1dyYXBwZXIgPSAkKCcjc2xpZGUtYWN0aXZlLXBpYycpLFxuICAgICAgICAkc2xpZGVBY3RpdmVQaWNTcGFuID0gJHNsaWRlckFjdGl2ZVBpY1dyYXBwZXIuZmluZCgnc3BhbicpLFxuICAgICAgICAkc2xpZGVBY3RpdmVQaWMgPSAkKCcubC1zbGlkZXJfX3BpYycpLFxuICAgICAgICAkc2xpZGVySXRlbXMgPSAkKCcjc2xpZGUtaXRlbXMnKSxcbiAgICAgICAgJGZvbkRhcmsgPSAkKCcubC1zbGlkZXJfX2Fycm93LWRhcmsnKSxcbiAgICAgICAgY3VycmVudFNsaWRlID0gMCxcbiAgICAgICAgc2l6ZSA9IHNsaWRlckNvbnRlbnQubGVuZ3RoLFxuICAgICAgICBpblByb2Nlc3NOZXh0ID0gZmFsc2UsXG4gICAgICAgIGluUHJvY2Vzc1ByZXYgPSBmYWxzZSxcbiAgICAgICAgYW5pbWF0aW9uRW5kO1xuXG4gICAgdmFyIExpc3RlbmVyID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBhcnJvd05leHQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgY3VycmVudFNsaWRlID0gbGltaXRlcihjdXJyZW50U2xpZGUgKyAxKTtcblxuICAgICAgICAgICAgaWYgKGFuaW1hdGlvbkVuZCA+PSAzKSBpblByb2Nlc3NOZXh0ID0gZmFsc2U7XG5cbiAgICAgICAgICAgIGlmICghaW5Qcm9jZXNzTmV4dCkge1xuICAgICAgICAgICAgICAgIGluUHJvY2Vzc05leHQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIGRldGVyQWN0aXZlU2xpZGUoKTtcbiAgICAgICAgICAgICAgICBhbmltYXRpb25FbmQgPSAwO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICBhcnJvd1ByZXYuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgY3VycmVudFNsaWRlID0gbGltaXRlcihjdXJyZW50U2xpZGUgLSAxKTtcblxuICAgICAgICAgICAgaWYgKGFuaW1hdGlvbkVuZCA+PSAzKSBpblByb2Nlc3NQcmV2ID0gZmFsc2U7XG5cbiAgICAgICAgICAgIGlmICghaW5Qcm9jZXNzUHJldikge1xuICAgICAgICAgICAgICAgIGluUHJvY2Vzc1ByZXYgPSB0cnVlO1xuICAgICAgICAgICAgICAgIGRldGVyQWN0aXZlU2xpZGUoKTtcbiAgICAgICAgICAgICAgICBhbmltYXRpb25FbmQgPSAwO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9O1xuXG4gICAgdmFyIGNyZWF0ZUVsZW1lbnQgPSBmdW5jdGlvbiAoY2xhc3NQb3NpdGlvbiwgY2xhc3NWaXNpYmxlKSB7XG4gICAgICAgIHZhciBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5cbiAgICAgICAgZWxlbWVudC5jbGFzc0xpc3QuYWRkKCdsLXNsaWRlcl9fYXJyb3dzLWl0ZW0nKTtcbiAgICAgICAgZWxlbWVudC5jbGFzc0xpc3QuYWRkKGNsYXNzUG9zaXRpb24pO1xuICAgICAgICBlbGVtZW50LmNsYXNzTGlzdC5hZGQoY2xhc3NWaXNpYmxlKTtcblxuICAgICAgICByZXR1cm4gZWxlbWVudDtcbiAgICB9O1xuXG4gICAgdmFyIG5leHRTbGlkZUVsZW1lbnQgPSBjcmVhdGVFbGVtZW50KCdsLXNsaWRlcl9fYXJyb3dzLXVwJywgJ2wtc2xpZGVyX19hcnJvd3MtbmV4dC1uZXh0JyksXG4gICAgICAgIHByZXZTbGlkZUVsZW1lbnQgPSBjcmVhdGVFbGVtZW50KCdsLXNsaWRlcl9fYXJyb3dzLWRvd24nLCAnbC1zbGlkZXJfX2Fycm93cy1wcmV2Jyk7XG5cblxuICAgIHZhciBjcmVhdGVJbWdFbGVtZW50ID0gZnVuY3Rpb24gKHNyYykge1xuICAgICAgICBjb25zb2xlLmxvZyhzcmMpO1xuICAgICAgICB2YXIgaW1nID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJyk7XG4gICAgICAgIGltZy5jbGFzc0xpc3QuYWRkKCdsLXNsaWRlcl9fYXJyb3ctcGljJyk7XG4gICAgICAgIGltZy5zZXRBdHRyaWJ1dGUoJ3NyYycsICcuLi8uLicgKyBzcmMpO1xuXG4gICAgICAgIHJldHVybiBpbWc7XG4gICAgfTtcblxuICAgIHZhciBjcmVhdGVEaXZFbGVtZW50ID0gZnVuY3Rpb24gKHRleHQpIHtcbiAgICAgICAgdmFyIGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgICAgICAgZGl2LmlubmVyVGV4dCA9IHRleHQ7XG5cbiAgICAgICAgcmV0dXJuIGRpdjtcbiAgICB9O1xuXG4gICAgdmFyIHRleHRBbmltYXRlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXJcbiAgICAgICAgICAgIHN0clRpdGxlID0gc2xpZGVyQ29udGVudFtjdXJyZW50U2xpZGVdLnRpdGxlLFxuICAgICAgICAgICAgc3RyVGVjaG5vbG9neSA9IHNsaWRlckNvbnRlbnRbY3VycmVudFNsaWRlXS50ZWNobm9sb2d5LFxuICAgICAgICAgICAgY2hhcnNUaXRsZSA9IHN0clRpdGxlLnNwbGl0KCcnKSxcbiAgICAgICAgICAgIGNoYXJzVGVjaG5vbG9neSA9IHN0clRlY2hub2xvZ3kuc3BsaXQoJycpLFxuICAgICAgICAgICAgY291bnRlclRpdGxlID0gMCxcbiAgICAgICAgICAgIGNvdW50ZXJUZWNoID0gMCxcbiAgICAgICAgICAgIHRpbWVyO1xuXG4gICAgICAgICRzbGlkZUFjdGl2ZUNhcHRpb25UaXRsZVswXS5pbm5lckhUTUwgPSAnJztcbiAgICAgICAgJHNsaWRlQWN0aXZlQ2FwdGlvblRlY2hub2xvZ3lbMF0uaW5uZXJIVE1MID0gJyc7XG5cbiAgICAgICAgdmFyIGVhY2hDaGFyVGl0bGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgY2hhciA9IGRvYy5jcmVhdGVUZXh0Tm9kZShjaGFyc1RpdGxlW2NvdW50ZXJUaXRsZV0pO1xuXG4gICAgICAgICAgICAkc2xpZGVBY3RpdmVDYXB0aW9uVGl0bGVbMF0uYXBwZW5kQ2hpbGQoY2hhcik7XG5cbiAgICAgICAgICAgIGNvdW50ZXJUaXRsZSsrO1xuICAgICAgICAgICAgdGltZXIgPSBzZXRUaW1lb3V0KGVhY2hDaGFyVGl0bGUsIDUwKTtcblxuICAgICAgICAgICAgaWYgKGNvdW50ZXJUaXRsZSA9PT0gY2hhcnNUaXRsZS5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICBjbGVhckludGVydmFsKHRpbWVyKTtcbiAgICAgICAgICAgICAgICBhbmltYXRpb25FbmQrKztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcblxuICAgICAgICB2YXIgZWFjaENoYXJUZWNoID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIGNoYXIgPSBkb2MuY3JlYXRlVGV4dE5vZGUoY2hhcnNUZWNobm9sb2d5W2NvdW50ZXJUZWNoXSk7XG5cbiAgICAgICAgICAgICRzbGlkZUFjdGl2ZUNhcHRpb25UZWNobm9sb2d5WzBdLmFwcGVuZENoaWxkKGNoYXIpO1xuXG4gICAgICAgICAgICBjb3VudGVyVGVjaCsrO1xuICAgICAgICAgICAgdGltZXIgPSBzZXRUaW1lb3V0KGVhY2hDaGFyVGVjaCwgNTApO1xuXG4gICAgICAgICAgICBpZiAoY291bnRlclRlY2ggPT09IGNoYXJzVGVjaG5vbG9neS5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICBjbGVhckludGVydmFsKHRpbWVyKTtcbiAgICAgICAgICAgICAgICBhbmltYXRpb25FbmQrKztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcblxuICAgICAgICBlYWNoQ2hhclRpdGxlKCk7XG4gICAgICAgIGVhY2hDaGFyVGVjaCgpO1xuICAgIH07XG5cblxuICAgIHZhciBidWlsZFNsaWRlciA9IGZ1bmN0aW9uICgpIHtcblxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHNsaWRlckNvbnRlbnQubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHZhclxuICAgICAgICAgICAgICAgIHByZXZTbGlkZUVsZW1lbnQgPSBjcmVhdGVFbGVtZW50KCdsLXNsaWRlcl9fYXJyb3dzLWRvd24nLCAnbC1zbGlkZXJfX2Fycm93cy1wcmV2Jyk7XG5cbiAgICAgICAgICAgIHByZXZTbGlkZUVsZW1lbnQuc2V0QXR0cmlidXRlKCdpZCcsICdwcmV2JyArIGkpO1xuICAgICAgICAgICAgcHJldlNsaWRlRWxlbWVudC5hcHBlbmRDaGlsZChjcmVhdGVJbWdFbGVtZW50KHNsaWRlckNvbnRlbnRbaV0ucGljdHVyZSkpO1xuICAgICAgICAgICAgcHJldlNsaWRlRWxlbWVudC5hcHBlbmRDaGlsZChjcmVhdGVEaXZFbGVtZW50KCBpKzEgKSk7XG4gICAgICAgICAgICAkc2xpZGVySXRlbXNbMF0uaW5zZXJ0QmVmb3JlKHByZXZTbGlkZUVsZW1lbnQsICRmb25EYXJrWzBdKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgc2xpZGVyQ29udGVudC5sZW5ndGg7IGorKykge1xuICAgICAgICAgICAgdmFyXG4gICAgICAgICAgICAgICAgbmV4dFNsaWRlRWxlbWVudCA9IGNyZWF0ZUVsZW1lbnQoJ2wtc2xpZGVyX19hcnJvd3MtdXAnLCAnbC1zbGlkZXJfX2Fycm93cy1uZXh0Jyk7XG5cbiAgICAgICAgICAgIG5leHRTbGlkZUVsZW1lbnQuc2V0QXR0cmlidXRlKCdpZCcsICduZXh0JyArIGopO1xuICAgICAgICAgICAgbmV4dFNsaWRlRWxlbWVudC5hcHBlbmRDaGlsZChjcmVhdGVJbWdFbGVtZW50KHNsaWRlckNvbnRlbnRbal0ucGljdHVyZSkpO1xuICAgICAgICAgICAgbmV4dFNsaWRlRWxlbWVudC5hcHBlbmRDaGlsZChjcmVhdGVEaXZFbGVtZW50KGogKyAxKSk7XG4gICAgICAgICAgICAkc2xpZGVySXRlbXNbMF0uaW5zZXJ0QmVmb3JlKG5leHRTbGlkZUVsZW1lbnQsICRmb25EYXJrWzBdKTtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICB2YXIgZGV0ZXJBY3RpdmVTbGlkZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyXG4gICAgICAgICAgICBtYWluU2xpZGUgPSBzbGlkZXJDb250ZW50W2xpbWl0ZXIoY3VycmVudFNsaWRlKV0sXG4gICAgICAgICAgICBpdGVtc1ByZXYgPSAkc2xpZGVySXRlbXMuY2hpbGRyZW4oJy5sLXNsaWRlcl9fYXJyb3dzLXByZXYnKSxcbiAgICAgICAgICAgIGl0ZW1zTmV4dCA9ICRzbGlkZXJJdGVtcy5jaGlsZHJlbignLmwtc2xpZGVyX19hcnJvd3MtbmV4dCcpO1xuXG4gICAgICAgIHRleHRBbmltYXRlKCk7XG5cbiAgICAgICAgJHNsaWRlckFjdGl2ZVBpY1dyYXBwZXJbMF0uY2xhc3NMaXN0LmFkZCgnbC1zbGlkZXJfX3BpYy13cmFwcGVyX3RyYW5zZm9ybScpO1xuXG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgJHNsaWRlckFjdGl2ZVBpY1dyYXBwZXJbMF0uY2xhc3NMaXN0LnJlbW92ZSgnbC1zbGlkZXJfX3BpYy13cmFwcGVyX3RyYW5zZm9ybScpO1xuICAgICAgICAgICAgJHNsaWRlQWN0aXZlUGljWzBdLnNldEF0dHJpYnV0ZSgnc3JjJywgJy4uLy4uJyArIG1haW5TbGlkZS5waWN0dXJlKTtcbiAgICAgICAgICAgICRzbGlkZUFjdGl2ZVBpY1NwYW5bMF0uaW5uZXJUZXh0ID0gY3VycmVudFNsaWRlICsgMTtcbiAgICAgICAgICAgICRzbGlkZUFjdGl2ZUNhcHRpb25MaW5rWzBdLnNldEF0dHJpYnV0ZSgnaHJlZicsIG1haW5TbGlkZS5zaXRlVXJsKTtcbiAgICAgICAgICAgIGFuaW1hdGlvbkVuZCsrO1xuICAgICAgICB9LCA1MDApO1xuXG4gICAgICAgICQoJy5sLXNsaWRlcl9fYXJyb3dzLW5leHQubC1zbGlkZXJfX2Fycm93cy1pdGVtX2FjdGl2ZScpLmFuaW1hdGUoe3RvcDogJy0xMDAlJ30sIDUwMCk7XG4gICAgICAgICQoJyNuZXh0JyArIFtsaW1pdGVyKGN1cnJlbnRTbGlkZSArIDEpXSkuYW5pbWF0ZSh7dG9wOiAnMCd9LCA1MDApO1xuICAgICAgICAkKCcubC1zbGlkZXJfX2Fycm93cy1wcmV2Lmwtc2xpZGVyX19hcnJvd3MtaXRlbV9hY3RpdmUnKS5hbmltYXRlKHt0b3A6ICcxMDAlJ30sIDUwMCk7XG4gICAgICAgICQoJyNwcmV2JyArIFtsaW1pdGVyKGN1cnJlbnRTbGlkZSAtIDEpXSkuYW5pbWF0ZSh7dG9wOiAnMCd9LCA1MDApO1xuXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgaXRlbXNQcmV2Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBpdGVtc1ByZXZbaV0uY2xhc3NMaXN0LnJlbW92ZSgnbC1zbGlkZXJfX2Fycm93cy1pdGVtX2FjdGl2ZScpO1xuICAgICAgICAgICAgaXRlbXNOZXh0W2ldLmNsYXNzTGlzdC5yZW1vdmUoJ2wtc2xpZGVyX19hcnJvd3MtaXRlbV9hY3RpdmUnKTtcblxuICAgICAgICAgICAgaWYgKGl0ZW1zUHJldltpXS5oYXNBdHRyaWJ1dGUoJ3N0eWxlJykpIHtcbiAgICAgICAgICAgICAgICBpdGVtc1ByZXZbaV0ucmVtb3ZlQXR0cmlidXRlKCdzdHlsZScpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoaXRlbXNOZXh0W2ldLmhhc0F0dHJpYnV0ZSgnc3R5bGUnKSkge1xuICAgICAgICAgICAgICAgIGl0ZW1zTmV4dFtpXS5yZW1vdmVBdHRyaWJ1dGUoJ3N0eWxlJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpdGVtc1ByZXZbbGltaXRlcihjdXJyZW50U2xpZGUgLSAxKV0uY2xhc3NMaXN0LmFkZCgnbC1zbGlkZXJfX2Fycm93cy1pdGVtX2FjdGl2ZScpO1xuICAgICAgICBpdGVtc05leHRbbGltaXRlcihjdXJyZW50U2xpZGUgKyAxKV0uY2xhc3NMaXN0LmFkZCgnbC1zbGlkZXJfX2Fycm93cy1pdGVtX2FjdGl2ZScpO1xuICAgIH07XG5cbiAgICB2YXIgbGltaXRlciA9IGZ1bmN0aW9uICh2YWwpIHtcblxuICAgICAgICBpZiAodmFsID49IHNpemUpIHtcbiAgICAgICAgICAgIHZhbCA9IDA7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodmFsIDwgMCkge1xuICAgICAgICAgICAgdmFsID0gc2l6ZSAtIDE7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdmFsO1xuICAgIH07XG5cbiAgICByZXR1cm4ge1xuICAgICAgICBpbml0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBidWlsZFNsaWRlcigpO1xuICAgICAgICAgICAgZGV0ZXJBY3RpdmVTbGlkZSgpO1xuICAgICAgICAgICAgTGlzdGVuZXIoKTtcbiAgICAgICAgfVxuICAgIH1cbn0oKSk7XG4iLCJ2YXIgdmFsaWRhdGlvbkF2dG9yID0gKGZ1bmN0aW9uICgpIHtcblxuXG4gICAgaWYgKCEoJCgnLmMtZm9ybS1hdnRvcicpKSkgcmV0dXJuIGZhbHNlO1xuXG4gICAgY29uc3QgZm9ybUxvZ2luID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2xvZ2luJyk7XG4gICAgdmFyIG51bWJlckNoZWNla2QgPSAwO1xuICAgIHZhciByZXN1bHRDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYy1mb3JtLWF2dG9yX19zdGF0dXMnKTtcblxuICAgIHZhciB2YWxpZCA9IGZ1bmN0aW9uICgpIHtcblxuICAgICAgICB2YXJcbiAgICAgICAgICAgICRmb3JtID0gJCgnLmMtZm9ybS1hdnRvcicpLFxuICAgICAgICAgICAgJGlucHV0ID0gJGZvcm0uZmluZCgnLmMtZm9ybS1hdnRvcl9faW5wdXQnKSxcbiAgICAgICAgICAgICRjaGVja0JveCA9ICRmb3JtLmZpbmQoJ2lucHV0W3R5cGU9XCJjaGVja2JveFwiXScpLFxuICAgICAgICAgICAgJHJhZGlvID0gJGZvcm0uZmluZCgnaW5wdXRbdHlwZT1cInJhZGlvXCJdJyksXG4gICAgICAgICAgICBudW1iZXJFbXB0eUlucHV0ID0gMDtcblxuXG4gICAgICAgICRmb3JtLmZpbmQoJy5lcnJvcicpLnJlbW92ZSgpO1xuXG4gICAgICAgICRpbnB1dC5lYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciAkdGhpcyA9ICQodGhpcyk7XG5cbiAgICAgICAgICAgICR0aGlzLnBhcmVudHMoJy5jLWZvcm0tYXZ0b3JfX2lucHV0LXdyYXBwZXIgJylcbiAgICAgICAgICAgICAgICAucmVtb3ZlQXR0cignc3R5bGUnKTtcblxuICAgICAgICAgICAgaWYgKCR0aGlzLnZhbCgpID09PSAnJykge1xuXG4gICAgICAgICAgICAgICAgJHRoaXMucGFyZW50cygnLmMtZm9ybS1hdnRvcl9faW5wdXQtd3JhcHBlciAnKVxuICAgICAgICAgICAgICAgICAgICAuY3NzKHsnYm9yZGVyJzogJzJweCBzb2xpZCByZWQnfSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIG51bWJlckVtcHR5SW5wdXQrKztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgJGNoZWNrQm94LmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyICR0aGlzID0gJCh0aGlzKTtcblxuICAgICAgICAgICAgaWYgKCEhJHRoaXMucHJvcCgnY2hlY2tlZCcpKSB7XG4gICAgICAgICAgICAgICAgbnVtYmVyQ2hlY2VrZCsrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICAkcmFkaW8uZWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgJHRoaXMgPSAkKHRoaXMpO1xuXG4gICAgICAgICAgICBpZiAoISEkdGhpcy5wcm9wKCdjaGVja2VkJykpIHtcbiAgICAgICAgICAgICAgICBudW1iZXJDaGVjZWtkKys7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlmIChudW1iZXJFbXB0eUlucHV0IDw9IDEpIHtcbiAgICAgICAgICAgIHJlc3VsdENvbnRhaW5lci5pbm5lckhUTUwgPSAn0JfQsNC/0L7Qu9C90LjRgtC1INCy0YHQtSDQv9C+0LvRjyDRhNC+0YDQvNGLJztcbiAgICAgICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKG51bWJlckNoZWNla2QgPD0gMiB8fCAkKCcjaHonKS5wcm9wKCdjaGVja2VkJykpIHtcbiAgICAgICAgICAgIHJlc3VsdENvbnRhaW5lci5pbm5lckhUTUwgPSAn0KDQvtCx0L7RgtCw0Lwg0YLRg9GCINC90LUg0LzQtdGB0YLQvic7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgdmFyIHByZXBhcmVBdXRoID0gZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgIHZhbGlkKCk7XG5cbiAgICAgICAgaWYgKG51bWJlckNoZWNla2QgPD0gMiB8fCAkKCcjaHonKS5wcm9wKCdjaGVja2VkJykpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBkYXRhID0ge1xuICAgICAgICAgICAgbG9naW46IGZvcm1Mb2dpbi5sb2dpbi52YWx1ZSxcbiAgICAgICAgICAgIHBhc3N3b3JkOiBmb3JtTG9naW4ucGFzc3dvcmQudmFsdWVcbiAgICAgICAgfTtcbiAgICAgICAgcmVzdWx0Q29udGFpbmVyLnN0eWxlLmNvbG9yID0gJ3doaXRlJztcbiAgICAgICAgcmVzdWx0Q29udGFpbmVyLmlubmVySFRNTCA9ICdTZW5kaW5nLi4uJztcbiAgICAgICAgc2VuZEFqYXhKc29uKCcvJywgZGF0YSwgZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgICAgICAgIHJlc3VsdENvbnRhaW5lci5pbm5lckhUTUwgPSBkYXRhO1xuXG4gICAgICAgICAgICBpZiAoZGF0YSA9PSAn0JDQstGC0L7RgNC40LfQsNGG0LjRjyDRg9GB0L/QtdGI0L3QsCEnKSB7XG4gICAgICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSAnL2FkbWluJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfTtcblxuICAgIHJldHVybiB7XG4gICAgICAgIGluaXQ6IGZ1bmN0aW9uICgpIHtcblxuXG4gICAgICAgICAgICBmb3JtTG9naW4uYWRkRXZlbnRMaXN0ZW5lcignc3VibWl0JywgcHJlcGFyZUF1dGgpO1xuICAgICAgICB9XG4gICAgfVxufSkoKTtcblxudmFyIHZhbGlkYXRpb25Db250YWN0TWUgPSAoZnVuY3Rpb24gKCkge1xuICAgIGlmICghJCgnLmMtZm9ybV9jb250YWN0LW1lJykubGVuZ3RoKSByZXR1cm4gZmFsc2U7XG5cbiAgICB2YXIgJGZvcm1Db250YWN0TWUgPSAkKCcuYy1mb3JtX2NvbnRhY3QtbWUnKSxcbiAgICAgICAgJGlucHV0cyA9ICRmb3JtQ29udGFjdE1lLmZpbmQoJy5jLWZvcm1fX2lucHV0JyksXG4gICAgICAgIHJlc3VsdENvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jLWZvcm0tYXZ0b3JfX3N0YXR1cycpO1xuICAgIGNvbnN0IGZvcm1NYWlsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI21haWwnKTtcblxuICAgIHZhciByZXNldCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgJGZvcm1Db250YWN0TWUuZmluZCgnLmVycm9yJykucmVtb3ZlKCk7XG4gICAgICAgICRpbnB1dHMuZWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAkKHRoaXMpLmNzcyh7J2JvcmVkZXInOiAnbm9uZSd9KTtcbiAgICAgICAgfSk7XG4gICAgfTtcblxuICAgIHZhciB2YWxpZCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyXG4gICAgICAgICAgICBjb3VudGVyID0gMDtcblxuICAgICAgICAkaW5wdXRzLmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyICR0aGlzID0gJCh0aGlzKTtcblxuICAgICAgICAgICAgJHRoaXMucmVtb3ZlQXR0cignc3R5bGUnKTtcblxuICAgICAgICAgICAgaWYgKCEhJHRoaXMudmFsKCkpIHtcbiAgICAgICAgICAgICAgICBjb3VudGVyKys7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICghJHRoaXMudmFsKCkpIHtcbiAgICAgICAgICAgICAgICAkdGhpcy5jc3Moeydib3JkZXInOiAnMXB4IHNvbGlkIHJlZCd9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIHByZXBhcmVTZW5kTWFpbChlKSB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICB2YWxpZCgpO1xuXG4gICAgICAgIHZhciBkYXRhID0ge1xuICAgICAgICAgICAgbmFtZTogZm9ybU1haWwubmFtZS52YWx1ZSxcbiAgICAgICAgICAgIGVtYWlsOiBmb3JtTWFpbC5lbWFpbC52YWx1ZSxcbiAgICAgICAgICAgIHRleHQ6IGZvcm1NYWlsLnRleHQudmFsdWVcbiAgICAgICAgfTtcbiAgICAgICAgY29uc29sZS5sb2coZGF0YSk7XG4gICAgICAgIHJlc3VsdENvbnRhaW5lci5pbm5lckhUTUwgPSAnU2VuZGluZy4uLic7XG4gICAgICAgIHNlbmRBamF4SnNvbignL3dvcmsnLCBkYXRhLCBmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgICAgICAgcmVzdWx0Q29udGFpbmVyLmlubmVySFRNTCA9IGRhdGE7XG4gICAgICAgIH0pO1xuICAgIH1cblxuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgaW5pdDogZnVuY3Rpb24gKCkge1xuXG5cbiAgICAgICAgICAgIGZvcm1NYWlsLmFkZEV2ZW50TGlzdGVuZXIoJ3N1Ym1pdCcsIHByZXBhcmVTZW5kTWFpbCk7XG5cblxuICAgICAgICAgICAgLy8gJGZvcm1Db250YWN0TWUuZmluZCgnLmMtZm9ybScpLnN1Ym1pdChmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgLy8gICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIC8vICAgICByZXNldCgpO1xuICAgICAgICAgICAgLy8gICAgIHZhbGlkKCk7XG4gICAgICAgICAgICAvL1xuICAgICAgICAgICAgLy8gfSk7XG5cbiAgICAgICAgICAgICRmb3JtQ29udGFjdE1lLmZpbmQoJy5jLWZvcm1fX2J1dHRvbScpLmNsaWNrKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICByZXNldCgpO1xuICAgICAgICAgICAgICAgICRpbnB1dHMuZWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciAkdGhpcyA9ICQodGhpcyk7XG4gICAgICAgICAgICAgICAgICAgICR0aGlzLnZhbCgnJyk7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxufSkoKTsiLCIvLyAoZnVuY3Rpb24gKCkge1xuLy8gICAgICd1c2Ugc3RyaWN0Jztcbi8vXG4vLyAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4vLyAgICAgICAgIC8vIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5ncmVhdGluZ19waWN0dXJlJykuY2xhc3NMaXN0LmFkZCgnbS0tc2hvdycpO1xuLy8gICAgIH0sIDEwMDApO1xuLy8gfSkoKTtcblxuZnVuY3Rpb24gc2VuZEFqYXhKc29uKHVybCwgZGF0YSwgY2IpIHtcbiAgICB2YXIgeGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG4gICAgeGhyLm9wZW4oJ1BPU1QnLCB1cmwsIHRydWUpO1xuICAgIHhoci5zZXRSZXF1ZXN0SGVhZGVyKCdDb250ZW50LVR5cGUnLCAnYXBwbGljYXRpb24vanNvbicpO1xuICAgIHhoci5vbmxvYWQgPSBmdW5jdGlvbiAoZSkge1xuICAgICAgICB2YXIgcmVzdWx0ID0gSlNPTi5wYXJzZSh4aHIucmVzcG9uc2VUZXh0KTtcbiAgICAgICAgY2IocmVzdWx0LnN0YXR1cyk7XG4gICAgfTtcbiAgICB4aHIuc2VuZChKU09OLnN0cmluZ2lmeShkYXRhKSk7XG4gICAgY29uc29sZS5sb2coZGF0YSk7XG59XG5cbnZhciBibHVyID0gKGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgY29udGFpbmVyID0gJCgnLmMtZm9ybS1jb250YWluZXInKSxcbiAgICAgICAgZm9ybSA9ICQoJy5jLWZvcm0td3JhcHBlcicpO1xuXG4gICAgaWYgKGNvbnRhaW5lci5sZW5ndGggPT09IDApIHJldHVybiBmYWxzZTtcblxuICAgIHJldHVybiB7XG4gICAgICAgIHNldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIGltZyA9ICQoJy5jLWJsb2NrLWJnX3BpYycpLFxuICAgICAgICAgICAgICAgIGltZ1dpZHRoID0gaW1nLndpZHRoKCksXG4gICAgICAgICAgICAgICAgaW1nSGVpZ2h0ID0gaW1nLmhlaWdodCgpLFxuICAgICAgICAgICAgICAgIGJsdXJDc3MgPSBmb3JtWzBdLnN0eWxlLFxuICAgICAgICAgICAgICAgIHBvc0xlZnQgPSAtY29udGFpbmVyLm9mZnNldCgpLmxlZnQsXG4gICAgICAgICAgICAgICAgcG9zVG9wID0gLWNvbnRhaW5lci5wb3NpdGlvbigpLnRvcDtcblxuICAgICAgICAgICAgYmx1ckNzcy5iYWNrZ3JvdW5kU2l6ZSA9IGltZ1dpZHRoICsgJ3B4JyArICcgJyArIGltZ0hlaWdodCArICdweCc7XG4gICAgICAgICAgICBibHVyQ3NzLmJhY2tncm91bmRQb3NpdGlvbiA9IHBvc0xlZnQgKyAncHgnICsgJyAnICsgcG9zVG9wICsgJ3B4JztcbiAgICAgICAgICAgIGZvcm0uY3NzKHtcbiAgICAgICAgICAgICAgICAnYmFja2dyb3VuZC1zaXplJzogaW1nV2lkdGggKyAncHgnICsgJyAnICsgaW1nSGVpZ2h0ICsgJ3B4JyxcbiAgICAgICAgICAgICAgICAnYmFja2dyb3VuZC1wb3NpdGlvbic6IHBvc0xlZnQgKyAncHgnICsgJyAnICsgcG9zVG9wICsgJ3B4J1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG59KCkpO1xuXG52YXIgQXBwID0gKGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm57XG4gICAgICAgIGluaXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIFByZWxvYWQuaW5pdCgpO1xuXG5cbiAgICAgICAgICAgIGlmICghIShkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYy1oYW1idXJnZXJfbmF2JykpKSB7XG4gICAgICAgICAgICAgICAgbmF2aWdhdGlvbi5pbml0KCk7XG4gICAgICAgICAgICAgICAgY29uc29sZS5pbmZvKCduYXYnKVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoISEoZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmwtc2xpZGVyJykpKSB7XG4gICAgICAgICAgICAgICAgU2xpZGVyLmluaXQoKTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmluZm8oJ3NsaWRlcicpXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICghIShkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZmxpcC1jb250YWluZXInKSkpIHtcbiAgICAgICAgICAgICAgICBGbGlwLmluaXQoKTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmluZm8oJ2ZsaXAnKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKCEhKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5sLXBhZ2UtbmF2X2FzaWRlJykpKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5pbmZvKCdhc3NpZGUnKTtcbiAgICAgICAgICAgICAgICBBc3NpZGUuaW5pdCgpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoISEoZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmMtZm9ybS1hdnRvcicpKSkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUuaW5mbygnZm9ybSBhdnRvcmlzYXRpb24nKTtcbiAgICAgICAgICAgICAgICB2YWxpZGF0aW9uQXZ0b3IuaW5pdCgpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoISEoZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmMtZm9ybV9jb250YWN0LW1lJykpKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ2Zvcm0gY29udGFjdHMtbWUnKTtcbiAgICAgICAgICAgICAgICB2YWxpZGF0aW9uQ29udGFjdE1lLmluaXQoKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKCEhZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3BhcmFsYXgnKSkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdwYXJhbGF4TW91c2UnKTtcbiAgICAgICAgICAgICAgICBwYXJhbGxheE1vdXNlLmluaXQoKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKCEhZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmwtc2tpbGxzLWdyb3VwJykpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmluZm8oJ3NraWxscycpO1xuICAgICAgICAgICAgICAgIHNraWxsc0FuaW1hdGUuaW5pdCgpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoISEoZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmwtaGVyb19fYmcnKSkpIHtcbiAgICAgICAgICAgICAgICB3aW5kb3cub25zY3JvbGwgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciB3U2Nyb2xsID0gd2luZG93LnBhZ2VZT2Zmc2V0O1xuICAgICAgICAgICAgICAgICAgICBwYXJhbGxheC5pbml0KHdTY3JvbGwpO1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59KSgpO1xuXG5pZiAoISEoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21hcCcpKSkge1xuICAgIGNvbnNvbGUuaW5mbygnbWFwJyk7XG4gICAgdmFyIG1hcDtcbiAgICBmdW5jdGlvbiBpbml0TWFwKCkge1xuICAgICAgICAvLyBDcmVhdGUgdGhlIG1hcCB3aXRoIG5vIGluaXRpYWwgc3R5bGUgc3BlY2lmaWVkLlxuICAgICAgICAvLyBJdCB0aGVyZWZvcmUgaGFzIGRlZmF1bHQgc3R5bGluZy5cbiAgICAgICAgbWFwID0gbmV3IGdvb2dsZS5tYXBzLk1hcChkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbWFwJyksIHtcbiAgICAgICAgICAgIGNlbnRlcjoge2xhdDogNTUuMDAzOCwgbG5nOiA4Mi45MzA2ODl9LFxuICAgICAgICAgICAgem9vbTogMTMsXG4gICAgICAgICAgICBtYXBUeXBlQ29udHJvbDogZmFsc2VcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gQWRkIGEgc3R5bGUtc2VsZWN0b3IgY29udHJvbCB0byB0aGUgbWFwLlxuICAgICAgICB2YXIgc3R5bGVDb250cm9sID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3N0eWxlLXNlbGVjdG9yLWNvbnRyb2wnKTtcbiAgICAgICAgbWFwLmNvbnRyb2xzW2dvb2dsZS5tYXBzLkNvbnRyb2xQb3NpdGlvbi5UT1BfTEVGVF0ucHVzaChzdHlsZUNvbnRyb2wpO1xuXG4gICAgICAgIC8vIFNldCB0aGUgbWFwJ3Mgc3R5bGUgdG8gdGhlIGluaXRpYWwgdmFsdWUgb2YgdGhlIHNlbGVjdG9yLlxuICAgICAgICBtYXAuc2V0T3B0aW9ucyh7c3R5bGVzOiBzdHlsZXNbJ3NpbHZlciddfSk7XG4gICAgfVxuXG4gICAgdmFyIHN0eWxlcyA9IHtcbiAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgICAgc2lsdmVyOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgZWxlbWVudFR5cGU6ICdnZW9tZXRyeScsXG4gICAgICAgICAgICAgICAgc3R5bGVyczogW3tjb2xvcjogJyNmNWY1ZjUnfV1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgZWxlbWVudFR5cGU6ICdsYWJlbHMuaWNvbicsXG4gICAgICAgICAgICAgICAgc3R5bGVyczogW3t2aXNpYmlsaXR5OiAnb2ZmJ31dXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGVsZW1lbnRUeXBlOiAnbGFiZWxzLnRleHQuZmlsbCcsXG4gICAgICAgICAgICAgICAgc3R5bGVyczogW3tjb2xvcjogJyM2MTYxNjEnfV1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgZWxlbWVudFR5cGU6ICdsYWJlbHMudGV4dC5zdHJva2UnLFxuICAgICAgICAgICAgICAgIHN0eWxlcnM6IFt7Y29sb3I6ICcjZjVmNWY1J31dXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGZlYXR1cmVUeXBlOiAnYWRtaW5pc3RyYXRpdmUubGFuZF9wYXJjZWwnLFxuICAgICAgICAgICAgICAgIGVsZW1lbnRUeXBlOiAnbGFiZWxzLnRleHQuZmlsbCcsXG4gICAgICAgICAgICAgICAgc3R5bGVyczogW3tjb2xvcjogJyNiZGJkYmQnfV1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgZmVhdHVyZVR5cGU6ICdwb2knLFxuICAgICAgICAgICAgICAgIGVsZW1lbnRUeXBlOiAnZ2VvbWV0cnknLFxuICAgICAgICAgICAgICAgIHN0eWxlcnM6IFt7Y29sb3I6ICcjZWVlZWVlJ31dXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGZlYXR1cmVUeXBlOiAncG9pJyxcbiAgICAgICAgICAgICAgICBlbGVtZW50VHlwZTogJ2xhYmVscy50ZXh0LmZpbGwnLFxuICAgICAgICAgICAgICAgIHN0eWxlcnM6IFt7Y29sb3I6ICcjNzU3NTc1J31dXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGZlYXR1cmVUeXBlOiAncG9pLnBhcmsnLFxuICAgICAgICAgICAgICAgIGVsZW1lbnRUeXBlOiAnZ2VvbWV0cnknLFxuICAgICAgICAgICAgICAgIHN0eWxlcnM6IFt7Y29sb3I6ICcjZTVlNWU1J31dXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGZlYXR1cmVUeXBlOiAncG9pLnBhcmsnLFxuICAgICAgICAgICAgICAgIGVsZW1lbnRUeXBlOiAnbGFiZWxzLnRleHQuZmlsbCcsXG4gICAgICAgICAgICAgICAgc3R5bGVyczogW3tjb2xvcjogJyM5ZTllOWUnfV1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgZmVhdHVyZVR5cGU6ICdyb2FkJyxcbiAgICAgICAgICAgICAgICBlbGVtZW50VHlwZTogJ2dlb21ldHJ5JyxcbiAgICAgICAgICAgICAgICBzdHlsZXJzOiBbe2NvbG9yOiAnI2ZmZmZmZid9XVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBmZWF0dXJlVHlwZTogJ3JvYWQuYXJ0ZXJpYWwnLFxuICAgICAgICAgICAgICAgIGVsZW1lbnRUeXBlOiAnbGFiZWxzLnRleHQuZmlsbCcsXG4gICAgICAgICAgICAgICAgc3R5bGVyczogW3tjb2xvcjogJyM3NTc1NzUnfV1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgZmVhdHVyZVR5cGU6ICdyb2FkLmhpZ2h3YXknLFxuICAgICAgICAgICAgICAgIGVsZW1lbnRUeXBlOiAnZ2VvbWV0cnknLFxuICAgICAgICAgICAgICAgIHN0eWxlcnM6IFt7Y29sb3I6ICcjZGFkYWRhJ31dXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGZlYXR1cmVUeXBlOiAncm9hZC5oaWdod2F5JyxcbiAgICAgICAgICAgICAgICBlbGVtZW50VHlwZTogJ2xhYmVscy50ZXh0LmZpbGwnLFxuICAgICAgICAgICAgICAgIHN0eWxlcnM6IFt7Y29sb3I6ICcjNjE2MTYxJ31dXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGZlYXR1cmVUeXBlOiAncm9hZC5sb2NhbCcsXG4gICAgICAgICAgICAgICAgZWxlbWVudFR5cGU6ICdsYWJlbHMudGV4dC5maWxsJyxcbiAgICAgICAgICAgICAgICBzdHlsZXJzOiBbe2NvbG9yOiAnIzllOWU5ZSd9XVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBmZWF0dXJlVHlwZTogJ3RyYW5zaXQubGluZScsXG4gICAgICAgICAgICAgICAgZWxlbWVudFR5cGU6ICdnZW9tZXRyeScsXG4gICAgICAgICAgICAgICAgc3R5bGVyczogW3tjb2xvcjogJyNlNWU1ZTUnfV1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgZmVhdHVyZVR5cGU6ICd0cmFuc2l0LnN0YXRpb24nLFxuICAgICAgICAgICAgICAgIGVsZW1lbnRUeXBlOiAnZ2VvbWV0cnknLFxuICAgICAgICAgICAgICAgIHN0eWxlcnM6IFt7Y29sb3I6ICcjZWVlZWVlJ31dXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGZlYXR1cmVUeXBlOiAnd2F0ZXInLFxuICAgICAgICAgICAgICAgIGVsZW1lbnRUeXBlOiAnZ2VvbWV0cnknLFxuICAgICAgICAgICAgICAgIHN0eWxlcnM6IFt7Y29sb3I6ICcjNDM2OWFhJ31dXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGZlYXR1cmVUeXBlOiAnd2F0ZXInLFxuICAgICAgICAgICAgICAgIGVsZW1lbnRUeXBlOiAnbGFiZWxzLnRleHQuZmlsbCcsXG4gICAgICAgICAgICAgICAgc3R5bGVyczogW3tjb2xvcjogJyNmNWY1ZjUnfV1cbiAgICAgICAgICAgIH1cbiAgICAgICAgXVxuICAgIH07XG59XG5cbiQoZnVuY3Rpb24gKCkge1xuICAgIHZhciBmb3JtVXBsb2FkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3VwbG9hZCcpO1xuXG4gICAgJCgnLmwtaGVybycpLmhlaWdodCgkKHdpbmRvdykuaGVpZ2h0KCkpO1xuXG4gICAgQXBwLmluaXQoKTtcblxuICAgIHZhciBmaWxlVXBsb2FkID0gZnVuY3Rpb24odXJsLCBkYXRhLCBjYil7XG4gICAgICAgIHZhciB4aHIgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcbiAgICAgICAgeGhyLm9wZW4oJ1BPU1QnLCB1cmwsIHRydWUpO1xuXG4gICAgICAgIHhoci5vbmxvYWQgPSBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgdmFyIHJlc3VsdCA9IEpTT04ucGFyc2UoeGhyLnJlc3BvbnNlVGV4dCk7XG4gICAgICAgICAgICBjYihyZXN1bHQuc3RhdHVzKTtcbiAgICAgICAgfTtcblxuICAgICAgICB4aHIuc2VuZChkYXRhKTtcbiAgICB9O1xuXG4gICAgZnVuY3Rpb24gcHJlcGFyZVNlbmRGaWxlKGUpIHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB2YXIgcmVzdWx0Q29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnN0YXR1cycpO1xuICAgICAgICB2YXIgZm9ybURhdGEgPSBuZXcgRm9ybURhdGEoKTtcbiAgICAgICAgdmFyIGZpbGUgPSBkb2N1bWVudFxuICAgICAgICAgICAgLnF1ZXJ5U2VsZWN0b3IoJyNmaWxlLXNlbGVjdCcpXG4gICAgICAgICAgICAuZmlsZXNbMF07XG4gICAgICAgIHZhciB0aXRsZSA9IGRvY3VtZW50XG4gICAgICAgICAgICAucXVlcnlTZWxlY3RvcignI2ZpbGUtdGl0bGUnKVxuICAgICAgICAgICAgLnZhbHVlO1xuICAgICAgICB2YXIgdGVjaCA9IGRvY3VtZW50XG4gICAgICAgICAgICAucXVlcnlTZWxlY3RvcignI2ZpbGUtdGVjaCcpXG4gICAgICAgICAgICAudmFsdWU7XG4gICAgICAgIHZhciBzaXRlVXJsID0gZG9jdW1lbnRcbiAgICAgICAgICAgIC5xdWVyeVNlbGVjdG9yKCcjZmlsZS1zaXRlJylcbiAgICAgICAgICAgIC52YWx1ZTtcblxuICAgICAgICBmb3JtRGF0YS5hcHBlbmQoJ3Bob3RvJywgZmlsZSwgZmlsZS5uYW1lKTtcbiAgICAgICAgZm9ybURhdGEuYXBwZW5kKCd0aXRsZScsIHRpdGxlKTtcbiAgICAgICAgZm9ybURhdGEuYXBwZW5kKCd0ZWNobm9sb2d5JywgdGVjaCk7XG4gICAgICAgIGZvcm1EYXRhLmFwcGVuZCgnc2l0ZVVybCcsIHNpdGVVcmwpO1xuXG4gICAgICAgIGNvbnNvbGUubG9nKCdmaWxlJywgZmlsZSk7XG4gICAgICAgIGNvbnNvbGUubG9nKCdmaWxlLm5hbWUnLCBmaWxlLm5hbWUpO1xuICAgICAgICBjb25zb2xlLmxvZygndGl0bGUnLCB0aXRsZSk7XG4gICAgICAgIGNvbnNvbGUubG9nKCd0ZWNoJywgdGVjaCk7XG4gICAgICAgIGNvbnNvbGUubG9nKCdzaXRlVXJsJywgc2l0ZVVybCk7XG5cbiAgICAgICAgcmVzdWx0Q29udGFpbmVyLmlubmVySFRNTCA9ICdVcGxvYWRpbmcuLi4nO1xuICAgICAgICBmaWxlVXBsb2FkKCcvdXBsb2FkJywgZm9ybURhdGEsIGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAgICAgICByZXN1bHRDb250YWluZXIuaW5uZXJIVE1MID0gZGF0YTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgaWYgKGZvcm1VcGxvYWQpIHtcbiAgICAgICAgZm9ybVVwbG9hZC5hZGRFdmVudExpc3RlbmVyKCdzdWJtaXQnLCBwcmVwYXJlU2VuZEZpbGUpO1xuICAgIH1cblxuICAgIC8vYmxvY2sgYmxvZ1xuXG4gICAgY29uc3QgZm9ybUJsb2cgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjYmxvZycpO1xuXG4gICAgaWYgKGZvcm1CbG9nKSB7XG4gICAgICAgIGZvcm1CbG9nLmFkZEV2ZW50TGlzdGVuZXIoJ3N1Ym1pdCcsIHByZXBhcmVTZW5kUG9zdCk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcHJlcGFyZVNlbmRQb3N0KGUpIHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB2YXIgcmVzdWx0Q29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnN0YXR1cycpO1xuICAgICAgICB2YXIgZGF0YSA9IHtcbiAgICAgICAgICAgIHRpdGxlOiBmb3JtQmxvZy50aXRsZS52YWx1ZSxcbiAgICAgICAgICAgIGRhdGU6IGZvcm1CbG9nLmRhdGUudmFsdWUsXG4gICAgICAgICAgICB0ZXh0OiBmb3JtQmxvZy50ZXh0LnZhbHVlXG4gICAgICAgIH07XG4gICAgICAgIHJlc3VsdENvbnRhaW5lci5pbm5lckhUTUwgPSAnU2VuZGluZy4uLic7XG4gICAgICAgIHNlbmRBamF4SnNvbignL2FkZHBvc3QnLCBkYXRhLCBmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgICAgICAgcmVzdWx0Q29udGFpbmVyLmlubmVySFRNTCA9IGRhdGE7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8vYmxvY2sgc2tpbGxzXG5cbiAgICBjb25zdCBmb3JtU2tpbGxzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3NraWxscycpO1xuXG4gICAgaWYgKGZvcm1Ta2lsbHMpIHtcbiAgICAgICAgZm9ybVNraWxscy5hZGRFdmVudExpc3RlbmVyKCdzdWJtaXQnLCBwcmVwYXJlU2VuZFNraWxscyk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcHJlcGFyZVNlbmRTa2lsbHMoZSkge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIHZhciByZXN1bHRDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc3RhdHVzJyk7XG4gICAgICAgIHZhciBkYXRhID0ge1xuICAgICAgICAgICAgaHRtbDogZm9ybVNraWxscy5odG1sLnZhbHVlLFxuICAgICAgICAgICAgY3NzOiBmb3JtU2tpbGxzLmNzcy52YWx1ZSxcbiAgICAgICAgICAgIGpzOiBmb3JtU2tpbGxzLmpzLnZhbHVlLFxuICAgICAgICAgICAgcGhwOiBmb3JtU2tpbGxzLnBocC52YWx1ZSxcbiAgICAgICAgICAgIHNxbDogZm9ybVNraWxscy5zcWwudmFsdWUsXG4gICAgICAgICAgICBub2RlOiBmb3JtU2tpbGxzLm5vZGUudmFsdWUsXG4gICAgICAgICAgICBtb25nbzogZm9ybVNraWxscy5tb25nby52YWx1ZSxcbiAgICAgICAgICAgIGdpdDogZm9ybVNraWxscy5naXQudmFsdWUsXG4gICAgICAgICAgICBndWxwOiBmb3JtU2tpbGxzLmd1bHAudmFsdWUsXG4gICAgICAgICAgICBib3dlcjogZm9ybVNraWxscy5ib3dlci52YWx1ZVxuICAgICAgICB9O1xuXG4gICAgICAgIGNvbnNvbGUubG9nKGRhdGEpO1xuXG4gICAgICAgIHJlc3VsdENvbnRhaW5lci5pbm5lckhUTUwgPSAnU2VuZGluZy4uLic7XG4gICAgICAgIHNlbmRBamF4SnNvbignL2FkbWluJywgZGF0YSwgZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgICAgICAgIHJlc3VsdENvbnRhaW5lci5pbm5lckhUTUwgPSBkYXRhO1xuICAgICAgICB9KTtcbiAgICB9XG5cbi8vYmx1clxuICAgIGlmIChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYy1mb3JtLWNvbnRhaW5lcicpID09PW51bGwpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgfSBlbHNlIHtcbiAgICAgICAgYmx1ci5zZXQoKTtcbiAgICAgICAgJCh3aW5kb3cpLnJlc2l6ZShmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBibHVyLnNldCgpO1xuICAgICAgICB9KTtcbiAgICB9XG59KTsiXX0=

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
            // $slideActivePicSpan[0].innerText = currentSlide + 1;
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

        numberChecekd = 0;

        valid();

        console.log(numberChecekd);


        if (numberChecekd < 2 || $('#hz').prop('checked')) {
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



$(function () {
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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2lkZS1uYXYuanMiLCJmbGlwLmpzIiwibmF2LmpzIiwicGFyYWxsYXgtbW91c2UuanMiLCJwYXJhbGxheC1zY3JvbGwuanMiLCJwcmVsb2FkLmpzIiwic2tpbGxzLWFuaW1hdGUuanMiLCJzbGlkZXIuanMiLCJ2YWxpZGF0aW9uLmpzIiwiYXBwLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3hHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDbkJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDdERBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUMvQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN4QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN4RUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQy9CQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDck9BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUMvS0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiYXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBDcmVhdGVkIGJ5IGxlcmEgb24gMy83LzE3LlxuICovXG5cbnZhciBBc3NpZGUgPSAoXG4gICAgZnVuY3Rpb24gKCkge1xuXG4gICAgICAgIGlmICghKCQoJy5sLXBhZ2UtbmF2X2FzaWRlJykubGVuZ3RoKSkgcmV0dXJuIGZhbHNlO1xuXG4gICAgICAgIHZhciBzaG93U2VjdGlvbiA9IGZ1bmN0aW9uIChhcnRpY2xlLCBpc0FuaW1hdGUpIHtcbiAgICAgICAgICAgIHZhclxuICAgICAgICAgICAgICAgIGRpcmVjdGlvbiA9IGFydGljbGUucmVwbGFjZSgnIycsICcnKSxcbiAgICAgICAgICAgICAgICByZXFBcnRpY2xlID0gJCgnLmRhdGEtc2VjdGlvbicpLmZpbHRlcignW2RhdGEtc2VjdGlvbj1cIicgKyBkaXJlY3Rpb24gKyAnXCJdJyksXG4gICAgICAgICAgICAgICAgcmVxQXJ0aWNsZVBvcyA9IHJlcUFydGljbGUub2Zmc2V0KCkudG9wO1xuXG4gICAgICAgICAgICBpZiAoaXNBbmltYXRlKSB7XG4gICAgICAgICAgICAgICAgJCgnYm9keSwgaHRtbCcpLmFuaW1hdGUoe3Njcm9sbFRvcDogcmVxQXJ0aWNsZVBvc30sIDUwMCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICQoJ2JvZHksIGh0bWwnKS5zY3JvbGxUb3AocmVxQXJ0aWNsZVBvcyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG5cbiAgICAgICAgdmFyIGNoZWNrU2VjdGlvbiA9IGZ1bmN0aW9uICgpIHtcblxuICAgICAgICAgICAgJCgnLmRhdGEtc2VjdGlvbicpLmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHZhclxuICAgICAgICAgICAgICAgICAgICAkdGhpcyA9ICQodGhpcyksXG4gICAgICAgICAgICAgICAgICAgIHRvcEVkZ2UgPSAkdGhpcy5vZmZzZXQoKS50b3AgLSAzMDAsXG4gICAgICAgICAgICAgICAgICAgIGJvdHRvbUVkZ2UgPSB0b3BFZGdlICsgJHRoaXMuaGVpZ2h0KCksXG4gICAgICAgICAgICAgICAgICAgIHdTY3JvbGwgPSAkKHdpbmRvdykuc2Nyb2xsVG9wKCk7XG5cbiAgICAgICAgICAgICAgICBpZiAodG9wRWRnZSA8IHdTY3JvbGwgJiYgYm90dG9tRWRnZSA+IHdTY3JvbGwpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyXG4gICAgICAgICAgICAgICAgICAgICAgICBjdXJyZW50SWQgPSAkdGhpcy5kYXRhKCdzZWN0aW9uJyksXG4gICAgICAgICAgICAgICAgICAgICAgICBhY3RpdmVMaW5rID0gJCgnLmwtcGFnZS1uYXZfX2xpbmsnKS5maWx0ZXIoJ1tocmVmPVwiIycgKyBjdXJyZW50SWQgKyAnXCJdJyk7XG5cbiAgICAgICAgICAgICAgICAgICAgJCgnLmwtcGFnZS1uYXZfX2xpbmsnKS5lYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5yZW1vdmVDbGFzcygnbC1wYWdlLW5hdl9fbGlua19hY3RpdmUnKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIGFjdGl2ZUxpbmsuYWRkQ2xhc3MoJ2wtcGFnZS1uYXZfX2xpbmtfYWN0aXZlJyk7XG4gICAgICAgICAgICAgICAgICAgIGxvY2F0aW9uLmhhc2ggPSAnIycgKyBjdXJyZW50SWQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgfTtcblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgaW5pdDogZnVuY3Rpb24gKCkge1xuXG5cbiAgICAgICAgICAgICAgICBpZiAoJCh3aW5kb3cpLndpZHRoKCkgPD0gMTIwMCkge1xuICAgICAgICAgICAgICAgICAgICB2YXJcbiAgICAgICAgICAgICAgICAgICAgICAgICRwcm90cmFjdG9yID0gJCgnLmwtcGFnZS1uYXZfYXNpZGVfX3Byb3RyYWN0b3InKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICRzbWFsbE5hdlBhZ2UgPSAkKCcubC1wYWdlLW5hdl9hc2lkZScpO1xuXG4gICAgICAgICAgICAgICAgICAgICQoZG9jdW1lbnQpLm1vdXNldXAoZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICgkc21hbGxOYXZQYWdlLmhhcyhlLnRhcmdldCkubGVuZ3RoID09PSAwKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkc21hbGxOYXZQYWdlLnJlbW92ZUNsYXNzKCdsLXBhZ2UtbmF2X2FjdGl2ZScpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgICAgICAkcHJvdHJhY3Rvci5jbGljayhmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAkc21hbGxOYXZQYWdlLnRvZ2dsZUNsYXNzKCdsLXBhZ2UtbmF2X2FjdGl2ZScpO1xuICAgICAgICAgICAgICAgICAgICB9KTtcblxuXG5cbiAgICAgICAgICAgICAgICAgICAgJCh3aW5kb3cpLnNjcm9sbChmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY2hlY2tTZWN0aW9uKCk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmICgkKHdpbmRvdykud2lkdGgoKSA+IDEyMDApIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJCh3aW5kb3cpLndpZHRoKCkpO1xuXG4gICAgICAgICAgICAgICAgICAgICQod2luZG93KS5zY3JvbGwoZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJsb2NrTWFpbiA9ICQoJy5sLWJsb2NrLW1haW4nKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYXZUb3AgPSAkKHdpbmRvdykuc2Nyb2xsVG9wKCkgLSBibG9ja01haW4ucG9zaXRpb24oKS50b3AgKyA0MCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYXZUb3BCb3R0b20gPSAkKCcubC1wYWdlLW5hdl9hc2lkZScpLmhlaWdodCgpIC0gJCgnLmwtcGFnZS1uYXZfX2xpc3QnKS5oZWlnaHQoKTtcblxuXG4gICAgICAgICAgICAgICAgICAgICAgICBjaGVja1NlY3Rpb24oKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG5hdlRvcCA8IDApIG5hdlRvcCA9IDA7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChuYXZUb3AgPj0gbmF2VG9wQm90dG9tICkgbmF2VG9wID0gbmF2VG9wQm90dG9tO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAkKCcubC1wYWdlLW5hdl9fbGlzdCcpLmNzcygndG9wJywgbmF2VG9wKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgJCgnLmwtcGFnZS1uYXZfX2xpbmsnKS5vbignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgICAgIHNob3dTZWN0aW9uKCQodGhpcykuYXR0cignaHJlZicpLCB0cnVlKTtcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIGlmICghIShsb2NhdGlvbi5oYXNoKSl7XG4gICAgICAgICAgICAgICAgICAgIHNob3dTZWN0aW9uKHdpbmRvdy5sb2NhdGlvbi5oYXNoLCBmYWxzZSk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4pKCk7XG4iLCJ2YXIgRmxpcCA9IChmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGZsaXBDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZmxpcC1jb250YWluZXInKTtcblxuICAgIGlmICghKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5mbGlwLWNvbnRhaW5lcicpKSl7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgXG4gICAgcmV0dXJuIHtcbiAgICAgICAgaW5pdDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIGxpbmtBdnRvciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jLWJsb2NrLWxpbmtfdG8tYXZ0b3InKTtcblxuICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmMtYmxvY2stbGlua190by1hdnRvcicpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJyAsZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgZmxpcENvbnRhaW5lci5jbGFzc0xpc3QudG9nZ2xlKCdmbGlwLWNvbnRhaW5lcl9iYWNrJyk7XG4gICAgICAgICAgICAgICAgbGlua0F2dG9yLmNsYXNzTGlzdC50b2dnbGUoJ2MtYmxvY2stbGlua19iYWNrJyk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cbn0pKCk7XG4iLCJ2YXIgbmF2aWdhdGlvbiA9IChmdW5jdGlvbiAoKSB7XG4gICAgaWYgKCQoJy5jLWhhbWJ1cmdlcl9uYXYnKS5sZW5ndGggPSAwKSB7IHJldHVybiBmYWxzZSB9XG5cbiAgICB2YXIgbmF2aWdhdGlvbiA9ICQoJy5jLW5hdl9zaXRlLWxpc3QnKSxcbiAgICAgICAgcGFyZW50TmF2ID0gJCgnLmNvbnRlbnQnKSxcbiAgICAgICAgaGFtYnVyZ2VyID0gJCgnLmMtaGFtYnVyZ2VyX25hdicpLFxuICAgICAgICBpdGVtcyA9ICQoJy5jLW5hdl9zaXRlX19pdGVtJyksXG4gICAgICAgIHRpbWVyO1xuICAgIHZhciBjb3VudGVyID0gMDtcbiAgICB2YXIgbmF2QWN0aXZlID0gJCgnLmMtbmF2X3NpdGVfYWN0aXZlJyk7XG5cblxuXG4gICAgdmFyIGFzY2VudEl0ZW1zID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBpdGVtc1tjb3VudGVyXS5jbGFzc0xpc3QuYWRkKCdjLW5hdl9zaXRlX19oaWRkZW4nKTtcbiAgICAgICAgY291bnRlcisrO1xuXG4gICAgICAgIHRpbWVyID0gc2V0VGltZW91dChhc2NlbnRJdGVtcywgMTAwKTtcblxuICAgICAgICBpZiAoY291bnRlciA+PSBpdGVtcy5sZW5ndGgpIHtcbiAgICAgICAgICAgIGNsZWFyVGltZW91dCh0aW1lcik7XG4gICAgICAgIH1cblxuICAgIH07XG5cbiAgICB2YXIgbGlzdGVuZXIgPSBmdW5jdGlvbiAoKSB7XG5cbiAgICAgICAgJCgnLmMtaGFtYnVyZ2VyX25hdicpLmNsaWNrKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdjbGljaycpO1xuICAgICAgICAgICAgaGFtYnVyZ2VyLnRvZ2dsZUNsYXNzKCdjLWhhbWJ1cmdlcl9hY3RpdmUnKTtcbiAgICAgICAgICAgIG5hdmlnYXRpb24udG9nZ2xlQ2xhc3MoJ2MtbmF2X3NpdGVfYWN0aXZlJyk7XG5cbiAgICAgICAgICAgIGlmICghIShwYXJlbnROYXYuZmluZCgnLmMtbmF2X3NpdGVfYWN0aXZlJykubGVuZ3RoKSkge1xuICAgICAgICAgICAgICAgIHZhciBuZXdUaW1lcjtcbiAgICAgICAgICAgICAgICBjb3VudGVyID0gMDtcbiAgICAgICAgICAgICAgICBuZXdUaW1lciA9IHNldFRpbWVvdXQoYXNjZW50SXRlbXMsIDYwMCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoIShwYXJlbnROYXYuZmluZCgnLmMtbmF2X3NpdGVfYWN0aXZlJykubGVuZ3RoKSkge1xuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgaXRlbXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgaXRlbXNbaV0uY2xhc3NMaXN0LnJlbW92ZSgnYy1uYXZfc2l0ZV9faGlkZGVuJyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgIH07XG5cbiAgICByZXR1cm4ge1xuICAgICAgICBpbml0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBsaXN0ZW5lcigpO1xuICAgICAgICB9XG4gICAgfVxufSgpKTtcbiIsInZhciBwYXJhbGxheE1vdXNlID0gKGZ1bmN0aW9uICgpIHtcbiAgICBpZiAoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3BhcmFsYXgnKSA9PT0gbnVsbCkgcmV0dXJuIGZhbHNlO1xuXG4gICAgdmFyIGNhbGN1bGF0ZVBhcmFsbGF4ID0gZnVuY3Rpb24oZSl7XG4gICAgICAgIHZhciBwYXJhbGxheENvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwYXJhbGF4JyksXG4gICAgICAgICAgICBsYXllcnMgPSBwYXJhbGxheENvbnRhaW5lci5jaGlsZHJlbixcbiAgICAgICAgICAgIHBhZ2VYID0gZS5wYWdlWCxcbiAgICAgICAgICAgIHBhZ2VZID0gZS5wYWdlWSxcbiAgICAgICAgICAgIGluaXRpYWxYID0gKHdpbmRvdy5pbm5lcldpZHRoIC8gMikgLSBwYWdlWCxcbiAgICAgICAgICAgIGluaXRpYWxZID0gKHdpbmRvdy5pbm5lckhlaWdodCAvIDIpIC0gcGFnZVk7XG5cbiAgICAgICAgW10uc2xpY2UuY2FsbChsYXllcnMpLmZvckVhY2goZnVuY3Rpb24gKGxheWVyLCBpKSB7XG4gICAgICAgICAgICB2YXIgZGl2aWRlciA9IChpICsgMikgLyA1MCxcbiAgICAgICAgICAgICAgICBib3R0b21Qb3NpdGlvbiA9ICh3aW5kb3cuaW5uZXJIZWlnaHQgLyAyKSAqIGRpdmlkZXIsXG4gICAgICAgICAgICAgICAgcG9zaXRpb25YID0gaW5pdGlhbFggKiBkaXZpZGVyLFxuICAgICAgICAgICAgICAgIHBvc2l0aW9uWSA9IGluaXRpYWxZICogZGl2aWRlcixcbiAgICAgICAgICAgICAgICBsYXllclN0eWxlID0gbGF5ZXIuc3R5bGUsXG4gICAgICAgICAgICAgICAgdHJhbnNmb3JtU3RyaW5nID0gJ3RyYW5zbGF0ZTNkKCcgKyBwb3NpdGlvblggKyAncHgsICcgKyBwb3NpdGlvblkgKyAncHgsIDBweCknO1xuICAgICAgICAgICAgbGF5ZXJTdHlsZS50cmFuc2Zvcm0gPSB0cmFuc2Zvcm1TdHJpbmc7XG4gICAgICAgIH0pXG4gICAgfTtcblxuICAgIHJldHVybiB7XG4gICAgICAgIGluaXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgICAgIGNhbGN1bGF0ZVBhcmFsbGF4KGUpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG59KSgpO1xuXG4iLCJ2YXIgcGFyYWxsYXggPSAoZnVuY3Rpb24gKCkge1xuICAgIGlmICghKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5sLWhlcm9fX2JnJykpKSB7XG4gICAgICAgIHJldHVybiBmYWxzZVxuICAgIH1cblxuICAgIHZhciBiZyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5sLWhlcm9fX2JnJyk7XG4gICAgdmFyIHVzZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYy11c2VyJyk7XG4gICAgdmFyIGZvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jLXVzZXJfX2JnJyk7XG5cbiAgICByZXR1cm4ge1xuICAgICAgICBtb3ZlOiBmdW5jdGlvbiAoYmxvY2ssIHdpbmRvd1Njcm9sbCwgc3RyYWZlQW1vdW5kKSB7XG4gICAgICAgICAgICB2YXIgc3RyYWZlID0gd2luZG93U2Nyb2xsIC8gLXN0cmFmZUFtb3VuZCArICclJztcbiAgICAgICAgICAgIHZhciB0cmFuc2Zvcm1TdHJpbmcgPSAndHJhbnNsYXRlM2QoMCwnICsgc3RyYWZlICsgJywgMCknO1xuICAgICAgICAgICAgdmFyIHN0eWxlID0gYmxvY2suc3R5bGU7XG5cbiAgICAgICAgICAgIHN0eWxlLnRyYW5zZm9ybSA9IHRyYW5zZm9ybVN0cmluZztcbiAgICAgICAgICAgIHN0eWxlLndlYmtpdFRyYW5zZm9ybSA9IHRyYW5zZm9ybVN0cmluZztcblxuICAgICAgICB9LFxuICAgICAgICBpbml0OiBmdW5jdGlvbiAod1Njcm9sbCkge1xuICAgICAgICAgICAgdGhpcy5tb3ZlKGJnLCB3U2Nyb2xsLCA1MCk7XG4gICAgICAgICAgICB0aGlzLm1vdmUoZm9uLCB3U2Nyb2xsLCAyMCk7XG4gICAgICAgIH1cbiAgICB9XG59KCkpOyIsInZhciBQcmVsb2FkID0gKGZ1bmN0aW9uICgpIHtcblxuICAgIHZhciBwZXJjZW50c1RvdGFsID0gMCxcbiAgICAgICAgcHJlbG9kZXIgPSAkKCcucHJlbG9hZGVyJyk7XG5cblxuICAgIHZhciBpbWdQYXRoID0gJCgnKicpLm1hcChmdW5jdGlvbiAobmR4LCBlbGVtZW50KSB7XG4gICAgICAgIHZhciBiYWNrZ3JvdW5kID0gJChlbGVtZW50KS5jc3MoJ2JhY2tncm91bmQtaW1hZ2UnKSxcbiAgICAgICAgICAgIGlzSW1nID0gJChlbGVtZW50KS5pcygnaW1nJyksXG4gICAgICAgICAgICBpc1ZpZGVvID0gJChlbGVtZW50KS5pcygndmlkZW8nKSxcbiAgICAgICAgICAgIHBhdGggPSAnJztcblxuICAgICAgICBpZiAoYmFja2dyb3VuZCAhPSAnbm9uZScpe1xuICAgICAgICAgICAgcGF0aCA9IGJhY2tncm91bmQucmVwbGFjZSgndXJsKFwiJywgJycpLnJlcGxhY2UoJ1wiKScsICcnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChpc0ltZyB8fCBpc1ZpZGVvKSB7XG4gICAgICAgICAgICBwYXRoID0gJChlbGVtZW50KS5hdHRyKCdzcmMnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChwYXRoKSB7XG4gICAgICAgICAgICByZXR1cm4gcGF0aDtcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgdmFyIGFuaW1hdGVQZXJjZW50cyA9IGZ1bmN0aW9uIChhbmltYXRlUGVyY2VudCkge1xuICAgICAgICB2YXIgY2lyY2xlUGVyY2VudGFnZXMgPSAkKCcucHJlbG9hZGVyX19jZXJjbGUtcGVyY2VudGFnZXMnKVswXSxcbiAgICAgICAgICAgIGRhc2hvZmZzZXQgPSBhbmltYXRlUGVyY2VudCAvIDEwMCAqIDE1MC43OTY0NDczNzIzMTAwNztcblxuICAgICAgICBjaXJjbGVQZXJjZW50YWdlcy5zdHlsZS5zdHJva2VEYXNoYXJyYXkgPSBkYXNob2Zmc2V0ICsnIDE1MC43OTY0NDczNzIzMTAwNyc7XG4gICAgfTtcblxuICAgIHZhciBzZXRQZXJjZW50cyA9IGZ1bmN0aW9uKHRvdGFsLCBjdXJyZW50KSB7XG5cbiAgICAgIHZhciBwZXJjZW50cyA9IE1hdGguY2VpbChjdXJyZW50IC8gdG90YWwgKiAxMDApO1xuXG4gICAgICAkKCcucHJlbG9kZXJfX3BlcmNlbnRhZ2VzJykudGV4dChwZXJjZW50cyk7XG5cbiAgICAgICAgYW5pbWF0ZVBlcmNlbnRzKHBlcmNlbnRzKTtcblxuICAgICAgaWYgKHBlcmNlbnRzID49IDEwMCkge1xuICAgICAgICAgIHByZWxvZGVyLmZhZGVPdXQoKTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgdmFyIGxvYWRJbWFnZXMgPSBmdW5jdGlvbiAoaW1hZ2VzKSB7XG5cbiAgICAgICAgaWYgKCFpbWFnZXMubGVuZ3RoKSBwcmVsb2Rlci5mYWRlT3V0KCk7XG5cbiAgICAgIGltYWdlcy5mb3JFYWNoKGZ1bmN0aW9uIChpbWcsIGksIGltYWdlcykge1xuICAgICAgICAgIHZhciBmYWtlSW1hZ2UgPSAkKCc8aW1nPicgfHwgJzx2aWRlbz4nLCB7XG4gICAgICAgICAgICAgIGF0dHI6IHtcbiAgICAgICAgICAgICAgICAgIHNyYzogaW1nXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcblxuICAgICAgICAgIGZha2VJbWFnZS5vbignbG9hZCBlcnJvcicsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgcGVyY2VudHNUb3RhbCsrO1xuICAgICAgICAgICAgICBzZXRQZXJjZW50cyhpbWFnZXMubGVuZ3RoLCBwZXJjZW50c1RvdGFsKVxuICAgICAgICAgIH0pXG4gICAgICB9KVxuICAgIH07XG5cbiAgICByZXR1cm4ge1xuICAgICAgICBpbml0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgaW1ncyA9IGltZ1BhdGgudG9BcnJheSgpO1xuICAgICAgICAgICAgbG9hZEltYWdlcyhpbWdzKTtcbiAgICAgICAgfVxuICAgIH1cblxuXG59KCkpO1xuIiwidmFyIHNraWxsc0FuaW1hdGUgPSAoZnVuY3Rpb24gKCkge1xuICAgIHZhciAkc2tpbGxzUGFyZW50ID0gJCgnLmwtc2tpbGxzLWdyb3VwJyksXG4gICAgICAgICRza2lsbHMgPSAkc2tpbGxzUGFyZW50LmZpbmQoJy5jLXNraWxsc19fY2lyY2xlLWFib3ZlJyk7XG5cbiAgICBpZiAoISgkc2tpbGxzUGFyZW50Lmxlbmd0aCkpIHJldHVybiBmYWxzZTtcblxuICAgIHZhciBjaGVja0Rpc3RuY2UgPSBmdW5jdGlvbihzY3JvbGxUb3AsIGVsZW0pe1xuICAgICAgICB2YXIgb2Zmc2V0ID0gZWxlbS5vZmZzZXQoKS50b3A7XG4gICAgICAgIHZhciB3aW5kb3dNYXJnaW4gPSBNYXRoLmNlaWwoJCh3aW5kb3cpLmhlaWdodCgpLzMpO1xuICAgICAgICB2YXIgdG9wQm9yZGVyID0gb2Zmc2V0IC0gc2Nyb2xsVG9wIC0gd2luZG93TWFyZ2luO1xuICAgICAgICB2YXIgYm90dG9tRWRnZSA9IGVsZW0ub3V0ZXJIZWlnaHQodHJ1ZSkgKyBvZmZzZXQ7XG4gICAgICAgIHZhciBib3R0b21Cb3JkZXIgPSBzY3JvbGxUb3AgKyB3aW5kb3dNYXJnaW4gLSBib3R0b21FZGdlO1xuXG4gICAgICAgIHJldHVybiB0b3BCb3JkZXIgPD0gMCAmJiBib3R0b21Cb3JkZXIgPD0gMDtcbiAgICB9O1xuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgaW5pdDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgJCh3aW5kb3cpLm9uKCdzY3JvbGwnLCBmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgIHZhciBzY3JvbGxUb3AgPSAkKHdpbmRvdykuc2Nyb2xsVG9wKCk7XG5cbiAgICAgICAgICAgICAgICBpZiAoY2hlY2tEaXN0bmNlKHNjcm9sbFRvcCwgJHNraWxsc1BhcmVudCkpIHtcbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCAkc2tpbGxzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAkc2tpbGxzW2ldLmNsYXNzTGlzdC5yZW1vdmUoJ2Mtc2tpbGxzX19jaXJjbGUtYWJvdmVfbm8nKTtcblxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgfVxuICAgIH1cbn0pKCk7IiwiXG52YXIgc2xpZGVyUGFyc2VDb250ZW50ID0gZnVuY3Rpb24gKCkge1xuICAgIHZhciBzdHJEYiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNkYicpLmdldEF0dHJpYnV0ZSgnZGF0YS1kYicpO1xuICAgIHZhciBhcnJTdHIgPSBbXTtcbiAgICBzdHJEYiA9IHN0ckRiLnJlcGxhY2UoXCJbe1wiLFwiXCIpO1xuICAgIHN0ckRiID0gc3RyRGIucmVwbGFjZShcIn1dXCIsXCJcIik7XG4gICAgYXJyU3RyID0gc3RyRGIuc3BsaXQoJ30seycpO1xuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcnJTdHIubGVuZ3RoOyBpKyspe1xuICAgICAgICBhcnJTdHJbaV0gPSAneycgK2FyclN0cltpXSsgJ30nO1xuICAgICAgICBhcnJTdHJbaV0gPSBKU09OLnBhcnNlKGFyclN0cltpXSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGFyclN0cjtcbn07XG5cbnZhciBTbGlkZXIgPSAoZnVuY3Rpb24gKCkge1xuXG4gICAgaWYgKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5sLXNsaWRlcicpID09PSBudWxsKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBzbGlkZXJDb250ZW50ID0gc2xpZGVyUGFyc2VDb250ZW50KCk7XG5cbiAgICB2YXIgZG9jID0gZG9jdW1lbnQ7XG4gICAgdmFyIGFycm93TmV4dCA9IGRvYy5xdWVyeVNlbGVjdG9yKCcjYXJyb3ctdXAnKSxcbiAgICAgICAgYXJyb3dQcmV2ID0gZG9jLnF1ZXJ5U2VsZWN0b3IoJyNhcnJvdy1kb3duJyksXG4gICAgICAgICRzbGlkZUFjdGl2ZUNhcHRpb24gPSAkKCcjc2xpZGUtYWN0aXZlLWNhcHRpb24nKSxcbiAgICAgICAgJHNsaWRlQWN0aXZlQ2FwdGlvblRpdGxlID0gJHNsaWRlQWN0aXZlQ2FwdGlvbi5maW5kKCcuYy1ibG9jay10aXRsZV9fdGV4dCcpLFxuICAgICAgICAkc2xpZGVBY3RpdmVDYXB0aW9uVGVjaG5vbG9neSA9ICRzbGlkZUFjdGl2ZUNhcHRpb24uZmluZCgnLmMtYmxvY2stdGV4dF9ibHVlJyksXG4gICAgICAgICRzbGlkZUFjdGl2ZUNhcHRpb25MaW5rID0gJHNsaWRlQWN0aXZlQ2FwdGlvbi5maW5kKCcuYy1ibG9jay1saW5rX2JsdWUnKSxcbiAgICAgICAgJHNsaWRlckFjdGl2ZVBpY1dyYXBwZXIgPSAkKCcjc2xpZGUtYWN0aXZlLXBpYycpLFxuICAgICAgICAkc2xpZGVBY3RpdmVQaWNTcGFuID0gJHNsaWRlckFjdGl2ZVBpY1dyYXBwZXIuZmluZCgnc3BhbicpLFxuICAgICAgICAkc2xpZGVBY3RpdmVQaWMgPSAkKCcubC1zbGlkZXJfX3BpYycpLFxuICAgICAgICAkc2xpZGVySXRlbXMgPSAkKCcjc2xpZGUtaXRlbXMnKSxcbiAgICAgICAgJGZvbkRhcmsgPSAkKCcubC1zbGlkZXJfX2Fycm93LWRhcmsnKSxcbiAgICAgICAgY3VycmVudFNsaWRlID0gMCxcbiAgICAgICAgc2l6ZSA9IHNsaWRlckNvbnRlbnQubGVuZ3RoLFxuICAgICAgICBpblByb2Nlc3NOZXh0ID0gZmFsc2UsXG4gICAgICAgIGluUHJvY2Vzc1ByZXYgPSBmYWxzZSxcbiAgICAgICAgYW5pbWF0aW9uRW5kO1xuXG4gICAgdmFyIExpc3RlbmVyID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBhcnJvd05leHQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgY3VycmVudFNsaWRlID0gbGltaXRlcihjdXJyZW50U2xpZGUgKyAxKTtcblxuICAgICAgICAgICAgaWYgKGFuaW1hdGlvbkVuZCA+PSAzKSBpblByb2Nlc3NOZXh0ID0gZmFsc2U7XG5cbiAgICAgICAgICAgIGlmICghaW5Qcm9jZXNzTmV4dCkge1xuICAgICAgICAgICAgICAgIGluUHJvY2Vzc05leHQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIGRldGVyQWN0aXZlU2xpZGUoKTtcbiAgICAgICAgICAgICAgICBhbmltYXRpb25FbmQgPSAwO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICBhcnJvd1ByZXYuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgY3VycmVudFNsaWRlID0gbGltaXRlcihjdXJyZW50U2xpZGUgLSAxKTtcblxuICAgICAgICAgICAgaWYgKGFuaW1hdGlvbkVuZCA+PSAzKSBpblByb2Nlc3NQcmV2ID0gZmFsc2U7XG5cbiAgICAgICAgICAgIGlmICghaW5Qcm9jZXNzUHJldikge1xuICAgICAgICAgICAgICAgIGluUHJvY2Vzc1ByZXYgPSB0cnVlO1xuICAgICAgICAgICAgICAgIGRldGVyQWN0aXZlU2xpZGUoKTtcbiAgICAgICAgICAgICAgICBhbmltYXRpb25FbmQgPSAwO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9O1xuXG4gICAgdmFyIGNyZWF0ZUVsZW1lbnQgPSBmdW5jdGlvbiAoY2xhc3NQb3NpdGlvbiwgY2xhc3NWaXNpYmxlKSB7XG4gICAgICAgIHZhciBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5cbiAgICAgICAgZWxlbWVudC5jbGFzc0xpc3QuYWRkKCdsLXNsaWRlcl9fYXJyb3dzLWl0ZW0nKTtcbiAgICAgICAgZWxlbWVudC5jbGFzc0xpc3QuYWRkKGNsYXNzUG9zaXRpb24pO1xuICAgICAgICBlbGVtZW50LmNsYXNzTGlzdC5hZGQoY2xhc3NWaXNpYmxlKTtcblxuICAgICAgICByZXR1cm4gZWxlbWVudDtcbiAgICB9O1xuXG4gICAgdmFyIG5leHRTbGlkZUVsZW1lbnQgPSBjcmVhdGVFbGVtZW50KCdsLXNsaWRlcl9fYXJyb3dzLXVwJywgJ2wtc2xpZGVyX19hcnJvd3MtbmV4dC1uZXh0JyksXG4gICAgICAgIHByZXZTbGlkZUVsZW1lbnQgPSBjcmVhdGVFbGVtZW50KCdsLXNsaWRlcl9fYXJyb3dzLWRvd24nLCAnbC1zbGlkZXJfX2Fycm93cy1wcmV2Jyk7XG5cblxuICAgIHZhciBjcmVhdGVJbWdFbGVtZW50ID0gZnVuY3Rpb24gKHNyYykge1xuICAgICAgICBjb25zb2xlLmxvZyhzcmMpO1xuICAgICAgICB2YXIgaW1nID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJyk7XG4gICAgICAgIGltZy5jbGFzc0xpc3QuYWRkKCdsLXNsaWRlcl9fYXJyb3ctcGljJyk7XG4gICAgICAgIGltZy5zZXRBdHRyaWJ1dGUoJ3NyYycsICcuLi8uLicgKyBzcmMpO1xuXG4gICAgICAgIHJldHVybiBpbWc7XG4gICAgfTtcblxuICAgIHZhciBjcmVhdGVEaXZFbGVtZW50ID0gZnVuY3Rpb24gKHRleHQpIHtcbiAgICAgICAgdmFyIGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcblxuICAgICAgICByZXR1cm4gZGl2O1xuICAgIH07XG5cbiAgICB2YXIgdGV4dEFuaW1hdGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhclxuICAgICAgICAgICAgc3RyVGl0bGUgPSBzbGlkZXJDb250ZW50W2N1cnJlbnRTbGlkZV0udGl0bGUsXG4gICAgICAgICAgICBzdHJUZWNobm9sb2d5ID0gc2xpZGVyQ29udGVudFtjdXJyZW50U2xpZGVdLnRlY2hub2xvZ3ksXG4gICAgICAgICAgICBjaGFyc1RpdGxlID0gc3RyVGl0bGUuc3BsaXQoJycpLFxuICAgICAgICAgICAgY2hhcnNUZWNobm9sb2d5ID0gc3RyVGVjaG5vbG9neS5zcGxpdCgnJyksXG4gICAgICAgICAgICBjb3VudGVyVGl0bGUgPSAwLFxuICAgICAgICAgICAgY291bnRlclRlY2ggPSAwLFxuICAgICAgICAgICAgdGltZXI7XG5cbiAgICAgICAgJHNsaWRlQWN0aXZlQ2FwdGlvblRpdGxlWzBdLmlubmVySFRNTCA9ICcnO1xuICAgICAgICAkc2xpZGVBY3RpdmVDYXB0aW9uVGVjaG5vbG9neVswXS5pbm5lckhUTUwgPSAnJztcblxuICAgICAgICB2YXIgZWFjaENoYXJUaXRsZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciBjaGFyID0gZG9jLmNyZWF0ZVRleHROb2RlKGNoYXJzVGl0bGVbY291bnRlclRpdGxlXSk7XG5cbiAgICAgICAgICAgICRzbGlkZUFjdGl2ZUNhcHRpb25UaXRsZVswXS5hcHBlbmRDaGlsZChjaGFyKTtcblxuICAgICAgICAgICAgY291bnRlclRpdGxlKys7XG4gICAgICAgICAgICB0aW1lciA9IHNldFRpbWVvdXQoZWFjaENoYXJUaXRsZSwgNTApO1xuXG4gICAgICAgICAgICBpZiAoY291bnRlclRpdGxlID09PSBjaGFyc1RpdGxlLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwodGltZXIpO1xuICAgICAgICAgICAgICAgIGFuaW1hdGlvbkVuZCsrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuXG4gICAgICAgIHZhciBlYWNoQ2hhclRlY2ggPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgY2hhciA9IGRvYy5jcmVhdGVUZXh0Tm9kZShjaGFyc1RlY2hub2xvZ3lbY291bnRlclRlY2hdKTtcblxuICAgICAgICAgICAgJHNsaWRlQWN0aXZlQ2FwdGlvblRlY2hub2xvZ3lbMF0uYXBwZW5kQ2hpbGQoY2hhcik7XG5cbiAgICAgICAgICAgIGNvdW50ZXJUZWNoKys7XG4gICAgICAgICAgICB0aW1lciA9IHNldFRpbWVvdXQoZWFjaENoYXJUZWNoLCA1MCk7XG5cbiAgICAgICAgICAgIGlmIChjb3VudGVyVGVjaCA9PT0gY2hhcnNUZWNobm9sb2d5Lmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwodGltZXIpO1xuICAgICAgICAgICAgICAgIGFuaW1hdGlvbkVuZCsrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuXG4gICAgICAgIGVhY2hDaGFyVGl0bGUoKTtcbiAgICAgICAgZWFjaENoYXJUZWNoKCk7XG4gICAgfTtcblxuXG4gICAgdmFyIGJ1aWxkU2xpZGVyID0gZnVuY3Rpb24gKCkge1xuXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc2xpZGVyQ29udGVudC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgdmFyXG4gICAgICAgICAgICAgICAgcHJldlNsaWRlRWxlbWVudCA9IGNyZWF0ZUVsZW1lbnQoJ2wtc2xpZGVyX19hcnJvd3MtZG93bicsICdsLXNsaWRlcl9fYXJyb3dzLXByZXYnKTtcblxuICAgICAgICAgICAgcHJldlNsaWRlRWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2lkJywgJ3ByZXYnICsgaSk7XG4gICAgICAgICAgICBwcmV2U2xpZGVFbGVtZW50LmFwcGVuZENoaWxkKGNyZWF0ZUltZ0VsZW1lbnQoc2xpZGVyQ29udGVudFtpXS5waWN0dXJlKSk7XG4gICAgICAgICAgICBwcmV2U2xpZGVFbGVtZW50LmFwcGVuZENoaWxkKGNyZWF0ZURpdkVsZW1lbnQoIGkrMSApKTtcbiAgICAgICAgICAgICRzbGlkZXJJdGVtc1swXS5pbnNlcnRCZWZvcmUocHJldlNsaWRlRWxlbWVudCwgJGZvbkRhcmtbMF0pO1xuICAgICAgICB9XG5cbiAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCBzbGlkZXJDb250ZW50Lmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgICB2YXJcbiAgICAgICAgICAgICAgICBuZXh0U2xpZGVFbGVtZW50ID0gY3JlYXRlRWxlbWVudCgnbC1zbGlkZXJfX2Fycm93cy11cCcsICdsLXNsaWRlcl9fYXJyb3dzLW5leHQnKTtcblxuICAgICAgICAgICAgbmV4dFNsaWRlRWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2lkJywgJ25leHQnICsgaik7XG4gICAgICAgICAgICBuZXh0U2xpZGVFbGVtZW50LmFwcGVuZENoaWxkKGNyZWF0ZUltZ0VsZW1lbnQoc2xpZGVyQ29udGVudFtqXS5waWN0dXJlKSk7XG4gICAgICAgICAgICBuZXh0U2xpZGVFbGVtZW50LmFwcGVuZENoaWxkKGNyZWF0ZURpdkVsZW1lbnQoaiArIDEpKTtcbiAgICAgICAgICAgICRzbGlkZXJJdGVtc1swXS5pbnNlcnRCZWZvcmUobmV4dFNsaWRlRWxlbWVudCwgJGZvbkRhcmtbMF0pO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIHZhciBkZXRlckFjdGl2ZVNsaWRlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXJcbiAgICAgICAgICAgIG1haW5TbGlkZSA9IHNsaWRlckNvbnRlbnRbbGltaXRlcihjdXJyZW50U2xpZGUpXSxcbiAgICAgICAgICAgIGl0ZW1zUHJldiA9ICRzbGlkZXJJdGVtcy5jaGlsZHJlbignLmwtc2xpZGVyX19hcnJvd3MtcHJldicpLFxuICAgICAgICAgICAgaXRlbXNOZXh0ID0gJHNsaWRlckl0ZW1zLmNoaWxkcmVuKCcubC1zbGlkZXJfX2Fycm93cy1uZXh0Jyk7XG5cbiAgICAgICAgdGV4dEFuaW1hdGUoKTtcblxuICAgICAgICAkc2xpZGVyQWN0aXZlUGljV3JhcHBlclswXS5jbGFzc0xpc3QuYWRkKCdsLXNsaWRlcl9fcGljLXdyYXBwZXJfdHJhbnNmb3JtJyk7XG5cbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAkc2xpZGVyQWN0aXZlUGljV3JhcHBlclswXS5jbGFzc0xpc3QucmVtb3ZlKCdsLXNsaWRlcl9fcGljLXdyYXBwZXJfdHJhbnNmb3JtJyk7XG4gICAgICAgICAgICAkc2xpZGVBY3RpdmVQaWNbMF0uc2V0QXR0cmlidXRlKCdzcmMnLCAnLi4vLi4nICsgbWFpblNsaWRlLnBpY3R1cmUpO1xuICAgICAgICAgICAgLy8gJHNsaWRlQWN0aXZlUGljU3BhblswXS5pbm5lclRleHQgPSBjdXJyZW50U2xpZGUgKyAxO1xuICAgICAgICAgICAgJHNsaWRlQWN0aXZlQ2FwdGlvbkxpbmtbMF0uc2V0QXR0cmlidXRlKCdocmVmJywgbWFpblNsaWRlLnNpdGVVcmwpO1xuICAgICAgICAgICAgYW5pbWF0aW9uRW5kKys7XG4gICAgICAgIH0sIDUwMCk7XG5cbiAgICAgICAgJCgnLmwtc2xpZGVyX19hcnJvd3MtbmV4dC5sLXNsaWRlcl9fYXJyb3dzLWl0ZW1fYWN0aXZlJykuYW5pbWF0ZSh7dG9wOiAnLTEwMCUnfSwgNTAwKTtcbiAgICAgICAgJCgnI25leHQnICsgW2xpbWl0ZXIoY3VycmVudFNsaWRlICsgMSldKS5hbmltYXRlKHt0b3A6ICcwJ30sIDUwMCk7XG4gICAgICAgICQoJy5sLXNsaWRlcl9fYXJyb3dzLXByZXYubC1zbGlkZXJfX2Fycm93cy1pdGVtX2FjdGl2ZScpLmFuaW1hdGUoe3RvcDogJzEwMCUnfSwgNTAwKTtcbiAgICAgICAgJCgnI3ByZXYnICsgW2xpbWl0ZXIoY3VycmVudFNsaWRlIC0gMSldKS5hbmltYXRlKHt0b3A6ICcwJ30sIDUwMCk7XG5cbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBpdGVtc1ByZXYubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGl0ZW1zUHJldltpXS5jbGFzc0xpc3QucmVtb3ZlKCdsLXNsaWRlcl9fYXJyb3dzLWl0ZW1fYWN0aXZlJyk7XG4gICAgICAgICAgICBpdGVtc05leHRbaV0uY2xhc3NMaXN0LnJlbW92ZSgnbC1zbGlkZXJfX2Fycm93cy1pdGVtX2FjdGl2ZScpO1xuXG4gICAgICAgICAgICBpZiAoaXRlbXNQcmV2W2ldLmhhc0F0dHJpYnV0ZSgnc3R5bGUnKSkge1xuICAgICAgICAgICAgICAgIGl0ZW1zUHJldltpXS5yZW1vdmVBdHRyaWJ1dGUoJ3N0eWxlJyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChpdGVtc05leHRbaV0uaGFzQXR0cmlidXRlKCdzdHlsZScpKSB7XG4gICAgICAgICAgICAgICAgaXRlbXNOZXh0W2ldLnJlbW92ZUF0dHJpYnV0ZSgnc3R5bGUnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGl0ZW1zUHJldltsaW1pdGVyKGN1cnJlbnRTbGlkZSAtIDEpXS5jbGFzc0xpc3QuYWRkKCdsLXNsaWRlcl9fYXJyb3dzLWl0ZW1fYWN0aXZlJyk7XG4gICAgICAgIGl0ZW1zTmV4dFtsaW1pdGVyKGN1cnJlbnRTbGlkZSArIDEpXS5jbGFzc0xpc3QuYWRkKCdsLXNsaWRlcl9fYXJyb3dzLWl0ZW1fYWN0aXZlJyk7XG4gICAgfTtcblxuICAgIHZhciBsaW1pdGVyID0gZnVuY3Rpb24gKHZhbCkge1xuXG4gICAgICAgIGlmICh2YWwgPj0gc2l6ZSkge1xuICAgICAgICAgICAgdmFsID0gMDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh2YWwgPCAwKSB7XG4gICAgICAgICAgICB2YWwgPSBzaXplIC0gMTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB2YWw7XG4gICAgfTtcblxuICAgIHJldHVybiB7XG4gICAgICAgIGluaXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGJ1aWxkU2xpZGVyKCk7XG4gICAgICAgICAgICBkZXRlckFjdGl2ZVNsaWRlKCk7XG4gICAgICAgICAgICBMaXN0ZW5lcigpO1xuICAgICAgICB9XG4gICAgfVxufSgpKTtcbiIsInZhciB2YWxpZGF0aW9uQXZ0b3IgPSAoZnVuY3Rpb24gKCkge1xuXG5cbiAgICBpZiAoISgkKCcuYy1mb3JtLWF2dG9yJykpKSByZXR1cm4gZmFsc2U7XG5cbiAgICBjb25zdCBmb3JtTG9naW4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjbG9naW4nKTtcbiAgICB2YXIgbnVtYmVyQ2hlY2VrZCA9IDA7XG4gICAgdmFyIHJlc3VsdENvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jLWZvcm0tYXZ0b3JfX3N0YXR1cycpO1xuXG4gICAgdmFyIHZhbGlkID0gZnVuY3Rpb24gKCkge1xuXG4gICAgICAgIHZhclxuICAgICAgICAgICAgJGZvcm0gPSAkKCcuYy1mb3JtLWF2dG9yJyksXG4gICAgICAgICAgICAkaW5wdXQgPSAkZm9ybS5maW5kKCcuYy1mb3JtLWF2dG9yX19pbnB1dCcpLFxuICAgICAgICAgICAgJGNoZWNrQm94ID0gJGZvcm0uZmluZCgnaW5wdXRbdHlwZT1cImNoZWNrYm94XCJdJyksXG4gICAgICAgICAgICAkcmFkaW8gPSAkZm9ybS5maW5kKCdpbnB1dFt0eXBlPVwicmFkaW9cIl0nKSxcbiAgICAgICAgICAgIG51bWJlckVtcHR5SW5wdXQgPSAwO1xuXG5cbiAgICAgICAgJGZvcm0uZmluZCgnLmVycm9yJykucmVtb3ZlKCk7XG5cbiAgICAgICAgJGlucHV0LmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyICR0aGlzID0gJCh0aGlzKTtcblxuICAgICAgICAgICAgJHRoaXMucGFyZW50cygnLmMtZm9ybS1hdnRvcl9faW5wdXQtd3JhcHBlciAnKVxuICAgICAgICAgICAgICAgIC5yZW1vdmVBdHRyKCdzdHlsZScpO1xuXG4gICAgICAgICAgICBpZiAoJHRoaXMudmFsKCkgPT09ICcnKSB7XG5cbiAgICAgICAgICAgICAgICAkdGhpcy5wYXJlbnRzKCcuYy1mb3JtLWF2dG9yX19pbnB1dC13cmFwcGVyICcpXG4gICAgICAgICAgICAgICAgICAgIC5jc3Moeydib3JkZXInOiAnMnB4IHNvbGlkIHJlZCd9KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgbnVtYmVyRW1wdHlJbnB1dCsrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICAkY2hlY2tCb3guZWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgJHRoaXMgPSAkKHRoaXMpO1xuXG4gICAgICAgICAgICBpZiAoISEkdGhpcy5wcm9wKCdjaGVja2VkJykpIHtcbiAgICAgICAgICAgICAgICBudW1iZXJDaGVjZWtkKys7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgICRyYWRpby5lYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciAkdGhpcyA9ICQodGhpcyk7XG5cbiAgICAgICAgICAgIGlmICghISR0aGlzLnByb3AoJ2NoZWNrZWQnKSkge1xuICAgICAgICAgICAgICAgIG51bWJlckNoZWNla2QrKztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgaWYgKG51bWJlckVtcHR5SW5wdXQgPD0gMSkge1xuICAgICAgICAgICAgcmVzdWx0Q29udGFpbmVyLmlubmVySFRNTCA9ICfQl9Cw0L/QvtC70L3QuNGC0LUg0LLRgdC1INC/0L7Qu9GPINGE0L7RgNC80YsnO1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICAgIH1cblxuICAgICAgICBpZiAobnVtYmVyQ2hlY2VrZCA8PSAyIHx8ICQoJyNoeicpLnByb3AoJ2NoZWNrZWQnKSkge1xuICAgICAgICAgICAgcmVzdWx0Q29udGFpbmVyLmlubmVySFRNTCA9ICfQoNC+0LHQvtGC0LDQvCDRgtGD0YIg0L3QtSDQvNC10YHRgtC+JztcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICB2YXIgcHJlcGFyZUF1dGggPSBmdW5jdGlvbiAoZSkge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgbnVtYmVyQ2hlY2VrZCA9IDA7XG5cbiAgICAgICAgdmFsaWQoKTtcblxuICAgICAgICBjb25zb2xlLmxvZyhudW1iZXJDaGVjZWtkKTtcblxuXG4gICAgICAgIGlmIChudW1iZXJDaGVjZWtkIDwgMiB8fCAkKCcjaHonKS5wcm9wKCdjaGVja2VkJykpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBkYXRhID0ge1xuICAgICAgICAgICAgbG9naW46IGZvcm1Mb2dpbi5sb2dpbi52YWx1ZSxcbiAgICAgICAgICAgIHBhc3N3b3JkOiBmb3JtTG9naW4ucGFzc3dvcmQudmFsdWVcbiAgICAgICAgfTtcbiAgICAgICAgcmVzdWx0Q29udGFpbmVyLnN0eWxlLmNvbG9yID0gJ3doaXRlJztcbiAgICAgICAgcmVzdWx0Q29udGFpbmVyLmlubmVySFRNTCA9ICdTZW5kaW5nLi4uJztcbiAgICAgICAgc2VuZEFqYXhKc29uKCcvJywgZGF0YSwgZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgICAgICAgIHJlc3VsdENvbnRhaW5lci5pbm5lckhUTUwgPSBkYXRhO1xuXG4gICAgICAgICAgICBpZiAoZGF0YSA9PSAn0JDQstGC0L7RgNC40LfQsNGG0LjRjyDRg9GB0L/QtdGI0L3QsCEnKSB7XG4gICAgICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSAnL2FkbWluJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfTtcblxuICAgIHJldHVybiB7XG4gICAgICAgIGluaXQ6IGZ1bmN0aW9uICgpIHtcblxuXG4gICAgICAgICAgICBmb3JtTG9naW4uYWRkRXZlbnRMaXN0ZW5lcignc3VibWl0JywgcHJlcGFyZUF1dGgpO1xuICAgICAgICB9XG4gICAgfVxufSkoKTtcblxudmFyIHZhbGlkYXRpb25Db250YWN0TWUgPSAoZnVuY3Rpb24gKCkge1xuICAgIGlmICghJCgnLmMtZm9ybV9jb250YWN0LW1lJykubGVuZ3RoKSByZXR1cm4gZmFsc2U7XG5cbiAgICB2YXIgJGZvcm1Db250YWN0TWUgPSAkKCcuYy1mb3JtX2NvbnRhY3QtbWUnKSxcbiAgICAgICAgJGlucHV0cyA9ICRmb3JtQ29udGFjdE1lLmZpbmQoJy5jLWZvcm1fX2lucHV0JyksXG4gICAgICAgIHJlc3VsdENvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jLWZvcm0tYXZ0b3JfX3N0YXR1cycpO1xuICAgIGNvbnN0IGZvcm1NYWlsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI21haWwnKTtcblxuICAgIHZhciByZXNldCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgJGZvcm1Db250YWN0TWUuZmluZCgnLmVycm9yJykucmVtb3ZlKCk7XG4gICAgICAgICRpbnB1dHMuZWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAkKHRoaXMpLmNzcyh7J2JvcmVkZXInOiAnbm9uZSd9KTtcbiAgICAgICAgfSk7XG4gICAgfTtcblxuICAgIHZhciB2YWxpZCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyXG4gICAgICAgICAgICBjb3VudGVyID0gMDtcblxuICAgICAgICAkaW5wdXRzLmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyICR0aGlzID0gJCh0aGlzKTtcblxuICAgICAgICAgICAgJHRoaXMucmVtb3ZlQXR0cignc3R5bGUnKTtcblxuICAgICAgICAgICAgaWYgKCEhJHRoaXMudmFsKCkpIHtcbiAgICAgICAgICAgICAgICBjb3VudGVyKys7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICghJHRoaXMudmFsKCkpIHtcbiAgICAgICAgICAgICAgICAkdGhpcy5jc3Moeydib3JkZXInOiAnMXB4IHNvbGlkIHJlZCd9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIHByZXBhcmVTZW5kTWFpbChlKSB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICB2YWxpZCgpO1xuXG4gICAgICAgIHZhciBkYXRhID0ge1xuICAgICAgICAgICAgbmFtZTogZm9ybU1haWwubmFtZS52YWx1ZSxcbiAgICAgICAgICAgIGVtYWlsOiBmb3JtTWFpbC5lbWFpbC52YWx1ZSxcbiAgICAgICAgICAgIHRleHQ6IGZvcm1NYWlsLnRleHQudmFsdWVcbiAgICAgICAgfTtcbiAgICAgICAgY29uc29sZS5sb2coZGF0YSk7XG4gICAgICAgIHJlc3VsdENvbnRhaW5lci5pbm5lckhUTUwgPSAnU2VuZGluZy4uLic7XG4gICAgICAgIHNlbmRBamF4SnNvbignL3dvcmsnLCBkYXRhLCBmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgICAgICAgcmVzdWx0Q29udGFpbmVyLmlubmVySFRNTCA9IGRhdGE7XG4gICAgICAgIH0pO1xuICAgIH1cblxuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgaW5pdDogZnVuY3Rpb24gKCkge1xuXG5cbiAgICAgICAgICAgIGZvcm1NYWlsLmFkZEV2ZW50TGlzdGVuZXIoJ3N1Ym1pdCcsIHByZXBhcmVTZW5kTWFpbCk7XG5cblxuICAgICAgICAgICAgLy8gJGZvcm1Db250YWN0TWUuZmluZCgnLmMtZm9ybScpLnN1Ym1pdChmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgLy8gICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIC8vICAgICByZXNldCgpO1xuICAgICAgICAgICAgLy8gICAgIHZhbGlkKCk7XG4gICAgICAgICAgICAvL1xuICAgICAgICAgICAgLy8gfSk7XG5cbiAgICAgICAgICAgICRmb3JtQ29udGFjdE1lLmZpbmQoJy5jLWZvcm1fX2J1dHRvbScpLmNsaWNrKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICByZXNldCgpO1xuICAgICAgICAgICAgICAgICRpbnB1dHMuZWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciAkdGhpcyA9ICQodGhpcyk7XG4gICAgICAgICAgICAgICAgICAgICR0aGlzLnZhbCgnJyk7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxufSkoKTsiLCIvLyAoZnVuY3Rpb24gKCkge1xuLy8gICAgICd1c2Ugc3RyaWN0Jztcbi8vXG4vLyAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4vLyAgICAgICAgIC8vIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5ncmVhdGluZ19waWN0dXJlJykuY2xhc3NMaXN0LmFkZCgnbS0tc2hvdycpO1xuLy8gICAgIH0sIDEwMDApO1xuLy8gfSkoKTtcblxuZnVuY3Rpb24gc2VuZEFqYXhKc29uKHVybCwgZGF0YSwgY2IpIHtcbiAgICB2YXIgeGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG4gICAgeGhyLm9wZW4oJ1BPU1QnLCB1cmwsIHRydWUpO1xuICAgIHhoci5zZXRSZXF1ZXN0SGVhZGVyKCdDb250ZW50LVR5cGUnLCAnYXBwbGljYXRpb24vanNvbicpO1xuICAgIHhoci5vbmxvYWQgPSBmdW5jdGlvbiAoZSkge1xuICAgICAgICB2YXIgcmVzdWx0ID0gSlNPTi5wYXJzZSh4aHIucmVzcG9uc2VUZXh0KTtcbiAgICAgICAgY2IocmVzdWx0LnN0YXR1cyk7XG4gICAgfTtcbiAgICB4aHIuc2VuZChKU09OLnN0cmluZ2lmeShkYXRhKSk7XG4gICAgY29uc29sZS5sb2coZGF0YSk7XG59XG5cbnZhciBibHVyID0gKGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgY29udGFpbmVyID0gJCgnLmMtZm9ybS1jb250YWluZXInKSxcbiAgICAgICAgZm9ybSA9ICQoJy5jLWZvcm0td3JhcHBlcicpO1xuXG4gICAgaWYgKGNvbnRhaW5lci5sZW5ndGggPT09IDApIHJldHVybiBmYWxzZTtcblxuICAgIHJldHVybiB7XG4gICAgICAgIHNldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIGltZyA9ICQoJy5jLWJsb2NrLWJnX3BpYycpLFxuICAgICAgICAgICAgICAgIGltZ1dpZHRoID0gaW1nLndpZHRoKCksXG4gICAgICAgICAgICAgICAgaW1nSGVpZ2h0ID0gaW1nLmhlaWdodCgpLFxuICAgICAgICAgICAgICAgIGJsdXJDc3MgPSBmb3JtWzBdLnN0eWxlLFxuICAgICAgICAgICAgICAgIHBvc0xlZnQgPSAtY29udGFpbmVyLm9mZnNldCgpLmxlZnQsXG4gICAgICAgICAgICAgICAgcG9zVG9wID0gLWNvbnRhaW5lci5wb3NpdGlvbigpLnRvcDtcblxuICAgICAgICAgICAgYmx1ckNzcy5iYWNrZ3JvdW5kU2l6ZSA9IGltZ1dpZHRoICsgJ3B4JyArICcgJyArIGltZ0hlaWdodCArICdweCc7XG4gICAgICAgICAgICBibHVyQ3NzLmJhY2tncm91bmRQb3NpdGlvbiA9IHBvc0xlZnQgKyAncHgnICsgJyAnICsgcG9zVG9wICsgJ3B4JztcbiAgICAgICAgICAgIGZvcm0uY3NzKHtcbiAgICAgICAgICAgICAgICAnYmFja2dyb3VuZC1zaXplJzogaW1nV2lkdGggKyAncHgnICsgJyAnICsgaW1nSGVpZ2h0ICsgJ3B4JyxcbiAgICAgICAgICAgICAgICAnYmFja2dyb3VuZC1wb3NpdGlvbic6IHBvc0xlZnQgKyAncHgnICsgJyAnICsgcG9zVG9wICsgJ3B4J1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG59KCkpO1xuXG52YXIgQXBwID0gKGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm57XG4gICAgICAgIGluaXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIFByZWxvYWQuaW5pdCgpO1xuXG5cbiAgICAgICAgICAgIGlmICghIShkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYy1oYW1idXJnZXJfbmF2JykpKSB7XG4gICAgICAgICAgICAgICAgbmF2aWdhdGlvbi5pbml0KCk7XG4gICAgICAgICAgICAgICAgY29uc29sZS5pbmZvKCduYXYnKVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoISEoZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmwtc2xpZGVyJykpKSB7XG4gICAgICAgICAgICAgICAgU2xpZGVyLmluaXQoKTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmluZm8oJ3NsaWRlcicpXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICghIShkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZmxpcC1jb250YWluZXInKSkpIHtcbiAgICAgICAgICAgICAgICBGbGlwLmluaXQoKTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmluZm8oJ2ZsaXAnKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKCEhKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5sLXBhZ2UtbmF2X2FzaWRlJykpKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5pbmZvKCdhc3NpZGUnKTtcbiAgICAgICAgICAgICAgICBBc3NpZGUuaW5pdCgpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoISEoZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmMtZm9ybS1hdnRvcicpKSkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUuaW5mbygnZm9ybSBhdnRvcmlzYXRpb24nKTtcbiAgICAgICAgICAgICAgICB2YWxpZGF0aW9uQXZ0b3IuaW5pdCgpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoISEoZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmMtZm9ybV9jb250YWN0LW1lJykpKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ2Zvcm0gY29udGFjdHMtbWUnKTtcbiAgICAgICAgICAgICAgICB2YWxpZGF0aW9uQ29udGFjdE1lLmluaXQoKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKCEhZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3BhcmFsYXgnKSkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdwYXJhbGF4TW91c2UnKTtcbiAgICAgICAgICAgICAgICBwYXJhbGxheE1vdXNlLmluaXQoKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKCEhZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmwtc2tpbGxzLWdyb3VwJykpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmluZm8oJ3NraWxscycpO1xuICAgICAgICAgICAgICAgIHNraWxsc0FuaW1hdGUuaW5pdCgpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoISEoZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmwtaGVyb19fYmcnKSkpIHtcbiAgICAgICAgICAgICAgICB3aW5kb3cub25zY3JvbGwgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciB3U2Nyb2xsID0gd2luZG93LnBhZ2VZT2Zmc2V0O1xuICAgICAgICAgICAgICAgICAgICBwYXJhbGxheC5pbml0KHdTY3JvbGwpO1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59KSgpO1xuXG5cblxuJChmdW5jdGlvbiAoKSB7XG4gICAgaWYgKCEhKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtYXAnKSkpIHtcbiAgICAgICAgY29uc29sZS5pbmZvKCdtYXAnKTtcbiAgICAgICAgdmFyIG1hcDtcbiAgICAgICAgZnVuY3Rpb24gaW5pdE1hcCgpIHtcbiAgICAgICAgICAgIC8vIENyZWF0ZSB0aGUgbWFwIHdpdGggbm8gaW5pdGlhbCBzdHlsZSBzcGVjaWZpZWQuXG4gICAgICAgICAgICAvLyBJdCB0aGVyZWZvcmUgaGFzIGRlZmF1bHQgc3R5bGluZy5cbiAgICAgICAgICAgIG1hcCA9IG5ldyBnb29nbGUubWFwcy5NYXAoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21hcCcpLCB7XG4gICAgICAgICAgICAgICAgY2VudGVyOiB7bGF0OiA1NS4wMDM4LCBsbmc6IDgyLjkzMDY4OX0sXG4gICAgICAgICAgICAgICAgem9vbTogMTMsXG4gICAgICAgICAgICAgICAgbWFwVHlwZUNvbnRyb2w6IGZhbHNlXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgLy8gQWRkIGEgc3R5bGUtc2VsZWN0b3IgY29udHJvbCB0byB0aGUgbWFwLlxuICAgICAgICAgICAgdmFyIHN0eWxlQ29udHJvbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzdHlsZS1zZWxlY3Rvci1jb250cm9sJyk7XG4gICAgICAgICAgICBtYXAuY29udHJvbHNbZ29vZ2xlLm1hcHMuQ29udHJvbFBvc2l0aW9uLlRPUF9MRUZUXS5wdXNoKHN0eWxlQ29udHJvbCk7XG5cbiAgICAgICAgICAgIC8vIFNldCB0aGUgbWFwJ3Mgc3R5bGUgdG8gdGhlIGluaXRpYWwgdmFsdWUgb2YgdGhlIHNlbGVjdG9yLlxuICAgICAgICAgICAgbWFwLnNldE9wdGlvbnMoe3N0eWxlczogc3R5bGVzWydzaWx2ZXInXX0pO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIHN0eWxlcyA9IHtcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICAgICAgICBzaWx2ZXI6IFtcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGVsZW1lbnRUeXBlOiAnZ2VvbWV0cnknLFxuICAgICAgICAgICAgICAgICAgICBzdHlsZXJzOiBbe2NvbG9yOiAnI2Y1ZjVmNSd9XVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBlbGVtZW50VHlwZTogJ2xhYmVscy5pY29uJyxcbiAgICAgICAgICAgICAgICAgICAgc3R5bGVyczogW3t2aXNpYmlsaXR5OiAnb2ZmJ31dXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGVsZW1lbnRUeXBlOiAnbGFiZWxzLnRleHQuZmlsbCcsXG4gICAgICAgICAgICAgICAgICAgIHN0eWxlcnM6IFt7Y29sb3I6ICcjNjE2MTYxJ31dXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGVsZW1lbnRUeXBlOiAnbGFiZWxzLnRleHQuc3Ryb2tlJyxcbiAgICAgICAgICAgICAgICAgICAgc3R5bGVyczogW3tjb2xvcjogJyNmNWY1ZjUnfV1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgZmVhdHVyZVR5cGU6ICdhZG1pbmlzdHJhdGl2ZS5sYW5kX3BhcmNlbCcsXG4gICAgICAgICAgICAgICAgICAgIGVsZW1lbnRUeXBlOiAnbGFiZWxzLnRleHQuZmlsbCcsXG4gICAgICAgICAgICAgICAgICAgIHN0eWxlcnM6IFt7Y29sb3I6ICcjYmRiZGJkJ31dXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGZlYXR1cmVUeXBlOiAncG9pJyxcbiAgICAgICAgICAgICAgICAgICAgZWxlbWVudFR5cGU6ICdnZW9tZXRyeScsXG4gICAgICAgICAgICAgICAgICAgIHN0eWxlcnM6IFt7Y29sb3I6ICcjZWVlZWVlJ31dXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGZlYXR1cmVUeXBlOiAncG9pJyxcbiAgICAgICAgICAgICAgICAgICAgZWxlbWVudFR5cGU6ICdsYWJlbHMudGV4dC5maWxsJyxcbiAgICAgICAgICAgICAgICAgICAgc3R5bGVyczogW3tjb2xvcjogJyM3NTc1NzUnfV1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgZmVhdHVyZVR5cGU6ICdwb2kucGFyaycsXG4gICAgICAgICAgICAgICAgICAgIGVsZW1lbnRUeXBlOiAnZ2VvbWV0cnknLFxuICAgICAgICAgICAgICAgICAgICBzdHlsZXJzOiBbe2NvbG9yOiAnI2U1ZTVlNSd9XVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBmZWF0dXJlVHlwZTogJ3BvaS5wYXJrJyxcbiAgICAgICAgICAgICAgICAgICAgZWxlbWVudFR5cGU6ICdsYWJlbHMudGV4dC5maWxsJyxcbiAgICAgICAgICAgICAgICAgICAgc3R5bGVyczogW3tjb2xvcjogJyM5ZTllOWUnfV1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgZmVhdHVyZVR5cGU6ICdyb2FkJyxcbiAgICAgICAgICAgICAgICAgICAgZWxlbWVudFR5cGU6ICdnZW9tZXRyeScsXG4gICAgICAgICAgICAgICAgICAgIHN0eWxlcnM6IFt7Y29sb3I6ICcjZmZmZmZmJ31dXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGZlYXR1cmVUeXBlOiAncm9hZC5hcnRlcmlhbCcsXG4gICAgICAgICAgICAgICAgICAgIGVsZW1lbnRUeXBlOiAnbGFiZWxzLnRleHQuZmlsbCcsXG4gICAgICAgICAgICAgICAgICAgIHN0eWxlcnM6IFt7Y29sb3I6ICcjNzU3NTc1J31dXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGZlYXR1cmVUeXBlOiAncm9hZC5oaWdod2F5JyxcbiAgICAgICAgICAgICAgICAgICAgZWxlbWVudFR5cGU6ICdnZW9tZXRyeScsXG4gICAgICAgICAgICAgICAgICAgIHN0eWxlcnM6IFt7Y29sb3I6ICcjZGFkYWRhJ31dXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGZlYXR1cmVUeXBlOiAncm9hZC5oaWdod2F5JyxcbiAgICAgICAgICAgICAgICAgICAgZWxlbWVudFR5cGU6ICdsYWJlbHMudGV4dC5maWxsJyxcbiAgICAgICAgICAgICAgICAgICAgc3R5bGVyczogW3tjb2xvcjogJyM2MTYxNjEnfV1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgZmVhdHVyZVR5cGU6ICdyb2FkLmxvY2FsJyxcbiAgICAgICAgICAgICAgICAgICAgZWxlbWVudFR5cGU6ICdsYWJlbHMudGV4dC5maWxsJyxcbiAgICAgICAgICAgICAgICAgICAgc3R5bGVyczogW3tjb2xvcjogJyM5ZTllOWUnfV1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgZmVhdHVyZVR5cGU6ICd0cmFuc2l0LmxpbmUnLFxuICAgICAgICAgICAgICAgICAgICBlbGVtZW50VHlwZTogJ2dlb21ldHJ5JyxcbiAgICAgICAgICAgICAgICAgICAgc3R5bGVyczogW3tjb2xvcjogJyNlNWU1ZTUnfV1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgZmVhdHVyZVR5cGU6ICd0cmFuc2l0LnN0YXRpb24nLFxuICAgICAgICAgICAgICAgICAgICBlbGVtZW50VHlwZTogJ2dlb21ldHJ5JyxcbiAgICAgICAgICAgICAgICAgICAgc3R5bGVyczogW3tjb2xvcjogJyNlZWVlZWUnfV1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgZmVhdHVyZVR5cGU6ICd3YXRlcicsXG4gICAgICAgICAgICAgICAgICAgIGVsZW1lbnRUeXBlOiAnZ2VvbWV0cnknLFxuICAgICAgICAgICAgICAgICAgICBzdHlsZXJzOiBbe2NvbG9yOiAnIzQzNjlhYSd9XVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBmZWF0dXJlVHlwZTogJ3dhdGVyJyxcbiAgICAgICAgICAgICAgICAgICAgZWxlbWVudFR5cGU6ICdsYWJlbHMudGV4dC5maWxsJyxcbiAgICAgICAgICAgICAgICAgICAgc3R5bGVyczogW3tjb2xvcjogJyNmNWY1ZjUnfV1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICBdXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgdmFyIGZvcm1VcGxvYWQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjdXBsb2FkJyk7XG5cbiAgICAkKCcubC1oZXJvJykuaGVpZ2h0KCQod2luZG93KS5oZWlnaHQoKSk7XG5cbiAgICBBcHAuaW5pdCgpO1xuXG4gICAgdmFyIGZpbGVVcGxvYWQgPSBmdW5jdGlvbih1cmwsIGRhdGEsIGNiKXtcbiAgICAgICAgdmFyIHhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuICAgICAgICB4aHIub3BlbignUE9TVCcsIHVybCwgdHJ1ZSk7XG5cbiAgICAgICAgeGhyLm9ubG9hZCA9IGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICB2YXIgcmVzdWx0ID0gSlNPTi5wYXJzZSh4aHIucmVzcG9uc2VUZXh0KTtcbiAgICAgICAgICAgIGNiKHJlc3VsdC5zdGF0dXMpO1xuICAgICAgICB9O1xuXG4gICAgICAgIHhoci5zZW5kKGRhdGEpO1xuICAgIH07XG5cbiAgICBmdW5jdGlvbiBwcmVwYXJlU2VuZEZpbGUoZSkge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIHZhciByZXN1bHRDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc3RhdHVzJyk7XG4gICAgICAgIHZhciBmb3JtRGF0YSA9IG5ldyBGb3JtRGF0YSgpO1xuICAgICAgICB2YXIgZmlsZSA9IGRvY3VtZW50XG4gICAgICAgICAgICAucXVlcnlTZWxlY3RvcignI2ZpbGUtc2VsZWN0JylcbiAgICAgICAgICAgIC5maWxlc1swXTtcbiAgICAgICAgdmFyIHRpdGxlID0gZG9jdW1lbnRcbiAgICAgICAgICAgIC5xdWVyeVNlbGVjdG9yKCcjZmlsZS10aXRsZScpXG4gICAgICAgICAgICAudmFsdWU7XG4gICAgICAgIHZhciB0ZWNoID0gZG9jdW1lbnRcbiAgICAgICAgICAgIC5xdWVyeVNlbGVjdG9yKCcjZmlsZS10ZWNoJylcbiAgICAgICAgICAgIC52YWx1ZTtcbiAgICAgICAgdmFyIHNpdGVVcmwgPSBkb2N1bWVudFxuICAgICAgICAgICAgLnF1ZXJ5U2VsZWN0b3IoJyNmaWxlLXNpdGUnKVxuICAgICAgICAgICAgLnZhbHVlO1xuXG4gICAgICAgIGZvcm1EYXRhLmFwcGVuZCgncGhvdG8nLCBmaWxlLCBmaWxlLm5hbWUpO1xuICAgICAgICBmb3JtRGF0YS5hcHBlbmQoJ3RpdGxlJywgdGl0bGUpO1xuICAgICAgICBmb3JtRGF0YS5hcHBlbmQoJ3RlY2hub2xvZ3knLCB0ZWNoKTtcbiAgICAgICAgZm9ybURhdGEuYXBwZW5kKCdzaXRlVXJsJywgc2l0ZVVybCk7XG5cbiAgICAgICAgY29uc29sZS5sb2coJ2ZpbGUnLCBmaWxlKTtcbiAgICAgICAgY29uc29sZS5sb2coJ2ZpbGUubmFtZScsIGZpbGUubmFtZSk7XG4gICAgICAgIGNvbnNvbGUubG9nKCd0aXRsZScsIHRpdGxlKTtcbiAgICAgICAgY29uc29sZS5sb2coJ3RlY2gnLCB0ZWNoKTtcbiAgICAgICAgY29uc29sZS5sb2coJ3NpdGVVcmwnLCBzaXRlVXJsKTtcblxuICAgICAgICByZXN1bHRDb250YWluZXIuaW5uZXJIVE1MID0gJ1VwbG9hZGluZy4uLic7XG4gICAgICAgIGZpbGVVcGxvYWQoJy91cGxvYWQnLCBmb3JtRGF0YSwgZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgICAgICAgIHJlc3VsdENvbnRhaW5lci5pbm5lckhUTUwgPSBkYXRhO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBpZiAoZm9ybVVwbG9hZCkge1xuICAgICAgICBmb3JtVXBsb2FkLmFkZEV2ZW50TGlzdGVuZXIoJ3N1Ym1pdCcsIHByZXBhcmVTZW5kRmlsZSk7XG4gICAgfVxuXG4gICAgLy9ibG9jayBibG9nXG5cbiAgICBjb25zdCBmb3JtQmxvZyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNibG9nJyk7XG5cbiAgICBpZiAoZm9ybUJsb2cpIHtcbiAgICAgICAgZm9ybUJsb2cuYWRkRXZlbnRMaXN0ZW5lcignc3VibWl0JywgcHJlcGFyZVNlbmRQb3N0KTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBwcmVwYXJlU2VuZFBvc3QoZSkge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIHZhciByZXN1bHRDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc3RhdHVzJyk7XG4gICAgICAgIHZhciBkYXRhID0ge1xuICAgICAgICAgICAgdGl0bGU6IGZvcm1CbG9nLnRpdGxlLnZhbHVlLFxuICAgICAgICAgICAgZGF0ZTogZm9ybUJsb2cuZGF0ZS52YWx1ZSxcbiAgICAgICAgICAgIHRleHQ6IGZvcm1CbG9nLnRleHQudmFsdWVcbiAgICAgICAgfTtcbiAgICAgICAgcmVzdWx0Q29udGFpbmVyLmlubmVySFRNTCA9ICdTZW5kaW5nLi4uJztcbiAgICAgICAgc2VuZEFqYXhKc29uKCcvYWRkcG9zdCcsIGRhdGEsIGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAgICAgICByZXN1bHRDb250YWluZXIuaW5uZXJIVE1MID0gZGF0YTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLy9ibG9jayBza2lsbHNcblxuICAgIGNvbnN0IGZvcm1Ta2lsbHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjc2tpbGxzJyk7XG5cbiAgICBpZiAoZm9ybVNraWxscykge1xuICAgICAgICBmb3JtU2tpbGxzLmFkZEV2ZW50TGlzdGVuZXIoJ3N1Ym1pdCcsIHByZXBhcmVTZW5kU2tpbGxzKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBwcmVwYXJlU2VuZFNraWxscyhlKSB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgdmFyIHJlc3VsdENvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zdGF0dXMnKTtcbiAgICAgICAgdmFyIGRhdGEgPSB7XG4gICAgICAgICAgICBodG1sOiBmb3JtU2tpbGxzLmh0bWwudmFsdWUsXG4gICAgICAgICAgICBjc3M6IGZvcm1Ta2lsbHMuY3NzLnZhbHVlLFxuICAgICAgICAgICAganM6IGZvcm1Ta2lsbHMuanMudmFsdWUsXG4gICAgICAgICAgICBwaHA6IGZvcm1Ta2lsbHMucGhwLnZhbHVlLFxuICAgICAgICAgICAgc3FsOiBmb3JtU2tpbGxzLnNxbC52YWx1ZSxcbiAgICAgICAgICAgIG5vZGU6IGZvcm1Ta2lsbHMubm9kZS52YWx1ZSxcbiAgICAgICAgICAgIG1vbmdvOiBmb3JtU2tpbGxzLm1vbmdvLnZhbHVlLFxuICAgICAgICAgICAgZ2l0OiBmb3JtU2tpbGxzLmdpdC52YWx1ZSxcbiAgICAgICAgICAgIGd1bHA6IGZvcm1Ta2lsbHMuZ3VscC52YWx1ZSxcbiAgICAgICAgICAgIGJvd2VyOiBmb3JtU2tpbGxzLmJvd2VyLnZhbHVlXG4gICAgICAgIH07XG5cbiAgICAgICAgY29uc29sZS5sb2coZGF0YSk7XG5cbiAgICAgICAgcmVzdWx0Q29udGFpbmVyLmlubmVySFRNTCA9ICdTZW5kaW5nLi4uJztcbiAgICAgICAgc2VuZEFqYXhKc29uKCcvYWRtaW4nLCBkYXRhLCBmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgICAgICAgcmVzdWx0Q29udGFpbmVyLmlubmVySFRNTCA9IGRhdGE7XG4gICAgICAgIH0pO1xuICAgIH1cblxuLy9ibHVyXG4gICAgaWYgKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jLWZvcm0tY29udGFpbmVyJykgPT09bnVsbCkge1xuICAgICAgICByZXR1cm4gZmFsc2VcbiAgICB9IGVsc2Uge1xuICAgICAgICBibHVyLnNldCgpO1xuICAgICAgICAkKHdpbmRvdykucmVzaXplKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGJsdXIuc2V0KCk7XG4gICAgICAgIH0pO1xuICAgIH1cbn0pOyJdfQ==

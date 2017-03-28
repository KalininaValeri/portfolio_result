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
            this.move(bg, wScroll, 100);
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
        var img = document.createElement('img');
        img.classList.add('l-slider__arrow-pic');
        img.setAttribute('src', './assets' + src);

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
            $slideActivePic[0].setAttribute('src', './assets' + mainSlide.picture);
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
            $('.l-slider ').outerHeight($(window).height());

            $(window).resize(function () {
                $('.l-slider ').outerHeight($(window).height());
            });

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
        resultContainer.innerHTML = 'Sending...';
        sendAjaxJson('/work.html', data, function (data) {
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
function sendAjaxJson(url, data, cb) {
    var xhr = new XMLHttpRequest();
    xhr.open('POST', url, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onload = function (e) {
        var result = JSON.parse(xhr.responseText);
        cb(result.status);
    };
    xhr.send(JSON.stringify(data));
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
    return {
        init: function () {
            Preload.init();


            if (!!(document.querySelector('.c-hamburger_nav'))) {
                navigation.init();
            }

            if (!!(document.querySelector('.l-slider'))) {
                Slider.init();
            }

            if (!!(document.querySelector('.flip-container'))) {
                Flip.init();
            }

            if (!!(document.querySelector('.l-page-nav_aside'))) {
                Asside.init();
            }

            if (!!(document.querySelector('.c-form-avtor'))) {
                validationAvtor.init();
            }

            if (!!(document.querySelector('.c-form_contact-me'))) {
                validationContactMe.init();
            }

            if (!!document.getElementById('paralax')) {
                parallaxMouse.init();
            }

            if (!!document.querySelector('.l-skills-group')) {
                skillsAnimate.init();
            }

            if (!!(document.querySelector('.l-hero__bg'))) {
                window.onscroll = function () {
                    var wScroll = window.pageYOffset;
                    parallax.init(wScroll);
                };
            }

            if (document.querySelector('.c-form-container') !== null) {
                blur.set();
                $(window).resize(function () {
                    blur.set();
                })
            }

            if (document.querySelector('.l-hero') !== null) {
                $('.l-hero').height($(window).height());
            }

            if (!!(document.querySelector('.flip-container'))) {

                var
                    flipContainer = $('.flip-container'),
                    heightForFlip = $(window).height() - $('.l-header-index').height() - $('.l-footer-small').height() - 20,
                    heightFlip = flipContainer.height() + 47;

                console.log(heightFlip, heightForFlip);

                if (heightForFlip <= heightFlip) {
                    flipContainer.addClass('static');

                }

                if (heightForFlip > heightFlip) {
                    flipContainer.removeClass('static');
                    console.log(heightFlip, heightForFlip)
                }
            }
        }
    }
})();

$(function () {
    if (!!(document.getElementById('map'))) {
        ymaps.ready(init);
        var myMap;

        function init() {
            myMap = new ymaps.Map("map", {
                center: [55, 82.925233],
                zoom: 13
            });
        }
    }

    App.init();



    var formUpload = document.querySelector('#upload');

    var fileUpload = function (url, data, cb) {
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

        resultContainer.innerHTML = 'Sending...';
        sendAjaxJson('/admin', data, function (data) {
            resultContainer.innerHTML = data;
        });
    }
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2lkZS1uYXYuanMiLCJmbGlwLmpzIiwibmF2LmpzIiwicGFyYWxsYXgtbW91c2UuanMiLCJwYXJhbGxheC1zY3JvbGwuanMiLCJwcmVsb2FkLmpzIiwic2tpbGxzLWFuaW1hdGUuanMiLCJzbGlkZXIuanMiLCJ2YWxpZGF0aW9uLmpzIiwiYXBwLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN2R0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ25CQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNyREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQy9CQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3hCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3hFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDL0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDN09BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDM0tBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiYXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBDcmVhdGVkIGJ5IGxlcmEgb24gMy83LzE3LlxuICovXG5cbnZhciBBc3NpZGUgPSAoXG4gICAgZnVuY3Rpb24gKCkge1xuXG4gICAgICAgIGlmICghKCQoJy5sLXBhZ2UtbmF2X2FzaWRlJykubGVuZ3RoKSkgcmV0dXJuIGZhbHNlO1xuXG4gICAgICAgIHZhciBzaG93U2VjdGlvbiA9IGZ1bmN0aW9uIChhcnRpY2xlLCBpc0FuaW1hdGUpIHtcbiAgICAgICAgICAgIHZhclxuICAgICAgICAgICAgICAgIGRpcmVjdGlvbiA9IGFydGljbGUucmVwbGFjZSgnIycsICcnKSxcbiAgICAgICAgICAgICAgICByZXFBcnRpY2xlID0gJCgnLmRhdGEtc2VjdGlvbicpLmZpbHRlcignW2RhdGEtc2VjdGlvbj1cIicgKyBkaXJlY3Rpb24gKyAnXCJdJyksXG4gICAgICAgICAgICAgICAgcmVxQXJ0aWNsZVBvcyA9IHJlcUFydGljbGUub2Zmc2V0KCkudG9wO1xuXG4gICAgICAgICAgICBpZiAoaXNBbmltYXRlKSB7XG4gICAgICAgICAgICAgICAgJCgnYm9keSwgaHRtbCcpLmFuaW1hdGUoe3Njcm9sbFRvcDogcmVxQXJ0aWNsZVBvc30sIDUwMCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICQoJ2JvZHksIGh0bWwnKS5zY3JvbGxUb3AocmVxQXJ0aWNsZVBvcyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG5cbiAgICAgICAgdmFyIGNoZWNrU2VjdGlvbiA9IGZ1bmN0aW9uICgpIHtcblxuICAgICAgICAgICAgJCgnLmRhdGEtc2VjdGlvbicpLmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHZhclxuICAgICAgICAgICAgICAgICAgICAkdGhpcyA9ICQodGhpcyksXG4gICAgICAgICAgICAgICAgICAgIHRvcEVkZ2UgPSAkdGhpcy5vZmZzZXQoKS50b3AgLSAzMDAsXG4gICAgICAgICAgICAgICAgICAgIGJvdHRvbUVkZ2UgPSB0b3BFZGdlICsgJHRoaXMuaGVpZ2h0KCksXG4gICAgICAgICAgICAgICAgICAgIHdTY3JvbGwgPSAkKHdpbmRvdykuc2Nyb2xsVG9wKCk7XG5cbiAgICAgICAgICAgICAgICBpZiAodG9wRWRnZSA8IHdTY3JvbGwgJiYgYm90dG9tRWRnZSA+IHdTY3JvbGwpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyXG4gICAgICAgICAgICAgICAgICAgICAgICBjdXJyZW50SWQgPSAkdGhpcy5kYXRhKCdzZWN0aW9uJyksXG4gICAgICAgICAgICAgICAgICAgICAgICBhY3RpdmVMaW5rID0gJCgnLmwtcGFnZS1uYXZfX2xpbmsnKS5maWx0ZXIoJ1tocmVmPVwiIycgKyBjdXJyZW50SWQgKyAnXCJdJyk7XG5cbiAgICAgICAgICAgICAgICAgICAgJCgnLmwtcGFnZS1uYXZfX2xpbmsnKS5lYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5yZW1vdmVDbGFzcygnbC1wYWdlLW5hdl9fbGlua19hY3RpdmUnKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIGFjdGl2ZUxpbmsuYWRkQ2xhc3MoJ2wtcGFnZS1uYXZfX2xpbmtfYWN0aXZlJyk7XG4gICAgICAgICAgICAgICAgICAgIGxvY2F0aW9uLmhhc2ggPSAnIycgKyBjdXJyZW50SWQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgfTtcblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgaW5pdDogZnVuY3Rpb24gKCkge1xuXG5cbiAgICAgICAgICAgICAgICBpZiAoJCh3aW5kb3cpLndpZHRoKCkgPD0gMTIwMCkge1xuICAgICAgICAgICAgICAgICAgICB2YXJcbiAgICAgICAgICAgICAgICAgICAgICAgICRwcm90cmFjdG9yID0gJCgnLmwtcGFnZS1uYXZfYXNpZGVfX3Byb3RyYWN0b3InKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICRzbWFsbE5hdlBhZ2UgPSAkKCcubC1wYWdlLW5hdl9hc2lkZScpO1xuXG4gICAgICAgICAgICAgICAgICAgICQoZG9jdW1lbnQpLm1vdXNldXAoZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICgkc21hbGxOYXZQYWdlLmhhcyhlLnRhcmdldCkubGVuZ3RoID09PSAwKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkc21hbGxOYXZQYWdlLnJlbW92ZUNsYXNzKCdsLXBhZ2UtbmF2X2FjdGl2ZScpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgICAgICAkcHJvdHJhY3Rvci5jbGljayhmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAkc21hbGxOYXZQYWdlLnRvZ2dsZUNsYXNzKCdsLXBhZ2UtbmF2X2FjdGl2ZScpO1xuICAgICAgICAgICAgICAgICAgICB9KTtcblxuXG5cbiAgICAgICAgICAgICAgICAgICAgJCh3aW5kb3cpLnNjcm9sbChmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY2hlY2tTZWN0aW9uKCk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmICgkKHdpbmRvdykud2lkdGgoKSA+IDEyMDApIHtcblxuICAgICAgICAgICAgICAgICAgICAkKHdpbmRvdykuc2Nyb2xsKGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBibG9ja01haW4gPSAkKCcubC1ibG9jay1tYWluJyksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmF2VG9wID0gJCh3aW5kb3cpLnNjcm9sbFRvcCgpIC0gYmxvY2tNYWluLnBvc2l0aW9uKCkudG9wICsgNDAsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmF2VG9wQm90dG9tID0gJCgnLmwtcGFnZS1uYXZfYXNpZGUnKS5oZWlnaHQoKSAtICQoJy5sLXBhZ2UtbmF2X19saXN0JykuaGVpZ2h0KCk7XG5cblxuICAgICAgICAgICAgICAgICAgICAgICAgY2hlY2tTZWN0aW9uKCk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChuYXZUb3AgPCAwKSBuYXZUb3AgPSAwO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAobmF2VG9wID49IG5hdlRvcEJvdHRvbSApIG5hdlRvcCA9IG5hdlRvcEJvdHRvbTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgJCgnLmwtcGFnZS1uYXZfX2xpc3QnKS5jc3MoJ3RvcCcsIG5hdlRvcCk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICQoJy5sLXBhZ2UtbmF2X19saW5rJykub24oJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgICAgICBzaG93U2VjdGlvbigkKHRoaXMpLmF0dHIoJ2hyZWYnKSwgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICBpZiAoISEobG9jYXRpb24uaGFzaCkpe1xuICAgICAgICAgICAgICAgICAgICBzaG93U2VjdGlvbih3aW5kb3cubG9jYXRpb24uaGFzaCwgZmFsc2UpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuKSgpO1xuIiwidmFyIEZsaXAgPSAoZnVuY3Rpb24gKCkge1xuICAgIHZhciBmbGlwQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmZsaXAtY29udGFpbmVyJyk7XG5cbiAgICBpZiAoIShkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZmxpcC1jb250YWluZXInKSkpe1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIFxuICAgIHJldHVybiB7XG4gICAgICAgIGluaXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciBsaW5rQXZ0b3IgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYy1ibG9jay1saW5rX3RvLWF2dG9yJyk7XG5cbiAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jLWJsb2NrLWxpbmtfdG8tYXZ0b3InKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycgLGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgIGZsaXBDb250YWluZXIuY2xhc3NMaXN0LnRvZ2dsZSgnZmxpcC1jb250YWluZXJfYmFjaycpO1xuICAgICAgICAgICAgICAgIGxpbmtBdnRvci5jbGFzc0xpc3QudG9nZ2xlKCdjLWJsb2NrLWxpbmtfYmFjaycpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG59KSgpO1xuIiwidmFyIG5hdmlnYXRpb24gPSAoZnVuY3Rpb24gKCkge1xuICAgIGlmICgkKCcuYy1oYW1idXJnZXJfbmF2JykubGVuZ3RoID0gMCkgeyByZXR1cm4gZmFsc2UgfVxuXG4gICAgdmFyIG5hdmlnYXRpb24gPSAkKCcuYy1uYXZfc2l0ZS1saXN0JyksXG4gICAgICAgIHBhcmVudE5hdiA9ICQoJy5jb250ZW50JyksXG4gICAgICAgIGhhbWJ1cmdlciA9ICQoJy5jLWhhbWJ1cmdlcl9uYXYnKSxcbiAgICAgICAgaXRlbXMgPSAkKCcuYy1uYXZfc2l0ZV9faXRlbScpLFxuICAgICAgICB0aW1lcjtcbiAgICB2YXIgY291bnRlciA9IDA7XG4gICAgdmFyIG5hdkFjdGl2ZSA9ICQoJy5jLW5hdl9zaXRlX2FjdGl2ZScpO1xuXG5cblxuICAgIHZhciBhc2NlbnRJdGVtcyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaXRlbXNbY291bnRlcl0uY2xhc3NMaXN0LmFkZCgnYy1uYXZfc2l0ZV9faGlkZGVuJyk7XG4gICAgICAgIGNvdW50ZXIrKztcblxuICAgICAgICB0aW1lciA9IHNldFRpbWVvdXQoYXNjZW50SXRlbXMsIDEwMCk7XG5cbiAgICAgICAgaWYgKGNvdW50ZXIgPj0gaXRlbXMubGVuZ3RoKSB7XG4gICAgICAgICAgICBjbGVhclRpbWVvdXQodGltZXIpO1xuICAgICAgICB9XG5cbiAgICB9O1xuXG4gICAgdmFyIGxpc3RlbmVyID0gZnVuY3Rpb24gKCkge1xuXG4gICAgICAgICQoJy5jLWhhbWJ1cmdlcl9uYXYnKS5jbGljayhmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBoYW1idXJnZXIudG9nZ2xlQ2xhc3MoJ2MtaGFtYnVyZ2VyX2FjdGl2ZScpO1xuICAgICAgICAgICAgbmF2aWdhdGlvbi50b2dnbGVDbGFzcygnYy1uYXZfc2l0ZV9hY3RpdmUnKTtcblxuICAgICAgICAgICAgaWYgKCEhKHBhcmVudE5hdi5maW5kKCcuYy1uYXZfc2l0ZV9hY3RpdmUnKS5sZW5ndGgpKSB7XG4gICAgICAgICAgICAgICAgdmFyIG5ld1RpbWVyO1xuICAgICAgICAgICAgICAgIGNvdW50ZXIgPSAwO1xuICAgICAgICAgICAgICAgIG5ld1RpbWVyID0gc2V0VGltZW91dChhc2NlbnRJdGVtcywgNjAwKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICghKHBhcmVudE5hdi5maW5kKCcuYy1uYXZfc2l0ZV9hY3RpdmUnKS5sZW5ndGgpKSB7XG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBpdGVtcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICBpdGVtc1tpXS5jbGFzc0xpc3QucmVtb3ZlKCdjLW5hdl9zaXRlX19oaWRkZW4nKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgfTtcblxuICAgIHJldHVybiB7XG4gICAgICAgIGluaXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGxpc3RlbmVyKCk7XG4gICAgICAgIH1cbiAgICB9XG59KCkpO1xuIiwidmFyIHBhcmFsbGF4TW91c2UgPSAoZnVuY3Rpb24gKCkge1xuICAgIGlmIChkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncGFyYWxheCcpID09PSBudWxsKSByZXR1cm4gZmFsc2U7XG5cbiAgICB2YXIgY2FsY3VsYXRlUGFyYWxsYXggPSBmdW5jdGlvbihlKXtcbiAgICAgICAgdmFyIHBhcmFsbGF4Q29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3BhcmFsYXgnKSxcbiAgICAgICAgICAgIGxheWVycyA9IHBhcmFsbGF4Q29udGFpbmVyLmNoaWxkcmVuLFxuICAgICAgICAgICAgcGFnZVggPSBlLnBhZ2VYLFxuICAgICAgICAgICAgcGFnZVkgPSBlLnBhZ2VZLFxuICAgICAgICAgICAgaW5pdGlhbFggPSAod2luZG93LmlubmVyV2lkdGggLyAyKSAtIHBhZ2VYLFxuICAgICAgICAgICAgaW5pdGlhbFkgPSAod2luZG93LmlubmVySGVpZ2h0IC8gMikgLSBwYWdlWTtcblxuICAgICAgICBbXS5zbGljZS5jYWxsKGxheWVycykuZm9yRWFjaChmdW5jdGlvbiAobGF5ZXIsIGkpIHtcbiAgICAgICAgICAgIHZhciBkaXZpZGVyID0gKGkgKyAyKSAvIDUwLFxuICAgICAgICAgICAgICAgIGJvdHRvbVBvc2l0aW9uID0gKHdpbmRvdy5pbm5lckhlaWdodCAvIDIpICogZGl2aWRlcixcbiAgICAgICAgICAgICAgICBwb3NpdGlvblggPSBpbml0aWFsWCAqIGRpdmlkZXIsXG4gICAgICAgICAgICAgICAgcG9zaXRpb25ZID0gaW5pdGlhbFkgKiBkaXZpZGVyLFxuICAgICAgICAgICAgICAgIGxheWVyU3R5bGUgPSBsYXllci5zdHlsZSxcbiAgICAgICAgICAgICAgICB0cmFuc2Zvcm1TdHJpbmcgPSAndHJhbnNsYXRlM2QoJyArIHBvc2l0aW9uWCArICdweCwgJyArIHBvc2l0aW9uWSArICdweCwgMHB4KSc7XG4gICAgICAgICAgICBsYXllclN0eWxlLnRyYW5zZm9ybSA9IHRyYW5zZm9ybVN0cmluZztcbiAgICAgICAgfSlcbiAgICB9O1xuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgaW5pdDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICAgICAgY2FsY3VsYXRlUGFyYWxsYXgoZSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cbn0pKCk7XG5cbiIsInZhciBwYXJhbGxheCA9IChmdW5jdGlvbiAoKSB7XG4gICAgaWYgKCEoZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmwtaGVyb19fYmcnKSkpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgfVxuXG4gICAgdmFyIGJnID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmwtaGVyb19fYmcnKTtcbiAgICB2YXIgdXNlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jLXVzZXInKTtcbiAgICB2YXIgZm9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmMtdXNlcl9fYmcnKTtcblxuICAgIHJldHVybiB7XG4gICAgICAgIG1vdmU6IGZ1bmN0aW9uIChibG9jaywgd2luZG93U2Nyb2xsLCBzdHJhZmVBbW91bmQpIHtcbiAgICAgICAgICAgIHZhciBzdHJhZmUgPSB3aW5kb3dTY3JvbGwgLyAtc3RyYWZlQW1vdW5kICsgJyUnO1xuICAgICAgICAgICAgdmFyIHRyYW5zZm9ybVN0cmluZyA9ICd0cmFuc2xhdGUzZCgwLCcgKyBzdHJhZmUgKyAnLCAwKSc7XG4gICAgICAgICAgICB2YXIgc3R5bGUgPSBibG9jay5zdHlsZTtcblxuICAgICAgICAgICAgc3R5bGUudHJhbnNmb3JtID0gdHJhbnNmb3JtU3RyaW5nO1xuICAgICAgICAgICAgc3R5bGUud2Via2l0VHJhbnNmb3JtID0gdHJhbnNmb3JtU3RyaW5nO1xuXG4gICAgICAgIH0sXG4gICAgICAgIGluaXQ6IGZ1bmN0aW9uICh3U2Nyb2xsKSB7XG4gICAgICAgICAgICB0aGlzLm1vdmUoYmcsIHdTY3JvbGwsIDEwMCk7XG4gICAgICAgICAgICB0aGlzLm1vdmUoZm9uLCB3U2Nyb2xsLCAyMCk7XG4gICAgICAgIH1cbiAgICB9XG59KCkpOyIsInZhciBQcmVsb2FkID0gKGZ1bmN0aW9uICgpIHtcblxuICAgIHZhciBwZXJjZW50c1RvdGFsID0gMCxcbiAgICAgICAgcHJlbG9kZXIgPSAkKCcucHJlbG9hZGVyJyk7XG5cblxuICAgIHZhciBpbWdQYXRoID0gJCgnKicpLm1hcChmdW5jdGlvbiAobmR4LCBlbGVtZW50KSB7XG4gICAgICAgIHZhciBiYWNrZ3JvdW5kID0gJChlbGVtZW50KS5jc3MoJ2JhY2tncm91bmQtaW1hZ2UnKSxcbiAgICAgICAgICAgIGlzSW1nID0gJChlbGVtZW50KS5pcygnaW1nJyksXG4gICAgICAgICAgICBpc1ZpZGVvID0gJChlbGVtZW50KS5pcygndmlkZW8nKSxcbiAgICAgICAgICAgIHBhdGggPSAnJztcblxuICAgICAgICBpZiAoYmFja2dyb3VuZCAhPSAnbm9uZScpe1xuICAgICAgICAgICAgcGF0aCA9IGJhY2tncm91bmQucmVwbGFjZSgndXJsKFwiJywgJycpLnJlcGxhY2UoJ1wiKScsICcnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChpc0ltZyB8fCBpc1ZpZGVvKSB7XG4gICAgICAgICAgICBwYXRoID0gJChlbGVtZW50KS5hdHRyKCdzcmMnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChwYXRoKSB7XG4gICAgICAgICAgICByZXR1cm4gcGF0aDtcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgdmFyIGFuaW1hdGVQZXJjZW50cyA9IGZ1bmN0aW9uIChhbmltYXRlUGVyY2VudCkge1xuICAgICAgICB2YXIgY2lyY2xlUGVyY2VudGFnZXMgPSAkKCcucHJlbG9hZGVyX19jZXJjbGUtcGVyY2VudGFnZXMnKVswXSxcbiAgICAgICAgICAgIGRhc2hvZmZzZXQgPSBhbmltYXRlUGVyY2VudCAvIDEwMCAqIDE1MC43OTY0NDczNzIzMTAwNztcblxuICAgICAgICBjaXJjbGVQZXJjZW50YWdlcy5zdHlsZS5zdHJva2VEYXNoYXJyYXkgPSBkYXNob2Zmc2V0ICsnIDE1MC43OTY0NDczNzIzMTAwNyc7XG4gICAgfTtcblxuICAgIHZhciBzZXRQZXJjZW50cyA9IGZ1bmN0aW9uKHRvdGFsLCBjdXJyZW50KSB7XG5cbiAgICAgIHZhciBwZXJjZW50cyA9IE1hdGguY2VpbChjdXJyZW50IC8gdG90YWwgKiAxMDApO1xuXG4gICAgICAkKCcucHJlbG9kZXJfX3BlcmNlbnRhZ2VzJykudGV4dChwZXJjZW50cyk7XG5cbiAgICAgICAgYW5pbWF0ZVBlcmNlbnRzKHBlcmNlbnRzKTtcblxuICAgICAgaWYgKHBlcmNlbnRzID49IDEwMCkge1xuICAgICAgICAgIHByZWxvZGVyLmZhZGVPdXQoKTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgdmFyIGxvYWRJbWFnZXMgPSBmdW5jdGlvbiAoaW1hZ2VzKSB7XG5cbiAgICAgICAgaWYgKCFpbWFnZXMubGVuZ3RoKSBwcmVsb2Rlci5mYWRlT3V0KCk7XG5cbiAgICAgIGltYWdlcy5mb3JFYWNoKGZ1bmN0aW9uIChpbWcsIGksIGltYWdlcykge1xuICAgICAgICAgIHZhciBmYWtlSW1hZ2UgPSAkKCc8aW1nPicgfHwgJzx2aWRlbz4nLCB7XG4gICAgICAgICAgICAgIGF0dHI6IHtcbiAgICAgICAgICAgICAgICAgIHNyYzogaW1nXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcblxuICAgICAgICAgIGZha2VJbWFnZS5vbignbG9hZCBlcnJvcicsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgcGVyY2VudHNUb3RhbCsrO1xuICAgICAgICAgICAgICBzZXRQZXJjZW50cyhpbWFnZXMubGVuZ3RoLCBwZXJjZW50c1RvdGFsKVxuICAgICAgICAgIH0pXG4gICAgICB9KVxuICAgIH07XG5cbiAgICByZXR1cm4ge1xuICAgICAgICBpbml0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgaW1ncyA9IGltZ1BhdGgudG9BcnJheSgpO1xuICAgICAgICAgICAgbG9hZEltYWdlcyhpbWdzKTtcbiAgICAgICAgfVxuICAgIH1cblxuXG59KCkpO1xuIiwidmFyIHNraWxsc0FuaW1hdGUgPSAoZnVuY3Rpb24gKCkge1xuICAgIHZhciAkc2tpbGxzUGFyZW50ID0gJCgnLmwtc2tpbGxzLWdyb3VwJyksXG4gICAgICAgICRza2lsbHMgPSAkc2tpbGxzUGFyZW50LmZpbmQoJy5jLXNraWxsc19fY2lyY2xlLWFib3ZlJyk7XG5cbiAgICBpZiAoISgkc2tpbGxzUGFyZW50Lmxlbmd0aCkpIHJldHVybiBmYWxzZTtcblxuICAgIHZhciBjaGVja0Rpc3RuY2UgPSBmdW5jdGlvbihzY3JvbGxUb3AsIGVsZW0pe1xuICAgICAgICB2YXIgb2Zmc2V0ID0gZWxlbS5vZmZzZXQoKS50b3A7XG4gICAgICAgIHZhciB3aW5kb3dNYXJnaW4gPSBNYXRoLmNlaWwoJCh3aW5kb3cpLmhlaWdodCgpLzMpO1xuICAgICAgICB2YXIgdG9wQm9yZGVyID0gb2Zmc2V0IC0gc2Nyb2xsVG9wIC0gd2luZG93TWFyZ2luO1xuICAgICAgICB2YXIgYm90dG9tRWRnZSA9IGVsZW0ub3V0ZXJIZWlnaHQodHJ1ZSkgKyBvZmZzZXQ7XG4gICAgICAgIHZhciBib3R0b21Cb3JkZXIgPSBzY3JvbGxUb3AgKyB3aW5kb3dNYXJnaW4gLSBib3R0b21FZGdlO1xuXG4gICAgICAgIHJldHVybiB0b3BCb3JkZXIgPD0gMCAmJiBib3R0b21Cb3JkZXIgPD0gMDtcbiAgICB9O1xuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgaW5pdDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgJCh3aW5kb3cpLm9uKCdzY3JvbGwnLCBmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgIHZhciBzY3JvbGxUb3AgPSAkKHdpbmRvdykuc2Nyb2xsVG9wKCk7XG5cbiAgICAgICAgICAgICAgICBpZiAoY2hlY2tEaXN0bmNlKHNjcm9sbFRvcCwgJHNraWxsc1BhcmVudCkpIHtcbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCAkc2tpbGxzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAkc2tpbGxzW2ldLmNsYXNzTGlzdC5yZW1vdmUoJ2Mtc2tpbGxzX19jaXJjbGUtYWJvdmVfbm8nKTtcblxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgfVxuICAgIH1cbn0pKCk7IiwiXG52YXIgc2xpZGVyUGFyc2VDb250ZW50ID0gZnVuY3Rpb24gKCkge1xuICAgIHZhciBzdHJEYiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNkYicpLmdldEF0dHJpYnV0ZSgnZGF0YS1kYicpO1xuICAgIHZhciBhcnJTdHIgPSBbXTtcbiAgICBzdHJEYiA9IHN0ckRiLnJlcGxhY2UoXCJbe1wiLFwiXCIpO1xuICAgIHN0ckRiID0gc3RyRGIucmVwbGFjZShcIn1dXCIsXCJcIik7XG4gICAgYXJyU3RyID0gc3RyRGIuc3BsaXQoJ30seycpO1xuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcnJTdHIubGVuZ3RoOyBpKyspe1xuICAgICAgICBhcnJTdHJbaV0gPSAneycgK2FyclN0cltpXSsgJ30nO1xuICAgICAgICBhcnJTdHJbaV0gPSBKU09OLnBhcnNlKGFyclN0cltpXSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGFyclN0cjtcbn07XG5cbnZhciBTbGlkZXIgPSAoZnVuY3Rpb24gKCkge1xuXG4gICAgaWYgKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5sLXNsaWRlcicpID09PSBudWxsKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cblxuXG5cbiAgICBzbGlkZXJDb250ZW50ID0gc2xpZGVyUGFyc2VDb250ZW50KCk7XG5cbiAgICB2YXIgZG9jID0gZG9jdW1lbnQ7XG4gICAgdmFyIGFycm93TmV4dCA9IGRvYy5xdWVyeVNlbGVjdG9yKCcjYXJyb3ctdXAnKSxcbiAgICAgICAgYXJyb3dQcmV2ID0gZG9jLnF1ZXJ5U2VsZWN0b3IoJyNhcnJvdy1kb3duJyksXG4gICAgICAgICRzbGlkZUFjdGl2ZUNhcHRpb24gPSAkKCcjc2xpZGUtYWN0aXZlLWNhcHRpb24nKSxcbiAgICAgICAgJHNsaWRlQWN0aXZlQ2FwdGlvblRpdGxlID0gJHNsaWRlQWN0aXZlQ2FwdGlvbi5maW5kKCcuYy1ibG9jay10aXRsZV9fdGV4dCcpLFxuICAgICAgICAkc2xpZGVBY3RpdmVDYXB0aW9uVGVjaG5vbG9neSA9ICRzbGlkZUFjdGl2ZUNhcHRpb24uZmluZCgnLmMtYmxvY2stdGV4dF9ibHVlJyksXG4gICAgICAgICRzbGlkZUFjdGl2ZUNhcHRpb25MaW5rID0gJHNsaWRlQWN0aXZlQ2FwdGlvbi5maW5kKCcuYy1ibG9jay1saW5rX2JsdWUnKSxcbiAgICAgICAgJHNsaWRlckFjdGl2ZVBpY1dyYXBwZXIgPSAkKCcjc2xpZGUtYWN0aXZlLXBpYycpLFxuICAgICAgICAkc2xpZGVBY3RpdmVQaWNTcGFuID0gJHNsaWRlckFjdGl2ZVBpY1dyYXBwZXIuZmluZCgnc3BhbicpLFxuICAgICAgICAkc2xpZGVBY3RpdmVQaWMgPSAkKCcubC1zbGlkZXJfX3BpYycpLFxuICAgICAgICAkc2xpZGVySXRlbXMgPSAkKCcjc2xpZGUtaXRlbXMnKSxcbiAgICAgICAgJGZvbkRhcmsgPSAkKCcubC1zbGlkZXJfX2Fycm93LWRhcmsnKSxcbiAgICAgICAgY3VycmVudFNsaWRlID0gMCxcbiAgICAgICAgc2l6ZSA9IHNsaWRlckNvbnRlbnQubGVuZ3RoLFxuICAgICAgICBpblByb2Nlc3NOZXh0ID0gZmFsc2UsXG4gICAgICAgIGluUHJvY2Vzc1ByZXYgPSBmYWxzZSxcbiAgICAgICAgYW5pbWF0aW9uRW5kO1xuXG4gICAgdmFyIExpc3RlbmVyID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBhcnJvd05leHQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgY3VycmVudFNsaWRlID0gbGltaXRlcihjdXJyZW50U2xpZGUgKyAxKTtcblxuICAgICAgICAgICAgaWYgKGFuaW1hdGlvbkVuZCA+PSAzKSBpblByb2Nlc3NOZXh0ID0gZmFsc2U7XG5cbiAgICAgICAgICAgIGlmICghaW5Qcm9jZXNzTmV4dCkge1xuICAgICAgICAgICAgICAgIGluUHJvY2Vzc05leHQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIGRldGVyQWN0aXZlU2xpZGUoKTtcbiAgICAgICAgICAgICAgICBhbmltYXRpb25FbmQgPSAwO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICBhcnJvd1ByZXYuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgY3VycmVudFNsaWRlID0gbGltaXRlcihjdXJyZW50U2xpZGUgLSAxKTtcblxuICAgICAgICAgICAgaWYgKGFuaW1hdGlvbkVuZCA+PSAzKSBpblByb2Nlc3NQcmV2ID0gZmFsc2U7XG5cbiAgICAgICAgICAgIGlmICghaW5Qcm9jZXNzUHJldikge1xuICAgICAgICAgICAgICAgIGluUHJvY2Vzc1ByZXYgPSB0cnVlO1xuICAgICAgICAgICAgICAgIGRldGVyQWN0aXZlU2xpZGUoKTtcbiAgICAgICAgICAgICAgICBhbmltYXRpb25FbmQgPSAwO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9O1xuXG4gICAgdmFyIGNyZWF0ZUVsZW1lbnQgPSBmdW5jdGlvbiAoY2xhc3NQb3NpdGlvbiwgY2xhc3NWaXNpYmxlKSB7XG4gICAgICAgIHZhciBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5cbiAgICAgICAgZWxlbWVudC5jbGFzc0xpc3QuYWRkKCdsLXNsaWRlcl9fYXJyb3dzLWl0ZW0nKTtcbiAgICAgICAgZWxlbWVudC5jbGFzc0xpc3QuYWRkKGNsYXNzUG9zaXRpb24pO1xuICAgICAgICBlbGVtZW50LmNsYXNzTGlzdC5hZGQoY2xhc3NWaXNpYmxlKTtcblxuICAgICAgICByZXR1cm4gZWxlbWVudDtcbiAgICB9O1xuXG4gICAgdmFyIG5leHRTbGlkZUVsZW1lbnQgPSBjcmVhdGVFbGVtZW50KCdsLXNsaWRlcl9fYXJyb3dzLXVwJywgJ2wtc2xpZGVyX19hcnJvd3MtbmV4dC1uZXh0JyksXG4gICAgICAgIHByZXZTbGlkZUVsZW1lbnQgPSBjcmVhdGVFbGVtZW50KCdsLXNsaWRlcl9fYXJyb3dzLWRvd24nLCAnbC1zbGlkZXJfX2Fycm93cy1wcmV2Jyk7XG5cblxuICAgIHZhciBjcmVhdGVJbWdFbGVtZW50ID0gZnVuY3Rpb24gKHNyYykge1xuICAgICAgICB2YXIgaW1nID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJyk7XG4gICAgICAgIGltZy5jbGFzc0xpc3QuYWRkKCdsLXNsaWRlcl9fYXJyb3ctcGljJyk7XG4gICAgICAgIGltZy5zZXRBdHRyaWJ1dGUoJ3NyYycsICcvYXNzZXRzJyArIHNyYyk7XG5cbiAgICAgICAgcmV0dXJuIGltZztcbiAgICB9O1xuXG4gICAgdmFyIGNyZWF0ZURpdkVsZW1lbnQgPSBmdW5jdGlvbiAodGV4dCkge1xuICAgICAgICB2YXIgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuXG4gICAgICAgIHJldHVybiBkaXY7XG4gICAgfTtcblxuICAgIHZhciB0ZXh0QW5pbWF0ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyXG4gICAgICAgICAgICBzdHJUaXRsZSA9IHNsaWRlckNvbnRlbnRbY3VycmVudFNsaWRlXS50aXRsZSxcbiAgICAgICAgICAgIHN0clRlY2hub2xvZ3kgPSBzbGlkZXJDb250ZW50W2N1cnJlbnRTbGlkZV0udGVjaG5vbG9neSxcbiAgICAgICAgICAgIGNoYXJzVGl0bGUgPSBzdHJUaXRsZS5zcGxpdCgnJyksXG4gICAgICAgICAgICBjaGFyc1RlY2hub2xvZ3kgPSBzdHJUZWNobm9sb2d5LnNwbGl0KCcnKSxcbiAgICAgICAgICAgIGNvdW50ZXJUaXRsZSA9IDAsXG4gICAgICAgICAgICBjb3VudGVyVGVjaCA9IDAsXG4gICAgICAgICAgICB0aW1lcjtcblxuICAgICAgICAkc2xpZGVBY3RpdmVDYXB0aW9uVGl0bGVbMF0uaW5uZXJIVE1MID0gJyc7XG4gICAgICAgICRzbGlkZUFjdGl2ZUNhcHRpb25UZWNobm9sb2d5WzBdLmlubmVySFRNTCA9ICcnO1xuXG4gICAgICAgIHZhciBlYWNoQ2hhclRpdGxlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIGNoYXIgPSBkb2MuY3JlYXRlVGV4dE5vZGUoY2hhcnNUaXRsZVtjb3VudGVyVGl0bGVdKTtcblxuICAgICAgICAgICAgJHNsaWRlQWN0aXZlQ2FwdGlvblRpdGxlWzBdLmFwcGVuZENoaWxkKGNoYXIpO1xuXG4gICAgICAgICAgICBjb3VudGVyVGl0bGUrKztcbiAgICAgICAgICAgIHRpbWVyID0gc2V0VGltZW91dChlYWNoQ2hhclRpdGxlLCA1MCk7XG5cbiAgICAgICAgICAgIGlmIChjb3VudGVyVGl0bGUgPT09IGNoYXJzVGl0bGUubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgY2xlYXJJbnRlcnZhbCh0aW1lcik7XG4gICAgICAgICAgICAgICAgYW5pbWF0aW9uRW5kKys7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG5cbiAgICAgICAgdmFyIGVhY2hDaGFyVGVjaCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciBjaGFyID0gZG9jLmNyZWF0ZVRleHROb2RlKGNoYXJzVGVjaG5vbG9neVtjb3VudGVyVGVjaF0pO1xuXG4gICAgICAgICAgICAkc2xpZGVBY3RpdmVDYXB0aW9uVGVjaG5vbG9neVswXS5hcHBlbmRDaGlsZChjaGFyKTtcblxuICAgICAgICAgICAgY291bnRlclRlY2grKztcbiAgICAgICAgICAgIHRpbWVyID0gc2V0VGltZW91dChlYWNoQ2hhclRlY2gsIDUwKTtcblxuICAgICAgICAgICAgaWYgKGNvdW50ZXJUZWNoID09PSBjaGFyc1RlY2hub2xvZ3kubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgY2xlYXJJbnRlcnZhbCh0aW1lcik7XG4gICAgICAgICAgICAgICAgYW5pbWF0aW9uRW5kKys7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG5cbiAgICAgICAgZWFjaENoYXJUaXRsZSgpO1xuICAgICAgICBlYWNoQ2hhclRlY2goKTtcbiAgICB9O1xuXG5cbiAgICB2YXIgYnVpbGRTbGlkZXIgPSBmdW5jdGlvbiAoKSB7XG5cbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzbGlkZXJDb250ZW50Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICB2YXJcbiAgICAgICAgICAgICAgICBwcmV2U2xpZGVFbGVtZW50ID0gY3JlYXRlRWxlbWVudCgnbC1zbGlkZXJfX2Fycm93cy1kb3duJywgJ2wtc2xpZGVyX19hcnJvd3MtcHJldicpO1xuXG4gICAgICAgICAgICBwcmV2U2xpZGVFbGVtZW50LnNldEF0dHJpYnV0ZSgnaWQnLCAncHJldicgKyBpKTtcbiAgICAgICAgICAgIHByZXZTbGlkZUVsZW1lbnQuYXBwZW5kQ2hpbGQoY3JlYXRlSW1nRWxlbWVudChzbGlkZXJDb250ZW50W2ldLnBpY3R1cmUpKTtcbiAgICAgICAgICAgIHByZXZTbGlkZUVsZW1lbnQuYXBwZW5kQ2hpbGQoY3JlYXRlRGl2RWxlbWVudCggaSsxICkpO1xuICAgICAgICAgICAgJHNsaWRlckl0ZW1zWzBdLmluc2VydEJlZm9yZShwcmV2U2xpZGVFbGVtZW50LCAkZm9uRGFya1swXSk7XG4gICAgICAgIH1cblxuICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IHNsaWRlckNvbnRlbnQubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICAgIHZhclxuICAgICAgICAgICAgICAgIG5leHRTbGlkZUVsZW1lbnQgPSBjcmVhdGVFbGVtZW50KCdsLXNsaWRlcl9fYXJyb3dzLXVwJywgJ2wtc2xpZGVyX19hcnJvd3MtbmV4dCcpO1xuXG4gICAgICAgICAgICBuZXh0U2xpZGVFbGVtZW50LnNldEF0dHJpYnV0ZSgnaWQnLCAnbmV4dCcgKyBqKTtcbiAgICAgICAgICAgIG5leHRTbGlkZUVsZW1lbnQuYXBwZW5kQ2hpbGQoY3JlYXRlSW1nRWxlbWVudChzbGlkZXJDb250ZW50W2pdLnBpY3R1cmUpKTtcbiAgICAgICAgICAgIG5leHRTbGlkZUVsZW1lbnQuYXBwZW5kQ2hpbGQoY3JlYXRlRGl2RWxlbWVudChqICsgMSkpO1xuICAgICAgICAgICAgJHNsaWRlckl0ZW1zWzBdLmluc2VydEJlZm9yZShuZXh0U2xpZGVFbGVtZW50LCAkZm9uRGFya1swXSk7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgdmFyIGRldGVyQWN0aXZlU2xpZGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhclxuICAgICAgICAgICAgbWFpblNsaWRlID0gc2xpZGVyQ29udGVudFtsaW1pdGVyKGN1cnJlbnRTbGlkZSldLFxuICAgICAgICAgICAgaXRlbXNQcmV2ID0gJHNsaWRlckl0ZW1zLmNoaWxkcmVuKCcubC1zbGlkZXJfX2Fycm93cy1wcmV2JyksXG4gICAgICAgICAgICBpdGVtc05leHQgPSAkc2xpZGVySXRlbXMuY2hpbGRyZW4oJy5sLXNsaWRlcl9fYXJyb3dzLW5leHQnKTtcblxuICAgICAgICB0ZXh0QW5pbWF0ZSgpO1xuXG4gICAgICAgICRzbGlkZXJBY3RpdmVQaWNXcmFwcGVyWzBdLmNsYXNzTGlzdC5hZGQoJ2wtc2xpZGVyX19waWMtd3JhcHBlcl90cmFuc2Zvcm0nKTtcblxuICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICRzbGlkZXJBY3RpdmVQaWNXcmFwcGVyWzBdLmNsYXNzTGlzdC5yZW1vdmUoJ2wtc2xpZGVyX19waWMtd3JhcHBlcl90cmFuc2Zvcm0nKTtcbiAgICAgICAgICAgICRzbGlkZUFjdGl2ZVBpY1swXS5zZXRBdHRyaWJ1dGUoJ3NyYycsICcvYXNzZXRzJyArIG1haW5TbGlkZS5waWN0dXJlKTtcbiAgICAgICAgICAgIC8vICRzbGlkZUFjdGl2ZVBpY1NwYW5bMF0uaW5uZXJUZXh0ID0gY3VycmVudFNsaWRlICsgMTtcbiAgICAgICAgICAgICRzbGlkZUFjdGl2ZUNhcHRpb25MaW5rWzBdLnNldEF0dHJpYnV0ZSgnaHJlZicsIG1haW5TbGlkZS5zaXRlVXJsKTtcbiAgICAgICAgICAgIGFuaW1hdGlvbkVuZCsrO1xuICAgICAgICB9LCA1MDApO1xuXG4gICAgICAgICQoJy5sLXNsaWRlcl9fYXJyb3dzLW5leHQubC1zbGlkZXJfX2Fycm93cy1pdGVtX2FjdGl2ZScpLmFuaW1hdGUoe3RvcDogJy0xMDAlJ30sIDUwMCk7XG4gICAgICAgICQoJyNuZXh0JyArIFtsaW1pdGVyKGN1cnJlbnRTbGlkZSArIDEpXSkuYW5pbWF0ZSh7dG9wOiAnMCd9LCA1MDApO1xuICAgICAgICAkKCcubC1zbGlkZXJfX2Fycm93cy1wcmV2Lmwtc2xpZGVyX19hcnJvd3MtaXRlbV9hY3RpdmUnKS5hbmltYXRlKHt0b3A6ICcxMDAlJ30sIDUwMCk7XG4gICAgICAgICQoJyNwcmV2JyArIFtsaW1pdGVyKGN1cnJlbnRTbGlkZSAtIDEpXSkuYW5pbWF0ZSh7dG9wOiAnMCd9LCA1MDApO1xuXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgaXRlbXNQcmV2Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBpdGVtc1ByZXZbaV0uY2xhc3NMaXN0LnJlbW92ZSgnbC1zbGlkZXJfX2Fycm93cy1pdGVtX2FjdGl2ZScpO1xuICAgICAgICAgICAgaXRlbXNOZXh0W2ldLmNsYXNzTGlzdC5yZW1vdmUoJ2wtc2xpZGVyX19hcnJvd3MtaXRlbV9hY3RpdmUnKTtcblxuICAgICAgICAgICAgaWYgKGl0ZW1zUHJldltpXS5oYXNBdHRyaWJ1dGUoJ3N0eWxlJykpIHtcbiAgICAgICAgICAgICAgICBpdGVtc1ByZXZbaV0ucmVtb3ZlQXR0cmlidXRlKCdzdHlsZScpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoaXRlbXNOZXh0W2ldLmhhc0F0dHJpYnV0ZSgnc3R5bGUnKSkge1xuICAgICAgICAgICAgICAgIGl0ZW1zTmV4dFtpXS5yZW1vdmVBdHRyaWJ1dGUoJ3N0eWxlJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpdGVtc1ByZXZbbGltaXRlcihjdXJyZW50U2xpZGUgLSAxKV0uY2xhc3NMaXN0LmFkZCgnbC1zbGlkZXJfX2Fycm93cy1pdGVtX2FjdGl2ZScpO1xuICAgICAgICBpdGVtc05leHRbbGltaXRlcihjdXJyZW50U2xpZGUgKyAxKV0uY2xhc3NMaXN0LmFkZCgnbC1zbGlkZXJfX2Fycm93cy1pdGVtX2FjdGl2ZScpO1xuICAgIH07XG5cbiAgICB2YXIgbGltaXRlciA9IGZ1bmN0aW9uICh2YWwpIHtcblxuICAgICAgICBpZiAodmFsID49IHNpemUpIHtcbiAgICAgICAgICAgIHZhbCA9IDA7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodmFsIDwgMCkge1xuICAgICAgICAgICAgdmFsID0gc2l6ZSAtIDE7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdmFsO1xuICAgIH07XG5cbiAgICByZXR1cm4ge1xuICAgICAgICBpbml0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAkKCcubC1zbGlkZXIgJykub3V0ZXJIZWlnaHQoJCh3aW5kb3cpLmhlaWdodCgpKTtcblxuICAgICAgICAgICAgJCh3aW5kb3cpLnJlc2l6ZShmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgJCgnLmwtc2xpZGVyICcpLm91dGVySGVpZ2h0KCQod2luZG93KS5oZWlnaHQoKSk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgYnVpbGRTbGlkZXIoKTtcbiAgICAgICAgICAgIGRldGVyQWN0aXZlU2xpZGUoKTtcbiAgICAgICAgICAgIExpc3RlbmVyKCk7XG4gICAgICAgIH1cbiAgICB9XG59KCkpO1xuIiwidmFyIHZhbGlkYXRpb25BdnRvciA9IChmdW5jdGlvbiAoKSB7XG5cblxuICAgIGlmICghKCQoJy5jLWZvcm0tYXZ0b3InKSkpIHJldHVybiBmYWxzZTtcblxuICAgIGNvbnN0IGZvcm1Mb2dpbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNsb2dpbicpO1xuICAgIHZhciBudW1iZXJDaGVjZWtkID0gMDtcbiAgICB2YXIgcmVzdWx0Q29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmMtZm9ybS1hdnRvcl9fc3RhdHVzJyk7XG5cbiAgICB2YXIgdmFsaWQgPSBmdW5jdGlvbiAoKSB7XG5cbiAgICAgICAgdmFyXG4gICAgICAgICAgICAkZm9ybSA9ICQoJy5jLWZvcm0tYXZ0b3InKSxcbiAgICAgICAgICAgICRpbnB1dCA9ICRmb3JtLmZpbmQoJy5jLWZvcm0tYXZ0b3JfX2lucHV0JyksXG4gICAgICAgICAgICAkY2hlY2tCb3ggPSAkZm9ybS5maW5kKCdpbnB1dFt0eXBlPVwiY2hlY2tib3hcIl0nKSxcbiAgICAgICAgICAgICRyYWRpbyA9ICRmb3JtLmZpbmQoJ2lucHV0W3R5cGU9XCJyYWRpb1wiXScpLFxuICAgICAgICAgICAgbnVtYmVyRW1wdHlJbnB1dCA9IDA7XG5cblxuICAgICAgICAkZm9ybS5maW5kKCcuZXJyb3InKS5yZW1vdmUoKTtcblxuICAgICAgICAkaW5wdXQuZWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgJHRoaXMgPSAkKHRoaXMpO1xuXG4gICAgICAgICAgICAkdGhpcy5wYXJlbnRzKCcuYy1mb3JtLWF2dG9yX19pbnB1dC13cmFwcGVyICcpXG4gICAgICAgICAgICAgICAgLnJlbW92ZUF0dHIoJ3N0eWxlJyk7XG5cbiAgICAgICAgICAgIGlmICgkdGhpcy52YWwoKSA9PT0gJycpIHtcblxuICAgICAgICAgICAgICAgICR0aGlzLnBhcmVudHMoJy5jLWZvcm0tYXZ0b3JfX2lucHV0LXdyYXBwZXIgJylcbiAgICAgICAgICAgICAgICAgICAgLmNzcyh7J2JvcmRlcic6ICcycHggc29saWQgcmVkJ30pO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBudW1iZXJFbXB0eUlucHV0Kys7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgICRjaGVja0JveC5lYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciAkdGhpcyA9ICQodGhpcyk7XG5cbiAgICAgICAgICAgIGlmICghISR0aGlzLnByb3AoJ2NoZWNrZWQnKSkge1xuICAgICAgICAgICAgICAgIG51bWJlckNoZWNla2QrKztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgJHJhZGlvLmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyICR0aGlzID0gJCh0aGlzKTtcblxuICAgICAgICAgICAgaWYgKCEhJHRoaXMucHJvcCgnY2hlY2tlZCcpKSB7XG4gICAgICAgICAgICAgICAgbnVtYmVyQ2hlY2VrZCsrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICBpZiAobnVtYmVyRW1wdHlJbnB1dCA8PSAxKSB7XG4gICAgICAgICAgICByZXN1bHRDb250YWluZXIuaW5uZXJIVE1MID0gJ9CX0LDQv9C+0LvQvdC40YLQtSDQstGB0LUg0L/QvtC70Y8g0YTQvtGA0LzRiyc7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChudW1iZXJDaGVjZWtkIDw9IDIgfHwgJCgnI2h6JykucHJvcCgnY2hlY2tlZCcpKSB7XG4gICAgICAgICAgICByZXN1bHRDb250YWluZXIuaW5uZXJIVE1MID0gJ9Cg0L7QsdC+0YLQsNC8INGC0YPRgiDQvdC1INC80LXRgdGC0L4nO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIHZhciBwcmVwYXJlQXV0aCA9IGZ1bmN0aW9uIChlKSB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICBudW1iZXJDaGVjZWtkID0gMDtcblxuICAgICAgICB2YWxpZCgpO1xuXG4gICAgICAgIGlmIChudW1iZXJDaGVjZWtkIDwgMiB8fCAkKCcjaHonKS5wcm9wKCdjaGVja2VkJykpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBkYXRhID0ge1xuICAgICAgICAgICAgbG9naW46IGZvcm1Mb2dpbi5sb2dpbi52YWx1ZSxcbiAgICAgICAgICAgIHBhc3N3b3JkOiBmb3JtTG9naW4ucGFzc3dvcmQudmFsdWVcbiAgICAgICAgfTtcbiAgICAgICAgcmVzdWx0Q29udGFpbmVyLnN0eWxlLmNvbG9yID0gJ3doaXRlJztcbiAgICAgICAgcmVzdWx0Q29udGFpbmVyLmlubmVySFRNTCA9ICdTZW5kaW5nLi4uJztcbiAgICAgICAgc2VuZEFqYXhKc29uKCcvJywgZGF0YSwgZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgICAgICAgIHJlc3VsdENvbnRhaW5lci5pbm5lckhUTUwgPSBkYXRhO1xuXG4gICAgICAgICAgICBpZiAoZGF0YSA9PSAn0JDQstGC0L7RgNC40LfQsNGG0LjRjyDRg9GB0L/QtdGI0L3QsCEnKSB7XG4gICAgICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSAnL2FkbWluJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfTtcblxuICAgIHJldHVybiB7XG4gICAgICAgIGluaXQ6IGZ1bmN0aW9uICgpIHtcblxuXG4gICAgICAgICAgICBmb3JtTG9naW4uYWRkRXZlbnRMaXN0ZW5lcignc3VibWl0JywgcHJlcGFyZUF1dGgpO1xuICAgICAgICB9XG4gICAgfVxufSkoKTtcblxudmFyIHZhbGlkYXRpb25Db250YWN0TWUgPSAoZnVuY3Rpb24gKCkge1xuICAgIGlmICghJCgnLmMtZm9ybV9jb250YWN0LW1lJykubGVuZ3RoKSByZXR1cm4gZmFsc2U7XG5cbiAgICB2YXIgJGZvcm1Db250YWN0TWUgPSAkKCcuYy1mb3JtX2NvbnRhY3QtbWUnKSxcbiAgICAgICAgJGlucHV0cyA9ICRmb3JtQ29udGFjdE1lLmZpbmQoJy5jLWZvcm1fX2lucHV0JyksXG4gICAgICAgIHJlc3VsdENvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jLWZvcm0tYXZ0b3JfX3N0YXR1cycpO1xuICAgIGNvbnN0IGZvcm1NYWlsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI21haWwnKTtcblxuICAgIHZhciByZXNldCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgJGZvcm1Db250YWN0TWUuZmluZCgnLmVycm9yJykucmVtb3ZlKCk7XG4gICAgICAgICRpbnB1dHMuZWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAkKHRoaXMpLmNzcyh7J2JvcmVkZXInOiAnbm9uZSd9KTtcbiAgICAgICAgfSk7XG4gICAgfTtcblxuICAgIHZhciB2YWxpZCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyXG4gICAgICAgICAgICBjb3VudGVyID0gMDtcblxuICAgICAgICAkaW5wdXRzLmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyICR0aGlzID0gJCh0aGlzKTtcblxuICAgICAgICAgICAgJHRoaXMucmVtb3ZlQXR0cignc3R5bGUnKTtcblxuICAgICAgICAgICAgaWYgKCEhJHRoaXMudmFsKCkpIHtcbiAgICAgICAgICAgICAgICBjb3VudGVyKys7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICghJHRoaXMudmFsKCkpIHtcbiAgICAgICAgICAgICAgICAkdGhpcy5jc3Moeydib3JkZXInOiAnMXB4IHNvbGlkIHJlZCd9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIHByZXBhcmVTZW5kTWFpbChlKSB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICB2YWxpZCgpO1xuXG4gICAgICAgIHZhciBkYXRhID0ge1xuICAgICAgICAgICAgbmFtZTogZm9ybU1haWwubmFtZS52YWx1ZSxcbiAgICAgICAgICAgIGVtYWlsOiBmb3JtTWFpbC5lbWFpbC52YWx1ZSxcbiAgICAgICAgICAgIHRleHQ6IGZvcm1NYWlsLnRleHQudmFsdWVcbiAgICAgICAgfTtcbiAgICAgICAgcmVzdWx0Q29udGFpbmVyLmlubmVySFRNTCA9ICdTZW5kaW5nLi4uJztcbiAgICAgICAgc2VuZEFqYXhKc29uKCcvd29yaycsIGRhdGEsIGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAgICAgICByZXN1bHRDb250YWluZXIuaW5uZXJIVE1MID0gZGF0YTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG5cbiAgICByZXR1cm4ge1xuICAgICAgICBpbml0OiBmdW5jdGlvbiAoKSB7XG5cblxuICAgICAgICAgICAgZm9ybU1haWwuYWRkRXZlbnRMaXN0ZW5lcignc3VibWl0JywgcHJlcGFyZVNlbmRNYWlsKTtcblxuXG4gICAgICAgICAgICAvLyAkZm9ybUNvbnRhY3RNZS5maW5kKCcuYy1mb3JtJykuc3VibWl0KGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICAvLyAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgLy8gICAgIHJlc2V0KCk7XG4gICAgICAgICAgICAvLyAgICAgdmFsaWQoKTtcbiAgICAgICAgICAgIC8vXG4gICAgICAgICAgICAvLyB9KTtcblxuICAgICAgICAgICAgJGZvcm1Db250YWN0TWUuZmluZCgnLmMtZm9ybV9fYnV0dG9tJykuY2xpY2soZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHJlc2V0KCk7XG4gICAgICAgICAgICAgICAgJGlucHV0cy5lYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyICR0aGlzID0gJCh0aGlzKTtcbiAgICAgICAgICAgICAgICAgICAgJHRoaXMudmFsKCcnKTtcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG59KSgpOyIsImZ1bmN0aW9uIHNlbmRBamF4SnNvbih1cmwsIGRhdGEsIGNiKSB7XG4gICAgdmFyIHhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuICAgIHhoci5vcGVuKCdQT1NUJywgdXJsLCB0cnVlKTtcbiAgICB4aHIuc2V0UmVxdWVzdEhlYWRlcignQ29udGVudC1UeXBlJywgJ2FwcGxpY2F0aW9uL2pzb24nKTtcbiAgICB4aHIub25sb2FkID0gZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgdmFyIHJlc3VsdCA9IEpTT04ucGFyc2UoeGhyLnJlc3BvbnNlVGV4dCk7XG4gICAgICAgIGNiKHJlc3VsdC5zdGF0dXMpO1xuICAgIH07XG4gICAgeGhyLnNlbmQoSlNPTi5zdHJpbmdpZnkoZGF0YSkpO1xufVxuXG52YXIgYmx1ciA9IChmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGNvbnRhaW5lciA9ICQoJy5jLWZvcm0tY29udGFpbmVyJyksXG4gICAgICAgIGZvcm0gPSAkKCcuYy1mb3JtLXdyYXBwZXInKTtcblxuICAgIGlmIChjb250YWluZXIubGVuZ3RoID09PSAwKSByZXR1cm4gZmFsc2U7XG5cbiAgICByZXR1cm4ge1xuICAgICAgICBzZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciBpbWcgPSAkKCcuYy1ibG9jay1iZ19waWMnKSxcbiAgICAgICAgICAgICAgICBpbWdXaWR0aCA9IGltZy53aWR0aCgpLFxuICAgICAgICAgICAgICAgIGltZ0hlaWdodCA9IGltZy5oZWlnaHQoKSxcbiAgICAgICAgICAgICAgICBibHVyQ3NzID0gZm9ybVswXS5zdHlsZSxcbiAgICAgICAgICAgICAgICBwb3NMZWZ0ID0gLWNvbnRhaW5lci5vZmZzZXQoKS5sZWZ0LFxuICAgICAgICAgICAgICAgIHBvc1RvcCA9IC1jb250YWluZXIucG9zaXRpb24oKS50b3A7XG5cbiAgICAgICAgICAgIGJsdXJDc3MuYmFja2dyb3VuZFNpemUgPSBpbWdXaWR0aCArICdweCcgKyAnICcgKyBpbWdIZWlnaHQgKyAncHgnO1xuICAgICAgICAgICAgYmx1ckNzcy5iYWNrZ3JvdW5kUG9zaXRpb24gPSBwb3NMZWZ0ICsgJ3B4JyArICcgJyArIHBvc1RvcCArICdweCc7XG4gICAgICAgICAgICBmb3JtLmNzcyh7XG4gICAgICAgICAgICAgICAgJ2JhY2tncm91bmQtc2l6ZSc6IGltZ1dpZHRoICsgJ3B4JyArICcgJyArIGltZ0hlaWdodCArICdweCcsXG4gICAgICAgICAgICAgICAgJ2JhY2tncm91bmQtcG9zaXRpb24nOiBwb3NMZWZ0ICsgJ3B4JyArICcgJyArIHBvc1RvcCArICdweCdcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxufSgpKTtcblxudmFyIEFwcCA9IChmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgaW5pdDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgUHJlbG9hZC5pbml0KCk7XG5cblxuICAgICAgICAgICAgaWYgKCEhKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jLWhhbWJ1cmdlcl9uYXYnKSkpIHtcbiAgICAgICAgICAgICAgICBuYXZpZ2F0aW9uLmluaXQoKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKCEhKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5sLXNsaWRlcicpKSkge1xuICAgICAgICAgICAgICAgIFNsaWRlci5pbml0KCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICghIShkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZmxpcC1jb250YWluZXInKSkpIHtcbiAgICAgICAgICAgICAgICBGbGlwLmluaXQoKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKCEhKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5sLXBhZ2UtbmF2X2FzaWRlJykpKSB7XG4gICAgICAgICAgICAgICAgQXNzaWRlLmluaXQoKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKCEhKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jLWZvcm0tYXZ0b3InKSkpIHtcbiAgICAgICAgICAgICAgICB2YWxpZGF0aW9uQXZ0b3IuaW5pdCgpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoISEoZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmMtZm9ybV9jb250YWN0LW1lJykpKSB7XG4gICAgICAgICAgICAgICAgdmFsaWRhdGlvbkNvbnRhY3RNZS5pbml0KCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICghIWRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwYXJhbGF4JykpIHtcbiAgICAgICAgICAgICAgICBwYXJhbGxheE1vdXNlLmluaXQoKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKCEhZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmwtc2tpbGxzLWdyb3VwJykpIHtcbiAgICAgICAgICAgICAgICBza2lsbHNBbmltYXRlLmluaXQoKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKCEhKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5sLWhlcm9fX2JnJykpKSB7XG4gICAgICAgICAgICAgICAgd2luZG93Lm9uc2Nyb2xsID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgd1Njcm9sbCA9IHdpbmRvdy5wYWdlWU9mZnNldDtcbiAgICAgICAgICAgICAgICAgICAgcGFyYWxsYXguaW5pdCh3U2Nyb2xsKTtcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmMtZm9ybS1jb250YWluZXInKSAhPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIGJsdXIuc2V0KCk7XG4gICAgICAgICAgICAgICAgJCh3aW5kb3cpLnJlc2l6ZShmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIGJsdXIuc2V0KCk7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5sLWhlcm8nKSAhPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICQoJy5sLWhlcm8nKS5oZWlnaHQoJCh3aW5kb3cpLmhlaWdodCgpKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKCEhKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5mbGlwLWNvbnRhaW5lcicpKSkge1xuXG4gICAgICAgICAgICAgICAgdmFyXG4gICAgICAgICAgICAgICAgICAgIGZsaXBDb250YWluZXIgPSAkKCcuZmxpcC1jb250YWluZXInKSxcbiAgICAgICAgICAgICAgICAgICAgaGVpZ2h0Rm9yRmxpcCA9ICQod2luZG93KS5oZWlnaHQoKSAtICQoJy5sLWhlYWRlci1pbmRleCcpLmhlaWdodCgpIC0gJCgnLmwtZm9vdGVyLXNtYWxsJykuaGVpZ2h0KCkgLSAyMCxcbiAgICAgICAgICAgICAgICAgICAgaGVpZ2h0RmxpcCA9IGZsaXBDb250YWluZXIuaGVpZ2h0KCkgKyA0NztcblxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGhlaWdodEZsaXAsIGhlaWdodEZvckZsaXApO1xuXG4gICAgICAgICAgICAgICAgaWYgKGhlaWdodEZvckZsaXAgPD0gaGVpZ2h0RmxpcCkge1xuICAgICAgICAgICAgICAgICAgICBmbGlwQ29udGFpbmVyLmFkZENsYXNzKCdzdGF0aWMnKTtcblxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmIChoZWlnaHRGb3JGbGlwID4gaGVpZ2h0RmxpcCkge1xuICAgICAgICAgICAgICAgICAgICBmbGlwQ29udGFpbmVyLnJlbW92ZUNsYXNzKCdzdGF0aWMnKTtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coaGVpZ2h0RmxpcCwgaGVpZ2h0Rm9yRmxpcClcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59KSgpO1xuXG4kKGZ1bmN0aW9uICgpIHtcbiAgICBpZiAoISEoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21hcCcpKSkge1xuICAgICAgICB5bWFwcy5yZWFkeShpbml0KTtcbiAgICAgICAgdmFyIG15TWFwO1xuXG4gICAgICAgIGZ1bmN0aW9uIGluaXQoKSB7XG4gICAgICAgICAgICBteU1hcCA9IG5ldyB5bWFwcy5NYXAoXCJtYXBcIiwge1xuICAgICAgICAgICAgICAgIGNlbnRlcjogWzU1LCA4Mi45MjUyMzNdLFxuICAgICAgICAgICAgICAgIHpvb206IDEzXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIEFwcC5pbml0KCk7XG5cblxuXG4gICAgdmFyIGZvcm1VcGxvYWQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjdXBsb2FkJyk7XG5cbiAgICB2YXIgZmlsZVVwbG9hZCA9IGZ1bmN0aW9uICh1cmwsIGRhdGEsIGNiKSB7XG4gICAgICAgIHZhciB4aHIgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcbiAgICAgICAgeGhyLm9wZW4oJ1BPU1QnLCB1cmwsIHRydWUpO1xuXG4gICAgICAgIHhoci5vbmxvYWQgPSBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgdmFyIHJlc3VsdCA9IEpTT04ucGFyc2UoeGhyLnJlc3BvbnNlVGV4dCk7XG4gICAgICAgICAgICBjYihyZXN1bHQuc3RhdHVzKTtcbiAgICAgICAgfTtcblxuICAgICAgICB4aHIuc2VuZChkYXRhKTtcbiAgICB9O1xuXG4gICAgZnVuY3Rpb24gcHJlcGFyZVNlbmRGaWxlKGUpIHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB2YXIgcmVzdWx0Q29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnN0YXR1cycpO1xuICAgICAgICB2YXIgZm9ybURhdGEgPSBuZXcgRm9ybURhdGEoKTtcbiAgICAgICAgdmFyIGZpbGUgPSBkb2N1bWVudFxuICAgICAgICAgICAgLnF1ZXJ5U2VsZWN0b3IoJyNmaWxlLXNlbGVjdCcpXG4gICAgICAgICAgICAuZmlsZXNbMF07XG4gICAgICAgIHZhciB0aXRsZSA9IGRvY3VtZW50XG4gICAgICAgICAgICAucXVlcnlTZWxlY3RvcignI2ZpbGUtdGl0bGUnKVxuICAgICAgICAgICAgLnZhbHVlO1xuICAgICAgICB2YXIgdGVjaCA9IGRvY3VtZW50XG4gICAgICAgICAgICAucXVlcnlTZWxlY3RvcignI2ZpbGUtdGVjaCcpXG4gICAgICAgICAgICAudmFsdWU7XG4gICAgICAgIHZhciBzaXRlVXJsID0gZG9jdW1lbnRcbiAgICAgICAgICAgIC5xdWVyeVNlbGVjdG9yKCcjZmlsZS1zaXRlJylcbiAgICAgICAgICAgIC52YWx1ZTtcblxuICAgICAgICBmb3JtRGF0YS5hcHBlbmQoJ3Bob3RvJywgZmlsZSwgZmlsZS5uYW1lKTtcbiAgICAgICAgZm9ybURhdGEuYXBwZW5kKCd0aXRsZScsIHRpdGxlKTtcbiAgICAgICAgZm9ybURhdGEuYXBwZW5kKCd0ZWNobm9sb2d5JywgdGVjaCk7XG4gICAgICAgIGZvcm1EYXRhLmFwcGVuZCgnc2l0ZVVybCcsIHNpdGVVcmwpO1xuXG4gICAgICAgIHJlc3VsdENvbnRhaW5lci5pbm5lckhUTUwgPSAnVXBsb2FkaW5nLi4uJztcbiAgICAgICAgZmlsZVVwbG9hZCgnL3VwbG9hZCcsIGZvcm1EYXRhLCBmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgICAgICAgcmVzdWx0Q29udGFpbmVyLmlubmVySFRNTCA9IGRhdGE7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGlmIChmb3JtVXBsb2FkKSB7XG4gICAgICAgIGZvcm1VcGxvYWQuYWRkRXZlbnRMaXN0ZW5lcignc3VibWl0JywgcHJlcGFyZVNlbmRGaWxlKTtcbiAgICB9XG5cbiAgICAvL2Jsb2NrIGJsb2dcblxuICAgIGNvbnN0IGZvcm1CbG9nID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2Jsb2cnKTtcblxuICAgIGlmIChmb3JtQmxvZykge1xuICAgICAgICBmb3JtQmxvZy5hZGRFdmVudExpc3RlbmVyKCdzdWJtaXQnLCBwcmVwYXJlU2VuZFBvc3QpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHByZXBhcmVTZW5kUG9zdChlKSB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgdmFyIHJlc3VsdENvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zdGF0dXMnKTtcbiAgICAgICAgdmFyIGRhdGEgPSB7XG4gICAgICAgICAgICB0aXRsZTogZm9ybUJsb2cudGl0bGUudmFsdWUsXG4gICAgICAgICAgICBkYXRlOiBmb3JtQmxvZy5kYXRlLnZhbHVlLFxuICAgICAgICAgICAgdGV4dDogZm9ybUJsb2cudGV4dC52YWx1ZVxuICAgICAgICB9O1xuICAgICAgICByZXN1bHRDb250YWluZXIuaW5uZXJIVE1MID0gJ1NlbmRpbmcuLi4nO1xuICAgICAgICBzZW5kQWpheEpzb24oJy9hZGRwb3N0JywgZGF0YSwgZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgICAgICAgIHJlc3VsdENvbnRhaW5lci5pbm5lckhUTUwgPSBkYXRhO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvL2Jsb2NrIHNraWxsc1xuXG4gICAgY29uc3QgZm9ybVNraWxscyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNza2lsbHMnKTtcblxuICAgIGlmIChmb3JtU2tpbGxzKSB7XG4gICAgICAgIGZvcm1Ta2lsbHMuYWRkRXZlbnRMaXN0ZW5lcignc3VibWl0JywgcHJlcGFyZVNlbmRTa2lsbHMpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHByZXBhcmVTZW5kU2tpbGxzKGUpIHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB2YXIgcmVzdWx0Q29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnN0YXR1cycpO1xuICAgICAgICB2YXIgZGF0YSA9IHtcbiAgICAgICAgICAgIGh0bWw6IGZvcm1Ta2lsbHMuaHRtbC52YWx1ZSxcbiAgICAgICAgICAgIGNzczogZm9ybVNraWxscy5jc3MudmFsdWUsXG4gICAgICAgICAgICBqczogZm9ybVNraWxscy5qcy52YWx1ZSxcbiAgICAgICAgICAgIHBocDogZm9ybVNraWxscy5waHAudmFsdWUsXG4gICAgICAgICAgICBzcWw6IGZvcm1Ta2lsbHMuc3FsLnZhbHVlLFxuICAgICAgICAgICAgbm9kZTogZm9ybVNraWxscy5ub2RlLnZhbHVlLFxuICAgICAgICAgICAgbW9uZ286IGZvcm1Ta2lsbHMubW9uZ28udmFsdWUsXG4gICAgICAgICAgICBnaXQ6IGZvcm1Ta2lsbHMuZ2l0LnZhbHVlLFxuICAgICAgICAgICAgZ3VscDogZm9ybVNraWxscy5ndWxwLnZhbHVlLFxuICAgICAgICAgICAgYm93ZXI6IGZvcm1Ta2lsbHMuYm93ZXIudmFsdWVcbiAgICAgICAgfTtcblxuICAgICAgICByZXN1bHRDb250YWluZXIuaW5uZXJIVE1MID0gJ1NlbmRpbmcuLi4nO1xuICAgICAgICBzZW5kQWpheEpzb24oJy9hZG1pbicsIGRhdGEsIGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAgICAgICByZXN1bHRDb250YWluZXIuaW5uZXJIVE1MID0gZGF0YTtcbiAgICAgICAgfSk7XG4gICAgfVxufSk7Il19

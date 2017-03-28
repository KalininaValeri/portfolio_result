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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2lkZS1uYXYuanMiLCJmbGlwLmpzIiwibmF2LmpzIiwicGFyYWxsYXgtbW91c2UuanMiLCJwYXJhbGxheC1zY3JvbGwuanMiLCJwcmVsb2FkLmpzIiwic2tpbGxzLWFuaW1hdGUuanMiLCJzbGlkZXIuanMiLCJ2YWxpZGF0aW9uLmpzIiwiYXBwLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN2R0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ25CQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNyREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQy9CQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3hCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3hFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDL0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDN09BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDM0tBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiYXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBDcmVhdGVkIGJ5IGxlcmEgb24gMy83LzE3LlxuICovXG5cbnZhciBBc3NpZGUgPSAoXG4gICAgZnVuY3Rpb24gKCkge1xuXG4gICAgICAgIGlmICghKCQoJy5sLXBhZ2UtbmF2X2FzaWRlJykubGVuZ3RoKSkgcmV0dXJuIGZhbHNlO1xuXG4gICAgICAgIHZhciBzaG93U2VjdGlvbiA9IGZ1bmN0aW9uIChhcnRpY2xlLCBpc0FuaW1hdGUpIHtcbiAgICAgICAgICAgIHZhclxuICAgICAgICAgICAgICAgIGRpcmVjdGlvbiA9IGFydGljbGUucmVwbGFjZSgnIycsICcnKSxcbiAgICAgICAgICAgICAgICByZXFBcnRpY2xlID0gJCgnLmRhdGEtc2VjdGlvbicpLmZpbHRlcignW2RhdGEtc2VjdGlvbj1cIicgKyBkaXJlY3Rpb24gKyAnXCJdJyksXG4gICAgICAgICAgICAgICAgcmVxQXJ0aWNsZVBvcyA9IHJlcUFydGljbGUub2Zmc2V0KCkudG9wO1xuXG4gICAgICAgICAgICBpZiAoaXNBbmltYXRlKSB7XG4gICAgICAgICAgICAgICAgJCgnYm9keSwgaHRtbCcpLmFuaW1hdGUoe3Njcm9sbFRvcDogcmVxQXJ0aWNsZVBvc30sIDUwMCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICQoJ2JvZHksIGh0bWwnKS5zY3JvbGxUb3AocmVxQXJ0aWNsZVBvcyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG5cbiAgICAgICAgdmFyIGNoZWNrU2VjdGlvbiA9IGZ1bmN0aW9uICgpIHtcblxuICAgICAgICAgICAgJCgnLmRhdGEtc2VjdGlvbicpLmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHZhclxuICAgICAgICAgICAgICAgICAgICAkdGhpcyA9ICQodGhpcyksXG4gICAgICAgICAgICAgICAgICAgIHRvcEVkZ2UgPSAkdGhpcy5vZmZzZXQoKS50b3AgLSAzMDAsXG4gICAgICAgICAgICAgICAgICAgIGJvdHRvbUVkZ2UgPSB0b3BFZGdlICsgJHRoaXMuaGVpZ2h0KCksXG4gICAgICAgICAgICAgICAgICAgIHdTY3JvbGwgPSAkKHdpbmRvdykuc2Nyb2xsVG9wKCk7XG5cbiAgICAgICAgICAgICAgICBpZiAodG9wRWRnZSA8IHdTY3JvbGwgJiYgYm90dG9tRWRnZSA+IHdTY3JvbGwpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyXG4gICAgICAgICAgICAgICAgICAgICAgICBjdXJyZW50SWQgPSAkdGhpcy5kYXRhKCdzZWN0aW9uJyksXG4gICAgICAgICAgICAgICAgICAgICAgICBhY3RpdmVMaW5rID0gJCgnLmwtcGFnZS1uYXZfX2xpbmsnKS5maWx0ZXIoJ1tocmVmPVwiIycgKyBjdXJyZW50SWQgKyAnXCJdJyk7XG5cbiAgICAgICAgICAgICAgICAgICAgJCgnLmwtcGFnZS1uYXZfX2xpbmsnKS5lYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5yZW1vdmVDbGFzcygnbC1wYWdlLW5hdl9fbGlua19hY3RpdmUnKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIGFjdGl2ZUxpbmsuYWRkQ2xhc3MoJ2wtcGFnZS1uYXZfX2xpbmtfYWN0aXZlJyk7XG4gICAgICAgICAgICAgICAgICAgIGxvY2F0aW9uLmhhc2ggPSAnIycgKyBjdXJyZW50SWQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgfTtcblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgaW5pdDogZnVuY3Rpb24gKCkge1xuXG5cbiAgICAgICAgICAgICAgICBpZiAoJCh3aW5kb3cpLndpZHRoKCkgPD0gMTIwMCkge1xuICAgICAgICAgICAgICAgICAgICB2YXJcbiAgICAgICAgICAgICAgICAgICAgICAgICRwcm90cmFjdG9yID0gJCgnLmwtcGFnZS1uYXZfYXNpZGVfX3Byb3RyYWN0b3InKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICRzbWFsbE5hdlBhZ2UgPSAkKCcubC1wYWdlLW5hdl9hc2lkZScpO1xuXG4gICAgICAgICAgICAgICAgICAgICQoZG9jdW1lbnQpLm1vdXNldXAoZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICgkc21hbGxOYXZQYWdlLmhhcyhlLnRhcmdldCkubGVuZ3RoID09PSAwKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkc21hbGxOYXZQYWdlLnJlbW92ZUNsYXNzKCdsLXBhZ2UtbmF2X2FjdGl2ZScpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgICAgICAkcHJvdHJhY3Rvci5jbGljayhmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAkc21hbGxOYXZQYWdlLnRvZ2dsZUNsYXNzKCdsLXBhZ2UtbmF2X2FjdGl2ZScpO1xuICAgICAgICAgICAgICAgICAgICB9KTtcblxuXG5cbiAgICAgICAgICAgICAgICAgICAgJCh3aW5kb3cpLnNjcm9sbChmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY2hlY2tTZWN0aW9uKCk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmICgkKHdpbmRvdykud2lkdGgoKSA+IDEyMDApIHtcblxuICAgICAgICAgICAgICAgICAgICAkKHdpbmRvdykuc2Nyb2xsKGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBibG9ja01haW4gPSAkKCcubC1ibG9jay1tYWluJyksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmF2VG9wID0gJCh3aW5kb3cpLnNjcm9sbFRvcCgpIC0gYmxvY2tNYWluLnBvc2l0aW9uKCkudG9wICsgNDAsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmF2VG9wQm90dG9tID0gJCgnLmwtcGFnZS1uYXZfYXNpZGUnKS5oZWlnaHQoKSAtICQoJy5sLXBhZ2UtbmF2X19saXN0JykuaGVpZ2h0KCk7XG5cblxuICAgICAgICAgICAgICAgICAgICAgICAgY2hlY2tTZWN0aW9uKCk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChuYXZUb3AgPCAwKSBuYXZUb3AgPSAwO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAobmF2VG9wID49IG5hdlRvcEJvdHRvbSApIG5hdlRvcCA9IG5hdlRvcEJvdHRvbTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgJCgnLmwtcGFnZS1uYXZfX2xpc3QnKS5jc3MoJ3RvcCcsIG5hdlRvcCk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICQoJy5sLXBhZ2UtbmF2X19saW5rJykub24oJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgICAgICBzaG93U2VjdGlvbigkKHRoaXMpLmF0dHIoJ2hyZWYnKSwgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICBpZiAoISEobG9jYXRpb24uaGFzaCkpe1xuICAgICAgICAgICAgICAgICAgICBzaG93U2VjdGlvbih3aW5kb3cubG9jYXRpb24uaGFzaCwgZmFsc2UpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuKSgpO1xuIiwidmFyIEZsaXAgPSAoZnVuY3Rpb24gKCkge1xuICAgIHZhciBmbGlwQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmZsaXAtY29udGFpbmVyJyk7XG5cbiAgICBpZiAoIShkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZmxpcC1jb250YWluZXInKSkpe1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIFxuICAgIHJldHVybiB7XG4gICAgICAgIGluaXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciBsaW5rQXZ0b3IgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYy1ibG9jay1saW5rX3RvLWF2dG9yJyk7XG5cbiAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jLWJsb2NrLWxpbmtfdG8tYXZ0b3InKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycgLGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgIGZsaXBDb250YWluZXIuY2xhc3NMaXN0LnRvZ2dsZSgnZmxpcC1jb250YWluZXJfYmFjaycpO1xuICAgICAgICAgICAgICAgIGxpbmtBdnRvci5jbGFzc0xpc3QudG9nZ2xlKCdjLWJsb2NrLWxpbmtfYmFjaycpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG59KSgpO1xuIiwidmFyIG5hdmlnYXRpb24gPSAoZnVuY3Rpb24gKCkge1xuICAgIGlmICgkKCcuYy1oYW1idXJnZXJfbmF2JykubGVuZ3RoID0gMCkgeyByZXR1cm4gZmFsc2UgfVxuXG4gICAgdmFyIG5hdmlnYXRpb24gPSAkKCcuYy1uYXZfc2l0ZS1saXN0JyksXG4gICAgICAgIHBhcmVudE5hdiA9ICQoJy5jb250ZW50JyksXG4gICAgICAgIGhhbWJ1cmdlciA9ICQoJy5jLWhhbWJ1cmdlcl9uYXYnKSxcbiAgICAgICAgaXRlbXMgPSAkKCcuYy1uYXZfc2l0ZV9faXRlbScpLFxuICAgICAgICB0aW1lcjtcbiAgICB2YXIgY291bnRlciA9IDA7XG4gICAgdmFyIG5hdkFjdGl2ZSA9ICQoJy5jLW5hdl9zaXRlX2FjdGl2ZScpO1xuXG5cblxuICAgIHZhciBhc2NlbnRJdGVtcyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaXRlbXNbY291bnRlcl0uY2xhc3NMaXN0LmFkZCgnYy1uYXZfc2l0ZV9faGlkZGVuJyk7XG4gICAgICAgIGNvdW50ZXIrKztcblxuICAgICAgICB0aW1lciA9IHNldFRpbWVvdXQoYXNjZW50SXRlbXMsIDEwMCk7XG5cbiAgICAgICAgaWYgKGNvdW50ZXIgPj0gaXRlbXMubGVuZ3RoKSB7XG4gICAgICAgICAgICBjbGVhclRpbWVvdXQodGltZXIpO1xuICAgICAgICB9XG5cbiAgICB9O1xuXG4gICAgdmFyIGxpc3RlbmVyID0gZnVuY3Rpb24gKCkge1xuXG4gICAgICAgICQoJy5jLWhhbWJ1cmdlcl9uYXYnKS5jbGljayhmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBoYW1idXJnZXIudG9nZ2xlQ2xhc3MoJ2MtaGFtYnVyZ2VyX2FjdGl2ZScpO1xuICAgICAgICAgICAgbmF2aWdhdGlvbi50b2dnbGVDbGFzcygnYy1uYXZfc2l0ZV9hY3RpdmUnKTtcblxuICAgICAgICAgICAgaWYgKCEhKHBhcmVudE5hdi5maW5kKCcuYy1uYXZfc2l0ZV9hY3RpdmUnKS5sZW5ndGgpKSB7XG4gICAgICAgICAgICAgICAgdmFyIG5ld1RpbWVyO1xuICAgICAgICAgICAgICAgIGNvdW50ZXIgPSAwO1xuICAgICAgICAgICAgICAgIG5ld1RpbWVyID0gc2V0VGltZW91dChhc2NlbnRJdGVtcywgNjAwKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICghKHBhcmVudE5hdi5maW5kKCcuYy1uYXZfc2l0ZV9hY3RpdmUnKS5sZW5ndGgpKSB7XG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBpdGVtcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICBpdGVtc1tpXS5jbGFzc0xpc3QucmVtb3ZlKCdjLW5hdl9zaXRlX19oaWRkZW4nKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgfTtcblxuICAgIHJldHVybiB7XG4gICAgICAgIGluaXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGxpc3RlbmVyKCk7XG4gICAgICAgIH1cbiAgICB9XG59KCkpO1xuIiwidmFyIHBhcmFsbGF4TW91c2UgPSAoZnVuY3Rpb24gKCkge1xuICAgIGlmIChkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncGFyYWxheCcpID09PSBudWxsKSByZXR1cm4gZmFsc2U7XG5cbiAgICB2YXIgY2FsY3VsYXRlUGFyYWxsYXggPSBmdW5jdGlvbihlKXtcbiAgICAgICAgdmFyIHBhcmFsbGF4Q29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3BhcmFsYXgnKSxcbiAgICAgICAgICAgIGxheWVycyA9IHBhcmFsbGF4Q29udGFpbmVyLmNoaWxkcmVuLFxuICAgICAgICAgICAgcGFnZVggPSBlLnBhZ2VYLFxuICAgICAgICAgICAgcGFnZVkgPSBlLnBhZ2VZLFxuICAgICAgICAgICAgaW5pdGlhbFggPSAod2luZG93LmlubmVyV2lkdGggLyAyKSAtIHBhZ2VYLFxuICAgICAgICAgICAgaW5pdGlhbFkgPSAod2luZG93LmlubmVySGVpZ2h0IC8gMikgLSBwYWdlWTtcblxuICAgICAgICBbXS5zbGljZS5jYWxsKGxheWVycykuZm9yRWFjaChmdW5jdGlvbiAobGF5ZXIsIGkpIHtcbiAgICAgICAgICAgIHZhciBkaXZpZGVyID0gKGkgKyAyKSAvIDUwLFxuICAgICAgICAgICAgICAgIGJvdHRvbVBvc2l0aW9uID0gKHdpbmRvdy5pbm5lckhlaWdodCAvIDIpICogZGl2aWRlcixcbiAgICAgICAgICAgICAgICBwb3NpdGlvblggPSBpbml0aWFsWCAqIGRpdmlkZXIsXG4gICAgICAgICAgICAgICAgcG9zaXRpb25ZID0gaW5pdGlhbFkgKiBkaXZpZGVyLFxuICAgICAgICAgICAgICAgIGxheWVyU3R5bGUgPSBsYXllci5zdHlsZSxcbiAgICAgICAgICAgICAgICB0cmFuc2Zvcm1TdHJpbmcgPSAndHJhbnNsYXRlM2QoJyArIHBvc2l0aW9uWCArICdweCwgJyArIHBvc2l0aW9uWSArICdweCwgMHB4KSc7XG4gICAgICAgICAgICBsYXllclN0eWxlLnRyYW5zZm9ybSA9IHRyYW5zZm9ybVN0cmluZztcbiAgICAgICAgfSlcbiAgICB9O1xuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgaW5pdDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICAgICAgY2FsY3VsYXRlUGFyYWxsYXgoZSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cbn0pKCk7XG5cbiIsInZhciBwYXJhbGxheCA9IChmdW5jdGlvbiAoKSB7XG4gICAgaWYgKCEoZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmwtaGVyb19fYmcnKSkpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgfVxuXG4gICAgdmFyIGJnID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmwtaGVyb19fYmcnKTtcbiAgICB2YXIgdXNlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jLXVzZXInKTtcbiAgICB2YXIgZm9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmMtdXNlcl9fYmcnKTtcblxuICAgIHJldHVybiB7XG4gICAgICAgIG1vdmU6IGZ1bmN0aW9uIChibG9jaywgd2luZG93U2Nyb2xsLCBzdHJhZmVBbW91bmQpIHtcbiAgICAgICAgICAgIHZhciBzdHJhZmUgPSB3aW5kb3dTY3JvbGwgLyAtc3RyYWZlQW1vdW5kICsgJyUnO1xuICAgICAgICAgICAgdmFyIHRyYW5zZm9ybVN0cmluZyA9ICd0cmFuc2xhdGUzZCgwLCcgKyBzdHJhZmUgKyAnLCAwKSc7XG4gICAgICAgICAgICB2YXIgc3R5bGUgPSBibG9jay5zdHlsZTtcblxuICAgICAgICAgICAgc3R5bGUudHJhbnNmb3JtID0gdHJhbnNmb3JtU3RyaW5nO1xuICAgICAgICAgICAgc3R5bGUud2Via2l0VHJhbnNmb3JtID0gdHJhbnNmb3JtU3RyaW5nO1xuXG4gICAgICAgIH0sXG4gICAgICAgIGluaXQ6IGZ1bmN0aW9uICh3U2Nyb2xsKSB7XG4gICAgICAgICAgICB0aGlzLm1vdmUoYmcsIHdTY3JvbGwsIDEwMCk7XG4gICAgICAgICAgICB0aGlzLm1vdmUoZm9uLCB3U2Nyb2xsLCAyMCk7XG4gICAgICAgIH1cbiAgICB9XG59KCkpOyIsInZhciBQcmVsb2FkID0gKGZ1bmN0aW9uICgpIHtcblxuICAgIHZhciBwZXJjZW50c1RvdGFsID0gMCxcbiAgICAgICAgcHJlbG9kZXIgPSAkKCcucHJlbG9hZGVyJyk7XG5cblxuICAgIHZhciBpbWdQYXRoID0gJCgnKicpLm1hcChmdW5jdGlvbiAobmR4LCBlbGVtZW50KSB7XG4gICAgICAgIHZhciBiYWNrZ3JvdW5kID0gJChlbGVtZW50KS5jc3MoJ2JhY2tncm91bmQtaW1hZ2UnKSxcbiAgICAgICAgICAgIGlzSW1nID0gJChlbGVtZW50KS5pcygnaW1nJyksXG4gICAgICAgICAgICBpc1ZpZGVvID0gJChlbGVtZW50KS5pcygndmlkZW8nKSxcbiAgICAgICAgICAgIHBhdGggPSAnJztcblxuICAgICAgICBpZiAoYmFja2dyb3VuZCAhPSAnbm9uZScpe1xuICAgICAgICAgICAgcGF0aCA9IGJhY2tncm91bmQucmVwbGFjZSgndXJsKFwiJywgJycpLnJlcGxhY2UoJ1wiKScsICcnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChpc0ltZyB8fCBpc1ZpZGVvKSB7XG4gICAgICAgICAgICBwYXRoID0gJChlbGVtZW50KS5hdHRyKCdzcmMnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChwYXRoKSB7XG4gICAgICAgICAgICByZXR1cm4gcGF0aDtcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgdmFyIGFuaW1hdGVQZXJjZW50cyA9IGZ1bmN0aW9uIChhbmltYXRlUGVyY2VudCkge1xuICAgICAgICB2YXIgY2lyY2xlUGVyY2VudGFnZXMgPSAkKCcucHJlbG9hZGVyX19jZXJjbGUtcGVyY2VudGFnZXMnKVswXSxcbiAgICAgICAgICAgIGRhc2hvZmZzZXQgPSBhbmltYXRlUGVyY2VudCAvIDEwMCAqIDE1MC43OTY0NDczNzIzMTAwNztcblxuICAgICAgICBjaXJjbGVQZXJjZW50YWdlcy5zdHlsZS5zdHJva2VEYXNoYXJyYXkgPSBkYXNob2Zmc2V0ICsnIDE1MC43OTY0NDczNzIzMTAwNyc7XG4gICAgfTtcblxuICAgIHZhciBzZXRQZXJjZW50cyA9IGZ1bmN0aW9uKHRvdGFsLCBjdXJyZW50KSB7XG5cbiAgICAgIHZhciBwZXJjZW50cyA9IE1hdGguY2VpbChjdXJyZW50IC8gdG90YWwgKiAxMDApO1xuXG4gICAgICAkKCcucHJlbG9kZXJfX3BlcmNlbnRhZ2VzJykudGV4dChwZXJjZW50cyk7XG5cbiAgICAgICAgYW5pbWF0ZVBlcmNlbnRzKHBlcmNlbnRzKTtcblxuICAgICAgaWYgKHBlcmNlbnRzID49IDEwMCkge1xuICAgICAgICAgIHByZWxvZGVyLmZhZGVPdXQoKTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgdmFyIGxvYWRJbWFnZXMgPSBmdW5jdGlvbiAoaW1hZ2VzKSB7XG5cbiAgICAgICAgaWYgKCFpbWFnZXMubGVuZ3RoKSBwcmVsb2Rlci5mYWRlT3V0KCk7XG5cbiAgICAgIGltYWdlcy5mb3JFYWNoKGZ1bmN0aW9uIChpbWcsIGksIGltYWdlcykge1xuICAgICAgICAgIHZhciBmYWtlSW1hZ2UgPSAkKCc8aW1nPicgfHwgJzx2aWRlbz4nLCB7XG4gICAgICAgICAgICAgIGF0dHI6IHtcbiAgICAgICAgICAgICAgICAgIHNyYzogaW1nXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcblxuICAgICAgICAgIGZha2VJbWFnZS5vbignbG9hZCBlcnJvcicsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgcGVyY2VudHNUb3RhbCsrO1xuICAgICAgICAgICAgICBzZXRQZXJjZW50cyhpbWFnZXMubGVuZ3RoLCBwZXJjZW50c1RvdGFsKVxuICAgICAgICAgIH0pXG4gICAgICB9KVxuICAgIH07XG5cbiAgICByZXR1cm4ge1xuICAgICAgICBpbml0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgaW1ncyA9IGltZ1BhdGgudG9BcnJheSgpO1xuICAgICAgICAgICAgbG9hZEltYWdlcyhpbWdzKTtcbiAgICAgICAgfVxuICAgIH1cblxuXG59KCkpO1xuIiwidmFyIHNraWxsc0FuaW1hdGUgPSAoZnVuY3Rpb24gKCkge1xuICAgIHZhciAkc2tpbGxzUGFyZW50ID0gJCgnLmwtc2tpbGxzLWdyb3VwJyksXG4gICAgICAgICRza2lsbHMgPSAkc2tpbGxzUGFyZW50LmZpbmQoJy5jLXNraWxsc19fY2lyY2xlLWFib3ZlJyk7XG5cbiAgICBpZiAoISgkc2tpbGxzUGFyZW50Lmxlbmd0aCkpIHJldHVybiBmYWxzZTtcblxuICAgIHZhciBjaGVja0Rpc3RuY2UgPSBmdW5jdGlvbihzY3JvbGxUb3AsIGVsZW0pe1xuICAgICAgICB2YXIgb2Zmc2V0ID0gZWxlbS5vZmZzZXQoKS50b3A7XG4gICAgICAgIHZhciB3aW5kb3dNYXJnaW4gPSBNYXRoLmNlaWwoJCh3aW5kb3cpLmhlaWdodCgpLzMpO1xuICAgICAgICB2YXIgdG9wQm9yZGVyID0gb2Zmc2V0IC0gc2Nyb2xsVG9wIC0gd2luZG93TWFyZ2luO1xuICAgICAgICB2YXIgYm90dG9tRWRnZSA9IGVsZW0ub3V0ZXJIZWlnaHQodHJ1ZSkgKyBvZmZzZXQ7XG4gICAgICAgIHZhciBib3R0b21Cb3JkZXIgPSBzY3JvbGxUb3AgKyB3aW5kb3dNYXJnaW4gLSBib3R0b21FZGdlO1xuXG4gICAgICAgIHJldHVybiB0b3BCb3JkZXIgPD0gMCAmJiBib3R0b21Cb3JkZXIgPD0gMDtcbiAgICB9O1xuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgaW5pdDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgJCh3aW5kb3cpLm9uKCdzY3JvbGwnLCBmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgIHZhciBzY3JvbGxUb3AgPSAkKHdpbmRvdykuc2Nyb2xsVG9wKCk7XG5cbiAgICAgICAgICAgICAgICBpZiAoY2hlY2tEaXN0bmNlKHNjcm9sbFRvcCwgJHNraWxsc1BhcmVudCkpIHtcbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCAkc2tpbGxzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAkc2tpbGxzW2ldLmNsYXNzTGlzdC5yZW1vdmUoJ2Mtc2tpbGxzX19jaXJjbGUtYWJvdmVfbm8nKTtcblxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgfVxuICAgIH1cbn0pKCk7IiwiXG52YXIgc2xpZGVyUGFyc2VDb250ZW50ID0gZnVuY3Rpb24gKCkge1xuICAgIHZhciBzdHJEYiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNkYicpLmdldEF0dHJpYnV0ZSgnZGF0YS1kYicpO1xuICAgIHZhciBhcnJTdHIgPSBbXTtcbiAgICBzdHJEYiA9IHN0ckRiLnJlcGxhY2UoXCJbe1wiLFwiXCIpO1xuICAgIHN0ckRiID0gc3RyRGIucmVwbGFjZShcIn1dXCIsXCJcIik7XG4gICAgYXJyU3RyID0gc3RyRGIuc3BsaXQoJ30seycpO1xuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcnJTdHIubGVuZ3RoOyBpKyspe1xuICAgICAgICBhcnJTdHJbaV0gPSAneycgK2FyclN0cltpXSsgJ30nO1xuICAgICAgICBhcnJTdHJbaV0gPSBKU09OLnBhcnNlKGFyclN0cltpXSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGFyclN0cjtcbn07XG5cbnZhciBTbGlkZXIgPSAoZnVuY3Rpb24gKCkge1xuXG4gICAgaWYgKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5sLXNsaWRlcicpID09PSBudWxsKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cblxuXG5cbiAgICBzbGlkZXJDb250ZW50ID0gc2xpZGVyUGFyc2VDb250ZW50KCk7XG5cbiAgICB2YXIgZG9jID0gZG9jdW1lbnQ7XG4gICAgdmFyIGFycm93TmV4dCA9IGRvYy5xdWVyeVNlbGVjdG9yKCcjYXJyb3ctdXAnKSxcbiAgICAgICAgYXJyb3dQcmV2ID0gZG9jLnF1ZXJ5U2VsZWN0b3IoJyNhcnJvdy1kb3duJyksXG4gICAgICAgICRzbGlkZUFjdGl2ZUNhcHRpb24gPSAkKCcjc2xpZGUtYWN0aXZlLWNhcHRpb24nKSxcbiAgICAgICAgJHNsaWRlQWN0aXZlQ2FwdGlvblRpdGxlID0gJHNsaWRlQWN0aXZlQ2FwdGlvbi5maW5kKCcuYy1ibG9jay10aXRsZV9fdGV4dCcpLFxuICAgICAgICAkc2xpZGVBY3RpdmVDYXB0aW9uVGVjaG5vbG9neSA9ICRzbGlkZUFjdGl2ZUNhcHRpb24uZmluZCgnLmMtYmxvY2stdGV4dF9ibHVlJyksXG4gICAgICAgICRzbGlkZUFjdGl2ZUNhcHRpb25MaW5rID0gJHNsaWRlQWN0aXZlQ2FwdGlvbi5maW5kKCcuYy1ibG9jay1saW5rX2JsdWUnKSxcbiAgICAgICAgJHNsaWRlckFjdGl2ZVBpY1dyYXBwZXIgPSAkKCcjc2xpZGUtYWN0aXZlLXBpYycpLFxuICAgICAgICAkc2xpZGVBY3RpdmVQaWNTcGFuID0gJHNsaWRlckFjdGl2ZVBpY1dyYXBwZXIuZmluZCgnc3BhbicpLFxuICAgICAgICAkc2xpZGVBY3RpdmVQaWMgPSAkKCcubC1zbGlkZXJfX3BpYycpLFxuICAgICAgICAkc2xpZGVySXRlbXMgPSAkKCcjc2xpZGUtaXRlbXMnKSxcbiAgICAgICAgJGZvbkRhcmsgPSAkKCcubC1zbGlkZXJfX2Fycm93LWRhcmsnKSxcbiAgICAgICAgY3VycmVudFNsaWRlID0gMCxcbiAgICAgICAgc2l6ZSA9IHNsaWRlckNvbnRlbnQubGVuZ3RoLFxuICAgICAgICBpblByb2Nlc3NOZXh0ID0gZmFsc2UsXG4gICAgICAgIGluUHJvY2Vzc1ByZXYgPSBmYWxzZSxcbiAgICAgICAgYW5pbWF0aW9uRW5kO1xuXG4gICAgdmFyIExpc3RlbmVyID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBhcnJvd05leHQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgY3VycmVudFNsaWRlID0gbGltaXRlcihjdXJyZW50U2xpZGUgKyAxKTtcblxuICAgICAgICAgICAgaWYgKGFuaW1hdGlvbkVuZCA+PSAzKSBpblByb2Nlc3NOZXh0ID0gZmFsc2U7XG5cbiAgICAgICAgICAgIGlmICghaW5Qcm9jZXNzTmV4dCkge1xuICAgICAgICAgICAgICAgIGluUHJvY2Vzc05leHQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIGRldGVyQWN0aXZlU2xpZGUoKTtcbiAgICAgICAgICAgICAgICBhbmltYXRpb25FbmQgPSAwO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICBhcnJvd1ByZXYuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgY3VycmVudFNsaWRlID0gbGltaXRlcihjdXJyZW50U2xpZGUgLSAxKTtcblxuICAgICAgICAgICAgaWYgKGFuaW1hdGlvbkVuZCA+PSAzKSBpblByb2Nlc3NQcmV2ID0gZmFsc2U7XG5cbiAgICAgICAgICAgIGlmICghaW5Qcm9jZXNzUHJldikge1xuICAgICAgICAgICAgICAgIGluUHJvY2Vzc1ByZXYgPSB0cnVlO1xuICAgICAgICAgICAgICAgIGRldGVyQWN0aXZlU2xpZGUoKTtcbiAgICAgICAgICAgICAgICBhbmltYXRpb25FbmQgPSAwO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9O1xuXG4gICAgdmFyIGNyZWF0ZUVsZW1lbnQgPSBmdW5jdGlvbiAoY2xhc3NQb3NpdGlvbiwgY2xhc3NWaXNpYmxlKSB7XG4gICAgICAgIHZhciBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5cbiAgICAgICAgZWxlbWVudC5jbGFzc0xpc3QuYWRkKCdsLXNsaWRlcl9fYXJyb3dzLWl0ZW0nKTtcbiAgICAgICAgZWxlbWVudC5jbGFzc0xpc3QuYWRkKGNsYXNzUG9zaXRpb24pO1xuICAgICAgICBlbGVtZW50LmNsYXNzTGlzdC5hZGQoY2xhc3NWaXNpYmxlKTtcblxuICAgICAgICByZXR1cm4gZWxlbWVudDtcbiAgICB9O1xuXG4gICAgdmFyIG5leHRTbGlkZUVsZW1lbnQgPSBjcmVhdGVFbGVtZW50KCdsLXNsaWRlcl9fYXJyb3dzLXVwJywgJ2wtc2xpZGVyX19hcnJvd3MtbmV4dC1uZXh0JyksXG4gICAgICAgIHByZXZTbGlkZUVsZW1lbnQgPSBjcmVhdGVFbGVtZW50KCdsLXNsaWRlcl9fYXJyb3dzLWRvd24nLCAnbC1zbGlkZXJfX2Fycm93cy1wcmV2Jyk7XG5cblxuICAgIHZhciBjcmVhdGVJbWdFbGVtZW50ID0gZnVuY3Rpb24gKHNyYykge1xuICAgICAgICB2YXIgaW1nID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJyk7XG4gICAgICAgIGltZy5jbGFzc0xpc3QuYWRkKCdsLXNsaWRlcl9fYXJyb3ctcGljJyk7XG4gICAgICAgIGltZy5zZXRBdHRyaWJ1dGUoJ3NyYycsICcuLi8uLicgKyBzcmMpO1xuXG4gICAgICAgIHJldHVybiBpbWc7XG4gICAgfTtcblxuICAgIHZhciBjcmVhdGVEaXZFbGVtZW50ID0gZnVuY3Rpb24gKHRleHQpIHtcbiAgICAgICAgdmFyIGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcblxuICAgICAgICByZXR1cm4gZGl2O1xuICAgIH07XG5cbiAgICB2YXIgdGV4dEFuaW1hdGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhclxuICAgICAgICAgICAgc3RyVGl0bGUgPSBzbGlkZXJDb250ZW50W2N1cnJlbnRTbGlkZV0udGl0bGUsXG4gICAgICAgICAgICBzdHJUZWNobm9sb2d5ID0gc2xpZGVyQ29udGVudFtjdXJyZW50U2xpZGVdLnRlY2hub2xvZ3ksXG4gICAgICAgICAgICBjaGFyc1RpdGxlID0gc3RyVGl0bGUuc3BsaXQoJycpLFxuICAgICAgICAgICAgY2hhcnNUZWNobm9sb2d5ID0gc3RyVGVjaG5vbG9neS5zcGxpdCgnJyksXG4gICAgICAgICAgICBjb3VudGVyVGl0bGUgPSAwLFxuICAgICAgICAgICAgY291bnRlclRlY2ggPSAwLFxuICAgICAgICAgICAgdGltZXI7XG5cbiAgICAgICAgJHNsaWRlQWN0aXZlQ2FwdGlvblRpdGxlWzBdLmlubmVySFRNTCA9ICcnO1xuICAgICAgICAkc2xpZGVBY3RpdmVDYXB0aW9uVGVjaG5vbG9neVswXS5pbm5lckhUTUwgPSAnJztcblxuICAgICAgICB2YXIgZWFjaENoYXJUaXRsZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciBjaGFyID0gZG9jLmNyZWF0ZVRleHROb2RlKGNoYXJzVGl0bGVbY291bnRlclRpdGxlXSk7XG5cbiAgICAgICAgICAgICRzbGlkZUFjdGl2ZUNhcHRpb25UaXRsZVswXS5hcHBlbmRDaGlsZChjaGFyKTtcblxuICAgICAgICAgICAgY291bnRlclRpdGxlKys7XG4gICAgICAgICAgICB0aW1lciA9IHNldFRpbWVvdXQoZWFjaENoYXJUaXRsZSwgNTApO1xuXG4gICAgICAgICAgICBpZiAoY291bnRlclRpdGxlID09PSBjaGFyc1RpdGxlLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwodGltZXIpO1xuICAgICAgICAgICAgICAgIGFuaW1hdGlvbkVuZCsrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuXG4gICAgICAgIHZhciBlYWNoQ2hhclRlY2ggPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgY2hhciA9IGRvYy5jcmVhdGVUZXh0Tm9kZShjaGFyc1RlY2hub2xvZ3lbY291bnRlclRlY2hdKTtcblxuICAgICAgICAgICAgJHNsaWRlQWN0aXZlQ2FwdGlvblRlY2hub2xvZ3lbMF0uYXBwZW5kQ2hpbGQoY2hhcik7XG5cbiAgICAgICAgICAgIGNvdW50ZXJUZWNoKys7XG4gICAgICAgICAgICB0aW1lciA9IHNldFRpbWVvdXQoZWFjaENoYXJUZWNoLCA1MCk7XG5cbiAgICAgICAgICAgIGlmIChjb3VudGVyVGVjaCA9PT0gY2hhcnNUZWNobm9sb2d5Lmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwodGltZXIpO1xuICAgICAgICAgICAgICAgIGFuaW1hdGlvbkVuZCsrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuXG4gICAgICAgIGVhY2hDaGFyVGl0bGUoKTtcbiAgICAgICAgZWFjaENoYXJUZWNoKCk7XG4gICAgfTtcblxuXG4gICAgdmFyIGJ1aWxkU2xpZGVyID0gZnVuY3Rpb24gKCkge1xuXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc2xpZGVyQ29udGVudC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgdmFyXG4gICAgICAgICAgICAgICAgcHJldlNsaWRlRWxlbWVudCA9IGNyZWF0ZUVsZW1lbnQoJ2wtc2xpZGVyX19hcnJvd3MtZG93bicsICdsLXNsaWRlcl9fYXJyb3dzLXByZXYnKTtcblxuICAgICAgICAgICAgcHJldlNsaWRlRWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2lkJywgJ3ByZXYnICsgaSk7XG4gICAgICAgICAgICBwcmV2U2xpZGVFbGVtZW50LmFwcGVuZENoaWxkKGNyZWF0ZUltZ0VsZW1lbnQoc2xpZGVyQ29udGVudFtpXS5waWN0dXJlKSk7XG4gICAgICAgICAgICBwcmV2U2xpZGVFbGVtZW50LmFwcGVuZENoaWxkKGNyZWF0ZURpdkVsZW1lbnQoIGkrMSApKTtcbiAgICAgICAgICAgICRzbGlkZXJJdGVtc1swXS5pbnNlcnRCZWZvcmUocHJldlNsaWRlRWxlbWVudCwgJGZvbkRhcmtbMF0pO1xuICAgICAgICB9XG5cbiAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCBzbGlkZXJDb250ZW50Lmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgICB2YXJcbiAgICAgICAgICAgICAgICBuZXh0U2xpZGVFbGVtZW50ID0gY3JlYXRlRWxlbWVudCgnbC1zbGlkZXJfX2Fycm93cy11cCcsICdsLXNsaWRlcl9fYXJyb3dzLW5leHQnKTtcblxuICAgICAgICAgICAgbmV4dFNsaWRlRWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2lkJywgJ25leHQnICsgaik7XG4gICAgICAgICAgICBuZXh0U2xpZGVFbGVtZW50LmFwcGVuZENoaWxkKGNyZWF0ZUltZ0VsZW1lbnQoc2xpZGVyQ29udGVudFtqXS5waWN0dXJlKSk7XG4gICAgICAgICAgICBuZXh0U2xpZGVFbGVtZW50LmFwcGVuZENoaWxkKGNyZWF0ZURpdkVsZW1lbnQoaiArIDEpKTtcbiAgICAgICAgICAgICRzbGlkZXJJdGVtc1swXS5pbnNlcnRCZWZvcmUobmV4dFNsaWRlRWxlbWVudCwgJGZvbkRhcmtbMF0pO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIHZhciBkZXRlckFjdGl2ZVNsaWRlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXJcbiAgICAgICAgICAgIG1haW5TbGlkZSA9IHNsaWRlckNvbnRlbnRbbGltaXRlcihjdXJyZW50U2xpZGUpXSxcbiAgICAgICAgICAgIGl0ZW1zUHJldiA9ICRzbGlkZXJJdGVtcy5jaGlsZHJlbignLmwtc2xpZGVyX19hcnJvd3MtcHJldicpLFxuICAgICAgICAgICAgaXRlbXNOZXh0ID0gJHNsaWRlckl0ZW1zLmNoaWxkcmVuKCcubC1zbGlkZXJfX2Fycm93cy1uZXh0Jyk7XG5cbiAgICAgICAgdGV4dEFuaW1hdGUoKTtcblxuICAgICAgICAkc2xpZGVyQWN0aXZlUGljV3JhcHBlclswXS5jbGFzc0xpc3QuYWRkKCdsLXNsaWRlcl9fcGljLXdyYXBwZXJfdHJhbnNmb3JtJyk7XG5cbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAkc2xpZGVyQWN0aXZlUGljV3JhcHBlclswXS5jbGFzc0xpc3QucmVtb3ZlKCdsLXNsaWRlcl9fcGljLXdyYXBwZXJfdHJhbnNmb3JtJyk7XG4gICAgICAgICAgICAkc2xpZGVBY3RpdmVQaWNbMF0uc2V0QXR0cmlidXRlKCdzcmMnLCAnLi4vLi4nICsgbWFpblNsaWRlLnBpY3R1cmUpO1xuICAgICAgICAgICAgLy8gJHNsaWRlQWN0aXZlUGljU3BhblswXS5pbm5lclRleHQgPSBjdXJyZW50U2xpZGUgKyAxO1xuICAgICAgICAgICAgJHNsaWRlQWN0aXZlQ2FwdGlvbkxpbmtbMF0uc2V0QXR0cmlidXRlKCdocmVmJywgbWFpblNsaWRlLnNpdGVVcmwpO1xuICAgICAgICAgICAgYW5pbWF0aW9uRW5kKys7XG4gICAgICAgIH0sIDUwMCk7XG5cbiAgICAgICAgJCgnLmwtc2xpZGVyX19hcnJvd3MtbmV4dC5sLXNsaWRlcl9fYXJyb3dzLWl0ZW1fYWN0aXZlJykuYW5pbWF0ZSh7dG9wOiAnLTEwMCUnfSwgNTAwKTtcbiAgICAgICAgJCgnI25leHQnICsgW2xpbWl0ZXIoY3VycmVudFNsaWRlICsgMSldKS5hbmltYXRlKHt0b3A6ICcwJ30sIDUwMCk7XG4gICAgICAgICQoJy5sLXNsaWRlcl9fYXJyb3dzLXByZXYubC1zbGlkZXJfX2Fycm93cy1pdGVtX2FjdGl2ZScpLmFuaW1hdGUoe3RvcDogJzEwMCUnfSwgNTAwKTtcbiAgICAgICAgJCgnI3ByZXYnICsgW2xpbWl0ZXIoY3VycmVudFNsaWRlIC0gMSldKS5hbmltYXRlKHt0b3A6ICcwJ30sIDUwMCk7XG5cbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBpdGVtc1ByZXYubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGl0ZW1zUHJldltpXS5jbGFzc0xpc3QucmVtb3ZlKCdsLXNsaWRlcl9fYXJyb3dzLWl0ZW1fYWN0aXZlJyk7XG4gICAgICAgICAgICBpdGVtc05leHRbaV0uY2xhc3NMaXN0LnJlbW92ZSgnbC1zbGlkZXJfX2Fycm93cy1pdGVtX2FjdGl2ZScpO1xuXG4gICAgICAgICAgICBpZiAoaXRlbXNQcmV2W2ldLmhhc0F0dHJpYnV0ZSgnc3R5bGUnKSkge1xuICAgICAgICAgICAgICAgIGl0ZW1zUHJldltpXS5yZW1vdmVBdHRyaWJ1dGUoJ3N0eWxlJyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChpdGVtc05leHRbaV0uaGFzQXR0cmlidXRlKCdzdHlsZScpKSB7XG4gICAgICAgICAgICAgICAgaXRlbXNOZXh0W2ldLnJlbW92ZUF0dHJpYnV0ZSgnc3R5bGUnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGl0ZW1zUHJldltsaW1pdGVyKGN1cnJlbnRTbGlkZSAtIDEpXS5jbGFzc0xpc3QuYWRkKCdsLXNsaWRlcl9fYXJyb3dzLWl0ZW1fYWN0aXZlJyk7XG4gICAgICAgIGl0ZW1zTmV4dFtsaW1pdGVyKGN1cnJlbnRTbGlkZSArIDEpXS5jbGFzc0xpc3QuYWRkKCdsLXNsaWRlcl9fYXJyb3dzLWl0ZW1fYWN0aXZlJyk7XG4gICAgfTtcblxuICAgIHZhciBsaW1pdGVyID0gZnVuY3Rpb24gKHZhbCkge1xuXG4gICAgICAgIGlmICh2YWwgPj0gc2l6ZSkge1xuICAgICAgICAgICAgdmFsID0gMDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh2YWwgPCAwKSB7XG4gICAgICAgICAgICB2YWwgPSBzaXplIC0gMTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB2YWw7XG4gICAgfTtcblxuICAgIHJldHVybiB7XG4gICAgICAgIGluaXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICQoJy5sLXNsaWRlciAnKS5vdXRlckhlaWdodCgkKHdpbmRvdykuaGVpZ2h0KCkpO1xuXG4gICAgICAgICAgICAkKHdpbmRvdykucmVzaXplKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAkKCcubC1zbGlkZXIgJykub3V0ZXJIZWlnaHQoJCh3aW5kb3cpLmhlaWdodCgpKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBidWlsZFNsaWRlcigpO1xuICAgICAgICAgICAgZGV0ZXJBY3RpdmVTbGlkZSgpO1xuICAgICAgICAgICAgTGlzdGVuZXIoKTtcbiAgICAgICAgfVxuICAgIH1cbn0oKSk7XG4iLCJ2YXIgdmFsaWRhdGlvbkF2dG9yID0gKGZ1bmN0aW9uICgpIHtcblxuXG4gICAgaWYgKCEoJCgnLmMtZm9ybS1hdnRvcicpKSkgcmV0dXJuIGZhbHNlO1xuXG4gICAgY29uc3QgZm9ybUxvZ2luID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2xvZ2luJyk7XG4gICAgdmFyIG51bWJlckNoZWNla2QgPSAwO1xuICAgIHZhciByZXN1bHRDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYy1mb3JtLWF2dG9yX19zdGF0dXMnKTtcblxuICAgIHZhciB2YWxpZCA9IGZ1bmN0aW9uICgpIHtcblxuICAgICAgICB2YXJcbiAgICAgICAgICAgICRmb3JtID0gJCgnLmMtZm9ybS1hdnRvcicpLFxuICAgICAgICAgICAgJGlucHV0ID0gJGZvcm0uZmluZCgnLmMtZm9ybS1hdnRvcl9faW5wdXQnKSxcbiAgICAgICAgICAgICRjaGVja0JveCA9ICRmb3JtLmZpbmQoJ2lucHV0W3R5cGU9XCJjaGVja2JveFwiXScpLFxuICAgICAgICAgICAgJHJhZGlvID0gJGZvcm0uZmluZCgnaW5wdXRbdHlwZT1cInJhZGlvXCJdJyksXG4gICAgICAgICAgICBudW1iZXJFbXB0eUlucHV0ID0gMDtcblxuXG4gICAgICAgICRmb3JtLmZpbmQoJy5lcnJvcicpLnJlbW92ZSgpO1xuXG4gICAgICAgICRpbnB1dC5lYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciAkdGhpcyA9ICQodGhpcyk7XG5cbiAgICAgICAgICAgICR0aGlzLnBhcmVudHMoJy5jLWZvcm0tYXZ0b3JfX2lucHV0LXdyYXBwZXIgJylcbiAgICAgICAgICAgICAgICAucmVtb3ZlQXR0cignc3R5bGUnKTtcblxuICAgICAgICAgICAgaWYgKCR0aGlzLnZhbCgpID09PSAnJykge1xuXG4gICAgICAgICAgICAgICAgJHRoaXMucGFyZW50cygnLmMtZm9ybS1hdnRvcl9faW5wdXQtd3JhcHBlciAnKVxuICAgICAgICAgICAgICAgICAgICAuY3NzKHsnYm9yZGVyJzogJzJweCBzb2xpZCByZWQnfSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIG51bWJlckVtcHR5SW5wdXQrKztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgJGNoZWNrQm94LmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyICR0aGlzID0gJCh0aGlzKTtcblxuICAgICAgICAgICAgaWYgKCEhJHRoaXMucHJvcCgnY2hlY2tlZCcpKSB7XG4gICAgICAgICAgICAgICAgbnVtYmVyQ2hlY2VrZCsrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICAkcmFkaW8uZWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgJHRoaXMgPSAkKHRoaXMpO1xuXG4gICAgICAgICAgICBpZiAoISEkdGhpcy5wcm9wKCdjaGVja2VkJykpIHtcbiAgICAgICAgICAgICAgICBudW1iZXJDaGVjZWtkKys7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlmIChudW1iZXJFbXB0eUlucHV0IDw9IDEpIHtcbiAgICAgICAgICAgIHJlc3VsdENvbnRhaW5lci5pbm5lckhUTUwgPSAn0JfQsNC/0L7Qu9C90LjRgtC1INCy0YHQtSDQv9C+0LvRjyDRhNC+0YDQvNGLJztcbiAgICAgICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKG51bWJlckNoZWNla2QgPD0gMiB8fCAkKCcjaHonKS5wcm9wKCdjaGVja2VkJykpIHtcbiAgICAgICAgICAgIHJlc3VsdENvbnRhaW5lci5pbm5lckhUTUwgPSAn0KDQvtCx0L7RgtCw0Lwg0YLRg9GCINC90LUg0LzQtdGB0YLQvic7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgdmFyIHByZXBhcmVBdXRoID0gZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgIG51bWJlckNoZWNla2QgPSAwO1xuXG4gICAgICAgIHZhbGlkKCk7XG5cbiAgICAgICAgaWYgKG51bWJlckNoZWNla2QgPCAyIHx8ICQoJyNoeicpLnByb3AoJ2NoZWNrZWQnKSkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIGRhdGEgPSB7XG4gICAgICAgICAgICBsb2dpbjogZm9ybUxvZ2luLmxvZ2luLnZhbHVlLFxuICAgICAgICAgICAgcGFzc3dvcmQ6IGZvcm1Mb2dpbi5wYXNzd29yZC52YWx1ZVxuICAgICAgICB9O1xuICAgICAgICByZXN1bHRDb250YWluZXIuc3R5bGUuY29sb3IgPSAnd2hpdGUnO1xuICAgICAgICByZXN1bHRDb250YWluZXIuaW5uZXJIVE1MID0gJ1NlbmRpbmcuLi4nO1xuICAgICAgICBzZW5kQWpheEpzb24oJy8nLCBkYXRhLCBmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgICAgICAgcmVzdWx0Q29udGFpbmVyLmlubmVySFRNTCA9IGRhdGE7XG5cbiAgICAgICAgICAgIGlmIChkYXRhID09ICfQkNCy0YLQvtGA0LjQt9Cw0YbQuNGPINGD0YHQv9C10YjQvdCwIScpIHtcbiAgICAgICAgICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9ICcvYWRtaW4nO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9O1xuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgaW5pdDogZnVuY3Rpb24gKCkge1xuXG5cbiAgICAgICAgICAgIGZvcm1Mb2dpbi5hZGRFdmVudExpc3RlbmVyKCdzdWJtaXQnLCBwcmVwYXJlQXV0aCk7XG4gICAgICAgIH1cbiAgICB9XG59KSgpO1xuXG52YXIgdmFsaWRhdGlvbkNvbnRhY3RNZSA9IChmdW5jdGlvbiAoKSB7XG4gICAgaWYgKCEkKCcuYy1mb3JtX2NvbnRhY3QtbWUnKS5sZW5ndGgpIHJldHVybiBmYWxzZTtcblxuICAgIHZhciAkZm9ybUNvbnRhY3RNZSA9ICQoJy5jLWZvcm1fY29udGFjdC1tZScpLFxuICAgICAgICAkaW5wdXRzID0gJGZvcm1Db250YWN0TWUuZmluZCgnLmMtZm9ybV9faW5wdXQnKSxcbiAgICAgICAgcmVzdWx0Q29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmMtZm9ybS1hdnRvcl9fc3RhdHVzJyk7XG4gICAgY29uc3QgZm9ybU1haWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjbWFpbCcpO1xuXG4gICAgdmFyIHJlc2V0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAkZm9ybUNvbnRhY3RNZS5maW5kKCcuZXJyb3InKS5yZW1vdmUoKTtcbiAgICAgICAgJGlucHV0cy5lYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICQodGhpcykuY3NzKHsnYm9yZWRlcic6ICdub25lJ30pO1xuICAgICAgICB9KTtcbiAgICB9O1xuXG4gICAgdmFyIHZhbGlkID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXJcbiAgICAgICAgICAgIGNvdW50ZXIgPSAwO1xuXG4gICAgICAgICRpbnB1dHMuZWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgJHRoaXMgPSAkKHRoaXMpO1xuXG4gICAgICAgICAgICAkdGhpcy5yZW1vdmVBdHRyKCdzdHlsZScpO1xuXG4gICAgICAgICAgICBpZiAoISEkdGhpcy52YWwoKSkge1xuICAgICAgICAgICAgICAgIGNvdW50ZXIrKztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKCEkdGhpcy52YWwoKSkge1xuICAgICAgICAgICAgICAgICR0aGlzLmNzcyh7J2JvcmRlcic6ICcxcHggc29saWQgcmVkJ30pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9O1xuXG4gICAgZnVuY3Rpb24gcHJlcGFyZVNlbmRNYWlsKGUpIHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgIHZhbGlkKCk7XG5cbiAgICAgICAgdmFyIGRhdGEgPSB7XG4gICAgICAgICAgICBuYW1lOiBmb3JtTWFpbC5uYW1lLnZhbHVlLFxuICAgICAgICAgICAgZW1haWw6IGZvcm1NYWlsLmVtYWlsLnZhbHVlLFxuICAgICAgICAgICAgdGV4dDogZm9ybU1haWwudGV4dC52YWx1ZVxuICAgICAgICB9O1xuICAgICAgICByZXN1bHRDb250YWluZXIuaW5uZXJIVE1MID0gJ1NlbmRpbmcuLi4nO1xuICAgICAgICBzZW5kQWpheEpzb24oJy93b3JrJywgZGF0YSwgZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgICAgICAgIHJlc3VsdENvbnRhaW5lci5pbm5lckhUTUwgPSBkYXRhO1xuICAgICAgICB9KTtcbiAgICB9XG5cblxuICAgIHJldHVybiB7XG4gICAgICAgIGluaXQ6IGZ1bmN0aW9uICgpIHtcblxuXG4gICAgICAgICAgICBmb3JtTWFpbC5hZGRFdmVudExpc3RlbmVyKCdzdWJtaXQnLCBwcmVwYXJlU2VuZE1haWwpO1xuXG5cbiAgICAgICAgICAgIC8vICRmb3JtQ29udGFjdE1lLmZpbmQoJy5jLWZvcm0nKS5zdWJtaXQoZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgIC8vICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAvLyAgICAgcmVzZXQoKTtcbiAgICAgICAgICAgIC8vICAgICB2YWxpZCgpO1xuICAgICAgICAgICAgLy9cbiAgICAgICAgICAgIC8vIH0pO1xuXG4gICAgICAgICAgICAkZm9ybUNvbnRhY3RNZS5maW5kKCcuYy1mb3JtX19idXR0b20nKS5jbGljayhmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgcmVzZXQoKTtcbiAgICAgICAgICAgICAgICAkaW5wdXRzLmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgJHRoaXMgPSAkKHRoaXMpO1xuICAgICAgICAgICAgICAgICAgICAkdGhpcy52YWwoJycpO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cbn0pKCk7IiwiZnVuY3Rpb24gc2VuZEFqYXhKc29uKHVybCwgZGF0YSwgY2IpIHtcbiAgICB2YXIgeGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG4gICAgeGhyLm9wZW4oJ1BPU1QnLCB1cmwsIHRydWUpO1xuICAgIHhoci5zZXRSZXF1ZXN0SGVhZGVyKCdDb250ZW50LVR5cGUnLCAnYXBwbGljYXRpb24vanNvbicpO1xuICAgIHhoci5vbmxvYWQgPSBmdW5jdGlvbiAoZSkge1xuICAgICAgICB2YXIgcmVzdWx0ID0gSlNPTi5wYXJzZSh4aHIucmVzcG9uc2VUZXh0KTtcbiAgICAgICAgY2IocmVzdWx0LnN0YXR1cyk7XG4gICAgfTtcbiAgICB4aHIuc2VuZChKU09OLnN0cmluZ2lmeShkYXRhKSk7XG59XG5cbnZhciBibHVyID0gKGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgY29udGFpbmVyID0gJCgnLmMtZm9ybS1jb250YWluZXInKSxcbiAgICAgICAgZm9ybSA9ICQoJy5jLWZvcm0td3JhcHBlcicpO1xuXG4gICAgaWYgKGNvbnRhaW5lci5sZW5ndGggPT09IDApIHJldHVybiBmYWxzZTtcblxuICAgIHJldHVybiB7XG4gICAgICAgIHNldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIGltZyA9ICQoJy5jLWJsb2NrLWJnX3BpYycpLFxuICAgICAgICAgICAgICAgIGltZ1dpZHRoID0gaW1nLndpZHRoKCksXG4gICAgICAgICAgICAgICAgaW1nSGVpZ2h0ID0gaW1nLmhlaWdodCgpLFxuICAgICAgICAgICAgICAgIGJsdXJDc3MgPSBmb3JtWzBdLnN0eWxlLFxuICAgICAgICAgICAgICAgIHBvc0xlZnQgPSAtY29udGFpbmVyLm9mZnNldCgpLmxlZnQsXG4gICAgICAgICAgICAgICAgcG9zVG9wID0gLWNvbnRhaW5lci5wb3NpdGlvbigpLnRvcDtcblxuICAgICAgICAgICAgYmx1ckNzcy5iYWNrZ3JvdW5kU2l6ZSA9IGltZ1dpZHRoICsgJ3B4JyArICcgJyArIGltZ0hlaWdodCArICdweCc7XG4gICAgICAgICAgICBibHVyQ3NzLmJhY2tncm91bmRQb3NpdGlvbiA9IHBvc0xlZnQgKyAncHgnICsgJyAnICsgcG9zVG9wICsgJ3B4JztcbiAgICAgICAgICAgIGZvcm0uY3NzKHtcbiAgICAgICAgICAgICAgICAnYmFja2dyb3VuZC1zaXplJzogaW1nV2lkdGggKyAncHgnICsgJyAnICsgaW1nSGVpZ2h0ICsgJ3B4JyxcbiAgICAgICAgICAgICAgICAnYmFja2dyb3VuZC1wb3NpdGlvbic6IHBvc0xlZnQgKyAncHgnICsgJyAnICsgcG9zVG9wICsgJ3B4J1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG59KCkpO1xuXG52YXIgQXBwID0gKGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgICBpbml0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBQcmVsb2FkLmluaXQoKTtcblxuXG4gICAgICAgICAgICBpZiAoISEoZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmMtaGFtYnVyZ2VyX25hdicpKSkge1xuICAgICAgICAgICAgICAgIG5hdmlnYXRpb24uaW5pdCgpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoISEoZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmwtc2xpZGVyJykpKSB7XG4gICAgICAgICAgICAgICAgU2xpZGVyLmluaXQoKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKCEhKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5mbGlwLWNvbnRhaW5lcicpKSkge1xuICAgICAgICAgICAgICAgIEZsaXAuaW5pdCgpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoISEoZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmwtcGFnZS1uYXZfYXNpZGUnKSkpIHtcbiAgICAgICAgICAgICAgICBBc3NpZGUuaW5pdCgpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoISEoZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmMtZm9ybS1hdnRvcicpKSkge1xuICAgICAgICAgICAgICAgIHZhbGlkYXRpb25BdnRvci5pbml0KCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICghIShkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYy1mb3JtX2NvbnRhY3QtbWUnKSkpIHtcbiAgICAgICAgICAgICAgICB2YWxpZGF0aW9uQ29udGFjdE1lLmluaXQoKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKCEhZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3BhcmFsYXgnKSkge1xuICAgICAgICAgICAgICAgIHBhcmFsbGF4TW91c2UuaW5pdCgpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoISFkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubC1za2lsbHMtZ3JvdXAnKSkge1xuICAgICAgICAgICAgICAgIHNraWxsc0FuaW1hdGUuaW5pdCgpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoISEoZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmwtaGVyb19fYmcnKSkpIHtcbiAgICAgICAgICAgICAgICB3aW5kb3cub25zY3JvbGwgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciB3U2Nyb2xsID0gd2luZG93LnBhZ2VZT2Zmc2V0O1xuICAgICAgICAgICAgICAgICAgICBwYXJhbGxheC5pbml0KHdTY3JvbGwpO1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYy1mb3JtLWNvbnRhaW5lcicpICE9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgYmx1ci5zZXQoKTtcbiAgICAgICAgICAgICAgICAkKHdpbmRvdykucmVzaXplKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgYmx1ci5zZXQoKTtcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmwtaGVybycpICE9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgJCgnLmwtaGVybycpLmhlaWdodCgkKHdpbmRvdykuaGVpZ2h0KCkpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoISEoZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmZsaXAtY29udGFpbmVyJykpKSB7XG5cbiAgICAgICAgICAgICAgICB2YXJcbiAgICAgICAgICAgICAgICAgICAgZmxpcENvbnRhaW5lciA9ICQoJy5mbGlwLWNvbnRhaW5lcicpLFxuICAgICAgICAgICAgICAgICAgICBoZWlnaHRGb3JGbGlwID0gJCh3aW5kb3cpLmhlaWdodCgpIC0gJCgnLmwtaGVhZGVyLWluZGV4JykuaGVpZ2h0KCkgLSAkKCcubC1mb290ZXItc21hbGwnKS5oZWlnaHQoKSAtIDIwLFxuICAgICAgICAgICAgICAgICAgICBoZWlnaHRGbGlwID0gZmxpcENvbnRhaW5lci5oZWlnaHQoKSArIDQ3O1xuXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coaGVpZ2h0RmxpcCwgaGVpZ2h0Rm9yRmxpcCk7XG5cbiAgICAgICAgICAgICAgICBpZiAoaGVpZ2h0Rm9yRmxpcCA8PSBoZWlnaHRGbGlwKSB7XG4gICAgICAgICAgICAgICAgICAgIGZsaXBDb250YWluZXIuYWRkQ2xhc3MoJ3N0YXRpYycpO1xuXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKGhlaWdodEZvckZsaXAgPiBoZWlnaHRGbGlwKSB7XG4gICAgICAgICAgICAgICAgICAgIGZsaXBDb250YWluZXIucmVtb3ZlQ2xhc3MoJ3N0YXRpYycpO1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhoZWlnaHRGbGlwLCBoZWlnaHRGb3JGbGlwKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn0pKCk7XG5cbiQoZnVuY3Rpb24gKCkge1xuICAgIGlmICghIShkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbWFwJykpKSB7XG4gICAgICAgIHltYXBzLnJlYWR5KGluaXQpO1xuICAgICAgICB2YXIgbXlNYXA7XG5cbiAgICAgICAgZnVuY3Rpb24gaW5pdCgpIHtcbiAgICAgICAgICAgIG15TWFwID0gbmV3IHltYXBzLk1hcChcIm1hcFwiLCB7XG4gICAgICAgICAgICAgICAgY2VudGVyOiBbNTUsIDgyLjkyNTIzM10sXG4gICAgICAgICAgICAgICAgem9vbTogMTNcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgQXBwLmluaXQoKTtcblxuXG5cbiAgICB2YXIgZm9ybVVwbG9hZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN1cGxvYWQnKTtcblxuICAgIHZhciBmaWxlVXBsb2FkID0gZnVuY3Rpb24gKHVybCwgZGF0YSwgY2IpIHtcbiAgICAgICAgdmFyIHhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuICAgICAgICB4aHIub3BlbignUE9TVCcsIHVybCwgdHJ1ZSk7XG5cbiAgICAgICAgeGhyLm9ubG9hZCA9IGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICB2YXIgcmVzdWx0ID0gSlNPTi5wYXJzZSh4aHIucmVzcG9uc2VUZXh0KTtcbiAgICAgICAgICAgIGNiKHJlc3VsdC5zdGF0dXMpO1xuICAgICAgICB9O1xuXG4gICAgICAgIHhoci5zZW5kKGRhdGEpO1xuICAgIH07XG5cbiAgICBmdW5jdGlvbiBwcmVwYXJlU2VuZEZpbGUoZSkge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIHZhciByZXN1bHRDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc3RhdHVzJyk7XG4gICAgICAgIHZhciBmb3JtRGF0YSA9IG5ldyBGb3JtRGF0YSgpO1xuICAgICAgICB2YXIgZmlsZSA9IGRvY3VtZW50XG4gICAgICAgICAgICAucXVlcnlTZWxlY3RvcignI2ZpbGUtc2VsZWN0JylcbiAgICAgICAgICAgIC5maWxlc1swXTtcbiAgICAgICAgdmFyIHRpdGxlID0gZG9jdW1lbnRcbiAgICAgICAgICAgIC5xdWVyeVNlbGVjdG9yKCcjZmlsZS10aXRsZScpXG4gICAgICAgICAgICAudmFsdWU7XG4gICAgICAgIHZhciB0ZWNoID0gZG9jdW1lbnRcbiAgICAgICAgICAgIC5xdWVyeVNlbGVjdG9yKCcjZmlsZS10ZWNoJylcbiAgICAgICAgICAgIC52YWx1ZTtcbiAgICAgICAgdmFyIHNpdGVVcmwgPSBkb2N1bWVudFxuICAgICAgICAgICAgLnF1ZXJ5U2VsZWN0b3IoJyNmaWxlLXNpdGUnKVxuICAgICAgICAgICAgLnZhbHVlO1xuXG4gICAgICAgIGZvcm1EYXRhLmFwcGVuZCgncGhvdG8nLCBmaWxlLCBmaWxlLm5hbWUpO1xuICAgICAgICBmb3JtRGF0YS5hcHBlbmQoJ3RpdGxlJywgdGl0bGUpO1xuICAgICAgICBmb3JtRGF0YS5hcHBlbmQoJ3RlY2hub2xvZ3knLCB0ZWNoKTtcbiAgICAgICAgZm9ybURhdGEuYXBwZW5kKCdzaXRlVXJsJywgc2l0ZVVybCk7XG5cbiAgICAgICAgcmVzdWx0Q29udGFpbmVyLmlubmVySFRNTCA9ICdVcGxvYWRpbmcuLi4nO1xuICAgICAgICBmaWxlVXBsb2FkKCcvdXBsb2FkJywgZm9ybURhdGEsIGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAgICAgICByZXN1bHRDb250YWluZXIuaW5uZXJIVE1MID0gZGF0YTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgaWYgKGZvcm1VcGxvYWQpIHtcbiAgICAgICAgZm9ybVVwbG9hZC5hZGRFdmVudExpc3RlbmVyKCdzdWJtaXQnLCBwcmVwYXJlU2VuZEZpbGUpO1xuICAgIH1cblxuICAgIC8vYmxvY2sgYmxvZ1xuXG4gICAgY29uc3QgZm9ybUJsb2cgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjYmxvZycpO1xuXG4gICAgaWYgKGZvcm1CbG9nKSB7XG4gICAgICAgIGZvcm1CbG9nLmFkZEV2ZW50TGlzdGVuZXIoJ3N1Ym1pdCcsIHByZXBhcmVTZW5kUG9zdCk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcHJlcGFyZVNlbmRQb3N0KGUpIHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB2YXIgcmVzdWx0Q29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnN0YXR1cycpO1xuICAgICAgICB2YXIgZGF0YSA9IHtcbiAgICAgICAgICAgIHRpdGxlOiBmb3JtQmxvZy50aXRsZS52YWx1ZSxcbiAgICAgICAgICAgIGRhdGU6IGZvcm1CbG9nLmRhdGUudmFsdWUsXG4gICAgICAgICAgICB0ZXh0OiBmb3JtQmxvZy50ZXh0LnZhbHVlXG4gICAgICAgIH07XG4gICAgICAgIHJlc3VsdENvbnRhaW5lci5pbm5lckhUTUwgPSAnU2VuZGluZy4uLic7XG4gICAgICAgIHNlbmRBamF4SnNvbignL2FkZHBvc3QnLCBkYXRhLCBmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgICAgICAgcmVzdWx0Q29udGFpbmVyLmlubmVySFRNTCA9IGRhdGE7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8vYmxvY2sgc2tpbGxzXG5cbiAgICBjb25zdCBmb3JtU2tpbGxzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3NraWxscycpO1xuXG4gICAgaWYgKGZvcm1Ta2lsbHMpIHtcbiAgICAgICAgZm9ybVNraWxscy5hZGRFdmVudExpc3RlbmVyKCdzdWJtaXQnLCBwcmVwYXJlU2VuZFNraWxscyk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcHJlcGFyZVNlbmRTa2lsbHMoZSkge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIHZhciByZXN1bHRDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc3RhdHVzJyk7XG4gICAgICAgIHZhciBkYXRhID0ge1xuICAgICAgICAgICAgaHRtbDogZm9ybVNraWxscy5odG1sLnZhbHVlLFxuICAgICAgICAgICAgY3NzOiBmb3JtU2tpbGxzLmNzcy52YWx1ZSxcbiAgICAgICAgICAgIGpzOiBmb3JtU2tpbGxzLmpzLnZhbHVlLFxuICAgICAgICAgICAgcGhwOiBmb3JtU2tpbGxzLnBocC52YWx1ZSxcbiAgICAgICAgICAgIHNxbDogZm9ybVNraWxscy5zcWwudmFsdWUsXG4gICAgICAgICAgICBub2RlOiBmb3JtU2tpbGxzLm5vZGUudmFsdWUsXG4gICAgICAgICAgICBtb25nbzogZm9ybVNraWxscy5tb25nby52YWx1ZSxcbiAgICAgICAgICAgIGdpdDogZm9ybVNraWxscy5naXQudmFsdWUsXG4gICAgICAgICAgICBndWxwOiBmb3JtU2tpbGxzLmd1bHAudmFsdWUsXG4gICAgICAgICAgICBib3dlcjogZm9ybVNraWxscy5ib3dlci52YWx1ZVxuICAgICAgICB9O1xuXG4gICAgICAgIHJlc3VsdENvbnRhaW5lci5pbm5lckhUTUwgPSAnU2VuZGluZy4uLic7XG4gICAgICAgIHNlbmRBamF4SnNvbignL2FkbWluJywgZGF0YSwgZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgICAgICAgIHJlc3VsdENvbnRhaW5lci5pbm5lckhUTUwgPSBkYXRhO1xuICAgICAgICB9KTtcbiAgICB9XG59KTsiXX0=

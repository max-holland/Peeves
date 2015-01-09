//Reusable non plugin stuff goes in app
(function(win, doc) {
    'use strict';
    var app = app || {
        _isSafari: null,
        _isMobile: null,
        _bgImageLink: null,
        _searchedTag: null,
        _buttonLetter: null,
        _postHeaderImg: null
    };

    app.isSafari = function() {
      return parrot.device.browser.name.toLowerCase().indexOf('safari') !== -1
    }

    app.isMobile = function() {
      return parrot.device.type === 'mobile';
    }

    app.getBgImg = function(elem) {
        if (app._bgImageLink === null) {
            if (app.elemExists(elem)) {
                elem = $(elem);
                app._bgImageLink = elem.attr('src');
                elem.remove();
            }
        }

        return app._bgImageLink;
    }

    app.replaceAll = function(str, find, replace) {
        return str.replace(new RegExp(find, 'g'), replace);
    }

    app.elemExists = function(elem) {
        elem = $(elem);

        if (elem.length > 0) {
            return true;
        } else {
            return false;
        }
    }

    app.getTag = function(elem) {

        if (app._searchedTag === null) {
            if (app.elemExists(elem)) {
                var url = window.location.href;
                var splitURL = url.split('tag');
                var tag = app.replaceAll(splitURL[1], '/', '');
                var tagFirstChar;

                tag = app.replaceAll(tag, '-', ' ');
                tagFirstChar = tag.charAt(0).toUpperCase();
                tag = tagFirstChar + tag.substring(1, tag.length);

                app._searchedTag = tag;
            }
        }

        return app._searchedTag;
    }

    app.getFirstChar = function(elem, target) {
        if (app._buttonLetter === null) {
            if (app.elemExists(elem)) {
                var blogTitle = $(elem);
                var letter = blogTitle.val().charAt(0).toUpperCase();


                app._buttonLetter = letter;
            }
        }

        return app._buttonLetter;
    }

    app.aTagWrap = function(elem, elemClass) {
        if (app.elemExists(elem)) {
            var imgs = $(elem);
            if (imgs.length > 0) {
                imgs.each(function() {
                    var $this = $(this);
                    var imgLink = $this.attr('src');

                    var html = '';
                    html = "<a class='" + elemClass + "' href='" + imgLink + "'></a>";

                    $this.wrap(html);
                });

            }
        }
    }

    app.getHeaderImg = function(elem) {
        if (app._postHeaderImg === null) {
            var post = $(elem);

            if (app.elemExists(elem)) {

                var postImg = $(elem + ' img')[0];
                if (typeof(postImg) !== 'undefined') {
                    $(postImg).remove();
                    $(postImg).attr('id', 'bg-img');
                    $('#post-container').append($(postImg));
                    app._postHeaderImg = postImg.src

                }
            }
        }

        return app._postHeaderImg;
    }

    window.app = app;

})(window, document);


var initImagesLoaded = function(container, elem) {

    var posts = document.querySelectorAll(elem);

    imagesLoaded(posts, function() {

        var postContainer = $(container);


        $('.post').fitVids();

        app.aTagWrap('.post-page-post .post-text img', 'fluid-popup');


        $('.fluid-popup').fluidbox();

        postContainer.addClass('show-post');
        postContainer.removeClass('hide-post');
    });
}

var bgImgLoaded = function(elem) {
    var posts = document.querySelectorAll(elem);

    imagesLoaded(posts, function() {

        //Set the bg image

        var bgImg = app.getBgImg('#bg-img') || app.getHeaderImg('.post-page-post .post-text');

        if (bgImg !== null) {
            var header = $('.main-header')
            $('.main-header').css('background-image', 'URL(' + bgImg + ')');
            if (app.isMobile()) {
                header.backstretch(bgImg);
            }
        }


    });
}

var initReadTime = function(elem) {
    elem = $(elem);
    readingTime = $('.post-reading-time');
    if (elem.length > 0 && readingTime.length > 0) {
        elem.readingTime({
            readingTimeTarget: '.post-reading-time',
        });
    }
}

var initSyntaxHighlight = function(elem) {
    var code = $(elem);
    if (code.length > 0) {
        code.each(function(i, e) {
            hljs.highlightBlock(e)
        });
    }
}

var initNavBar = function() {
    if (app.isSafari()) {
        $('#navbar').addClass('navbar-safari');
    }

    $('#openMenu').on('click', function(event) {
        event.preventDefault();
        var elems;

        // if (app.isSafari()){
        //    elems = $('#sidebar, .page-wrapper,#navbar');
        // }else{
        elems = $('#sidebar, .page-wrapper');
        //  }

        elems.toggleClass('opened');

        if (!app.isMobile()) {
            if (elems.hasClass('opened')) {
                disable_scroll();
            } else {
                enable_scroll();
            }
        } else {
            if (elems.hasClass('opened')) {
                document.ontouchmove = function(e) {
                    e.preventDefault();
                }
            } else {
                document.ontouchmove = function(e) {
                    return true;
                }
            }
        }
    });
}

var initInfiniteScroll = function(pageNumber, nextPage) {
    var maxPageNumber = $(pageNumber);
    var nextPageElem = $(nextPage);

    if (maxPageNumber.length > 0 && nextPageElem.length > 0) {
        var splitPageNumber = maxPageNumber.html().split('of');
        var getNextPage = nextPageElem.attr('href').slice(-2).replace('/', '');

        maxPageNumber = parseInt(splitPageNumber[1]);
        getNextPage = parseInt(getNextPage);



        $('#post-container .grid-container').infinitescroll({
            navSelector: ".pagination",
            // selector for the paged navigation (it will be hidden)
            nextSelector: ".pagination .older-posts",
            // selector for the NEXT link (to page 2)
            itemSelector: ".post"

        }, function(newElems) {

            var elem = $(newElems);
            var elemID = elem.attr('id');

            //elem.addClass('show-post');
            //elem.removeClass('hide-post');

            //update pagination
            getNextPage = getNextPage + 1;
            if (getNextPage > maxPageNumber) {
                $(window).unbind('.infscr');
                $('.pagination').remove();
            } else {
                nextPageElem.attr('href', '/page/' + getNextPage + '/');
            }

        });
    }
}

//Prevent scrolling
var keys = [37, 38, 39, 40];

function preventDefault(e) {
    e = e || window.event;
    if (e.preventDefault)
        e.preventDefault();
    e.returnValue = false;
}

function keydown(e) {
    for (var i = keys.length; i--;) {
        if (e.keyCode === keys[i]) {
            preventDefault(e);
            return;
        }
    }
}

function wheel(e) {
    preventDefault(e);
}

function disable_scroll() {
    if (window.addEventListener) {
        window.addEventListener('DOMMouseScroll', wheel, false);
    }
    window.onmousewheel = document.onmousewheel = wheel;
    document.onkeydown = keydown;
}

function enable_scroll() {
    if (window.removeEventListener) {
        window.removeEventListener('DOMMouseScroll', wheel, false);
    }
    window.onmousewheel = document.onmousewheel = document.onkeydown = null;
}

//END Prevent scrolling


$(function() {
    app = window.app;

    //Set the button letter
    var letterContainer = $('#letter');

    if (app.getFirstChar('#blog-title') !== null) {
        letterContainer.html(app.getFirstChar('#blog-title'));
    } else {
        letterContainer.html('<i class="fa fa-bars"></i>');
    }


    if (app.getTag('#tag-search') !== null) {
        $('#tag-search').html(app.getTag('#tag-search'));
        $('.menu-btn').addClass('tags-menu-btn');
    }

    //Need to add id to header image on post page..

    // Only add heade button is not yet setted!

    PostHeaderImage = $('.main-header.post-page-header').css('background-image') !== 'none'

    if (!PostHeaderImage){
      app.getHeaderImg('.post-page-post .post-text')
    }

    if(app.elemExists('#bg-img')){
      bgImgLoaded('#bg-img');
    }

    //Call Plugin Functions
    if (app.elemExists('.page-number', '.older-posts')) {
        initInfiniteScroll('.page-number', '.older-posts');
    }

    if (app.elemExists('.page-wrapper')) {
        initReadTime('.page-wrapper');
    }

    initImagesLoaded('#post-container', '.post');
    initSyntaxHighlight('pre code');
    initNavBar();
});

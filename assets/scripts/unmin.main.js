//Reusable non plugin stuff goes in app
(function (win, doc) {
    'use strict';
    var app = app || {
        _isSafari : null,
        _isMobile : null,
        _bgImageLink : null,
        _searchedTag : null,
        _buttonLetter : null,
        _postHeaderImg : null
    };

    app.isSafari = function(){
        if(app._isSafari === null){
            var userAgent = navigator.userAgent;
            var chrome = userAgent.indexOf('Chrome');
            var safari = userAgent.indexOf('Safari');

            if(safari != -1 &&  chrome == -1){
                app._isSafari = true;
            }else{
                app._isSafari = false;
            }
        }

        return app._isSafari; 
    }


    app.isMobile = function(){
        if(app._isMobile === null){
            var mobileDevices = /(Android|webOS|iPhone|iPod|iPad|BlackBerry|IEMobile|Opera Mini)/i;
            if(mobileDevices.test(navigator.userAgent)){
                app._isMobile = true;
            }else{
                app._isMobile = false;
            }
        }

        return app._isMobile;
    }

    app.getBgImg = function(elem){
        if(app._bgImageLink === null){
            if(app.elemExists(elem)){
                elem = $(elem);
                app._bgImageLink = elem.attr('src');
                elem.remove();
            }
        }

        return app._bgImageLink;
    }


    app.replaceAll = function(str,find,replace){
        return str.replace(new RegExp(find, 'g'), replace);
    }

    app.elemExists = function(elem){
        elem = $(elem);

        if(elem.length > 0){
            return true;
        }else{
            return false;
        }
    }



    app.getTag = function(elem){
        
        if(app._searchedTag === null){
            if(app.elemExists(elem)){
                var url = window.location.href;
                var splitURL = url.split('tag');
                var tag = app.replaceAll(splitURL[1],'/','');
                var tagFirstChar;
                
                tag = app.replaceAll(tag,'-',' ');
                tagFirstChar = tag.charAt(0).toUpperCase();
                tag = tagFirstChar + tag.substring(1,tag.length);

                app._searchedTag = tag;
            }
        }

        return app._searchedTag;
    }


    app.getFirstChar = function(elem,target){
        if(app._buttonLetter === null){
            if(app.elemExists(elem)){
                var blogTitle = $(elem);
                var letter = blogTitle.val().charAt(0).toUpperCase();
             

                app._buttonLetter = letter; 
            }
        }
         
        return app._buttonLetter;    
    }

    app.aTagWrap = function(elem,elemClass){        
        if(app.elemExists(elem)){
            var imgs = $(elem);
            if(imgs.length > 0){
                imgs.each(function(){
                    var $this = $(this);
                    var imgLink = $this.attr('src');
                    
                    var html = '';
                    html = "<a class='"+elemClass+"' href='"+ imgLink +"'></a>";
                    
                    $this.wrap(html);
                });

            }
        }
    }

    app.getHeaderImg = function(elem){
        if(app._postHeaderImg === null){
            var post = $(elem);
            
            if(app.elemExists(elem)){

                var postImg = $(elem + ' img')[0];
                if(typeof(postImg) !== 'undefined'){
                    $(postImg).remove();
                    $(postImg).attr('id','bg-img');
                    $('#post-container').append($(postImg));
                    app._postHeaderImg = postImg.src
                    
                }
            }
        }

        return app._postHeaderImg;
    }

    window.app = app;

})(window, document);


var initImagesLoaded = function(container,elem,nanobar){

        var posts = document.querySelectorAll(elem);

          imagesLoaded( posts, function() {

            var postContainer = $(container);
            
            
            $('.post').fitVids();
            
            nanobar.go( 90 );
            app.aTagWrap('.post-page-post .post-text img','fluid-popup');
            
            
            $('.fluid-popup').fluidbox();
            
            nanobar.go(100);
            postContainer.addClass('show-post');
            postContainer.removeClass('hide-post');
            
            
            
        });   
}

var bgImgLoaded = function(elem){
        var posts = document.querySelectorAll(elem);

          imagesLoaded( posts, function() {

            //Set the bg image

            var bgImg = app.getBgImg('#bg-img') || app.getHeaderImg('.post-page-post .post-text');

            if(bgImg !== null){
                var header = $('.main-header')
                $('.main-header').css('background-image','URL('+bgImg+')');
                if(app.isMobile()){
                    header.backstretch(bgImg);
                }
            }

            
        });    
}



var initReadTime = function(elem){
    elem  = $(elem);
    readingTime = $('.post-reading-time');
    if(elem.length > 0 && readingTime.length > 0){
            elem.readingTime({
                readingTimeTarget: '.post-reading-time',
            });
    }
}

var initSyntaxHighlight = function(elem){
    var code = $(elem);
    if(code.length > 0){
        code.each(function(i, e) {hljs.highlightBlock(e)});    
    }
}

var initNavBar = function(){
    if (app.isSafari()){
        $('#navbar').addClass('navbar-safari');
    }

    $('#openMenu').on('click', function(event){
        event.preventDefault();
        var elems;

       // if (app.isSafari()){
        //    elems = $('#sidebar, .page-wrapper,#navbar');
       // }else{
            elems = $('#sidebar, .page-wrapper');
      //  }

        elems.toggleClass('opened');

        if(!app.isMobile()){
            if(elems.hasClass('opened')){
                disable_scroll();
            }else{
                enable_scroll();
            }
        }else{
            if(elems.hasClass('opened')){
               document.ontouchmove = function(e){ e.preventDefault(); }
            }else{
               document.ontouchmove = function(e){ return true; }
            }
        }
    });
}



var initInfiniteScroll = function(pageNumber,nextPage,nanobar){
    var maxPageNumber = $(pageNumber);
    var nextPageElem = $(nextPage);

    if(maxPageNumber.length > 0 && nextPageElem.length > 0){
        var splitPageNumber = maxPageNumber.html().split('of');
        var getNextPage = nextPageElem.attr('href').slice(-2).replace('/','');

        maxPageNumber = parseInt(splitPageNumber[1]);
        getNextPage = parseInt(getNextPage);


        
        $('#post-container .grid-container').infinitescroll({
            navSelector  : ".pagination",
            // selector for the paged navigation (it will be hidden)
            nextSelector : ".pagination .older-posts",
            // selector for the NEXT link (to page 2)
            itemSelector : ".post"
            
        }, function (newElems) {
            nanobar.go( 30 );

            var elem = $(newElems);
            var elemID = elem.attr('id');

            nanobar.go( 60 );
            //elem.addClass('show-post');
            //elem.removeClass('hide-post');

            //update pagination
            getNextPage = getNextPage + 1;
            nanobar.go( 90 );
            if(getNextPage > maxPageNumber){
                $(window).unbind('.infscr');
                $('.pagination').remove();
            }else{
                nextPageElem.attr('href','/page/'+getNextPage+'/'); 
            }
            nanobar.go( 100 );

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


$(function(){
    app = window.app;


    var options = {
        bg: '#57ad68',

        // leave target blank for global nanobar
        target: '',

        // id for new nanobar
        id: 'nanoloader'
    };

    var nanobar = new Nanobar( options );

    // move bar
    nanobar.go( 30 ); // size bar 30%
    
    //Set the button letter    
    var letterContainer = $('#letter');

    if(app.getFirstChar('#blog-title') !== null){
        letterContainer.html(app.getFirstChar('#blog-title'));
    }else{
        letterContainer.html('<i class="fa fa-bars"></i>');
    }

    nanobar.go( 40 );
    
    if(app.getTag('#tag-search') !== null){
        $('#tag-search').html(app.getTag('#tag-search'));
        $('.menu-btn').addClass('tags-menu-btn');
    }
    
    nanobar.go( 50 );
    //Need to add id to header image on post page..

    if(app.elemExists('.post-page-post .post-text')){
        app.getHeaderImg('.post-page-post .post-text')
    }

    if(app.elemExists('#bg-img') !== null){
       bgImgLoaded('#bg-img');
    }

    nanobar.go( 60 );
    //Call Plugin Functions
    if(app.elemExists('.page-number','.older-posts')){
        initInfiniteScroll('.page-number','.older-posts',nanobar);
    }
    
    nanobar.go( 70 );
    if(app.elemExists('.page-wrapper')){
        initReadTime('.page-wrapper');
    }
    
    nanobar.go( 80 );
    initImagesLoaded('#post-container','.post',nanobar);
    initSyntaxHighlight('pre code');
    initNavBar();
});

function preventDefault(e) {
  e = e || window.event, e.preventDefault && e.preventDefault(), e.returnValue = !1
}

function keydown(e) {
  for (var t = keys.length; t--;)
    if (e.keyCode === keys[t]) return void preventDefault(e)
}

function wheel(e) {
  preventDefault(e)
}

function disable_scroll() {
  window.addEventListener && window.addEventListener("DOMMouseScroll", wheel, !1), window.onmousewheel = document.onmousewheel = wheel, document.onkeydown = keydown
}

function enable_scroll() {
  window.removeEventListener && window.removeEventListener("DOMMouseScroll", wheel, !1), window.onmousewheel = document.onmousewheel = document.onkeydown = null
}! function() {
  "use strict";
  var e = e || {
    _isSafari: null,
    _isMobile: null,
    _bgImageLink: null,
    _searchedTag: null,
    _buttonLetter: null,
    _postHeaderImg: null
  };
  e.isSafari = function() {
    if (null === e._isSafari) {
      var t = navigator.userAgent,
        n = t.indexOf("Chrome"),
        a = t.indexOf("Safari");
      e._isSafari = -1 != a && -1 == n ? !0 : !1
    }
    return e._isSafari
  }, e.isMobile = function() {
    if (null === e._isMobile) {
      var t = /(Android|webOS|iPhone|iPod|iPad|BlackBerry|IEMobile|Opera Mini)/i;
      e._isMobile = t.test(navigator.userAgent) ? !0 : !1
    }
    return e._isMobile
  }, e.getBgImg = function(t) {
    return null === e._bgImageLink && e.elemExists(t) && (t = $(t), e._bgImageLink = t.attr("src"), t.remove()), e._bgImageLink
  }, e.replaceAll = function(e, t, n) {
    return e.replace(new RegExp(t, "g"), n)
  }, e.elemExists = function(e) {
    return e = $(e), e.length > 0 ? !0 : !1
  }, e.getTag = function(t) {
    if (null === e._searchedTag && e.elemExists(t)) {
      var n, a = window.location.href,
        i = a.split("tag"),
        o = e.replaceAll(i[1], "/", "");
      o = e.replaceAll(o, "-", " "), n = o.charAt(0).toUpperCase(), o = n + o.substring(1, o.length), e._searchedTag = o
    }
    return e._searchedTag
  }, e.getFirstChar = function(t) {
    if (null === e._buttonLetter && e.elemExists(t)) {
      var n = $(t),
        a = n.val().charAt(0).toUpperCase();
      e._buttonLetter = a
    }
    return e._buttonLetter
  }, e.aTagWrap = function(t, n) {
    if (e.elemExists(t)) {
      var a = $(t);
      a.length > 0 && a.each(function() {
        var e = $(this),
          t = e.attr("src"),
          a = "";
        a = "<a class='" + n + "' href='" + t + "'></a>", e.wrap(a)
      })
    }
  }, e.getHeaderImg = function(t) {
    if (null === e._postHeaderImg) {
      {
        $(t)
      }
      if (e.elemExists(t)) {
        var n = $(t + " img")[0];
        "undefined" != typeof n && ($(n).remove(), $(n).attr("id", "bg-img"), $("#post-container").append($(n)), e._postHeaderImg = n.src)
      }
    }
    return e._postHeaderImg
  }, window.app = e
}(window, document);
var initImagesLoaded = function(e, t, n) {
    var a = document.querySelectorAll(t);
    imagesLoaded(a, function() {
      var t = $(e);
      $(".post").fitVids(), n.go(90), app.aTagWrap(".post-page-post .post-text img", "fluid-popup"), $(".fluid-popup").fluidbox(), n.go(100), t.addClass("show-post"), t.removeClass("hide-post")
    })
  },
  bgImgLoaded = function(e) {
    var t = document.querySelectorAll(e);
    imagesLoaded(t, function() {
      var e = app.getBgImg("#bg-img") || app.getHeaderImg(".post-page-post .post-text");
      if (null !== e) {
        var t = $(".main-header");
        $(".main-header").css("background-image", "URL(" + e + ")"), app.isMobile() && t.backstretch(e)
      }
    })
  },
  initReadTime = function(e) {
    e = $(e), readingTime = $(".post-reading-time"), e.length > 0 && readingTime.length > 0 && e.readingTime({
      readingTimeTarget: ".post-reading-time"
    })
  },
  initSyntaxHighlight = function(e) {
    var t = $(e);
    t.length > 0 && t.each(function(e, t) {
      hljs.highlightBlock(t)
    })
  },
  initNavBar = function() {
    app.isSafari() && $("#navbar").addClass("navbar-safari"), $("#openMenu").on("click", function(e) {
      e.preventDefault();
      var t;
      t = $("#sidebar, .page-wrapper"), t.toggleClass("opened"), app.isMobile() ? document.ontouchmove = t.hasClass("opened") ? function(e) {
        e.preventDefault()
      } : function() {
        return !0
      } : t.hasClass("opened") ? disable_scroll() : enable_scroll()
    })
  },
  initInfiniteScroll = function(e, t, n) {
    var a = $(e),
      i = $(t);
    if (a.length > 0 && i.length > 0) {
      var o = a.html().split("of"),
        r = i.attr("href").slice(-2).replace("/", "");
      a = parseInt(o[1]), r = parseInt(r), $("#post-container .grid-container").infinitescroll({
        navSelector: ".pagination",
        nextSelector: ".pagination .older-posts",
        itemSelector: ".post"
      }, function(e) {
        n.go(30); {
          var t = $(e);
          t.attr("id")
        }
        n.go(60), t.addClass("show-post"), t.removeClass("hide-post"), r += 1, n.go(90), r > a ? ($(window).unbind(".infscr"), $(".pagination").remove()) : i.attr("href", "/page/" + r + "/"), n.go(100)
      })
    }
  },
  keys = [37, 38, 39, 40];
$(function() {
  app = window.app;
  var e = {
      bg: "#57ad68",
      target: "",
      id: "nanoloader"
    },
    t = new Nanobar(e);
  t.go(30);
  var n = $("#letter");
  n.html(null !== app.getFirstChar("#blog-title") ? app.getFirstChar("#blog-title") : '<i class="fa fa-bars"></i>'), t.go(40), null !== app.getTag("#tag-search") && ($("#tag-search").html(app.getTag("#tag-search")), $(".menu-btn").addClass("tags-menu-btn")), t.go(50), app.elemExists(".post-page-post .post-text") && app.getHeaderImg(".post-page-post .post-text"), null !== app.elemExists("#bg-img") && bgImgLoaded("#bg-img"), t.go(60), app.elemExists(".page-number", ".older-posts") && initInfiniteScroll(".page-number", ".older-posts", t), t.go(70), app.elemExists(".page-wrapper") && initReadTime(".page-wrapper"), t.go(80), initImagesLoaded("#post-container", ".post", t), initSyntaxHighlight("pre code"), initNavBar()
});
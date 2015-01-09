"use strict"

## -- Dependencies -------------------------------------------------------------

gulp         = require 'gulp'
gutil        = require 'gulp-util'
concat       = require 'gulp-concat'
header       = require 'gulp-header'
uglify       = require 'gulp-uglify'
pkg          = require './package.json'
less         = require 'gulp-less'
cssmin       = require 'gulp-cssmin'
autoprefixer = require 'gulp-autoprefixer'

## -- Files --------------------------------------------------------------------

source =
  js   : [ "assets/js/init.main.js"]
  less : "assets/less/__init.less"

dependencies =
  js: [
    "assets/vendor/jquery-backstretch/jquery.backstretch.min.js"
    "assets/vendor/imagesloaded/imagesloaded.pkgd.min.js"
    "assets/vendor/reading-time/build/readingTime.min.js"
    "assets/vendor/fitvids/jquery.fitvids.js"
    "assets/vendor/fluidbox/jquery.fluidbox.min.js"
    "assets/vendor/jquery-infinite-scroll/jquery.infinitescroll.min.js"
    "assets/js/highlight.pack.js"
  ]

banner = [
  "/**"
  " * <%= pkg.name %>"
  " * @version v<%= pkg.version %>"
  " */"
  ""
].join("\n")

# -- TASKS ---------------------------------------------------------------------

gulp.task "less", ->
  gulp.src source.less
    .pipe less().on('error', gutil.log)
    .pipe concat(pkg.name + ".css")
    .pipe autoprefixer()
    .pipe cssmin()
    .pipe header(banner, pkg: pkg)
    .pipe gulp.dest('assets/css')

gulp.task "js", ->
  gulp.src dependencies.js.concat source.js
    .pipe concat(pkg.name + ".js")
    .pipe uglify(mangle: false)
    .pipe header(banner, pkg: pkg)
    .pipe gulp.dest('assets/js')
  return


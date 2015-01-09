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
livereload   = require 'gulp-livereload'

## -- Files --------------------------------------------------------------------

source =
  js   : [
    "assets/js/init.main.js"
    "assets/js/init.highlight.js"
  ]

  less : "assets/less/__init.less"

dependencies =
  js: [
    "assets/vendor/parrotjs/dist/parrot.standalone.js"
    "assets/vendor/parrot-module-device/dist/parrot.device.js"
    "assets/vendor/jquery-backstretch/jquery.backstretch.min.js"
    "assets/vendor/imagesloaded/imagesloaded.pkgd.min.js"
    "assets/vendor/reading-time/build/readingTime.min.js"
    "assets/vendor/fitvids/jquery.fitvids.js"
    "assets/vendor/fluidbox/jquery.fluidbox.min.js"
    "assets/vendor/jquery-infinite-scroll/jquery.infinitescroll.min.js"
    "assets/vendor/pace/pace.min.js"
    "assets/js/highlight.pack.js"
  ]

banner = [
  "/**"
    " * Peeves    <%= pkg.description %>"
    " * @version  v<%= pkg.version %>"
    " * @homepage <%= pkg.homepage %>"
    " * @license  <%= pkg.license %>"
    " */"
    ""].join("\n")

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

gulp.task "watch", ->
  livereload.listen()
  gulp.watch("assets/less/**/*.less", ["less"]).on('change', livereload.changed)
  gulp.watch("assets/js/init.*.js", ["js"]).on('change', livereload.changed)

gulp.task "build", -> gulp.start ["less", "js"]
gulp.task "default", -> gulp.start ["build", "watch"]

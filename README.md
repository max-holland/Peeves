# Peeves

## [Download Here](https://github.com/mholland1337/Peeves/releases/latest)
### Ghost v0.5 [Download Here](https://github.com/mholland1337/Peeves/releases/latest)
### Ghost v0.4.2 [Download Here](https://github.com/mholland1337/Peeves/releases/tag/v2.1.2)
### Ghost v0.4.1 [Download Here](https://github.com/mholland1337/Peeves/releases/tag/v1.0.6)

![Peeves screenshot index page](https://bff4d6e4f60bfb233ad43d411f0c7a2f9118f658.googledrive.com/host/0B3-IFpi4iZ9TVE16MU1zNWV3WDQ/peeves-index.png)

Based on the style of medium. Peeves offers a clean, minimal design with easy to read typography. And it's mobile optimized!

![Peeves screenshot post](https://bff4d6e4f60bfb233ad43d411f0c7a2f9118f658.googledrive.com/host/0B3-IFpi4iZ9TVE16MU1zNWV3WDQ/peeves-post.png)

## Features
* Sidebar
* Menu btn takes first letter blog blog title
* Header images
* Post read time
* Custom about page
* Custom tags page
* Google authorship
* Responsive design
* Image lightbox
* Disqus comment support
* [Structured data](http://www.google.com/webmasters/tools/richsnippets?q=http%3A%2F%2Fmaxholland.me%2Fpeeves-update-2-1-0%2F)

## Installation
1. Download the theme by [clicking here](https://github.com/mholland1337/Peeves/releases/latest).
2. Extract the .zip file.
3. Make the appropriate changes e.g. side bar links
4. Re-zip the file and upload to your ghost blog.

##Header Images
For high quality header/post header images I recommened using either [unsplash.com](http://unsplash.com/) or [jaymantri.com/](http://jaymantri.com/) .

#### Adding the index header image
1. Login to your admin page
2. Go to settings
3. Scroll down to the blog cover and upload your image

#### Adding about page header image
1. Login to your admin page
2. Click on your name in the right hand corner
3. Click your profile
4. Click change cover and upload your image

#### Adding a post/static header image
1. The first image in the post is taken to be used as the header image
2. Place an image at the top of your ghost post and it will become the post's header image. This image will be removed from the post content as it's seen as the "header image".


## Changing sidebar/social links
1. Go into the partials folder.
2. Open up **sidebar.hbs** in your text editor.
3. Replace the existing link **href** with your link.

#### Adding a new sidebar link
1. Follow steps 1. & 2. above.
2. Copy one the the lines of code under the links heading.
3. Change the href to be your link and the text to be your text.

#### Adding a new sidebar link
1. Follow steps 1. & 2. above.
2. Copy one of the lines of code under the follow me heading
3. Change the href to be your social network link and the text to be the social network.

## Adding Disqus comments
1. Go into the partials folder.
2. Open up **comments.hbs**.
3. Replace the disqus shortname with your disqus shortname (see example)
4. Save it.
5. Open up **post.hbs**.
6. Un-rem the comment code. Example below

Remmed out:
`<!--{{> comments}}-->`

Un remmed:
`{{> comments}}`

## GooglePlus Authorship
1. Go into the partials folder.
2. Open up **google-authorship.hbs**.
3. Paste the link of your google plus profile into href="" (see example)

## Credit
I would like to thank my pal [Riccardo Guglielmino](http://www.riccardoguglielmino.com/). Who contributed to the original source files not hosted on github. I'd also like to thank [Kiko Beats](https://github.com/Kikobeats) for giving peeves some tlc after months of neglect.

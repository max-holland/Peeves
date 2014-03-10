# Peeves

## [View Demo Here](http://mholland.ghost.io/)

Based on the style of medium. Peeves offers a clean, minimal design with easy to read typography.

## Features
* Parralax effect header
* Changeable header image
* Responsive design
* Social media links
* Disqus support

## Installation
1. Download the theme by clicking here.
2. Extract the the .zip file.

#### Changing social links
1. Go into the partials folder.
2. Open up **social-links.hbs** in your text editor.
3. Replace the **href** link with your link.
4. To add a link copy the code below and paste it into the **ul** element.
5. Replace the link with your link and replace the icon with the corresponding icon from [here](http://fontawesome.io/icons/#brand).

`<li><a href="https://twitter.com/mholland_" target="_blank"><i class="fa fa-twitter-square"></i></a></li>`

#### Changing the header image
1. Firstly go to the partials folder.
2. Open up **header-image.hbs**
3. Change the value to your image url.
4. Now go to the assets folder, open the stylesheets folder then open **stylesheet.css**
5. Go to line 492 or search for **body .top-header-bg**.
6. Once you have found it change the url to your image url.

#### Adding Disqus comments
1. Go into the partials folder.
2. Open up **comments.hbs**.
3. Replace the disqus shortname with your disqus shortname
4. Save it.
5. Open up **post.hbs**.
6. Un-rem the comment code. Example below

Remmed out
`<!--{{> comments}}-->`

Un remmed
`{{> comments}}`

Proudly made in the U.K using [Atom](https://atom.io/).

#### Copyright & License

Copyright (C) Max Holland (the "Original Author") - Released under the MIT License.

See the included LICENSE file for more details.

# Peeves

## [View Demo Here](http://mholland.ghost.io/) | [Download Here](https://github.com/AtomicThemes/Peeves/releases/latest)


Based on the style of medium. Peeves offers a clean, minimal design with easy to read typography.

## Features
* Parralax effect header
* Changeable header image
* Responsive design
* Social media links
* Disqus support

## Installation
1. Download the theme by [clicking here](https://github.com/AtomicThemes/Peeves/releases/latest).
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

#### Adding/Changing the sidebar links
1. 1. Firstly go to the partials folder.
2. Open up **sidebar-links.hbs**
3. To add a static page copy the code below and change the **about** at the end of the link to be the name of your static page.
4. Copy your new link into the **ul**
 
Code to copy: 
`<li><a href="{{@blog.url}}/about"><i class="fa fa-user"></i> About</a></li>`

Example:
`<li><a href="{{@blog.url}}/contact"><i class="fa fa-user"></i> About</a></li>`
 
#### Google Plus Authorship
1. Log into the admin for your blog.
2. Click your your account in the top right and click **"Your Profile"**
3. Change the website input box to point at your google plus.
4. Save it then test it [here](http://www.google.com/webmasters/tools/richsnippets) 
5. You might need to edit your google plus profile to point at your ghost blog. Follow the instructions [here](https://support.google.com/webmasters/answer/2539557?hl=en). You only need to do step **2.**
 


#### Adding Disqus comments
1. Go into the partials folder.
2. Open up **comments.hbs**.
3. Replace the disqus shortname with your disqus shortname
4. Save it.
5. Open up **post.hbs**.
6. Un-rem the comment code. Example below

Remmed out:
`<!--{{> comments}}-->`

Un remmed:
`{{> comments}}`

Proudly made in the U.K using [Atom](https://atom.io/).

#### Copyright & License

Copyright (C) Max Holland (the "Original Author") - Released under the MIT License.

See the included LICENSE file for more details.

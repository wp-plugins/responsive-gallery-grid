=== Gallery Grid ===
Contributors: Jules Colle
Donate link: https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=j_colle%40hotmail%2ecom&lc=US&item_name=Jules%20Colle%20%2d%20WP%20plugins%20%2d%20Responsive%20Gallery%20Grid&item_number=rgg&currency_code=USD&bn=PP%2dDonationsBF%3abtn_donateCC_LG%2egif%3aNonHosted
Tags: HTML5, gallery, Google+, responsive, pop-out
Requires at least: 3.0
Tested up to: 3.5.1
Stable tag: 0.1
License: GPLv2 or later


Change the native Wordpress gallery to a gallery that nicely fits your images into a jigsaw-like grid. Much like the Google+ gallery.


== Description ==

If the plugin is activated, all of your Wordpress galleries will be styled like a Google+ gallery.

Main features inclucde:
1. The gallery will fit in nicely in a responsive web design, as the grid is recalculated when scaling the window.
1. By default the images will pop out a whenever you move the cursor over them. The z-indexes are updating so that the pop-out images are always on top.
1. The animation speed, scaling, margins and max row height will be customized in the [gallery] shortcode, in the next version of Responsive Gallery Grid.

A live example can be viewed at http://bdwm.be/rgg/?page_id=2

== Installation ==

1. Upload the plugin contents to the `/wp-content/plugins/` directory
1. Activate the plugin through the 'Plugins' menu in Wordpress Admin
1. You're done!

= Finetuning (Will be available in the next version of Responsive Gallery Grid) =

If you want to finetune the options per gallery you can add the folowing parameters to the gallery shortcode (from text editor)

1. `type = rgg*|native`
1. `class = imagegrid*|CLASS`
1. `rel = rgg_group*|REL`
1. `image_size = thumbnail|medium*|large|full|SIZE`
1. `ids = IDS`

Legend:

* \* = default value
* CLASS = a class you would like to add to the grid container.
* REL = the rel attribute you would like to add to the anchor tags. (Used by some light boxes, like Colorbox, to group the images.)
* SIZE = any other image size that is defined with `add_image_size()` http://codex.wordpress.org/Function_Reference/add_image_size.
* IDS = comma seperated list of the media IDs of the images you want to appear in the gallery.

More options comming soon! Please start a support thread for any of your requests.

== Frequently Asked Questions ==

= Will there be added more options? =

Sure. Please start a support thread for any of your requests.

== Upgrade Notice ==

1. Nothing for now

== Screenshots ==

1. Responsive Gallery Grid in action. By default the images will pop out on mouse-over.
2. The gallery shortcode can be extended with some options, from the text editor.
3. From the WYSIWYG view the gallery looks like an ordinary Wordpress gallery, so you can easily add and remove pictures the way you are used to.

== Changelog ==

= 1.0 (april 26, 2013) =
* First release

== Arbitrary section ==
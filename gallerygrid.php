<?php

/*
Plugin Name: Responsive Gallery Grid
Plugin URI: http://bdwm.be/rgg
Description: Converts the default wordpress gallery to a Google+ styled image gallery grid, where the images are scaled to fill the gallery container, while maintaining image aspect ratio's.
Author: Jules Colle, BDWM
Author URI: http://bdwm.be
Version: 1.1

Copyright 2013 Jules Colle (email : jules@bdwm.be)

This program is free software; you can redistribute it and/or modify
it under the terms of the GNU General Public License, version 2, as
published by the Free Software Foundation.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program; if not, write to the Free Software
Foundation, Inc., 51 Franklin St, Fifth Floor, Boston, MA  02110-1301  USA

*/

$all_settings = array();

function rgg_gallery_shortcode($attr) {
	global $all_settings;
	$settings_arr = shortcode_atts(array(
        'type' => 'rgg',
        'class' => '',
        'rel' => 'rgg',
        'image_size' => 'medium',
        'ids' => '',
        'margin' => 10,
        'scale' => 1.2,
        'maxrowheight' => 200,
        'intime' => 100,
        'outtime' => 100
    ), $attr);
	
	extract($settings_arr);
	$all_settings[] = $settings_arr;
	
	if ($type == 'native') {
		return gallery_shortcode($attr);
	} else {
		
		
		$media_ids = explode(',', $ids);
		if (count($media_ids) == 0) {
			return '';
		}
		
		ob_start();
?>
		<div class="rgg_imagegrid <?php echo $class ?>" rgg_id="<?php echo count($all_settings) ?>">
			
<?php
		foreach($media_ids as $mid) {
			$info = wp_get_attachment_image_src( $mid, 'large' );
			$link = $info[0];
			$img = wp_get_attachment_image($mid, $image_size);
			echo "<a rel=\"$rel\" href=\"$link\">$img</a>";
			//echo $link;
		}
?>
		</div>
		<div style="clear:both"></div>
<?php
		
		return ob_get_clean();
	}
}

remove_shortcode('gallery', 'gallery_shortcode');
add_shortcode('gallery', 'rgg_gallery_shortcode');


function rgg_register_scripts() {
	//echo "RGG_REGISTER_SCRIPTS";
	global $all_settings;
	
	// enqueue css
	wp_register_style( 'rgg-style', plugins_url('css/style.css', __FILE__) );
	wp_enqueue_style( 'rgg-style' );
	
	// enqueue scripts
	wp_enqueue_script('imagesloaded', plugins_url( 'js/jquery.imagesloaded.min.js' , __FILE__ ), array('jquery'), '1', false );
	wp_enqueue_script('gallerygrid', plugins_url( '/js/jquery.gallerygrid.js' , __FILE__ ), array('imagesloaded'), '1.0.0', false );
	wp_enqueue_script('rgg-main', plugins_url( '/js/main.js' , __FILE__ ), array('gallerygrid'), '1.0.0', false );
	
	// pass shortcode parameters to main script also
	wp_localize_script( 'rgg-main', 'rgg_params', $all_settings );	
}

add_action('wp_footer', 'rgg_register_scripts');

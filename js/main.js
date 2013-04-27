var mobile =  /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent);

jQuery(document).ready(function(){
    if(!mobile) {
        
        // create copies from the images as placeholders to be used by imagegrid
        jQuery('.imagegrid img').each(function() {
            var $this = jQuery(this);
            var offset = $this.position();
            $this.clone().addClass('bbg_placeholder').css({ visibility : 'hidden' }).appendTo($this.parent());
            $this.css({ left:offset.left, top:offset.top, position: 'absolute' }).addClass('bbg_img');
        });
        
        var scale = 1.2;
        
        jQuery('.bbg_img').mouseenter(function() {
            var $clone = jQuery(this);
            var $placeholder = $clone.siblings('.bbg_placeholder').eq(0);
            
            $clone.unbind('mouseleave');
            
            var width = $placeholder.width();
            var height = $placeholder.height();
            var offset = $placeholder.position();
            
            var newwidth = width*scale;
            var newheight = height*scale;
            var newoffset = { top: offset.top - (newheight-height)/2, left: offset.left - (newwidth-width)/2 };
            var zindex = $clone.css('z-index');
            var newzindex = 999;
            
            var prev_box_shadow = $clone.css('box-shadow');
            $clone.css({'z-index': newzindex, 'box-shadow' : '0px 0px 4px #000'});
            $clone.animate({position:'absolute', left: newoffset.left, top: newoffset.top, height: newheight, width: newwidth },100);
            
            
            $clone.mouseleave(function() {  
                $clone.css({'z-index': zindex, 'box-shadow' : prev_box_shadow});         
                $clone.animate({position:'absolute', left: offset.left, top: offset.top, height: height, width: width, 'z-index' : zindex},100);
                $clone.unbind('mouseleave');
            });
        });
    } else {
        // if mobile
        jQuery('.imagegrid img').addClass('bbg_placeholder');
    }
    
    jQuery('.imagegrid').gallerygrid({
        'maxrowheight' : 200,
        'margin' : 10,
        'items' : '.bbg_placeholder',
        'after_init' : function() { },
        'before' : function() { },
        'after' : function() {
            if (!mobile) {
                jQuery('.bbg_placeholder').each(function() {
                    // update position of the absolute clones based on their sibling placeholder
                    $placeholder = jQuery(this);
                    $clone = $placeholder.siblings('.bbg_img').eq(0);
                    var offset = $placeholder.position();
                    
                    $clone.css({ left:offset.left, top:offset.top, position: 'absolute', width: $placeholder.width(), height: $placeholder.height() }).addClass('bbg_image');
                });
            }
        }
    });
    
});
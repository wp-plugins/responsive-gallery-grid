/*
    Gallery Grid jQuery Plugin
    (c) 2013 bdwm.be
    For any questions please email me at jules@bdwm.be
    Version: 1.3
*/

;(function($){
    
    $.fn.gallerygrid = function(settings){
        settings = $.extend({}, $.fn.gallerygrid.defaults, settings);
        $.fn.gallerygrid.settings = settings;
        //console.log('gallery grid working');
        console.log(settings);
        
        var maxrowheight = settings.maxrowheight;
        var margin = settings.margin;
        var items = settings.items;
        
        this.each(function() {
            var $container = jQuery(this);
            var ratios = [];
            var $tiles = jQuery();
            
            var to;
            
            $container.imagesLoaded(function() {
                $tiles = $container.find(items);
                
                $tiles.each(function() {
                    $tile = jQuery(this);
                    ratios.push($tile.width()/$tile.height());
                });
                
                makeGrid($container, ratios, $tiles);
                
                // call custom functions after the initial grid is set up.
                settings.after_init();
                settings.after();
                
                jQuery(window).resize(function(){
                    clearTimeout(to);
                    to = setTimeout(function(){
                        
                        // call custom functions before the scaling takes place
                        settings.before();
                        
                        makeGrid($container,ratios, $tiles);
                        
                        // call custom function every time teh grid is rescaled.
                        settings.after();
                    }, 200);
                });
                
            });
        });
        
        function makeGrid($container, ratios, $tiles) {
            
            $tiles.css({'display':'block', 'float':'left', 'margin-bottom' : margin });
            $tiles.css({'margin-right' : margin, 'height':maxrowheight, 'width' : 'auto', position:'relative'}); // reset the margins.
            
            $container.width('100%');
            var containerwidth = $container.width();
            //console.log('container: ' + containerwidth);
            
            var rows = [];
            var currentgroupwidth = 0;
            var $row = jQuery();
            
            jQuery.each($tiles, function(i,tile) {
                
                // TODO: take into account borders and padding to calculate the ratio's aswell
                var ratio = ratios[i];
                
                var $tile = jQuery(tile);
                var width = Math.ceil(maxrowheight * ratio) ;
                
                var extraWidth = $tile.outerWidth() - $tile.width();
                
                $row = $row.add(tile);
                
                currentgroupwidth += width; // the image width gets added to the current group
                containerwidth -= extraWidth; // the borders and padding get substracted from the container width
                
                console.log('currentgroupwidth: ' + currentgroupwidth + " - containerwidth: " + containerwidth + " - extraWidth: " + extraWidth);
                
                if (currentgroupwidth >= containerwidth) { 
                    
                    // Get the right height for all images, so the width nicely fits the container.
                    
                    
                    var ratio2 = currentgroupwidth / containerwidth ;
                    //console.log(currentgroupwidth + ' / ' + containerwidth + ' = ' + ratio2);
                    //console.log($row);
                    
                    var newHeight = Math.floor(maxrowheight/ratio2);
                    
                    //console.log(maxrowheight + ' / ' + ratio2 + ' = ' + newHeight);
                    
                    $row.height(newHeight);
                    
                    var totalWidth = 0;
                    $row.each(function(i) { // debug.
                        if ($row.length-1 == i) return; //skip last one
                        var realwidth = jQuery(this).width();
                        totalWidth += realwidth;
                        jQuery(this).css({ 'width' : realwidth });
                    });
                    
                    
                    $tile.css({'margin-right' : 0, 'width': containerwidth - totalWidth - 1});
                    
                    // reset everything for the next row.
                    
                    $row = jQuery();
                    currentgroupwidth = 0;
                    containerwidth = $container.width();
                } else {
                    containerwidth -= margin; // the margin gets substracted from the container width
                    
                    //last image of the grid should never have a right margin
                    if ($tiles.length-1 == i) $tile.css('margin-right',0);
                }
            });
        } 
        return this;
    }
    
    /*  Default Settings  */
    $.fn.gallerygrid.defaults = {
        'maxrowheight' : 200,
        'margin' : 10,
        'before' : function() { },
        'after' : function() { },
        'after_init' : function() { },
        'items' : 'img'
    };
    $.fn.gallerygrid.settings = {};
})(jQuery);
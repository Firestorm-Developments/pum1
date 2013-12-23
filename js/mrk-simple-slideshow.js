(function ( $ ) {
 
    $.fn.mrk_sshow = function( options ) {
        var settings = $.extend({
            debug: "FALSE",
            pause_on_hover: "FALSE",
            show_control: "FALSE"
        }, options );

 		var imagenes = $(this).find("img");
	 	if (settings.debug == "TRUE") {
			$(this).each(function() {
			  console.log( this.id );
			});

			imagenes.each(function() {
		        console.log( this.id );
		    });	 		
	 	}

	    return this;
    };
 
}( jQuery ));
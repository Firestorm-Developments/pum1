$(document).ready(function() {
	$( "#slide_mrk" ).slidesjs({
        navigation: false,
		pagination: {
		    active: false
		},
		play: {
			interval: 3000,
			auto: true,
			swap: true,
			pauseOnHover: true,
			restartDelay: 2000
		},
		callback: {
	      loaded: function(number) {
	        // Passes start slide number
	      },
	      start: function(number) {
	        // Passes slide number at start of animation
	      },
	      complete: function(number) {
	        // Passes slide number at end of animation
	      }
	    }		      	
	});
});
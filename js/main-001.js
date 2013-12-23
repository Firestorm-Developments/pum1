    $(document).ready(function() {
		$('#sld_txt').flexslider({
			animation: "slide",
			controlNav: false,
			slideshow: false,
		}); 

		$('#sld_img').flexslider({
			animation: "slide",
			controlNav: false,
			slideshow: false,
			sync: "#sld_txt"
		});     

		$('#sld_txt2').flexslider({
			animation: "slide",
			controlNav: false,
			slideshow: false,
		}); 

		$('#sld_img2').flexslider({
			animation: "slide",
			controlNav: false,
			slideshow: false,
			sync: "#sld_txt2"
		});   		
    });
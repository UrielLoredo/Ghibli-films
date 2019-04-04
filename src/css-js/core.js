var url = 'http://'+document.location.hostname+'/'
var core = null

if(window.outerWidth <= 767){
	core = true
}else{
	core = false
}

init = function(){

	screenSize = function(){
		width = window.outerWidth
		height = window.outerHeight
		return;
	}

	setSize = function(){
		screenSize();
		if(width <= 767){
			if(core=== true){
				core = false
				
			}
		}
		else if(width >= 768){
			if(core=== false){
				core = true
				
			}
		}
	}

	// Code to initialize on document ready
	var slider = tns({
		center: true,
		container: '#MoviesCarousel',
		prevButton: false,
		nextButton: false,
		nav: false,
		edgePadding: 10,
		controls: false,
		items: 2,
		loop: false,
		mouseDrag: true,
		startIndex: 2,
		gutter: 10,
		responsive: {
		  640: {
			edgePadding: 20,
			gutter: 20,
			items: 1
		  },
		  700: {
			gutter: 30
		  },
		  900: {
			items: 1
		  }
		}
	  });


	// inicio = function(){
	// 	setSize()
	// }

	// window.addEventListener('resize', function(){
	// 	setSize()
	//  })


	// inicio()
};

(function() {
	// initialization code
	init()
 
 })();
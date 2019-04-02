//variables
var url = 'http://'+document.location.hostname+'/';
var core = null;

if($(window).width() <= 767){
	core = true
}else{
	core = false
}

init = function(){

	anclasArray = [];

	medidas = function(){
		altura = $(window).height();
		anchura = $(window).width();
		alturaScroll = $(window).scrollTop();
		return;
	}

	setSize = function(){
		medidas();
		if(anchura <= 767){
			if(core=== true){
				core = false
				moverElementos();
				destructMenuDesctop();
				menumobile();
				fixedmenu();
			}
		}
		else if(anchura >= 768){
			if(core=== false){
				core = true
				resetElementos();
				destructMenuMobile();
				menudesktop();
				fixedmenu();
			}
		}
	}

	moverElementos = function(){

	}

	resetElementos = function(){
		$('.hamburguesa').removeClass('activo');
		$('.header nav').removeAttr( 'style' );
	}

	menudesktop = function(){

	}

	menumobile = function(){
		$('.hamburguesa').on('click', function(){
			$(this).toggleClass('activo');
			$('.header nav').slideToggle( 'slow' );
		});
	}

	destructMenuMobile = function(){
		$('.hamburguesa').off('click');
	}

	destructMenuDesctop = function(){

	}

	fixedmenu = function(){
		if($('header').hasClass('fixed')){
			var headerH = $('header').height();
			$('.wrapper').css("margin-top", headerH);
		}
	}

	$('.mainSlider').slick();

	inicio = function(){
		setSize();
	}

	$(window).resize(function(){
		setSize();
	});

	inicio();
};

$( document ).ready( init );

$(window).on('load',function(){

	if(! /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {

	}

	else{
		if(! /iPad/i.test(navigator.userAgent) ) {

		}
		else{

		}
	}
})
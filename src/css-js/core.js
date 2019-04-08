// General variables
var url = 'http://'+document.location.hostname+'/'
var core = null

if(window.outerWidth <= 767){
	core = true
}else{
	core = false
}

init = function(){
  // Get current sceen size
	screenSize = function(){
		width = window.outerWidth
		height = window.outerHeight
		return;
	}
   // Validate current sceen size
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

	var moviesContainer = document.getElementById('MoviesCarousel')
	var dbTitles = []

  //Api request

	var request = new XMLHttpRequest()
	request.open('GET', 'https://ghibliapi.herokuapp.com/films', true)

	request.onload = function () {
		var data = JSON.parse(this.response)

		if (request.status >= 200 && request.status < 400) {
			data.forEach(function (movie) {
        dbTitles.push(movie.title)
        
				// Create movie list DOM
        
        var movieWrap = document.createElement('article')
				var movieContent = document.createElement('div')
				var movieHeading = document.createElement('h2')
				var movieDesc = document.createElement('div')
        var descTxt = document.createElement('p')
        var descTag = document.createElement('span')
				var moviePoster = document.createElement('div')
				var movieThumbnail = document.createElement('figure')
        var movieImg = document.createElement('img')

				movieWrap.setAttribute('class', 'movie')
				movieWrap.setAttribute('id', movie.title.replace(/[^A-Z0-9]+/ig, '')	)
				movieContent.setAttribute('class', 'movie--content')	
				movieHeading.textContent = movie.title
				movieDesc.setAttribute('class', 'movie--desc')	
				movie.description = movie.description.substring(0, 300)
        descTxt.textContent = ''.concat(movie.description, '...')
        descTag.setAttribute('class', 'movie--desc-tag')	
        descTag.textContent = movie.director
				moviePoster.setAttribute('class', 'movie--figure')
				movieThumbnail.setAttribute('class', 'movie--thumbnail')
				movieImg.setAttribute('src', 'https://source.unsplash.com/800x600')
				
				moviesContainer.appendChild(movieWrap)
				movieWrap.appendChild(movieContent)
				movieWrap.appendChild(moviePoster)
        moviePoster.appendChild(movieThumbnail)

        // Poster container support 
				  //- movieThumbnail.appendChild(movieImg);
				movieContent.appendChild(movieHeading,movieDesc)
        movieContent.appendChild(movieDesc)
        movieDesc.appendChild(descTxt)
        movieDesc.appendChild(descTag)

        // Init animation on click
				movieWrap.addEventListener('click', function(){
					var isActive = this.classList.contains('current')
					var movieList = document.getElementsByClassName('current')
					for (var item = 0, len = movieList.length; item < len; item++) {
						movieList[item].classList.remove('current')
					}
					if(!isActive){
						var headerH = document.getElementsByClassName('header')[0].clientHeight
						var getId = this.getAttribute('id')
            var targetElement = document.getElementById(getId)						
						Velocity(targetElement, 'scroll', { duration: 300, offset: 0,complete: function(elements) { 
							elements[0].classList.add('current')
						 } });
					
					}else{
						this.classList.remove('current')
					}
				})
			})
		} else {
			var errorMessage = document.createElement('marquee')
			errorMessage.textContent = "Gah, it's not working!"
			app.appendChild(errorMessage)
		}
	};

	request.send()

  var searchBoxResults = document.getElementById('SearchBoxResults')

  // Init Auto Complete JS lib
	new autoComplete({
		selector: 'input[name="searchfield"]',
		offsetLeft: '0',
		offsetTop: '5.25rem',
		minChars: 1,
		renderItem: function (item, search){
			search = search.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')
			var re = new RegExp("(" + search.split(' ').join('|') + ")", "gi")
			return '<div class="autocomplete-suggestion" data-val="' + item + '">' + item.replace(re, "<strong>$1</strong>") + '</div>'
		},
		source: function(term, suggest){
				term = term.toLowerCase()
				var choices = dbTitles
				var matches = []
				for (i=0; i<choices.length; i++)
					if (~choices[i].toLowerCase().indexOf(term)) matches.push(choices[i])
				suggest(matches)
		},
		onSelect: function (event, term, item){
			var headerH = document.getElementsByClassName('header')[0].clientHeight
			var goToMovie = document.getElementById(term.replace(/[^A-Z0-9]+/ig, ''))
			Velocity(goToMovie, 'scroll', { duration: 400, offset: (headerH * -1) })
			setTimeout(function(){ 
				var isActive = goToMovie.classList.contains('current')
				if(!isActive){
					goToMovie.classList.add('current')
				}else{
					goToMovie.classList.remove('current')
				}
			 }, 800)
		}
  })
  
	// Listerner functions on resize
	window.addEventListener('resize', function(){
	  setSize()
	})
};

(function() {
	// Initialization code on document ready state
  init()
  var getBody = document.getElementsByTagName('body')[0]
  var getLoader = document.getElementsByClassName('loader')[0]
  setTimeout(function(){
    getBody.classList.add('loader-done')
    Velocity(getLoader, 'fadeOut', { duration: 250 })
  }, 2000)
  
 })()
var core, init;

core = null;

if (window.outerWidth <= 767) {
  core = true;
} else {
  core = false;
}

init = function() {
  var dbTitles, moviesContainer, request, screenSize, searchBoxResults, setSize;
  screenSize = function() {
    var height, width;
    width = window.outerWidth;
    height = window.outerHeight;
  };
  setSize = function() {
    screenSize();
    if (width <= 767) {
      if (core === true) {
        core = false;
      }
    } else if (width >= 768) {
      if (core === false) {
        core = true;
      }
    }
  };
  moviesContainer = document.getElementById('MoviesCarousel');
  dbTitles = [];
  request = new XMLHttpRequest;
  request.open('GET', 'https://ghibliapi.herokuapp.com/films', true);
  request.onload = function() {
    var data;
    data = JSON.parse(this.response);
    if (request.status >= 200 && request.status < 400) {
      data.forEach(function(movie) {
        var descTag, descTxt, movieContent, movieDesc, movieHeading, movieImg, moviePoster, movieThumbnail, movieWrap;
        dbTitles.push(movie.title);
        movieWrap = document.createElement('article');
        movieContent = document.createElement('div');
        movieHeading = document.createElement('h2');
        movieDesc = document.createElement('div');
        descTxt = document.createElement('p');
        descTag = document.createElement('span');
        moviePoster = document.createElement('div');
        movieThumbnail = document.createElement('figure');
        movieImg = document.createElement('img');
        movieWrap.setAttribute('class', 'movie');
        movieWrap.setAttribute('id', movie.title.replace(/[^A-Z0-9]+/ig, ''));
        movieContent.setAttribute('class', 'movie--content');
        movieHeading.textContent = movie.title;
        movieDesc.setAttribute('class', 'movie--desc');
        movie.description = movie.description.substring(0, 300);
        descTxt.textContent = ''.concat(movie.description, '...');
        descTag.setAttribute('class', 'movie--desc-tag');
        descTag.textContent = movie.director;
        moviePoster.setAttribute('class', 'movie--figure');
        movieThumbnail.setAttribute('class', 'movie--thumbnail');
        movieImg.setAttribute('src', 'https://source.unsplash.com/800x600');
        moviesContainer.appendChild(movieWrap);
        movieWrap.appendChild(movieContent);
        movieWrap.appendChild(moviePoster);
        moviePoster.appendChild(movieThumbnail);
        movieContent.appendChild(movieHeading, movieDesc);
        movieContent.appendChild(movieDesc);
        movieDesc.appendChild(descTxt);
        movieDesc.appendChild(descTag);
        movieWrap.addEventListener('click', function() {
          var body, documentHeight, getId, headerH, html, isActive, item, len, movieList, targetElement, topPositon, windowHeight;
          isActive = this.classList.contains('current');
          movieList = document.getElementsByClassName('current');
          item = 0;
          len = movieList.length;
          while (item < len) {
            movieList[item].classList.remove('current');
            item++;
          }
          if (!isActive) {
            headerH = document.getElementsByClassName('header')[0].clientHeight;
            getId = this.getAttribute('id');
            targetElement = document.getElementById(getId);
            body = document.body;
            html = document.documentElement;
            topPositon = targetElement.offsetTop;
            documentHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
            windowHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
            if (documentHeight - topPositon < windowHeight) {
              Velocity(targetElement, 'scroll', {
                duration: 250,
                offset: headerH * -1,
                begin: function(elements) {
                  elements[0].classList.add('current');
                }
              });
            } else {
              Velocity(targetElement, 'scroll', {
                duration: 250,
                offset: headerH * -1,
                complete: function(elements) {
                  elements[0].classList.add('current');
                }
              });
            }
          } else {
            this.classList.remove('current');
          }
        });
      });
    } else {
      console.log('Error, Ghibli Api request');
    }
  };
  request.send();
  searchBoxResults = document.getElementById('SearchBoxResults');
  new autoComplete({
    selector: 'input[name="searchfield"]',
    offsetLeft: '0',
    offsetTop: '5.25rem',
    minChars: 1,
    renderItem: function(item, search) {
      var reExp;
      search = search.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
      reExp = new RegExp('(' + search.split(' ').join('|') + ')', 'gi');
      return '<div class="autocomplete-suggestion" data-val="' + item + '">' + item.replace(reExp, '<strong>$1</strong>') + '</div>';
    },
    source: function(term, suggest) {
      var choices, i, matches;
      term = term.toLowerCase();
      choices = dbTitles;
      matches = [];
      i = 0;
      while (i < choices.length) {
        if (~choices[i].toLowerCase().indexOf(term)) {
          matches.push(choices[i]);
        }
        i++;
      }
      suggest(matches);
    },
    onSelect: function(event, term, item) {
      var goToMovie, headerH;
      headerH = document.getElementsByClassName('header')[0].clientHeight;
      goToMovie = document.getElementById(term.replace(/[^A-Z0-9]+/ig, ''));
      Velocity(goToMovie, 'scroll', {
        duration: 400,
        offset: headerH * -1
      });
      setTimeout((function() {
        var isActive;
        isActive = goToMovie.classList.contains('current');
        if (!isActive) {
          goToMovie.classList.add('current');
        } else {
          goToMovie.classList.remove('current');
        }
      }), 800);
    }
  });
  window.addEventListener('resize', function() {
    setSize();
  });
};

(function() {
  var getBody, getLoader;
  init();
  getBody = document.getElementsByTagName('body')[0];
  getLoader = document.getElementsByClassName('loader')[0];
  setTimeout((function() {
    getBody.classList.add('loader-done');
    Velocity(getLoader, 'fadeOut', {
      duration: 250
    });
  }), 2000);
})();

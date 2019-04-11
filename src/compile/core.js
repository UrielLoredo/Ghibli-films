var core, init;

core = null;

if (window.outerWidth <= 767) {
  core = true;
} else {
  core = false;
}

init = function() {
  var cleanCurrentClass, dbTitles, moviesContainer, request, screenSize, searchBoxResults, setSize;
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
  moviesContainer = document.getElementById('MoviesList');
  dbTitles = [];
  cleanCurrentClass = function() {
    var j, len, movie, movieList;
    movieList = document.querySelectorAll('.current');
    movie = 0;
    for (j = 0, len = movieList.length; j < len; j++) {
      movie = movieList[j];
      movie.classList.remove('current');
    }
  };
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
          var body, documentHeight, getId, headerH, html, isActive, targetElement, topPositon, windowHeight;
          isActive = this.classList.contains('current');
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
                duration: 0,
                offset: headerH * -1,
                begin: function(elements) {
                  cleanCurrentClass();
                  elements[0].classList.add('current');
                }
              });
            } else {
              Velocity(targetElement, 'scroll', {
                duration: 0,
                offset: headerH * -1,
                begin: function(elements) {
                  cleanCurrentClass();
                },
                complete: function(elements) {
                  elements[0].classList.add('current');
                }
              });
            }
          } else {
            cleanCurrentClass();
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
  return new autoComplete({
    selector: 'input[name="searchfield"]',
    offsetLeft: '-50%',
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
      var body, documentHeight, goToMovie, headerH, html, isActive, topPositon, windowHeight;
      goToMovie = document.getElementById(term.replace(/[^A-Z0-9]+/ig, ''));
      isActive = goToMovie.classList.contains('current');
      if (!isActive) {
        headerH = document.getElementsByClassName('header')[0].clientHeight;
        body = document.body;
        html = document.documentElement;
        topPositon = goToMovie.offsetTop;
        documentHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
        windowHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
        if (documentHeight - topPositon < windowHeight) {
          Velocity(goToMovie, 'scroll', {
            duration: 0,
            offset: headerH * -1,
            begin: function(elements) {
              cleanCurrentClass();
              elements[0].classList.add('current');
            }
          });
        } else {
          Velocity(goToMovie, 'scroll', {
            duration: 0,
            offset: headerH * -1,
            begin: function(elements) {
              cleanCurrentClass();
            },
            complete: function(elements) {
              goToMovie.classList.add('current');
            }
          });
        }
      } else {
        cleanCurrentClass();
        Velocity(goToMovie, 'scroll', {
          duration: 0,
          offset: headerH * -1,
          complete: function(elements) {
            goToMovie.classList.add('current');
          }
        });
      }
    }
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

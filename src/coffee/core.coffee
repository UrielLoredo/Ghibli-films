core = null
if window.outerWidth <= 767
  core = true
else
  core = false

init = ->

  # Get current sceen size
  screenSize = ->
    width = window.outerWidth
    height = window.outerHeight
    return

  # Validate current screen size
  setSize = ->
    screenSize()
    if width <= 767
      if core == true
        core = false
    else if width >= 768
      if core == false
        core = true
    return

  moviesContainer = document.getElementById('MoviesCarousel')
  dbTitles = []
  cleanCurrentClass = ->
    movieList = document.getElementsByClassName('current')
    len = movieList.length
    for item in [0...len]
      movieList[item].classList.remove 'current'
    return

  #Ghibli Api request
  request = new XMLHttpRequest
  request.open 'GET', 'https://ghibliapi.herokuapp.com/films', true

  request.onload = ->
    data = JSON.parse(@response)
    if request.status >= 200 and request.status < 400
      data.forEach (movie) ->
        dbTitles.push movie.title

        # Create movie list DOM
        movieWrap = document.createElement('article')
        movieContent = document.createElement('div')
        movieHeading = document.createElement('h2')
        movieDesc = document.createElement('div')
        descTxt = document.createElement('p')
        descTag = document.createElement('span')
        moviePoster = document.createElement('div')
        movieThumbnail = document.createElement('figure')
        movieImg = document.createElement('img')
        movieWrap.setAttribute 'class', 'movie'
        movieWrap.setAttribute 'id', movie.title.replace(/[^A-Z0-9]+/ig, '')
        movieContent.setAttribute 'class', 'movie--content'
        movieHeading.textContent = movie.title
        movieDesc.setAttribute 'class', 'movie--desc'
        movie.description = movie.description.substring(0, 300)
        descTxt.textContent = ''.concat(movie.description, '...')
        descTag.setAttribute 'class', 'movie--desc-tag'
        descTag.textContent = movie.director
        moviePoster.setAttribute 'class', 'movie--figure'
        movieThumbnail.setAttribute 'class', 'movie--thumbnail'
        # Request random images form Unsplash API (inly for test)
        movieImg.setAttribute 'src', 'https://source.unsplash.com/800x600'
        moviesContainer.appendChild movieWrap
        movieWrap.appendChild movieContent
        movieWrap.appendChild moviePoster
        moviePoster.appendChild movieThumbnail
        # Poster container support
        #- movieThumbnail.appendChild(movieImg);
        movieContent.appendChild movieHeading, movieDesc
        movieContent.appendChild movieDesc
        movieDesc.appendChild descTxt
        movieDesc.appendChild descTag
        # Init animation on click
        movieWrap.addEventListener 'click', ->
          isActive = @classList.contains('current')
          cleanCurrentClass()
          if !isActive
            headerH = document.getElementsByClassName('header')[0].clientHeight
            getId = @getAttribute('id')
            targetElement = document.getElementById(getId)
            body = document.body
            html = document.documentElement
            topPositon = targetElement.offsetTop
            documentHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight)
            windowHeight = window.innerHeight or document.documentElement.clientHeight or document.body.clientHeight
            # Fix scroll top for last items
            if documentHeight - topPositon < windowHeight
              Velocity targetElement, 'scroll',
                duration: 250
                offset: headerH * -1
                begin: (elements) ->
                  elements[0].classList.add 'current'
                  return
            else
              Velocity targetElement, 'scroll',
                duration: 250
                offset: headerH * -1
                complete: (elements) ->
                  elements[0].classList.add 'current'
                  return
          else
            @classList.remove 'current'
          return
        return
    else
      console.log 'Error, Ghibli Api request'
    return

  request.send()

  searchBoxResults = document.getElementById('SearchBoxResults')

  # Init Auto Complete JS lib
  new autoComplete(
    selector: 'input[name="searchfield"]'
    offsetLeft: '-50%'
    offsetTop: '5.25rem'
    minChars: 1
    renderItem: (item, search) ->
      search = search.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')
      reExp = new RegExp('(' + search.split(' ').join('|') + ')', 'gi')
      '<div class="autocomplete-suggestion" data-val="' + item + '">' + item.replace(reExp, '<strong>$1</strong>') + '</div>'
    source: (term, suggest) ->
      term = term.toLowerCase()
      choices = dbTitles
      matches = []
      i = 0
      while i < choices.length
        if ~choices[i].toLowerCase().indexOf(term)
          matches.push choices[i]
        i++
      suggest matches
      return
    onSelect: (event, term, item) ->
      headerH = document.getElementsByClassName('header')[0].clientHeight
      goToMovie = document.getElementById(term.replace(/[^A-Z0-9]+/ig, ''))
      cleanCurrentClass()
      Velocity goToMovie, 'scroll',
        duration: 400
        offset: headerH * -1
      setTimeout (->
        isActive = goToMovie.classList.contains('current')
        if !isActive
          goToMovie.classList.add 'current'
        else
          goToMovie.classList.remove 'current'
        return
      ), 800
      return
)

do ->
  # Init code on document ready state
  init()
  getBody = document.getElementsByTagName('body')[0]
  getLoader = document.getElementsByClassName('loader')[0]
  setTimeout (->
    getBody.classList.add 'loader-done'
    Velocity getLoader, 'fadeOut', duration: 250
    return
  ), 2000
  return
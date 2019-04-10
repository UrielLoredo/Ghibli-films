# Ghibli Films

List of films consuming Ghibli Studios API

## Tech/framework used
### Preprocessors
  - CoffeeScript
  - Sass
  - Pug
### Compiled
  - JavaScript ES5
  - CSS
  - HTML5
### Environment
  - Node JS 8.11.1
  - Gulp
  - Compass
### API
  - Studio Ghibli API https://ghibliapi.herokuapp.com/films
### Libs
  - autoComplete JS
## Installation

#### nodefront
  ```sh
$ npm -g nodefront
```
#### Pug
  ```sh
$ npm install pug
```
#### SASS
  ```sh
$ gem install -g sass
```
#### COMPASS
  ```sh
$ gem install compass
$ gem update --system
```
#### Gulp
  ```sh
$ npm install --global gulp-cli
```

#### Install dependencies
  ```sh
 $ cd Ghibli-films
$ npm install
```

#### Init server
  ```sh
 $ gulp init
```
Verify the deployment by navigating to your server address in your browser.

  ```sh
 127.0.0.1:3000
```

## Directory map

    dist
      - css
        -- fonts
        -- img
        styles.css
      - img
        - js
          core.js
      index.html
    src
      - coffee
        core.coffee
      - compile
        -- libs
        core.js
        styles.css
    - pug
        -- includes
        index.pug
    - sass
        -- inlcudes
        styles.sass
    config.rb
    .gitignore
    gulpfile.js
    package.json
    screenshot.png

### Screenshot
  ![alt text](https://raw.githubusercontent.com/UrielLoredo/Ghibli-films/master/screenshot.jpg)
  ![alt text](https://raw.githubusercontent.com/UrielLoredo/Ghibli-films/master/screenshot-detail.jpg)
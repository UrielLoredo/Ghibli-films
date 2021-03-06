# Set this to the root of your project when gulp init deployed:
http_path = "/"
css_dir = "../dist/css"
sass_dir = "sass"
images_dir = "../dist/css/img"
javascripts_dir = "../dist/js"
fonts_dir = "../dist/css/fonts"

#output_style = :expanded
#output_style = :nested
#output_style = :compressed
# or :nested or :compact or :compressed
Encoding.default_external = 'UTF-8'
#environment = :production
environment = :develop
output_style = (environment == :production) ? :compressed : :expanded

# To enable relative paths to assets via compass helper functions. Uncomment:
relative_assets = true

color_output = false

preferred_syntax = :sass

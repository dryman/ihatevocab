fs      = require 'fs'
sysPath = require 'path'

# See docs at http://brunch.readthedocs.org/en/latest/config.html.

exports.config = 

  files: 
    
    javascripts: 
      defaultExtension: 'js',
      joinTo: 
        'javascripts/app.js': /^app/
        'javascripts/vendor.js': /^vendor/

      order: 
        before: [
          'vendor/scripts/console-helper.js',
          'vendor/scripts/jquery-1.9.1.js',
          'vendor/scripts/handlebars-1.0.0-rc.3.js',
          'vendor/scripts/ember-latest.js',
          'vendor/scripts/ember-data-latest.js',
          'vendor/scripts/custom.modernizr.js',
          'vendor/scripts/foundation.js'
          # 'vendor/scripts/foundation.alert.js',
          # 'vendor/scripts/foundation.clearing.js',
          # 'vendor/scripts/foundation.cookie.js',
          # 'vendor/scripts/foundation.dropdown.js',
          # 'vendor/scripts/foundation.forms.js',
          # 'vendor/scripts/foundation.joyride.js',
          # 'vendor/scripts/foundation.magellan.js',
          # 'vendor/scripts/foundation.orbit.js',
          # 'vendor/scripts/foundation.placeholder.js',
          # 'vendor/scripts/foundation.reveal.js',
          # 'vendor/scripts/foundation.section.js',
          # 'vendor/scripts/foundation.tooltips.js',
          # 'vendor/scripts/foundation.topbar.js'
          ]
          #todos

    stylesheets:
      defaultExtension: 'css'
      joinTo: 'stylesheets/app.css'
      order:
        before: [
          'vendor/styles/normalize.css'
          'vendor/styles/foundation.css'
          ]
        # todos

    templates:
      precompile: true
      root: 'templates'
      defaultExtension: 'hbs'
      joinTo: 'javascripts/app.js' : /^app/

  modules:
    addSourceURLs: true

  # allow _ prefixed templates so partials work
  conventions:
    ignored: (path) ->
      startsWith = (string, substring) ->
        string.indexOf(substring, 0) is 0
      sep = sysPath.sep
      if path.indexOf("app#{sep}templates#{sep}") is 0
        false
      else
        startsWith sysPath.basename(path), '_'

  server:
    port: 3333
    base: '/'
    run: no


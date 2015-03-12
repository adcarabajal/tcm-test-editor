module.exports = (grunt) ->
  assets:
    files: [
      {
        expand: true
        dest: '<%=config.siteDir%>'
        src: [
          '**/*.*'
          '!scripts/livereload-support.js'
          '!styles/**/*.less', '!**/*.jade'
        ]
        cwd: '<%=config.srcDir%>'
      }, {
        expand: true
        dest: '<%=config.siteDir%>/scripts/libs'
        src: ['**/*.js', '**/*.css', '**/*.woff', '**/*.ttf']
        cwd: 'bower_components'
      },
      {
        expand: true
        dest: '<%=config.siteDir%>/fonts'
        src: ['**/*.woff', '**/*.ttf']
        cwd: 'bower_components/bootstrap/fonts'
      }
    ]

  liveReloadScript:
    dest: '<%=config.siteDir%>/scripts/livereload-support.js'
    src: 'src/scripts/livereload-support.js'
    options:
      process: (content) -> grunt.template.process(content)

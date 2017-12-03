import gulp from 'gulp'
import sass from 'gulp-ruby-sass'
import browserify from 'browserify'
import watchify from 'watchify'
import babelify from 'babelify'
import vueify from 'vueify'
import source from 'vinyl-source-stream'
import { spawn } from 'child_process'

const js_assets = './assets/javascripts/'
const css_assets = './assets/stylesheets/'
const vue_assets = './views/'
const node_server = './controllers/'
gulp.task('server', () => {
})

gulp.task('scripts', () => {
   let b = browserify({
      entries: [js_assets + 'app.js'],
      extensions: ['.js', '.vue'],
      transform: [
         vueify,
         babelify.configure({ 'presets': ['es2015'] })
      ]
   })
      b.bundle()
      .pipe(source('bundle.js'))
      .pipe(gulp.dest('./public/javascripts'))
})

gulp.task('styles', () => {
   sass(css_assets + 'bundle.scss')
      .on('error', sass.logError)
      .pipe(gulp.dest('./public/stylesheets'))
})

gulp.task('watch', () => {
   // gulp.watch([node_server + '*.js', node_server + 'api_docs/*.js'], ['server'])
   gulp.watch(js_assets + '*.js', ['scripts'])
   gulp.watch(vue_assets + '**/*.vue', ['scripts'])
   gulp.watch(css_assets + '*.scss', ['styles'])
})

gulp.task('default', ['watch', 'scripts', 'styles', 'server'])

import gulp from 'gulp'
import sass from 'gulp-ruby-sass'
import browserify from 'browserify'
import watchify from 'watchify'
import source from 'vinyl-source-stream'
import { spawn } from 'child_process'

const js_assets = './public/assets/javascripts/'
const css_assets = './public/assets/stylesheets/'
const node_server = './controllers/'

// TODO: nodemonを使い、自動化を検討
// let node
gulp.task('server', () => {
   /* if(node){
      node.kill()
   }
   node = spawn('babel-node', ['./controllers/route.js'], { presets: 'es2015', stdio: 'inherit' })
   node.on('close', (code) => {
      if(code === 8){
         gulp.log('Error detected, waiting for changes')
      }
   }) */
})

gulp.task('scripts', () => {
   let b = browserify({
      entries: [js_assets + 'app.js']
   })
      b.transform('babelify', { presets: ['es2015'] })
      .bundle()
      .pipe(source('bundle.js'))
      .pipe(gulp.dest('./public/src/javascripts'))
})

gulp.task('styles', () => {
   sass(css_assets + 'bundle.scss')
      .on('error', sass.logError)
      .pipe(gulp.dest('./public/src/stylesheets'))
})

gulp.task('watch', () => {
   // gulp.watch([node_server + '*.js', node_server + 'api_docs/*.js'], ['server'])
   gulp.watch(js_assets + '*.js', ['scripts'])
   gulp.watch(css_assets + '*.scss', ['styles'])
})

gulp.task('default', ['watch', 'scripts', 'styles', 'server'])

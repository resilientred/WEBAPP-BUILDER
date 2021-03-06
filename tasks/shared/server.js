/**
 * Created by Crystian on 10/20/2014.
 */

var webserver   = require('gulp-webserver'),
    path        = require('path'),
    runSequence = require('run-sequence').use(gulp),
    utils       = require('./utils');

gulp.task('serveLoader', ['buildFull'], function(){
  utils.breakIfIsNotTemplate();

  return makeServe(global.cfg.pathFwk, global.cfg.loader.folders.www, global.cfg.ip, global.cfg.ports.template);
});

gulp.task('serveDist', 'web server from dist folder.', ['buildFullDist'], function(){
  utils.breakIfIsRoot();

  return makeServe(global.cfg.pathPrj + global.cfg.app.folders.dist, '/', global.cfg.ip, global.cfg.ports.dist);
});

gulp.task('serveProject', ['buildFull'], function(){
  utils.breakIfIsRoot();
  utils.breakIfIsTemplate();

  return makeServe(global.cfg.pathPrj + global.cfg.app.folders.www, '/', global.cfg.ip, global.cfg.ports.project);
});

gulp.task('serve', 'web server in dev mode from the project folder', function(){
  var r = 'serveProject';

  if(global.cfg.isTemplate){
    r = 'serveLoader';
  }

  return runSequence(r);
});

function makeServe(folder, _path, ip, port){
  console.logGreen('Remember, this is the url: http://' + ip + ':' + port + '/' + _path);
  console.log('Serving: ', path.resolve(folder));

  return gulp.src(folder)
    .pipe(utils.debugme())
    .pipe(webserver({
      host: ip,
      port: port,
      //fallback: 'index.html',
      //directoryListing: true,
      livereload: false,
      open: false
    }));

}

exports.makeServe = makeServe;

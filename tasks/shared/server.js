/**
 * Created by Crystian on 10/20/2014.
 */

(function(){
	'use strict';

	var webserver = require('gulp-webserver'),
			path      = require('path'),
			runSequence = require('run-sequence'),
			utils     = require('./utils'),
			gutil     = require('gulp-util');

	//gulp.task('_serveNightmare', function(){
	//	return makeServe(global.cfg.pathFwk +'/'+ global.cfg.loader.folders.build, '', global.cfg.ip, global.cfg.ports.nightmare);
	//});

	gulp.task('serveLoader', function(){
		utils.breakIfIsNotTemplate();

		return makeServe(global.cfg.pathFwk, global.cfg.loader.folders.www, global.cfg.ip, global.cfg.ports.serve);
	});

	gulp.task('serveBuild', function(){
		utils.breakIfIsLoader();

		var pathPrj = global.cfg.isTemplate ? '../../' : global.cfg.pathPrj;
		return makeServe(pathPrj + global.cfg.app.folders.build, '/', global.cfg.ip, global.cfg.ports.build);
	});

	gulp.task('serveProject', function(){
		utils.breakIfIsLoader();
		utils.breakIfIsTemplate();

		return makeServe(global.cfg.pathPrj + global.cfg.app.folders.www, '/', global.cfg.ip, global.cfg.ports.project);
	});

	gulp.task('serve', function(){
		var r = 'serveProject';

		if(global.cfg.isTemplate){
			r = 'serveLoader';
		}

		return runSequence(r);
	});

	function makeServe(folder, _path, ip, port){
		//_path = (_path) ? _path : '';
		console.logGreen('Remember, this is the url: http://' + ip + ':' + port + '/' + _path);
		console.log('Serving: ', path.resolve(folder));

		return gulp.src(folder)
			.pipe(utils.debugeame())
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

}());
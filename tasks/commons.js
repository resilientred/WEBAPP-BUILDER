/**
* Created by Crystian on 15/02/02.
*/

var gulp = require('gulp'),
	//debug = require('gulp-debug'),
	sass = require('gulp-ruby-sass'),
	autoprefixer = require('gulp-autoprefixer'),
	csslint = require('gulp-csslint'),
	inject = require('gulp-inject'),
	del	= require('del'),
	chalk = require('chalk'),
	gutil = require('gulp-util');

gulp.task('remove:build', ['remove:temp'], function(cb) {
	//no borrar la carpeta build, da errores de sincro
	del([global.cfg.folders.screens,
		global.cfg.folders.build +'/**/*'
	], /*{force:true}, */cb());
});

gulp.task('remove:temp', function(cb) {
	del([global.cfg.folders.temp],cb());
});


process.on('uncaughtException', function(err){
	if(typeof err === 'string') err = {message:err};
	console.logRed('uncaughtException: ' + err.message);
	if (gutil.env.debug) {
		console.logRed(err.stack);
	}
	process.exit(1);             // exit with error
});


exports.sassfixer = function(src, dest) {
	return gulp.src(src)
		//.pipe(debug({verbose: true}))
		//.on('error', console.error.bind(console))
		.pipe(sass({style: 'expanded', noCache: true}))
		.pipe(autoprefixer(global.cfg.autoprefixer))
		.pipe(csslint('csslintrc.json'))
		.pipe(csslint.reporter().on('error',gutil.log))
		.pipe(gulp.dest(dest));
};


exports.injectContent = function(filePath, name, tagHtm) {
	return inject(gulp.src([filePath]), {
		starttag: '<!-- inject:'+ name +' -->',
		transform: function (filePath, file) {
			var r = file.contents.toString('utf8');
			if (tagHtm) {
				r = '<'+tagHtm+'>'+r+'</'+tagHtm+'>';
			}
			return r;
		}
	});
};


console.logGreen = function (m) {
	console.log(chalk.black.bgGreen(m));
};
console.logRed = function (m) {
	console.log(chalk.black.bgRed(m));
};
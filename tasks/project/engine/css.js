/**
 * Created by Crystian on 15/11/2015.
 */
	//TODO sprites
(function(){
	'use strict';

	var utils        = require('../../shared/utils'),
			sass         = require('gulp-sass'),
			less         = require('gulp-less'),
			stylus       = require('gulp-stylus'),
			minifycss    = require('gulp-minify-css'),
			strip        = require('gulp-strip-comments'),
			gif          = require('gulp-if'),
			csslint      = require('gulp-csslint'),
			replace      = require('gulp-replace'),
			autoprefixer = require('gulp-autoprefixer'),
			rename       = require('gulp-rename'),
			gutil        = require('gulp-util'),
			core         = require('./core');

	function runPreprocessors(file, config, appName, pth){
		return core.doMagic(file, config, appName, pth, {
			extensionFinal: 'css',
			isPrepro: function(type){
				return (core.defaults.validCssPreproExtensions.indexOf(type) !== -1);
			},
			isValid: function(type){
				return (this.isPrepro() !== -1 || type === this.extensionFinal);
			},
			processFile: function(stream, config, fileName, type){
				return preprocessFile(stream, config, fileName, type);
			},
			removeCode: function(stream){
				return stream;
			},
			linter: function(stream, config){
				if(config.linter){
					stream = stream
						.pipe(replace(' 0px', ' 0'))
						.pipe(csslint('csslintrc.json'))
						.pipe(csslint.reporter(cssLintCustomReporter))
						.pipe(gif(config.linterForce, csslint.reporter('fail')));
				}
				return stream;
			},
			minifyFile: function(stream){
				return stream
					.pipe(strip({safe: false, block: false}))
					.pipe(minifycss());
			}
		});
	}

	function preprocessFile(stream, config, fileName, type){
		//TODO add config option for each type
		switch (type){
			case 'scss':
			case 'sass':
				var sassOptions = {errLogToConsole: true, indentedSyntax: (type === 'sass')};

				stream = stream.pipe(sass(sassOptions));
				break;
			case 'styl':
				stream = stream.pipe(stylus());
				break;
			case 'less':
				stream = stream.pipe(less());
				break;
		}

		if(config.autoPrefixer){
			stream = stream.pipe(autoprefixer({browsers: global.cfg.autoprefixer}));
		}

		return stream.pipe(rename(fileName + '.css'));
	}

	function cssLintCustomReporter(file){
		gutil.log(gutil.colors.cyan(file.csslint.errorCount) + ' errors in ' + gutil.colors.magenta(file.path));

		file.csslint.results.forEach(function(result){
			gutil.log(result.error.message + ' on line ' + result.error.line);
		});
	}

	exports.runPreprocessors = runPreprocessors;
}());
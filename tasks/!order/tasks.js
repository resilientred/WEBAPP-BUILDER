
//gulp.task('build:loader', function (cb) {
//
//	if(!utils.fileExist(global.cfg.loader.folders.www + '/'+global.cfg.loader.filesDest.index)
//	|| !utils.fileExist(global.cfg.loader.folders.www + '/config.js')){
//		console.logRed('Index not found, run `make:base` to generate');
//		utils.exit(1);
//	}
//
//	runSequence(
//		'make:loader:html',
//		'remove:loader:temp',
//	cb);
//});

//gulp.task('release', function (cb) {
//	if (!global.cfg.loader.release) {
//		console.logRed('Variable "release" in project-config on "false", you will change it if you want a release');
//		utils.exit(1);
//	}
//
//	runSequence(
//		'full:loader',
//		'test:loader',
//	cb);
//});


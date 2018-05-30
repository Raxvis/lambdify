const babel = require('gulp-babel');
const eslint = require('gulp-eslint');
const eslintIfFixed = require('gulp-eslint-if-fixed');
const gulp = require('gulp');
const through = require('through2');
const gulpif = require('gulp-if');
const sourcemaps = require('gulp-sourcemaps');

const isJS = (file) => file.path.split('.').pop() === 'js';

gulp.task('build', () =>
	gulp
		.src('packages/*/src/**/*.js')
		.pipe(gulpif(isJS, eslint({ fix: true })))
		.pipe(eslint.format())
		.pipe(gulpif(isJS, eslintIfFixed('src')))
		.pipe(sourcemaps.init())
		.pipe(babel())
		.pipe(
			through.obj((file, enc, callback) => {
				file.originalPath = file.path;
				file.path = file.path.replace('src', 'dist');
				callback(null, file);
			}),
		)
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest('packages')),
);
gulp.task('default', ['build']);
gulp.task('watch', () => {
	gulp.watch('packages/*/src/**/*.js', ['build']);
});

const babel = require('gulp-babel');
const eslint = require('gulp-eslint');
const eslintIfFixed = require('gulp-eslint-if-fixed');
const gulp = require('gulp');
const gulpif = require('gulp-if');
const sourcemaps = require('gulp-sourcemaps');

const isJS = (file) => file.path.split('.').pop() === 'js';

gulp.task('build', () =>
	gulp
		.src('src/**/*.js')
		.pipe(gulpif(isJS, eslint({ fix: true })))
		.pipe(eslint.format())
		.pipe(gulpif(isJS, eslintIfFixed('src')))
		.pipe(sourcemaps.init())
		.pipe(babel())
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest('dist')),
);
gulp.task('default', ['build']);
gulp.task('watch', () => {
	gulp.watch('src/**/*.js', ['build']);
});

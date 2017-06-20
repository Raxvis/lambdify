const argv = require('minimist')(process.argv.slice(2));
const gulp = require("gulp");
const babel = require("gulp-babel");
const eslint = require("gulp-eslint");

gulp.task('build', () => (
	gulp.src('src/**/*.js')
	.pipe(eslint())
	.pipe(eslint.format())
	.pipe(babel())
	.pipe(gulp.dest('dist'))
));

if (argv.env.stage === 'prod') {
	gulp.task('default', ['build']);
} else {
	gulp.task('default', () => {
		gulp.watch('src/**/*.js', ['build']);
	});
}
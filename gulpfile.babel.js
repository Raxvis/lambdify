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
gulp.task("default", ['build']);
gulp.task("watch", () => {
	gulp.watch('src/**/*.js', ['build']);
});
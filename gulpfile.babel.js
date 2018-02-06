const gulp = require("gulp");
const babel = require("gulp-babel");
const eslint = require("gulp-eslint");
const through = require("through2");

gulp.task('build', () => (
	gulp.src('packages/*/src/**/*.js')
		.pipe(eslint())
		.pipe(eslint.format())
		.pipe(babel())
		.pipe(through.obj((file, enc, callback) => {
			file.originalPath = file.path;
			file.path = file.path.replace('src', 'dist');
			callback(null, file);
		}))
		.pipe(gulp.dest('packages'))
));
gulp.task("default", ['build']);
gulp.task("watch", () => {
	gulp.watch('packages/*/src/**/*.js', ['build']);
});
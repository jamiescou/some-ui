/**
 * Created by listen1013 on 17/1/10.
 */

var gulp = require('gulp'),
    eslint = require('gulp-eslint')
   
// lint
const lintDirs = [
    'src/**/*.js',
    'src/**/*.jsx'
];

gulp.task('lint', () => {
    return gulp.src(lintDirs)
        .pipe(eslint())
        .pipe(eslint.format());
});

gulp.task('lintWatch',['lint'], () => {
    gulp.watch(lintDirs, function(event) {
        return gulp.src(event.path)
            .pipe(eslint())
            .pipe(eslint.format());
    });
});

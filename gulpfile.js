const gulp = require("gulp"); //zaciągam
const sass = require("gulp-sass"); // zaciągam
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync').create();
const notifier = require('node-notifier');

sass.compiler = require('sass') //('node-sass');

const showError = function showError(err) {
    console.log("----------------");
    console.log(err.messageFormatted);
    console.log("----------------");

    notifier.notify({
        title: 'Błąd',
        message: err.messageFormatted
    });
}


function server(cb) { // nie wystawiamy nie export, jest zalezne od innych
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });

    cb();
}

function makeCss() {
    return gulp.src('./scss/main.scss') //poprawiłam sass na scss i gwiazdki na main.scss, zawsze zaczynamy od main.scss
        .pipe(sourcemaps.init())
        .pipe(sass({
            outputStyle: "expanded" // nested, compact, compressed (najczęściej używany w produkcji),
        }).on('error', showError)) //zamiana
        .pipe(autoprefixer())
        .pipe(sourcemaps.write(".")) //zapisuje komnetarz sourcemaps do oddzielnego pliku, nie w main.css
        .pipe(gulp.dest('./css')) //zapisanie do pliku css
        .pipe(browserSync.stream());
}

function watch(cb) {
    gulp.watch("./scss/**/*.scss", gulp.series(makeCss)); //obserwuj wszystkie pliki z rozsz scss w katalogu i podkatalogach scss, jak się coś zmieni to zrób zadanie
    gulp.watch("./*.html").on('change', browserSync.reload);
    cb(); // każde zadanie które nie zwraca (return) trzeba zamknąć cb
}

module.exports.makeCss = makeCss; // wystawiam na zewnątrz
module.exports.watch = watch;

//odpalanie innych zadań

// gulp.series(makeCSS, cosinnego)
// gulp.paralel(makeCSS, cosinnego)

module.exports.default = gulp.series(server, makeCss, watch) // zadania które po kolei uruchamiają się domyślnie


//source maps - mapy źródłowe

// gulp.task('javascript', function() {
//     gulp.src('src/**/*.js')
//         .pipe(sourcemaps.init())
//         .pipe(plugin1())
//         .pipe(plugin2())
//         .pipe(sourcemaps.write())
//         .pipe(gulp.dest('dist'));
// }); - dodałam do powyższego
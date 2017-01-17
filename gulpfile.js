/*global require, console */
var gulp       = require("gulp"),  // Instruct Node.js to load gulp
    browserify = require("browserify"),
    source     = require("vinyl-source-stream"),
    tsify      = require("tsify"),
    uglify     = require("gulp-uglify"),
    sourcemaps = require("gulp-sourcemaps"),
    buffer     = require("vinyl-buffer");

var appName = "paf-quiz",
    paths = {
    wildcards: {
        ts: "**/*.ts",
        js: "**/*.js",
        css: "**/*.css",
        html: "**/*.html"
    },
    source: {
        app: "src/webapp/app/",
        css: "src/webapp/app/**/*.css",
        html: "src/webapp/app/**/*.html",
        main: "src/webapp/main.ts"
    },
    distribution: {
        app: "src/main/resources/static/",
        js: "src/main/resources/static/js/",
        css: "src/main/resources/static/css/",
        html: "src/main/resources/static/html/"
    }
}

/*
 * Default-Task
 */
gulp.task("default", [ "build" ], function() {
    // hier sollte build und (weitere) nacheinander gelaufen sein.
});

/*
 * Fuehrt die Tasks build:app und ggfs. weitere synchron nacheinander aus.
 */
gulp.task("build", [ "build:app", "build:html", "build:css", "build:res" ], function() {
    // hier sollten build:app, build:html, build:css, build:res und (weitere) nacheinander gelaufen sein.
});

/*
 * Fuehrt die Tasks clean:app und ggfs. weitere synchron nacheinander aus.
 */
gulp.task("clean", [ "clean:app" ], function() {
    // Hier sollte clean:app und (weitere) nacheinander gelaufen sein.
});

/*
 * Erstellen der Konfigurations-Angular2-App
 */
gulp.task("build:app", function() {
    console.log("===== Generating angular2 app...");
    return browserify({
        basedir     : '.',
        debug       : true,
        entries     : [paths.source.main],
        cache       : {},
        packageCache: {}
    })
    .plugin(tsify)
    .bundle()
    .pipe(source(appName + ".js"))
    .pipe(buffer())
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(uglify())
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(paths.distribution.js));
});

/*
 * Erstellen der CSS-Dateien und der darin benoetigten Dateien

gulp.task("build:css", function() {
  console.log("===== Generating Styles for apps...");
  return gulp.src(params.module.css)
    .pipe(concat(params.module.cssname))
    .pipe(replace(params.module.versionmakro,params.packagej.version))
    .pipe(gulp.dest(params.assetpathcss))        
    .pipe(concat(params.module.cssminname))
    .pipe(cleanCSS({ compatibility: 'ie8'}))
    .pipe(gulp.dest(params.assetpathcss));
});
 */

/*
 * Erstellen der Ressourcen für die Apps (z.B. i18n)

gulp.task("build:res", function() {
  console.log("===== Generating resource files for apps...");
  return gulp.src(params.module.resources)
    .pipe(replace(params.module.versionmakro,params.packagej.version))
    .pipe(gulp.dest(params.assetpathres));  
});
 */

/*
 * Räumt das Distributionsverezeichnis auf
 */
gulp.task("clean:app", function() {
    console.log("===== Deleting generated files...");
    del([
        paths.distribution.app + "/" + paths.wildcards.js,
        paths.distribution.app + "/" + paths.wildcards.css,
        paths.distribution.app + "/" + paths.wildcards.html
    ]);
});

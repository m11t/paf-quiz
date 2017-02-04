/*global require, console */
var gulp       = require("gulp"),  // Instruct Node.js to load gulp
    browserify = require("browserify"),
    source     = require("vinyl-source-stream"),
    tsify      = require("tsify"),
    uglify     = require("gulp-uglify"),
    sourcemaps = require("gulp-sourcemaps"),
    buffer     = require("vinyl-buffer"),
    del        = require("del");

var appName = "paf-quiz",
    fonts = "node_modules/font-awesome/fonts/*",
    dependencies = [
        "node_modules/core-js/client/shim.min.js",
        "node_modules/zone.js/dist/zone.js",
        "node_modules/clarity-ui/clarity-ui.min.css",
        "node_modules/clarity-icons/clarity-icons.min.js",
        "node_modules/clarity-icons/clarity-icons.min.css",
        "node_modules/font-awesome/css/font-awesome.min.css",
        "node_modules/@webcomponents/custom-elements/custom-elements.min.js"
    ],
    paths = {
        wildcards: {
            ts: "**/*.ts",
            js: "**/*.js",
            css: "**/*.css",
            html: "**/*.html"
        },
        source: {
            app: "src/webapp/app/",
            css: "src/webapp/**/*.css",
            html: "src/webapp/**/*.html",
            main: "src/webapp/app/main.ts"
        },
        distribution: {
            main: "src/main/resources/static/",
            app: "src/main/resources/static/app/",
            lib: "src/main/resources/static/lib/",
            font: "src/main/resources/static/fonts/"
        }
    };

/*
 * Default-Task
 */
gulp.task("default", [ "build" ], function() {
    // hier sollte build und (weitere) nacheinander gelaufen sein.
});

/*
 * Fuehrt die Tasks build:app und ggfs. weitere synchron nacheinander aus.
 */
gulp.task("build", [ "build:app", "build:lib", "build:html", "build:fonts" ], function() {
    // hier sollten build:app, build:lib, build:html, build:fonts und (weitere) nacheinander gelaufen sein.
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
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(paths.distribution.app));
//    .pipe(uglify())
});

/*
 * Erstellen der Lib-Dateien und der darin benoetigten Dateien
*/
gulp.task("build:lib", function() {
    return gulp.src(dependencies)
    .pipe(gulp.dest(paths.distribution.lib));
});

/*
 * Erstellen der Font-Dateien und der darin benoetigten Dateien
*/
gulp.task("build:fonts", function() {
    return gulp.src(fonts)
    .pipe(gulp.dest(paths.distribution.font));
});

/*
 * Erstellen der CSS-Dateien und der darin benoetigten Dateien
*/
gulp.task("build:html", function() {
    return gulp.src(paths.source.html)
    .pipe(gulp.dest(paths.distribution.main));
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
    return del([
        paths.distribution.main + "**/*"
    ]);
});

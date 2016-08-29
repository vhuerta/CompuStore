var gulp = require('gulp');
var browserSync = require('browser-sync');
var proxyMiddleware = require('http-proxy-middleware');

// PROXY PARA ENVIAR PETICIONES AL API QUE SE ENCUENTRA EN http://localhost:80/compustore/api
var proxy = proxyMiddleware('/api', { target: 'http://localhost:80', changeOrigin: true, pathRewrite: { '^/api': '/compustore/api' } });


// this task utilizes the browsersync plugin
// to create a dev server instance
// at http://localhost:9000
gulp.task('serve', ['build'], function(done) {
    browserSync({
        online: false,
        open: false,
        port: 9000,
        server: {
            baseDir: ['.'],
            middleware: [function(req, res, next) {
                res.setHeader('Access-Control-Allow-Origin', '*');
                next();
            }, proxy]
        }
    }, done);
});

// this task utilizes the browsersync plugin
// to create a dev server instance
// at http://localhost:9000
gulp.task('serve-bundle', ['bundle'], function(done) {
    browserSync({
        online: false,
        open: false,
        port: 9000,
        server: {
            baseDir: ['.'],
            middleware: [function(req, res, next) {
                res.setHeader('Access-Control-Allow-Origin', '*');
                next();
            }, proxy]
        }
    }, done);
});

// this task utilizes the browsersync plugin
// to create a dev server instance
// at http://localhost:9000
gulp.task('serve-export', ['export'], function(done) {
    browserSync({
        online: false,
        open: false,
        port: 9000,
        server: {
            baseDir: ['./export'],
            middleware: [function(req, res, next) {
                res.setHeader('Access-Control-Allow-Origin', '*');
                next();
            }, proxy]
        }
    }, done);
});

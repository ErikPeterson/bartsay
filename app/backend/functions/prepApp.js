var statick = require('koa-static-cache');
var path = require('path');
var handlebars = require('koa-handlebars');


module.exports = function(app){

    app.use(handlebars({
        defaultLayout: "main",
        root: __dirname,
        viewsDir: "../views",
        layoutsDir: "../views/layouts"
    }));

    var files = {};

    app.use(statick(__dirname + '/../public/css', {prefix: '/css'}, files));
    statick(__dirname + '/../public/js', {prefix: '/js'}, files);
    statick(__dirname + '/../public/fonts', {prefix: '/fonts'}, files);

    app.use(function * (next){
        this.locals = {
            title: app.name
        };

        yield next;
    });

};
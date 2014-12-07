var env = process.env.NODE_ENV || 'development';
var config = require('./config/' + env + '.json');

var bartsay = require('./functions/bartsay.js');

var static = require('koa-static-cache');
var path = require('path');

var handlebars = require('koa-handlebars');

var route = require('koa-route');

var koa = require('koa');
var app = koa();


app.name = 'BartSay';

var files = {};
app.use(static(__dirname + '/public/css', {prefix: '/css'}, files));
static(__dirname + '/public/js', {prefix: '/js'}, files);

app.use(handlebars({
    defaultLayout: "main",
    root: __dirname,
    viewsDir: "views",
    layoutsDir: "views/layouts"
    }
));

app.use(function * (next){
    this.locals = {
        title: app.name
    };

    yield next;
});

app.use(route.get('/', home));
app.use(route.post('/message', message));


function *home(next){
    var text = yield bartsay().next().value;

    this.locals.bart = text;

    yield this.render('home', this.locals);
}

function *message(next){
    var opts = this.request.body;
    var text = yield bartsay(opts).next().value;

    this.body = JSON.stringify({
        message: text
    });
}

app.listen(config.port);
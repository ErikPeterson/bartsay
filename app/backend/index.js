var env = process.env.NODE_ENV || 'development';
var config = require('./config/' + env + '.json');

var bartsay = require('./functions/bartsay.js');
var selectBart = require('./functions/selectBart.js')(__dirname + '/../../bartfiles');
var statick = require('koa-static-cache');
var path = require('path');

var handlebars = require('koa-handlebars');

var route = require('koa-route');

var koa = require('koa');
var app = koa();

var Fortune = require('./functions/db.js')(config.db);



app.name = 'BartSay';

var files = {};
app.use(statick(__dirname + '/public/css', {prefix: '/css'}, files));
statick(__dirname + '/public/js', {prefix: '/js'}, files);
statick(__dirname + '/public/fonts', {prefix: '/fonts'}, files);

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
    var bart_to_use = selectBart();
    var output = yield bartsay({text_to_opts: '-f ' + bart_to_use});
    var fortune = yield Fortune.findOne('text', output.text);
    fortune = fortune || (yield (new Fortune({text: output.text})).save());

    this.locals.fortune_id = fortune.attributes._id;
    this.locals.bart = output.bart;

    yield this.render('home', this.locals);
}

function *message(next){
    var opts = this.request.body;
    var output = yield bartsay(opts);
    var fortune = yield Fortune.findOne('text', output.text);
        fortune = fortune || (yield (new Fortune({text: output.text})).save());

    this.body = JSON.stringify({
        message: output.bart,
        fortune_id: fortune.attributes._id
    });

}

app.listen(config.port);
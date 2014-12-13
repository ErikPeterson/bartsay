var env = process.env.NODE_ENV || 'development';
var config = require('./config/' + env + '.json');

var prepApp = require('./functions/prepApp.js');

var bartsay = require('./functions/bartsay.js');
var fortuneTeller = require('./functions/fortune.js');

var selectBart = require('./functions/selectBart.js')(__dirname + '/../../bartfiles');


var router = require('koa-router');
var koaBody = require('koa-body')();
var koa = require('koa');
var app = koa();

prepApp(app);

app.use(router(app));

var Fortune = require('./functions/db.js')(config.db);



app.name = 'BartSay';


app.get('/', home);
app.post('/fortune', koaBody, getFortune);
app.post('/fortune/:id/tag', koaBody, tagFortune);


function *home(next){
    var bart_to_use = yield selectBart();
    var fortune_text = yield fortuneTeller();

    var fortune = yield Fortune.findOne(fortune_text);

    fortune = fortune || (yield (new Fortune(fortune_text)).save());

    var bart = yield bartsay(fortune.attributes.formatted_text, fortune.primaryTag());

    this.locals.fortune_id = fortune.attributes._id;
    this.locals.bart = bart.bart;

    yield this.render('home', this.locals);
}

function *getFortune(next){

    var fortune_text = yield fortuneTeller();

    var fortune = yield Fortune.findOne(fortune_text);
        fortune = fortune || (yield  (new Fortune(fortune_text)).save() );

    var bart = yield bartsay(fortune.attributes.formatted_text, fortune.primaryTag());

    this.body = {bart: bart.bart, fortune: fortune.toHash()};

}

function *tagFortune(next){
    var id = this.params.id;
    var tag = this.request.body.tag;
    var fortune = yield Fortune.findOne({_id: id});

    fortune = yield fortune.addTag(tag).save();

    var bart = yield bartsay(fortune.attributes.formatted_text, fortune.primaryTag());

    this.body = {bart: bart.bart, fortune: fortune.toHash()};
}

app.listen(config.port);
var exec = require('co-exec');
var assign = Object.assign || require('object.assign');

var defaults = {
    text_from: 'fortune',
    text_from_opts: '-a',
    text_to: 'cowsay',
    text_to_opts: '-f bart'
};

var bartsay = function * (options){
    var settings = assign({}, defaults, options || {});
    var command = settings.text_from + " " + settings.text_from_opts + " | " + settings.text_to + " " + settings.text_to_opts;
    var bart = yield exec(command);

    return bart[1];
};

module.exports = bartsay;
var co = require('co');
var exec = require('co-exec');
var assign = Object.assign || require('object.assign');

var defaults = {
    text_from: 'fortune',
    text_from_opts: '-a',
    text_to: 'cowsay',
    text_to_opts: '-f bart'
};


module.exports = function* (options){
    var settings = assign({}, defaults, options || {});
    
    var text = yield exec(settings.text_from + " " + settings.text_from_opts);
    var formatted_text = text.replace(/"/g, '\\"')
                    .replace(/'/g, "\'")
                    .replace(/\n/g, '\\n')
    var get_bart =  'echo "' + formatted_text + '" | ' + settings.text_to + " " + settings.text_to_opts;
    var bart = yield exec(get_bart);

    return {bart: bart, text: text};
};
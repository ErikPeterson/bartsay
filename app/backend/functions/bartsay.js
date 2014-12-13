var co = require('co');
var exec = require('co-exec');
var assign = Object.assign || require('object.assign');

var defaults = {
    file: 'bart'
};


module.exports = function* (text, file){
    file = file || 'bart';

    var get_bart =  'echo "' + text + '" | cowsay  -f ' + file;
    var bart = yield exec(get_bart);

    return {bart: bart};
};
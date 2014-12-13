var co = require('co');
var exec = require('co-exec');

module.exports = function * (dictionary){
    dictionary = dictionary || '-a';

    var text = yield exec("fortune " + dictionary);

    return {fortune: text};
};


    
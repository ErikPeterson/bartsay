var fs = require('co-fs');

module.exports = function(path_to_barts){
    var barts;

    var selectBart = function(){
        return barts[Math.floor(Math.random() * barts.length)];
    };

    return function * (){
        barts = barts || (yield fs.readdir(path_to_barts)).map(function(path){
            return path.replace(/\.cow$/, '');
        });

        return selectBart();
    };
};
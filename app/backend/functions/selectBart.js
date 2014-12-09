var fs = require('fs');

module.exports = function(path_to_barts){
    var barts = fs.readdirSync(path_to_barts).map(function(path){
        return path.replace(/\.cow$/, '');
    });

    console.log(barts);

    var selectBart = function(){
        return barts[Math.floor(Math.random() * barts.length)];
    };

    return selectBart;
};
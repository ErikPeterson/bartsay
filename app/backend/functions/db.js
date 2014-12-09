var Mongorito = require('mongorito');
var Model = Mongorito.Model;

module.exports = function(db){
    
    var uri = (db.username && db.password) ? db.username + '@' + db.password + db.url : db.url;
    Mongorito.connect(uri);

    var Fortune = Model.extend({
        collection: 'fortunes',
        configure: function(){
            this.before('create', 'checkIfExists');
        },
        checkIfExists: function *(next){
            var record = (yield Fortune.findOne('text', this.text));

            if(record){
                throw new Error('A fortune with that text already exists')
                return;
            }

        }
    });

    return Fortune;
}
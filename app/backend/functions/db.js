var Mongorito = require('mongorito');
var Model = Mongorito.Model;

module.exports = function(db){
    
    var uri = (db.username && db.password) ? db.username + '@' + db.password + db.url : db.url;
    Mongorito.connect(uri);
    
    var Fortune = Model.extend({
        collection: 'fortunes',
        configure: function(){
            this.attributes.tags = this.attributes.tags || {};
            this.hook({'before:create': ['_checkIfExists', '_formatText']});
        },
        _checkIfExists: function *(next){
            var record = (yield Fortune.findOne({'fortune': this.attributes.fortune}));
            if(record){
                throw new Error('A fortune with that text already exists');
                return;
            }

            yield next;
        },
        _formatText: function *(next){
            
            if(!this.attributes.fortune){
                throw new Error('Fortunes cannot be created without a `fortune` attribute');
                return;
            }

            var formatted_text = this.attributes.fortune.replace(/"/g, '\\"')
                    .replace(/'/g, "\'")
                    .replace(/`/g, "\\`")
                    .replace(/\n/g, '\\n');

            this.attributes.formatted_text = formatted_text;

            yield next;
        },
        primaryTag: function (){
            if(!this.attributes.tags || Object.keys(this.attributes.tags).length === 0) return "bart";
            
            return Object.keys(this.attributes.tags)
                                    .sort((function(a, b){
                                        var A = this.attributes.tags[a];
                                        var B = this.attributes.tags[b];

                                        if(A === B) return 0;

                                        return A > B ? 1 : -1;
                                    }).bind(this)).reverse()[0];
        },
        addTag: function (tag){
            this.attributes.tags[tag] = this.attributes.tags[tag] || 0;
            this.attributes.tags[tag]++;
            return this;
        },
        toHash: function(){
            return {
                primary_tag: this.primaryTag(),
                text: this.formatted_text,
                tags: this.attributes.tags,
                _id: this.attributes._id
            };
        },
        toJSON: function(){
            return JSON.stringify(this.toHash());
        }
    });

    return Fortune;
};
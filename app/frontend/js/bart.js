var qwest = require('qwest');

var bart = {
    fortune: {},
    dictionary: "-a",
    bart: "",
    random: function(cb, binding){
        var fn = binding ? cb.bind(binding) : cb;
        
        qwest.post('/fortune').then(this.update.bind(this))
        .then(fn)
        .catch(this.err("Fetching Error"));

    },
    tag: function(tag, cb, binding){
        var fn = binding ? cb.bind(binding) : cb;
        var path = '/fortune/' + this.fortune._id + '/tag';

        qwest.post(path, {
            tag: tag
        }).then(this.update.bind(this))
        .then(fn)
        .catch(this.err("Tagging Erorr"));
    },
    render: function(){
        return '<pre class="bart">' + this.bart + '</pre>';
    },
    err: function(type){
        return function(message){
            console.error(new Error(type + ": " + message));
        };
    },
    update: function(data){
        var json = JSON.parse(data);
        var k;

        for(k in json){
            this[k] = json[k];
        }
    }
};

module.exports = bart;
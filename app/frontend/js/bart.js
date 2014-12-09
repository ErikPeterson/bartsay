var qwest = require('qwest');

var bart = {
    dictionary: "",
    message: "",
    text_from: "fortune",
    text_to: "cowsay",
    cowfile: "bart",
    offensive: true,
    fetch: function(cb, binding){
        var fn = binding ? cb.bind(binding) : cb;
        console.log('fetching...');
        qwest.post('/message', {
            text_from_opts: this.textFromOpts(),
            text_from: this.text_from,
            text_to: this.text_to,
            text_to_opts: this.textToOpts()
        }).then(this.update.bind(this))
        .then(fn)
        .catch(this.err("Fetching Error"));

    },
    render: function(){
        return '<pre class="bart">' + this.message + '</pre>';
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
    },
    textFromOpts: function(){
        return this.dictionary + " " + this.offensive ? "-a" : "";
    },
    textToOpts: function(){
        return "-f " + this.cowfile;
    }
};

module.exports = bart;
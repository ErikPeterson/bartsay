(function(){
'use strict';


var App = {
    initialize: function(frameEl){
        this.frameEl = ( typeof frameEl === "object" ) ? frameEl : document.querySelector(frameEl);
        this.bart = require('./bart.js');
        this.bartel = document.querySelector('.bart-inner');
        this.bindEvents();
    },
    bindEvents: function(){
        var that = this;

        this.newBartButton = document.querySelector('.new-bart');
        this.newBartButton.addEventListener('click', this.refreshBart.bind(this));
    },
    refreshBart: function(){
        this.bart.fetch(this.renderBart.bind(this))
    },
    renderBart: function(){
        this.bartel.innerHTML = this.bart.render();
    }
};

require('domready')(function(){
    'use strict';
    window.App = App;
    App.initialize();

});

}());
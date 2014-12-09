var App = {
    initialize: function(){
        console.log('initializing...');
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
        this.bart.fetch(this.renderBart, this);
    },
    renderBart: function(){
        this.bartel.innerHTML = this.bart.render();
    }
};

require('domready')(function(){
    console.log('domready');
    App.initialize();
});

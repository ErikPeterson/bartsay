var App = {
    initialize: function(){
        this.bart = require('./bart.js');
        this.bartel = document.querySelector('.bart-inner');
        this.bart.fortune._id = this.bartel.querySelector('pre').dataset.fortuneId;
        this.bindEvents();
    },
    bindEvents: function(){
        var that = this;
        this.newBartButton = document.querySelector('.new-bart');
        this.newBartButton.addEventListener('click', this.refreshBart.bind(this));
    },
    refreshBart: function(){
        this.bart.random(this.renderBart, this);
    },
    renderBart: function(){
        this.bartel.innerHTML = this.bart.render();
    }
};

require('domready')(function(){
    App.initialize();
    window.App = App;
});

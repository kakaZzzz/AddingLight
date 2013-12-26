define(function(require, exports, module){
    var section = require('section').getInstance();
    $('div.main div a').click(function(){
        var sectionId = this.href.split('#')[1];
        section.forward(sectionId);
    });
});
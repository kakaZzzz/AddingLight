define(function(require, exports, modules){
    var section = require('section').getInstance();
    $((section ? '#page_weight_detail ' : '') + 'a.header_back').click(function(){
        var sectionId = this.href.split('#')[1];
        if(section){
            section.backward(sectionId);
        }else{
            location.href = sectionId + '.html';
        }
    });
});
define(function(require, exports, module){
    var section = require('section').getInstance(),
        queryString = location.search.split('=')[1];
    queryString && $('a.header_back').prop('href', '#' + queryString);
    //
    $((section ? '#page_download ' : '') + 'a.header_back').click(function(){
        var sectionId = this.href.split('#')[1];
        if(section){
            section.backward(sectionId);
        }else{
            location.href = sectionId + '.html';
        }
    });
});
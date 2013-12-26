define(function(require, exports, module){
    var section = require('section').getInstance(),
        queryString = location.search.split('=')[1];
    queryString && $('page_weight_week a.header_back').prop('href', '#' + queryString);
    $('.weight_week_main ul').delegate('li a', 'click', function(evt){
        var index = $('.weight_week_main ul li a').index(this),
            sectionId = queryString || $('#page_weight_week a.header_back').prop('href').split('#')[1];
        if(section){
            section.backward(sectionId);
        }else{
            location.href = './' + sectionId + '.html';
        }
    });
    //
    $((section ? '#page_weight_week ' : '') + 'a.header_back').click(function(){
        var sectionId = this.href.split('#')[1];
        if(section){
            section.backward(sectionId);
        }else{
            location.href = './' + sectionId + '.html';
        }
    });
});
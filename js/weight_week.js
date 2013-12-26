define(function(require, exports, module){
    var section = require('section').getInstance(),
        queryString = location.search.split('=')[1];
    function gotoPage(prop, sectionId, opts){
        if(section){
            section[prop](sectionId, opts);
        }else{
            location.href = sectionId + '.html' + (opts ? '?page=' + opts.page : '') ;
        }
    }
    
    queryString && $('a.header_back').prop('href', '#' + queryString);
    $('.weight_week_main ul').delegate('li a', 'click', function(evt){
        var index = $('.weight_week_main ul li a').index(this),
            sectionId = queryString || $('#page_weight_week a.header_back').prop('href').split('#')[1];
        gotoPage('backward', sectionId);
    });
    //
    $((section ? '#page_weight_week ' : '') + 'a.header_back').click(function(){
        var sectionId = this.href.split('#')[1];
        gotoPage('backward', sectionId);
    });
    //查看结果
    $((section ? '#page_weight_week ' : '') + '.footer a').click(function(){
        var sectionId = this.href.split('#')[1];
        gotoPage('forward', sectionId, {page: 'weight_week'});
    });
});
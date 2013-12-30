define(function(require, exports, module){
    var section = require('section').getInstance();
    function gotoPage(prop, sectionId, opts){
        if(section){
            section[prop](sectionId, opts);
        }else{
            location.href = sectionId + '.html' + (opts ? '?page=' + opts.page : '') ;
        }
    }
    
    $((section ? '#page_weight ' : '') + 'a.header_back').click(function(){
        gotoPage('backward', this.href.split('#')[1]);
    });
    $('.weight_main a.art_list').click(function(){
        var sectionId = this.href.split('#')[1];
        switch(sectionId){
            case 'weight_week':
                gotoPage('forward', sectionId, {page: 'weight'});
                break;
            case 'weight_detail':
                gotoPage('forward', sectionId);
                break;
            default:
                break;
        }
    });
    //查看结果
    $((section ? '#page_weight ' : '') + '.footer a').click(function(){
        var sectionId = this.href.split('#')[1];
        gotoPage('forward', sectionId, {page: 'weight'});
    });
});
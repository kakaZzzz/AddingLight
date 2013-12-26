define(function(require, exports, module){
    var section = require('section').getInstance();
    function gotoPage(prop, sectionId, opts){
        if(section){
            section[prop](sectionId, opts);
        }else{
            location.href = (sectionId === 'root' ? './index.html' : './' + sectionId + '.html')
                + (opts ? '?page=' + opts.page : '') ;
        }
    }
    $((section ? '#page_quickening ' : '') + 'a.header_back').click(function(){
        var sectionId = this.href.split('#')[1];
        if(section){
            section.backward(sectionId);
        }else{
            location.href = './' + sectionId + '.html';
        }
    });
    $('.quickening_main a.art_list').click(function(){
        var sectionId = this.href.split('#')[1];
        switch(sectionId){
            case 'weight_week':
                gotoPage('forward', sectionId, {page: 'quickening'});
                break;
            case 'quickening_detail':
                gotoPage('forward', sectionId);
                break;
            default:
                break;
        }
    });
    //查看结果
    $((section ? '#page_quickening ' : '') + '.footer a').click(function(){
        var sectionId = this.href.split('#')[1];
        gotoPage('forward', sectionId, {page: 'quickening'});
    });
});
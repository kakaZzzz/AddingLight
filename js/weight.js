define(function(require, exports, module){
    var section = require('section').getInstance();
    function gotoPage(prop, sectionId){
        if(section){
            section[prop](sectionId);
        }else{
            location.href = (sectionId === 'root') ? './index.html' : './' + sectionId + '.html';
        }
    }
    
    $((section ? '#page_weight ' : '') + 'a.header_back').click(function(){
        gotoPage('backward', this.href.split('#')[1]);
    });
    $('.weight_main a.art_list').click(function(){
        var sectionId = this.href.split('#')[1];
        switch(sectionId){
            case 'weight_week':
                gotoPage('forward', sectionId);
                break;
            case 'weight_detail':
                gotoPage('forward', sectionId);
                break;
            default:
                break;
        }
    });
});
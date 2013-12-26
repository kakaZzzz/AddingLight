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
    
    $((section ? '#page_fundalheight ' : '') + 'a.header_back').click(function(){
        gotoPage('backward', this.href.split('#')[1]);
    });
    //查看结果
    $((section ? '#page_fundalheight ' : '') + '.footer a').click(function(){
        var sectionId = this.href.split('#')[1];
        gotoPage('forward', sectionId, {page: 'fundalheight'});
    });
});
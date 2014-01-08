define(function(require, exports, module){
    var input = $('.typeblist_main input.search'),
        engine = require('SearchEngine').getInstance(input),
        btn =  $('.typeblist_main a.search_btn').tap(function(evt){
            var keyword = $('.typeblist_main .search').val();
            if(!keyword){$('.typeblist_main .search').focus(); return;}
            location.href = './typebret.html?keyword=' + encodeURI(keyword);
        });
    $('.typeblist_main ul.list').delegate('a', 'click', function(){
        input.val($(this).text());
        btn.trigger('tap');
    });
});
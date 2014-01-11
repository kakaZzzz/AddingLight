define(function(require, exports, module){
    var $ = require('./libs/zepto.min'),
        input = $('.typeblist_main input.search'),
        engine = require('SearchEngine').getInstance(input),
        btn =  $('.typeblist_main a.search_btn').tap(function(evt){
            var keyword = $('.typeblist_main .search').val();
            if(!keyword){$('.typeblist_main .search').focus(); return;}
            engine.getSuggestion().hide();
            $('#myform').submit();
        });
    $('.typeblist_main ul.list').delegate('a', 'tap', function(){
        input.val($(this).text());
        btn.trigger('tap');
    });
});
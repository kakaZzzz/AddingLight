define(function(require, exports, module){
    $('.expect_main .count').click(function(evt){
        var Mustache = require('mustache'),
            tmpl = '您的预产期是：<span class="red">{{expect}}</span><br/>您已经怀孕：<span class="red">{{week}}</span><br/>离宝宝出生还有：<span class="red">{{date}}</span>';
        $('.expect_main .ret').html(Mustache.render(tmpl, {expect: '2014年7月25日', week: '10周3天', date: '208天'}));
    });
    if($.os.ios){//如果是ios系统，需要处理date的宽度
        function resize(){
            //$('menstrual_date').width($('#menstrual_cycle').width());
            document.getElementById('menstrual_date').style.width = 
            document.getElementById('menstrual_cycle').offsetWidth - 15 + 'px';
        }
        $(window).on('orientationchange', resize);
        resize();
    }
});
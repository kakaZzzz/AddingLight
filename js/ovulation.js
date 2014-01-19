define(function(require, exports, module){
    var $ = require('./libs/zepto.min'),
        popup = require('popup'),
        util = require('util').util,
        calendar = require('calendar').getInstance(),
        redirect = require('redirect').html,
        Mustache = require('mustache'),
        tmpl = $('#ovulation-dialog-content').html();
    //regexp
    var numeric = /^\d+$/;
    //util
    function getMenses(mensDate){
        var five = 5,//月经周期5天
            date = new Date(mensDate.getTime()),
            ret = {};
        for(var i = 0; i < five; i++){
            ret[util.date.format(date, 'yyyy-M-d')] = 'mens';
            date.setDate(date.getDate() + 1);
        }
        return ret;
    }
    function getOvulation(mensDate, cycle){
        var date = new Date(mensDate.getTime()),
            start = cycle - 19,
            len = 10 - (3 - Math.min(start, 3)),
            ret = {};
        date.setDate(date.getDate() + Math.max(3, start));//排卵期前一天
        for(var i = 0; i < len; i++){//排卵期一般10，前5天后4天+当天
            ret[util.date.format(date, 'yyyy-M-d')] = 'ovul';
            date.setDate(date.getDate() + 1);
        }
        return ret;
    }
    function getSafty(mensDate, dateMapping, cycle){
        var date = new Date(mensDate.getTime()),
            ret = {}, dateStr;
        for(var i = 0; i < cycle; i++){
            dateStr = util.date.format(date, 'yyyy-M-d');
            date.setDate(date.getDate() + 1);
            if(dateMapping[dateStr]){continue;}
            ret[dateStr] = 'safety';
        }
        return ret;
    }
    //
    $('.ovulation_main a.count').click(function(){
        var aver = $('#mens_aver'),
            mens = $('#mens_prev'),
            dateMapping = {},
            averValue, mensDate;
        if(!numeric.test(aver.val())){
            alert('平均月经周期请填入合适的天数！');
            aver.focus();
            return;
        }
        aver = parseInt(aver.val(), 10);
        if( aver < 20 || aver > 45){
            alert('平均月经周期必须在20天和45天范围之间！');
            $('#mens_aver').focus();
            return;
        }
        if(!mens.val()){
            alert('上次月经时间请选择合适的日期！');
            return;
        }
        mensDate = new Date(Date.parse(mens.val()));
        $.extend(dateMapping, getMenses(mensDate));
        $.extend(dateMapping, getOvulation(mensDate, aver));
        $.extend(dateMapping, getSafty(mensDate, dateMapping, aver));
        mensDate.setDate(mensDate.getDate() + aver);
        $.extend(dateMapping, getMenses(mensDate));
        $.extend(dateMapping, getOvulation(mensDate, aver));
        $.extend(dateMapping, getSafty(mensDate, dateMapping, aver));
        //
        po.content(Mustache.render(tmpl, {
            redirect: redirect,
            calendar: calendar.getHTMLString(new Date(Date.parse(mens.val())), dateMapping)
        }));
        po.show();
    });
    //
    var po = popup.getInstance();
        po.prefix('ovulation-popup');
    //
    if($.os.ios){//解决ios日期文本不垂直居中
        var mens = $('#mens_prev');
        mens.css('display', '-webkit-inline-flex')
            .css('position', 'absolute')
            .css('left', '0px')
            .css('right', '0px');
    }
});
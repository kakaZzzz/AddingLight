define(function(require, exports, module){
    var $ = require('./libs/zepto.min'),
        popup = require('popup'),
        util = require('util').util,
        calendar = require('calendar').getInstance(),
        redirect = require('redirect').html,
        Mustache = require('mustache'),
        tmpl = $('#safety-dialog-content').html();
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
    function getOvulation(mensDate, min, max){
        var date = new Date(mensDate.getTime()),
            firstDay = min - 18,
            len = max - 11 - firstDay,
            ret = {};
        date.setDate(date.getDate() + firstDay);//排卵期前一天
        for(var i = 0; i < len; i++){
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

    $('.safety_main a.count').click(function(){
        var min = $('#mens_min'),
            max = $('#mens_max'),
            mens = $('#mens_prev'),
            minValue, maxValue;
        if(!numeric.test(min.val())){
            alert('最短月经周期请填入合适的天数！');
            min.focus();
            return;
        }
        minValue = parseInt(min.val(), 0);
        if(minValue < 19){
            alert('最短月经周期需要大于18天！');
            min.focus();
            return;
        }
        if(!numeric.test(max.val())){
            alert('最长月经周期请填入合适的天数！');
            max.focus();
            return;
        }
        maxValue = parseInt(max.val(), 10);
        if(minValue >= maxValue){
            alert('最长月经周期必须大于最短月经周期！');
            max.focus();
            return;
        }
        if(!mens.val()){
            alert('上次月经时间请选择合适的日期！');
            return;
        }
        //
        var mensDate = new Date(Date.parse(mens.val())),
            dateMapping = {},
            aver = Math.round((minValue + maxValue) / 2);
        $.extend(dateMapping, getMenses(mensDate));
        $.extend(dateMapping, getOvulation(mensDate, minValue, maxValue));
        $.extend(dateMapping, getSafty(mensDate, dateMapping, aver));
        mensDate.setDate(mensDate.getDate() + aver);
        $.extend(dateMapping, getMenses(mensDate));
        $.extend(dateMapping, getOvulation(mensDate, minValue, maxValue));
        $.extend(dateMapping, getSafty(mensDate, dateMapping, aver));
        
        po.content(Mustache.render(tmpl, {
            redirect: redirect,
            calendar: calendar.getHTMLString(new Date(Date.parse(mens.val())), dateMapping)
        }));
        po.show();
    });


    var po = popup.getInstance();
        po.prefix('safety-popup');
});
define(function(require, exports, module){
    var $ = require('./libs/zepto.min'),
        popup = require('popup'),
        hyperlink = require('hyperlink').html,
        Mustache = require('mustache'),
        tmpl = $('#expect-dialog-content').html();
    $('.expect_main .count').click(function(evt){
        var lastDate = $('#menstrual_date'),
            devCycle = $('#menstrual_cycle'),
            devDate = devCycle.val() || '28',
            rNum = /^\d+$/;
        if(!lastDate.val()){
            alert('请选择末次月经时间！');
            return;
        }
        if(!devCycle.get(0).checkValidity()){
            alert('请正确填写月经周期！');
            devCycle.focus();
            return;
        }
        if(!rNum.test(devDate)){
            alert('请正确填写月经周期范围！');
            devCycle.focus();
            return;
        }
        var dateStr = lastDate.val().split('-'),
            now = new Date(),
            endDate = new Date(dateStr[0] + '/' + dateStr[1] + '/' + dateStr[2]),
            totalDate = devDate - 28 + 280,
            dateTime = 24 * 60 * 60 * 1000,//一天毫秒
            birthDate, elapse;
        endDate.setDate(endDate.getDate() + totalDate);
        now.setHours((24 - now.getTimezoneOffset() / 60) % 24);//降低两极误差
        birthDate = Math.ceil((endDate - now) / dateTime);
        if(birthDate < 1){
            alert('对不起，您输入的日期可能过早了，请重新输入！');
            return;
        }
        elapse = 281 - Math.min(birthDate, 280);//消逝的时间
        po.content(Mustache.render(tmpl, {
            expect: endDate.getFullYear() + '年' + (endDate.getMonth() + 1) + '月' + endDate.getDate() + '日',
            week: Math.floor(elapse / 7) + '周' + elapse % 7 + '天',
            date: birthDate + '天',
            hyperlink: hyperlink
        })).show();
    });
    
    var html = [];
    for(var i = 0; i < 100; i++){
        html.push('<option ', 'value="', i+1, '">', i+1, '</option>');
    }
    $('#menstrual_cycle').html(html.join('')).prop('selectedIndex', 27).css('visibility', 'visible');
    //popup
    var po = popup.getInstance();
        po.prefix('expect-popup');
    //alert(window.devicePixelRatio);
    if($.os.ios){//解决ios日期文本不垂直居中
        $('#menstrual_date').css('display', '-webkit-inline-flex')
            .css('position', 'absolute')
            .css('left', '0px')
            .css('right', '0px');
    }
});
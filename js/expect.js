define(function(require, exports, module){
    $('.expect_main .count').click(function(evt){
        var lastDate = $(document.getElementById('mensDateId') || document.getElementById('menstrual_date')),
            devCycle = $('#menstrual_cycle'),
            devDate = devCycle.val() || 28;
        if(!lastDate.val()){
            alert('请选择末次月经时间！');
            return;
        }
        if(!devCycle.get(0).checkValidity()){
            alert('请正确填写月经周期！');
            devCycle.focus();
            return;
        }
        if(devDate < 1){
            alert('请正确填写月经周期范围！');
            devCycle.focus();
            return;
        }
        var time = Date.parse(lastDate.val()),
            start = new Date(time),
            end = new Date(time),
            now = new Date(),
            totalDate = devDate - 28 + 280,//怀孕280天
            dateTime = 24 * 60 * 60 * 1000,//一天毫秒
            menstrualDate = Math.floor((now - start) / dateTime), //已经怀孕的天数
            week = Math.floor(menstrualDate / 7);//已经怀孕周数
        end.setDate(end.getDate() + totalDate);
        var Mustache = require('mustache'),
            tmpl = '您的预产期是：<span class="red">{{expect}}</span><br/>您已经怀孕：<span class="red">{{week}}</span><br/>离宝宝出生还有：<span class="red">{{date}}</span>';
        $('.expect_main .ret').html(Mustache.render(tmpl, {
            expect: end.getFullYear() + '年' + (end.getMonth() + 1) + '月' + end.getDate() + '日',
            week: week + '周' + menstrualDate % 7 + '天',
            date: totalDate - menstrualDate + '天'
        }));
    });
    
    if($.os.ios){//如果是ios系统，需要处理date的宽度
        var date = $('<input/>').prop('id', 'mensDateId').prop('type', 'text'),
            c = $('#menstrual_date').change(function(){$('#mensDateId').val(this.value)});
        $('.menstrual_input').first().append(date);
        date.focus(function(){
            this.blur();
            c.focus();
        });
    }
    $('.expect_main .menstrual_input input').css('visibility', 'visible');
});
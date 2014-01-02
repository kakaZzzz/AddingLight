define(function(require, exports, module){
    $('.expect_main .count').click(function(evt){
        var lastDate = $(document.getElementById('mensDateId') || document.getElementById('menstrual_date')),
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
        var time = Date.parse(lastDate.val()),
            now = new Date(),
            endDate = new Date(time),
            totalDate = devDate - 28 + 280,
            dateTime = 24 * 60 * 60 * 1000,//一天毫秒
            birthDate, elapse;
        endDate.setDate(endDate.getDate() + totalDate);
        birthDate = Math.ceil((endDate - now) / dateTime);
        elapse = 281 - Math.min(birthDate, 280);//消逝的时间
        var Mustache = require('mustache'),
            tmpl = '您的预产期是：<span class="red">{{expect}}</span><br/>您已经怀孕：<span class="red">{{week}}</span><br/>离宝宝出生还有：<span class="red">{{date}}</span>';
        $('.expect_main .ret').html(Mustache.render(tmpl, {
            expect: endDate.getFullYear() + '年' + (endDate.getMonth() + 1) + '月' + endDate.getDate() + '日',
            week: Math.floor(elapse / 7) + '周' + elapse % 7 + '天',
            date: birthDate + '天'
        }));
    });
    
    var html = [];
    for(var i = 0; i < 100; i++){
        html.push('<option ', 'value="', i+1, '">', i+1, '</option>');
    }
    $('#menstrual_cycle').html(html.join('')).prop('selectedIndex', 27).css('visibility', 'visible');
    if($.os.ios){//如果是ios系统，需要处理date的宽度
        var date = $('<input/>').prop('id', 'mensDateId').prop('type', 'text').prop('readonly', 'true');
            c = $('#menstrual_date').change(function(){$('#mensDateId').val(this.value)});
        $('.menstrual_input').first().append(date);
        date.focus(function(evt){
            this.blur();
            c.focus();
        });
    }
    $('.expect_main .menstrual_input input').css('visibility', 'visible');
});
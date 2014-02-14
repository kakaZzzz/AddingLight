define(function(require, exports, module){
    var $ = require('./libs/zepto.min'),
        util = require('util').util,
        defaultData = util.parseQueryString(location.search),
        len = 40 - 13,//从13周开始
        week = $('#week'),
        day = $('#day'),
        bpd = $('#BPD'),
        hc = $('#HC'),
        ac = $('#AC'),
        fl = $('#FL'),
        hl = $('#HL'),
        ofd = $('#OFD');
    defaultData['week'] = defaultData['week'] ? Math.max(parseInt(defaultData['week'], 10), 13) : 13;
    //写入孕周和天
    var html = [];
    for(var i = 0; i <= len; i++){
        html.push('<option value="', i + 13,'">孕', i + 13, '周</option>');
    }
    week.html(html.join('')).prop('value', defaultData.week);
    html = [];
    for(var i = 0; i < 7; i++){
        html.push('<option value="', i,'">', i, '天</option>');
    }
    day.html(html.join('')).prop('selectedIndex', defaultData.day || 0);
    //设置从url过来的默认值
    bpd.val(defaultData.bpd || '');
    ac.val(defaultData.ac || '');
    fl.val(defaultData.fl || '');
    //
    $('.evaluation_main .count').click(function(){
        var val = bpd.val() + hc.val() + ac.val() + fl.val() + hl.val() + ofd.val();
        if(!val){
            alert('请至少填写一项！');
            return;
        }
        document.myform.submit();
    });
});
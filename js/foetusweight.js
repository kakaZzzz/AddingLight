define(function(require, exports, module){
    var $ = require('./libs/zepto.min'),
        Mustache = require('mustache'),
        tmpl = $('#foetusweight-dialog-content').html(),
        popup = require('popup'),
        redirect = require('redirect').html,
        numeric = /^\d+(\.\d+)?$/,
        timeOut = null,
        html = [];
    //写入孕周和天
    for(var i = 0; i < 40; i++){
        html.push('<option value="', i + 1,'">孕', i + 1, '周</option>');
    }
    $('#gestweek').html(html.join('')).prop('selectedIndex', 19);
    html = [];
    for(var i = 0; i < 7; i++){
        html.push('<option value="', i,'">', i, '天</option>');
    }
    $('#gestday').html(html.join('')).prop('selectedIndex', 0);
    //计算按钮注册事件
    $('.foetusweight_main .count').click(function(evt){
        var bpd = $('#BPD'),//双顶径
            ac = $('#AC'),//腹围
            fl = $('#FL'),//股骨长
            ret = 0, jin, lian;
        if(!numeric.test(bpd.val())){
            alert('双顶径请填入合适的数值！');
            bpd.focus();
            return;
        }
        if(!numeric.test(ac.val())){
            alert('腹围请填入合适的数值！');
            ac.focus();
            return;
        }
        if(!numeric.test(fl.val())){
            alert('股骨长请填入合适的数值！');
            fl.focus();
            return;
        }
        //记录日志
        require('log').send({
            p: 'foetusweight',
            week: $('#gestweek').val(),
            day: $('#gestday').val(),
            bpd: bpd.val(),
            ac: ac.val(),
            fl: fl.val()
        });
        //开始运算 mm转换为cm
        bpd = bpd.val() / 10;
        ac = ac.val() / 10;
        fl = fl.val() / 10;
        //1.07*BDP*BDP*BDP+0.3*AC*AC*FL
        ret = 1.07 * bpd * bpd * bpd + .3 * ac * ac * fl;
        jin = Math.floor(ret * 0.002);
        lian = (ret * 0.002 - jin) * 10;
        lian = !jin && !Math.floor(lian) ? lian.toFixed(4) : Math.floor(lian);
        po.content(Mustache.render(tmpl, {
            weight: ret.toFixed(2) + '克',
            jin: jin ? jin + '斤' : '',
            liang: lian ? lian + '两' : '',
            redirect: redirect
        }));
        clearTimeout(timeOut);
        //解决当输入法还未关闭时dialog位置运算不准确的问题
        timeOut = setTimeout(function(){
            po.show();
            timeOut = setTimeout(function(){
                po.refresh();
            }, 250);
        }, 200);
    });
    //popup
    var po = popup.getInstance();
        po.prefix('foetus-popup');
    //popup下的链接建立代理
    $('.foetus-popup').delegate('a.re-eval', 'click', function(evt){
        location.href = Mustache.render('evaluation.html?from=foetusweight&week={{w}}&day={{d}}&bpd={{bpd}}&ac={{ac}}&fl={{fl}}', {
            w: $('#gestweek').val(),
            d: $('#gestday').val(),
            bpd: $('#BPD').val(),
            ac: $('#AC').val(),
            fl: $('#FL').val()
        });
    });
});
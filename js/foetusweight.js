define(function(require, exports, module){
    var $ = require('./libs/zepto.min'),
        gmu = require('dialog').gmu,
        Mustache = require('mustache'),
        tmpl = $('#foetusweight-dialog-content').html(),
        popup = require('popup'),
        redirect = require('redirect').html,
        timeOut = null;
    $('.foetusweight_main .count').click(function(evt){
        var bpd = $('#BPD'),//双顶径
            ac = $('#AC'),//腹围
            fl = $('#FL'),//股骨长
            ret = 0, jin, lian;
        if(!bpd.get(0).checkValidity()){
            alert('双顶径请填入合适的数值！');
            bpd.focus();
            return;
        }
        if(!ac.get(0).checkValidity()){
            alert('腹围请填入合适的数值！');
            ac.focus();
            return;
        }
        if(!fl.get(0).checkValidity()){
            alert('股骨长请填入合适的数值！');
            fl.focus();
            return;
        }
        bpd = parseFloat(bpd.val());
        ac = parseFloat(ac.val());
        fl = parseFloat(fl.val());
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
});